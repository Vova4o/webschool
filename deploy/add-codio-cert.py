#!/usr/bin/env python3
"""Add the codio.dev certificate to Xray's TLS-enabled port 443 inbounds."""

from __future__ import annotations

import argparse
import json
import os
import shutil
import stat
import subprocess
import sys
import tempfile
from datetime import datetime
from pathlib import Path


CERTIFICATE_FILE = "/etc/vpn-certs/codio/fullchain.pem"
KEY_FILE = "/etc/vpn-certs/codio/privkey.pem"
DEFAULT_CONFIG = "/etc/xray/config.json"
DEFAULT_XRAY = "/usr/local/bin/xray"


def update_config(config_path: Path, xray_path: str) -> bool:
    try:
        config = json.loads(config_path.read_bytes())
    except (OSError, json.JSONDecodeError) as err:
        raise RuntimeError("could not read a valid Xray JSON config") from err

    if not isinstance(config, dict) or not isinstance(config.get("inbounds"), list):
        raise RuntimeError("Xray config does not contain an inbound list")

    certificate_lists = []
    for inbound in config["inbounds"]:
        if not isinstance(inbound, dict) or inbound.get("port") != 443:
            continue
        stream = inbound.get("streamSettings")
        if not isinstance(stream, dict) or stream.get("security") != "tls":
            continue
        tls = stream.get("tlsSettings")
        if not isinstance(tls, dict):
            raise RuntimeError("port 443 TLS inbound has no tlsSettings object")
        certificates = tls.setdefault("certificates", [])
        if not isinstance(certificates, list):
            raise RuntimeError("port 443 TLS certificates setting is not a list")
        certificate_lists.append(certificates)

    if not certificate_lists:
        raise RuntimeError("no TLS-enabled Xray inbound listens on port 443")

    changed = False
    for certificates in certificate_lists:
        present = any(
            isinstance(item, dict)
            and item.get("certificateFile") == CERTIFICATE_FILE
            and item.get("keyFile") == KEY_FILE
            for item in certificates
        )
        if not present:
            certificates.append(
                {"certificateFile": CERTIFICATE_FILE, "keyFile": KEY_FILE}
            )
            changed = True

    if not changed:
        return False

    file_stat = config_path.stat()
    content = (json.dumps(config, indent=2, ensure_ascii=False) + "\n").encode()
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup_path = config_path.with_name(f"{config_path.name}.bak-{timestamp}")
    suffix = 1
    while backup_path.exists():
        backup_path = config_path.with_name(
            f"{config_path.name}.bak-{timestamp}-{suffix}"
        )
        suffix += 1

    temporary_path: Path | None = None
    try:
        shutil.copy2(config_path, backup_path)
        with tempfile.NamedTemporaryFile(
            mode="wb",
            prefix=f".{config_path.name}.",
            suffix=".json",
            dir=config_path.parent,
            delete=False,
        ) as temporary:
            temporary_path = Path(temporary.name)
            temporary.write(content)
            temporary.flush()
            os.fsync(temporary.fileno())
        os.chmod(temporary_path, stat.S_IMODE(file_stat.st_mode))
        os.chown(temporary_path, file_stat.st_uid, file_stat.st_gid)

        result = subprocess.run(
            [xray_path, "run", "-test", "-config", str(temporary_path)],
            check=False,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        if result.returncode != 0:
            raise RuntimeError(
                "Xray rejected the updated config; original config is unchanged"
            )

        os.replace(temporary_path, config_path)
        temporary_path = None
        directory_fd = os.open(config_path.parent, os.O_RDONLY)
        try:
            os.fsync(directory_fd)
        finally:
            os.close(directory_fd)
    except OSError as err:
        raise RuntimeError("could not safely update the Xray config") from err
    finally:
        if temporary_path is not None:
            try:
                temporary_path.unlink()
            except FileNotFoundError:
                pass

    print(f"Updated Xray config; backup: {backup_path}")
    return True


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", default=DEFAULT_CONFIG, help="Xray config path")
    parser.add_argument("--xray", default=DEFAULT_XRAY, help="Xray executable path")
    args = parser.parse_args()

    try:
        changed = update_config(Path(args.config), args.xray)
    except RuntimeError as err:
        print(f"error: {err}", file=sys.stderr)
        return 1

    if not changed:
        print("Codio certificate is already configured")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
