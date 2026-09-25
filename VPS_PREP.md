# Локальная сборка и запуск на VPS

Образ приложения собирается на локальном Mac для `linux/amd64`, затем передаётся на VPS. На сервере сборка не запускается. Compose поднимает приложение и PostgreSQL. Сайт использует существующую схему VPS: nginx принимает ACME/HTTP на 80 и Xray передаёт HTTPS fallback в nginx на `127.0.0.1:8080`. nginx проксирует запросы к приложению на `127.0.0.1:3030`. Xray уже обслуживает 443; его inbound получает сертификат `codio.dev` через отдельную Certbot deploy hook.

## Сборка образа локально

Из корня репозитория подготовьте локальные секреты, если `.env.vps` ещё не создан:

```sh
cp .env.vps.example .env.vps
openssl rand -hex 32
```

Вставьте два разных сгенерированных значения в `POSTGRES_PASSWORD` и `NEXTAUTH_SECRET`. Оставьте `SITE_ORIGIN=https://codio.dev`. Этот файл не добавляйте в Git.

Соберите контейнер для архитектуры VPS и сохраните его в архив:

```sh
docker buildx build --platform linux/amd64 --load -t webschool:current .
docker save webschool:current -o webschool-image.tar
```

## Передача файлов

Создайте каталог релиза на сервере и передайте Compose, env-файл и образ по SSH-ключу VPS:

```sh
ssh -i ~/.ssh/vpssetup_rsa root@195.26.231.220 'mkdir -p /opt/webschool/deploy'
scp -i ~/.ssh/vpssetup_rsa compose.vps.yml .env.vps webschool-image.tar root@195.26.231.220:/opt/webschool/
scp -i ~/.ssh/vpssetup_rsa deploy/nginx-codio.conf deploy/add-codio-cert.py deploy/codio-xray-renew root@195.26.231.220:/opt/webschool/deploy/
```

## Загрузка и запуск

Сначала в панели DNS направьте A-запись `codio.dev` на `195.26.231.220`, сохранив CNAME `www` и TXT-записи проверки домена. Затем настройте HTTP challenge и сертификат Xray. На VPS проверьте наличие группы `vpn-cert`, требуемой для чтения сертификата Xray.

```sh
ssh -i ~/.ssh/vpssetup_rsa root@195.26.231.220
cd /opt/webschool
install -m 0644 /opt/webschool/deploy/nginx-codio.conf /etc/nginx/sites-available/codio.dev
ln -sfn /etc/nginx/sites-available/codio.dev /etc/nginx/sites-enabled/codio.dev
nginx -t
systemctl reload nginx
certbot certonly --webroot -w /var/www/acme -d codio.dev -d www.codio.dev
install -d -o root -g vpn-cert -m 0750 /etc/vpn-certs/codio
RENEWED_LINEAGE=/etc/letsencrypt/live/codio.dev /opt/webschool/deploy/codio-xray-renew
python3 /opt/webschool/deploy/add-codio-cert.py
systemctl restart xray
install -o root -g root -m 0755 /opt/webschool/deploy/codio-xray-renew /etc/letsencrypt/renewal-hooks/deploy/codio-xray-renew
```

[`deploy/nginx-codio.conf`](deploy/nginx-codio.conf) redirects public HTTP to HTTPS, serves Certbot challenges on port 80 and accepts Xray fallback on `127.0.0.1:8080`. After the app starts, the apex host is proxied to it and `www` redirects to the apex. [`deploy/add-codio-cert.py`](deploy/add-codio-cert.py) backs up Xray config, adds certificate paths to TLS inbound on 443 and validates the temporary config before replacing it. [`deploy/codio-xray-renew`](deploy/codio-xray-renew) installs renewed certificate/key with restricted permissions and restarts Xray as a Certbot deploy hook.

Теперь загрузите локально собранный образ и запустите приложение с PostgreSQL:

```sh
docker load -i webschool-image.tar
docker compose --env-file .env.vps -f compose.vps.yml config --quiet
docker compose --env-file .env.vps -f compose.vps.yml up -d
docker compose --env-file .env.vps -f compose.vps.yml ps
```

Убедитесь, что firewall разрешает входящий TCP 80 и HTTPS на существующем Xray listener порта 443. `.dev` использует HSTS preload, поэтому браузеры открывают сайт только через HTTPS.

## Резервная копия данных

Перед обновлением сохраните резервную копию PostgreSQL за пределами VPS:

```sh
docker compose --env-file .env.vps -f compose.vps.yml exec -T postgres pg_dump -U postgres -d webschool > webschool-$(date +%F-%H%M%S).sql
```

Сохраните архив отдельно и ограничьте к нему доступ. При откате не удаляйте Docker volume `postgres_data`. Предыдущий образ можно загрузить из его сохранённого архива и запустить Compose с тем же `.env.vps`.
