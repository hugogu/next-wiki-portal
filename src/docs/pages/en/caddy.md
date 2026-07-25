For public deployments, run Caddy in front of the `web` service so Cloudflare can use **Full (strict)** TLS to the origin.

## Cloudflare origin certificate

1. Provision a Cloudflare Origin CA certificate for your domain and download the certificate (`*.pem`/`*.crt`) and private key (`*.key`/`*.pem`).
2. Place the files in `docker/caddy/certs/`.
3. Edit `.env`:

```dotenv
APP_URL=https://wiki.example.com
CADDY_HOST=wiki.example.com

# Match these paths to the filenames you uploaded
CADDY_CERT_PATH=/etc/caddy/certs/wiki.example.com.crt
CADDY_KEY_PATH=/etc/caddy/certs/wiki.example.com.key

# Bind the web container to localhost only; Caddy reaches it
# through the Docker network. This prevents direct access to
# port 3000 from the internet.
WEB_PORT=127.0.0.1:3000
```

4. Start the stack with the Caddy overlay:

```bash
# Dev build (builds image locally)
docker compose -f docker-compose.yml -f docker-compose.caddy.yml up -d --build

# Prod build (pulls published image)
docker compose -f docker-compose.prod.yml -f docker-compose.caddy.yml up -d
```

5. In Cloudflare, set the SSL/TLS encryption mode to **Full (strict)** and point the domain's A record to your server IP.

## Local testing with a self-signed certificate

You can exercise the Caddy overlay locally without Cloudflare.

1. Generate a certificate with SANs for `wiki.local` and `localhost`:

```bash
mkdir -p docker/caddy/certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout docker/caddy/certs/localhost.key \
  -out docker/caddy/certs/localhost.crt \
  -subj "/CN=wiki.local" \
  -addext "subjectAltName=DNS:wiki.local,DNS:localhost,IP:127.0.0.1,IP:::1"
```

2. Configure `.env`:

```dotenv
CADDY_HOST=wiki.local
CADDY_CERT_PATH=/etc/caddy/certs/localhost.crt
CADDY_KEY_PATH=/etc/caddy/certs/localhost.key
CADDY_CERTS_DIR=./docker/caddy/certs

# Non-privileged ports if 80/443 are unavailable
CADDY_HTTP_PORT=8080
CADDY_HTTPS_PORT=8443
APP_URL=https://wiki.local:8443
```

3. Start the stack and verify HTTPS plus the HTTP→HTTPS redirect:

```bash
docker compose -f docker-compose.yml -f docker-compose.caddy.yml up -d --build
curl -k --resolve wiki.local:8443:127.0.0.1 https://wiki.local:8443/healthz
curl -I --resolve wiki.local:8080:127.0.0.1 http://wiki.local:8080/
```

4. Optionally add `127.0.0.1 wiki.local` to `/etc/hosts` and open `https://wiki.local:8443` in a browser (accept the self-signed warning).
