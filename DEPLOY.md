# Vercel 部署指南

## 一键部署步骤

### 1. 推送到 GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. 在 Vercel 导入项目
1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Add New Project"
3. 选择 "Import Git Repository"
4. 选择这个项目
5. 点击 "Deploy"

### 3. 配置 GitHub Actions（可选）
如需自动部署，需在 Vercel 获取 Token：
1. 访问 [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. 创建一个新的 Token
3. 在 GitHub 仓库的 Settings → Secrets and variables → Actions 中添加 `VERCEL_TOKEN`

## 为什么之前显示 404？
- 静态文件在 `deploy/` 子目录，Vercel 默认从根目录提供文件
- 已将文件移动到根目录，现在可以直接访问

## 本地开发
```bash
npm install
npm run dev
# 访问 http://localhost:8080
```
