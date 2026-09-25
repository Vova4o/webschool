#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
readonly SCRIPT_DIR
APP_DIR="$(cd -- "${SCRIPT_DIR}/.." && pwd -P)"
readonly APP_DIR
readonly ENV_FILE="${APP_DIR}/.env.vps"
readonly COMPOSE_FILE="${APP_DIR}/compose.vps.yml"
readonly NGINX_SITE_SOURCE="${SCRIPT_DIR}/nginx-codio.conf"
readonly NGINX_UPSTREAM_SOURCE="${SCRIPT_DIR}/webschool-upstream.conf"
readonly NGINX_SITE_TARGET="/etc/nginx/sites-available/codio.dev"
readonly NGINX_UPSTREAM_TARGET="/etc/nginx/conf.d/webschool-upstream.conf"
readonly CANDIDATE_NAME="webschool-candidate"
readonly CANDIDATE_PORT=3031
readonly APP_PORT=3030
readonly HTTP_PATH="/"
readonly READY_TIMEOUT_SECONDS=120
readonly DRAIN_SECONDS=5
readonly CANDIDATE_CREATE_TIMEOUT_SECONDS=180
readonly CANDIDATE_CLEANUP_TIMEOUT_SECONDS=30
readonly CURL_CONNECT_TIMEOUT_SECONDS=2
readonly CURL_MAX_TIME_SECONDS=5

candidate_started=0
candidate_serving=0
release_succeeded=0
recovery_enabled=0
config_restore_needed=0
backup_dir=""
site_config_existed=0
upstream_config_existed=0

log() {
    printf '[release] %s\n' "$*" >&2
}

fail() {
    log "error: $*"
    exit 1
}

require_root() {
    [[ "$(id -u)" -eq 0 ]] || fail "run this script as root"
}

require_inputs() {
    [[ -f "$ENV_FILE" ]] || fail "missing environment file: ${ENV_FILE}"
    [[ -f "$COMPOSE_FILE" ]] || fail "missing compose file: ${COMPOSE_FILE}"
    [[ -f "$NGINX_SITE_SOURCE" ]] || fail "missing nginx site config: ${NGINX_SITE_SOURCE}"
    [[ -f "$NGINX_UPSTREAM_SOURCE" ]] || fail "missing nginx upstream config: ${NGINX_UPSTREAM_SOURCE}"
    command -v docker >/dev/null 2>&1 || fail "docker is not installed"
    command -v nginx >/dev/null 2>&1 || fail "nginx is not installed"
    command -v curl >/dev/null 2>&1 || fail "curl is not installed"
    command -v timeout >/dev/null 2>&1 || fail "timeout is not installed"
    command -v ss >/dev/null 2>&1 || fail "ss is not installed"
}

preflight_nginx_upstream() {
    if [[ ! -e "$NGINX_UPSTREAM_TARGET" ]]; then
        return 0
    fi

    if grep -Eq 'server[[:space:]]+127\.0\.0\.1:3031;' "$NGINX_UPSTREAM_TARGET"; then
        fail "nginx is configured for candidate port ${CANDIDATE_PORT}; refusing to overwrite the active upstream"
    fi
    grep -Eq 'server[[:space:]]+127\.0\.0\.1:3030;' "$NGINX_UPSTREAM_TARGET" ||
        fail "existing nginx upstream is not the expected regular app port ${APP_PORT}; refusing to change traffic"
}

preflight_candidate() {
    if ss -ltnH 'sport = :3031' | grep -q .; then
        fail "port ${CANDIDATE_PORT} is already listening; refusing to start candidate"
    fi

    if docker container inspect "$CANDIDATE_NAME" >/dev/null 2>&1; then
        local status
        status="$(docker container inspect --format '{{.State.Status}}' "$CANDIDATE_NAME")" ||
            fail "could not inspect existing candidate container"
        case "$status" in
            created|exited)
                if http_ready "$CANDIDATE_PORT"; then
                    fail "candidate port is serving HTTP; refusing to remove existing container"
                fi
                docker container rm "$CANDIDATE_NAME" >/dev/null ||
                    fail "could not remove stopped stale candidate container"
                docker container inspect "$CANDIDATE_NAME" >/dev/null 2>&1 &&
                    fail "stale candidate container still exists after removal"
                log "removed stopped stale candidate container"
                ;;
            *)
                fail "candidate container is ${status}; refusing to replace a running or active candidate"
                ;;
        esac
    fi
}

