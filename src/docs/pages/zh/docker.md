next-wiki 提供了一组小型 Compose 文件，让每种环境只运行它需要的东西。

## Compose 文件

| 文件 | 用途 |
|---|---|
| `docker-compose.yml` | 基础栈：本地构建 web 镜像 + PostgreSQL |
| `docker-compose.prod.yml` | 拉取已发布的镜像（如 `hugogu/next-wiki-web:latest`） |
| `docker-compose.caddy.yml` | 增加带 TLS 的 Caddy 反向代理 —— 见 [Caddy + Cloudflare](/docs/caddy) |

## 常用命令

```bash
# 开发：本地构建并启动
docker compose up -d --build

# 生产：拉取已发布镜像
docker compose -f docker-compose.prod.yml up -d

# 生产 + 前置 TLS
docker compose -f docker-compose.prod.yml -f docker-compose.caddy.yml up -d

# 可选 S3 兼容对象存储
docker compose --profile storage-s3 up -d --build

# 日志 / 停止
docker compose logs -f web
docker compose down          # 加 --volumes 可连数据库一起清空
```

## 各组件职责

- **web** —— Next.js 应用：UI、REST 路由处理器、后台任务（pg-boss）以及可选的进程内飞书模块。通过 `WEB_PORT` 暴露（默认 `3000`）。
- **postgres** —— 唯一必需的有状态服务。页面、修订、用户、设置和导入导出任务记录都在这里。
- **内容卷** —— 持久化卷，存放上传的资产与导入导出产物（`TRANSFER_ARTIFACT_BASE_PATH`，默认 `/data/content/transfers`）。

## 反代之后绑定 localhost

当由反向代理终结 TLS 时，让 web 容器不暴露在公网接口上 —— Caddy 通过 Docker 网络访问它：

```dotenv
WEB_PORT=127.0.0.1:3000
```
