本指南带你在几分钟内跑起一个可用的 next-wiki 实例。

## 环境要求

- 安装 [Docker](https://www.docker.com/) 与 Docker Compose
- 仅此而已 —— Web 应用、PostgreSQL 和后台任务全部运行在容器里。PostgreSQL 是**唯一必需的有状态服务**；对象存储等其他后端均为可选。

如果你想改源码而不是直接运行，请看[本地开发](/docs/local-dev)（Node.js 20.9+、pnpm 10）。

## 快速开始

```bash
git clone https://github.com/hugogu/next-wiki.git
cd next-wiki
cp .env.example .env   # 按需修改（镜像源、端口、加密密钥）
docker compose up -d --build
```

打开 [http://localhost:3000](http://localhost:3000) —— 首次运行会自动初始化，并引导你完成[首次初始化](/docs/first-run)。

## 可选 Compose profiles

可选功能不会扩大默认占用，需要时通过 Compose profile 启用：

```bash
# 用于内容资产的 S3 兼容对象存储
docker compose --profile storage-s3 up -d --build
```

## 使用已发布的镜像

生产环境可以跳过本地构建，直接拉取已发布的镜像：

```bash
docker compose -f docker-compose.prod.yml up -d
# 镜像示例：hugogu/next-wiki-web:latest
```

配合 Caddy overlay 即可获得 TLS —— 见 [Caddy + Cloudflare](/docs/caddy)。

## 镜像加速

如果你的网络访问 Docker Hub 或 npm 较慢/受限，`.env.example` 内置了镜像开关：

```dotenv
NODE_IMAGE=docker.m.daocloud.io/library/node:24-alpine
POSTGRES_IMAGE=docker.m.daocloud.io/library/postgres:16-alpine
NPM_REGISTRY=https://registry.npmmirror.com
```

完整列表见[环境变量](/docs/environment)。
