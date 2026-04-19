# 分拣机器人智能评价系统 - 部署说明

## 项目结构

```
deploy/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── data.js         # 数据配置
│   ├── charts.js       # 图表配置
│   └── main.js         # 主程序
└── README.md           # 部署说明
```

## 快速部署

### 方式一：Nginx 部署（推荐）

1. 将 `deploy` 目录复制到服务器
2. 配置 Nginx：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/deploy;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # 缓存静态资源
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
}
```

3. 重启 Nginx：`sudo systemctl reload nginx`

### 方式二：Node.js 简易服务器

```bash
# 安装 http-server
npm install -g http-server

# 进入 deploy 目录并启动
cd deploy
http-server -p 8080
```

访问：`http://localhost:8080`

### 方式三：Python 简易服务器

```bash
# Python 3
cd deploy
python -m http.server 8080

# Python 2
cd deploy
python -m SimpleHTTPServer 8080
```

### 方式四：Docker 部署

创建 `Dockerfile`：

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html/
EXPOSE 80
```

构建并运行：

```bash
docker build -t evaluation-system .
docker run -p 8080:80 evaluation-system
```

## 功能说明

### 8 种可视化图表
1. **各组综合得分对比柱状图** - 直观展示各组总分
2. **能力维度分析雷达图** - 六维能力对比
3. **评价构成比例环形图** - 权重分布
4. **过程评价明细条形图** - 课前/课中/课后细分
5. **成绩变化趋势折线图** - 6 周追踪
6. **评价主体权重饼图** - 多元化评价
7. **技能点掌握情况柱状图** - 6 项核心技能
8. **职业素养评价雷达图** - 五维素养

### 交互功能
- 🔄 刷新数据
- 📥 导出报告
- 🖥️ 全屏显示
- 📊 表格排序

### 响应式设计
- 支持桌面端、平板、手机端
- 自适应不同屏幕尺寸

## 数据配置

修改 `js/data.js` 中的数据进行定制：

```javascript
// 修改小组信息
const GROUPS = [
    { id: 1, name: '组 1', members: ['成员 1', '成员 2', ...] },
    // ...
];

// 修改评价数据
const GROUP_EVALUATION_DATA = [
    { groupId: 1, pre: 8.5, during: 35, ... },
    // ...
];
```

## API 集成（可选）

如需对接后端 API，修改 `js/main.js` 中的 `handleRefresh` 函数：

```javascript
async function handleRefresh() {
    try {
        const response = await fetch('/api/evaluation-data');
        const newData = await response.json();
        window.ChartManager.update(newData);
    } catch (error) {
        console.error('获取数据失败:', error);
    }
}
```

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 技术栈

- HTML5
- CSS3 (Flexbox/Grid)
- JavaScript (ES6+)
- Chart.js 4.4.0

## 常见问题

### Q: 图表不显示？
A: 检查是否正确加载 Chart.js CDN，或本地网络问题。

### Q: 样式错乱？
A: 清除浏览器缓存后重新加载。

### Q: 如何修改主题色？
A: 编辑 `css/style.css` 中的 CSS 变量 `:root` 部分。

## 许可证

MIT License

---
技术支持：请联系系统管理员