cleanup_candidate() {
    local deadline=$((SECONDS + CANDIDATE_CLEANUP_TIMEOUT_SECONDS))
    local status

    while (( SECONDS < deadline )); do
        if ! docker container inspect "$CANDIDATE_NAME" >/dev/null 2>&1; then
            sleep 2
            continue
        fi

        status="$(docker container inspect --format '{{.State.Status}}' "$CANDIDATE_NAME")" || {
            sleep 2
            continue
        }
        if [[ "$status" == running || "$status" == restarting || "$status" == paused ]]; then
            if http_ready "$CANDIDATE_PORT"; then
                candidate_serving=1
                log "kept serving candidate container ${CANDIDATE_NAME}"
                return 0
            fi
            log "kept running candidate container ${CANDIDATE_NAME} because it may still become ready"
            return 0
        fi

        if [[ "$status" == created || "$status" == exited ]]; then
            if http_ready "$CANDIDATE_PORT"; then
                candidate_serving=1
                log "kept candidate because port ${CANDIDATE_PORT} is serving HTTP"
                return 0
            fi
            if docker container rm "$CANDIDATE_NAME" >/dev/null 2>&1; then
                sleep 2
                continue
            fi
        else
            log "kept candidate with unexpected state ${status}"
            return 1
        fi
        sleep 2
    done

    log "candidate cleanup grace period ended; checking for a late container"
    if docker container inspect "$CANDIDATE_NAME" >/dev/null 2>&1; then
        status="$(docker container inspect --format '{{.State.Status}}' "$CANDIDATE_NAME")" || return 1
        if [[ "$status" == created || "$status" == exited ]]; then
            if http_ready "$CANDIDATE_PORT"; then
                log "kept candidate because port ${CANDIDATE_PORT} is serving HTTP"
                return 0
            fi
            docker container rm "$CANDIDATE_NAME" >/dev/null 2>&1 || return 1
            docker container inspect "$CANDIDATE_NAME" >/dev/null 2>&1 && return 1
        else
            log "kept candidate in state ${status}"
            return 0
        fi
    else
        log "candidate container remained absent through cleanup grace period"
    fi
    return 0
}

atomic_install() {
    local source="$1"
    local target="$2"
    local temporary

    install -d -m 0755 "$(dirname -- "$target")"
    temporary="$(mktemp "$(dirname -- "$target")/.release-config.XXXXXX")"
    if ! install -m 0644 "$source" "$temporary"; then
        rm -f -- "$temporary"
        return 1
    fi
    if ! mv -f -- "$temporary" "$target"; then
        rm -f -- "$temporary"
        return 1
    fi
}

write_upstream() {
    local port="$1"
    local temporary

    temporary="$(mktemp "$(dirname -- "$NGINX_UPSTREAM_TARGET")/.release-upstream.XXXXXX")"
    if ! printf 'upstream webschool_active {\n    server 127.0.0.1:%s;\n}\n' "$port" > "$temporary"; then
        rm -f -- "$temporary"
        return 1
    fi
    chmod 0644 "$temporary"
    if ! mv -f -- "$temporary" "$NGINX_UPSTREAM_TARGET"; then
        rm -f -- "$temporary"
        return 1
    fi
}

snapshot_nginx_configs() {
    backup_dir="$(mktemp -d /tmp/webschool-nginx-backup.XXXXXX)"
    if [[ -e "$NGINX_SITE_TARGET" || -L "$NGINX_SITE_TARGET" ]]; then
        cp -a -- "$NGINX_SITE_TARGET" "$backup_dir/site"
        site_config_existed=1
    fi
    if [[ -e "$NGINX_UPSTREAM_TARGET" || -L "$NGINX_UPSTREAM_TARGET" ]]; then
        cp -a -- "$NGINX_UPSTREAM_TARGET" "$backup_dir/upstream"
        upstream_config_existed=1
    fi
}

restore_nginx_configs() {
    local backup target existed temporary
    for backup in site upstream; do
        if [[ "$backup" == site ]]; then
            target="$NGINX_SITE_TARGET"
            existed="$site_config_existed"
        else
            target="$NGINX_UPSTREAM_TARGET"
            existed="$upstream_config_existed"
        fi
        if [[ "$existed" -eq 1 ]]; then
            temporary="$(mktemp "$(dirname -- "$target")/.release-restore.XXXXXX")"
            rm -f -- "$temporary"
            cp -a -- "$backup_dir/$backup" "$temporary"
            mv -f -- "$temporary" "$target"
        else
            rm -f -- "$target"
        fi
    done
}

reload_nginx() {
    nginx -t || return 1
    nginx -s reload || return 1
}

http_ready() {
    local port="$1"
    curl --silent --show-error --fail \
        --connect-timeout "$CURL_CONNECT_TIMEOUT_SECONDS" \
        --max-time "$CURL_MAX_TIME_SECONDS" \
        "http://127.0.0.1:${port}${HTTP_PATH}" >/dev/null 2>&1
}

