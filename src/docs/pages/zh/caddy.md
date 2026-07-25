公开部署时，在 `web` 服务前运行 Caddy，让 Cloudflare 能以 **Full (strict)** 模式回源。

## Cloudflare 源站证书

1. 为你的域名签发 Cloudflare Origin CA 证书，下载证书（`*.pem`/`*.crt`）和私钥（`*.key`/`*.pem`）。
2. 把文件放进 `docker/caddy/certs/`。
3. 编辑 `.env`：

```dotenv
APP_URL=https://wiki.example.com
CADDY_HOST=wiki.example.com

# 路径与你上传的文件名保持一致
CADDY_CERT_PATH=/etc/caddy/certs/wiki.example.com.crt
CADDY_KEY_PATH=/etc/caddy/certs/wiki.example.com.key

# web 容器只绑定 localhost；Caddy 通过 Docker 网络访问，
# 防止从公网直接访问 3000 端口。
WEB_PORT=127.0.0.1:3000
```

4. 带 Caddy overlay 启动：

```bash
# 开发构建（本地构建镜像）
docker compose -f docker-compose.yml -f docker-compose.caddy.yml up -d --build

# 生产构建（拉取已发布镜像）
docker compose -f docker-compose.prod.yml -f docker-compose.caddy.yml up -d
```

5. 在 Cloudflare 将 SSL/TLS 加密模式设为 **Full (strict)**，并把域名 A 记录指向你的服务器 IP。

## 用自签名证书本地测试

不依赖 Cloudflare 也可以在本地验证 Caddy overlay。

1. 生成带 `wiki.local` 与 `localhost` SAN 的证书：

```bash
mkdir -p docker/caddy/certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout docker/caddy/certs/localhost.key \
  -out docker/caddy/certs/localhost.crt \
  -subj "/CN=wiki.local" \
  -addext "subjectAltName=DNS:wiki.local,DNS:localhost,IP:127.0.0.1,IP:::1"
```

2. 配置 `.env`：

```dotenv
CADDY_HOST=wiki.local
CADDY_CERT_PATH=/etc/caddy/certs/localhost.crt
CADDY_KEY_PATH=/etc/caddy/certs/localhost.key
CADDY_CERTS_DIR=./docker/caddy/certs

# 80/443 不可用时使用非特权端口
CADDY_HTTP_PORT=8080
CADDY_HTTPS_PORT=8443
APP_URL=https://wiki.local:8443
```

3. 启动并验证 HTTPS 与 HTTP→HTTPS 跳转：

```bash
docker compose -f docker-compose.yml -f docker-compose.caddy.yml up -d --build
curl -k --resolve wiki.local:8443:127.0.0.1 https://wiki.local:8443/healthz
curl -I --resolve wiki.local:8080:127.0.0.1 http://wiki.local:8080/
```

4. 可选：把 `127.0.0.1 wiki.local` 加入 `/etc/hosts`，然后浏览器打开 `https://wiki.local:8443`（接受自签名警告）。
