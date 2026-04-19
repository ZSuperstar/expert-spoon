/**
 * 分拣机器人智能评价系统 - Express 服务器
 * 提供静态文件服务和 API 接口
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.json());
app.use(express.static(__dirname));

// API 路由 - 获取评价数据
app.get('/api/data', (req, res) => {
    res.json({
        success: true,
        message: '数据加载成功',
        timestamp: new Date().toISOString()
    });
});

// API 路由 - 获取小组数据
app.get('/api/groups', (req, res) => {
    const groups = [
        { id: 1, name: '组 1', members: ['董惠泽', '孙朝政', '刘硕', '刘星宇', '轩辕昊宇'] },
        { id: 2, name: '组 2', members: ['张宇', '吴政洋', '张浩宇', '周鹏帅', '杨欣锐'] },
        { id: 3, name: '组 3', members: ['李泽', '周光源', '于恩泽', '谯誉州', '尤荣泽'] },
        { id: 4, name: '组 4', members: ['杨家琦', '娄建雨', '许晨昊', '王兴凤', '牟欣炜'] },
        { id: 5, name: '组 5', members: ['王祖昊', '侯树桐', '孙凯睿', '问泽坤', '李锦程'] },
        { id: 6, name: '组 6', members: ['顾兴洋', '刘光月', '张晓娇', '李鸿涛', '牛立昊'] }
    ];
    res.json({ success: true, data: groups });
});

// API 路由 - 获取评价成绩
app.get('/api/scores', (req, res) => {
    const scores = [
        {
            groupId: 1,
            pre: 8.5,
            during: 35,
            post: 8.5,
            knowledge: 9,
            skill: 8.5,
            quality: 9,
            certificate: 8.5,
            total: 87,
            weeklyScores: [78, 80, 83, 85, 86, 87]
        },
        {
            groupId: 2,
            pre: 9,
            during: 37,
            post: 9,
            knowledge: 9.5,
            skill: 9,
            quality: 9.5,
            certificate: 9,
            total: 92,
            weeklyScores: [85, 87, 88, 90, 91, 92]
        },
        {
            groupId: 3,
            pre: 7.5,
            during: 30,
            post: 7.5,
            knowledge: 8,
            skill: 7.5,
            quality: 8,
            certificate: 7.5,
            total: 76,
            weeklyScores: [68, 70, 72, 74, 75, 76]
        },
        {
            groupId: 4,
            pre: 8,
            during: 33,
            post: 8,
            knowledge: 8.5,
            skill: 8,
            quality: 8.5,
            certificate: 8,
            total: 82,
            weeklyScores: [75, 77, 79, 80, 81, 82]
        },
        {
            groupId: 5,
            pre: 9.5,
            during: 38,
            post: 9.5,
            knowledge: 10,
            skill: 9.5,
            quality: 10,
            certificate: 9.5,
            total: 96,
            weeklyScores: [88, 90, 92, 93, 95, 96]
        },
        {
            groupId: 6,
            pre: 7,
            during: 28,
            post: 7,
            knowledge: 7.5,
            skill: 7,
            quality: 7.5,
            certificate: 7,
            total: 71,
            weeklyScores: [62, 65, 67, 68, 70, 71]
        }
    ];
    res.json({ success: true, data: scores });
});

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// 404 处理
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: '接口不存在'
    });
});

// 错误处理
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: '服务器内部错误'
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🤖 分拣机器人智能评价系统                                ║
║                                                           ║
║   服务器已启动：http://localhost:${PORT}                    ║
║   API 地址：http://localhost:${PORT}/api                    ║
║   健康检查：http://localhost:${PORT}/api/health             ║
║                                                           ║
║   按 Ctrl+C 停止服务                                       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
});

export default app;