wait_http_ready() {
    local port="$1"
    local label="$2"
    local deadline=$((SECONDS + READY_TIMEOUT_SECONDS))

    log "waiting up to ${READY_TIMEOUT_SECONDS}s for ${label} on 127.0.0.1:${port}"
    while (( SECONDS < deadline )); do
        if http_ready "$port"; then
            log "${label} is ready"
            return 0
        fi
        sleep 2
    done
    return 1
}

switch_upstream() {
    local port="$1"
    write_upstream "$port" || return 1
    reload_nginx || return 1
    log "nginx now sends traffic to 127.0.0.1:${port}"
}

recover_active_upstream() {
    local port=""

    if http_ready "$CANDIDATE_PORT"; then
        port="$CANDIDATE_PORT"
    elif http_ready "$APP_PORT"; then
        port="$APP_PORT"
    fi

    if [[ -n "$port" ]]; then
        if switch_upstream "$port"; then
            log "recovery kept the serving upstream on 127.0.0.1:${port}"
            return 0
        fi
        log "could not reload nginx during recovery; its last loaded config remains active"
        return 1
    fi

    log "neither application port is answering HTTP; leaving the candidate container untouched"
    return 1
}

cleanup() {
    local status=$?
    trap - EXIT

    if (( status != 0 && config_restore_needed == 1 )); then
        restore_nginx_configs || log "could not restore the previous nginx configuration files"
        nginx -t >/dev/null 2>&1 && nginx -s reload >/dev/null 2>&1 || true
    fi

    if (( status != 0 && release_succeeded == 0 && recovery_enabled == 1 )); then
        log "release failed; checking for a serving upstream"
        recover_active_upstream || true
        if (( candidate_started == 1 )); then
            if http_ready "$CANDIDATE_PORT"; then
                candidate_serving=1
            else
                candidate_serving=0
            fi
            if (( candidate_serving == 0 )); then
                cleanup_candidate || log "candidate cleanup did not complete"
            else
                log "kept serving candidate container ${CANDIDATE_NAME}"
            fi
        fi
    fi

    if [[ -n "$backup_dir" ]]; then
        rm -rf -- "$backup_dir"
    fi

    exit "$status"
}
trap cleanup EXIT

main() {
    require_root
    require_inputs
    cd -- "$APP_DIR"

    preflight_nginx_upstream
    preflight_candidate

    snapshot_nginx_configs
    config_restore_needed=1
    log "installing nginx configuration"
    atomic_install "$NGINX_UPSTREAM_SOURCE" "$NGINX_UPSTREAM_TARGET" || fail "could not install nginx upstream config"
    atomic_install "$NGINX_SITE_SOURCE" "$NGINX_SITE_TARGET" || fail "could not install nginx site config"
    reload_nginx || fail "nginx configuration validation or reload failed"
    config_restore_needed=0
    recovery_enabled=1

    log "starting candidate image webschool:current on 127.0.0.1:${CANDIDATE_PORT}"
    candidate_started=1
    timeout --signal=TERM --kill-after=10s "${CANDIDATE_CREATE_TIMEOUT_SECONDS}s" \
        docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" \
        run --no-deps -d --name "$CANDIDATE_NAME" \
        --publish "127.0.0.1:${CANDIDATE_PORT}:3000" app >/dev/null

    wait_http_ready "$CANDIDATE_PORT" "candidate" || fail "candidate did not become ready"
    candidate_serving=1
    switch_upstream "$CANDIDATE_PORT" || fail "could not switch nginx to the ready candidate"
    log "allowing ${DRAIN_SECONDS}s for requests on the previous upstream to finish"
    sleep "$DRAIN_SECONDS"

    log "recreating the regular compose app on 127.0.0.1:${APP_PORT}"
    timeout --signal=TERM --kill-after=10s 180s \
        docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" \
        up -d --no-deps --force-recreate app || fail "could not recreate the regular app container"

    wait_http_ready "$APP_PORT" "regular app" || fail "regular app did not become ready; candidate remains available"
    switch_upstream "$APP_PORT" || fail "could not switch nginx back to the regular app; candidate remains available"
    log "allowing ${DRAIN_SECONDS}s for requests on the candidate upstream to finish"
    sleep "$DRAIN_SECONDS"

    docker rm -f "$CANDIDATE_NAME" >/dev/null || fail "traffic is on the regular app, but candidate cleanup failed"
    candidate_started=0
    release_succeeded=1
    log "release completed successfully"
}

main "$@"
