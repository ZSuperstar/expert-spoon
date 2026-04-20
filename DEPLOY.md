# 🌐 外网访问 - 永久部署方案

## ✅ 方案一：Vercel 部署（强烈推荐）

### 优势
- ✅ 永久免费
- ✅ 自动 HTTPS
- ✅ 支持自定义域名
- ✅ 全球 CDN 加速
- ✅ 微信/QQ 可直接访问
- ✅ 自动 Git 部署

### 部署步骤

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择 "Import Git Repository"
   - 选择 `expert-spoon` 仓库

3. **部署**
   - 点击 "Deploy"
   - 等待部署完成（约 30 秒）

4. **获得永久链接**
   - 格式：`https://expert-spoon-xxx.vercel.app`
   - 永久有效，可自定义域名

### 运行 npm 命令
```bash
npm run deploy
```

---

## ✅ 方案二：Cloudflare Tunnel（需要域名）

### 优势
- ✅ 免费
- ✅ 可自定义域名
- ✅ 稳定可靠

### 部署步骤

1. **注册 Cloudflare**
   - 访问 https://cloudflare.com
   - 注册账号并添加域名

2. **创建 Tunnel**
   ```bash
   npx cloudflared tunnel login
   npx cloudflared tunnel create my-tunnel
   npx cloudflared tunnel route dns my-tunnel your-domain.com
   ```

3. **启动服务**
   ```bash
   npx cloudflared tunnel run my-tunnel
   ```

---

## ✅ 方案三：本地穿透（临时使用）

| 工具 | 有效期 | 稳定性 | 适用场景 |
|------|--------|--------|----------|
| Cloudflare Quick Tunnel | 2-3 小时 | ⭐⭐⭐⭐ | 临时演示 |
| Localtunnel | 不固定 | ⭐⭐⭐ | 临时测试 |
| Ngrok | 随机/固定 | ⭐⭐⭐⭐ | 开发测试 |

### 启动命令

```bash
# Cloudflare（2-3 小时）
npx cloudflared tunnel --url http://localhost:3000

# Localtunnel（随机）
npx localtunnel --port 3000

# Ngrok（需要账号）
ngrok http 3000
```

---

## 📱 微信/QQ 访问说明

1. 发送 HTTPS 链接到微信/QQ
2. 首次访问可能有安全提示，点击"继续访问"
3. 页面正常显示后即可使用

---

## 🚀 推荐方案

**永久使用 → Vercel 部署**

运行 `deploy-vercel.bat` 即可开始部署！
