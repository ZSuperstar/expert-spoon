/**
 * 分拣机器人智能评价系统 - 主程序
 * 处理页面交互、数据渲染、事件绑定等
 */

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 延迟显示以确保数据加载
    setTimeout(() => {
        initApp();
    }, 500);
});

/**
 * 初始化应用
 */
function initApp() {
    // 隐藏加载动画
    hideLoading();

    // 渲染统计数据
    renderStats();

    // 渲染图表
    if (window.ChartManager) {
        window.ChartManager.init();
    }

    // 渲染表格
    renderScoreTable();

    // 渲染成员列表
    renderMemberGrid();

    // 绑定事件
    bindEvents();

    // 显示提示
    showToast('数据加载完成');
}

/**
 * 隐藏加载动画
 */
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
}

/**
 * 渲染统计数据
 */
function renderStats() {
    const { calculateStats } = window.EVALUATION_DATA;
    const stats = calculateStats();

    animateValue('totalStudents', 0, stats.totalStudents, 1000);
    animateValue('avgScore', 0, parseFloat(stats.avgScore), 1500);
    animateValue('excellentRate', 0, stats.excellentRate, 1000, '%');
    animateValue('passRate', 0, stats.passRate, 1000, '%');

    // 设置平均水平标签
    const avgLevel = document.getElementById('avgLevel');
    if (avgLevel) {
        const avg = parseFloat(stats.avgScore);
        if (avg >= 90) avgLevel.textContent = '优秀水平';
        else if (avg >= 80) avgLevel.textContent = '良好水平';
        else if (avg >= 70) avgLevel.textContent = '达标水平';
        else avgLevel.textContent = '待提高';
    }
}

/**
 * 数字动画
 */
function animateValue(elementId, start, end, duration, suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;

    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (range * easeOutQuart);

        if (Number.isInteger(end)) {
            element.textContent = Math.floor(current) + suffix;
        } else {
            element.textContent = current.toFixed(1) + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * 渲染成绩表格
 */
function renderScoreTable() {
    const { evaluationData, groups, getGrade } = window.EVALUATION_DATA;
    const tbody = document.getElementById('scoreTableBody');

    if (!tbody) return;

    tbody.innerHTML = evaluationData.map((data, index) => {
        const group = groups.find(g => g.id === data.groupId);
        const grade = getGrade(data.total);
        const members = group ? group.members.join('、') : '';

        return `
            <tr data-group-id="${data.groupId}">
                <td><strong>${group ? group.name : '组' + data.groupId}</strong></td>
                <td class="members-cell" title="${members}">${members}</td>
                <td class="score-${grade.grade}">${data.pre}</td>
                <td class="score-${grade.grade}">${data.during}</td>
                <td class="score-${grade.grade}">${data.post}</td>
                <td class="score-${grade.grade}">${data.knowledge}</td>
                <td class="score-${grade.grade}">${data.skill}</td>
                <td class="score-${grade.grade}">${data.quality}</td>
                <td class="score-${grade.grade}">${data.certificate}</td>
                <td><strong class="score-${grade.grade}">${data.total}</strong></td>
                <td>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${data.total}%"></div>
                    </div>
                    <span class="score-${grade.grade}">${grade.text}</span>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * 渲染成员网格
 */
function renderMemberGrid() {
    const { groups } = window.EVALUATION_DATA;
    const grid = document.getElementById('memberGrid');

    if (!grid) return;

    grid.innerHTML = groups.map(group => `
        <div class="member-card">
            <h4>🔹 ${group.name}</h4>
            <div class="member-list">${group.members.join('、')}</div>
        </div>
    `).join('');
}

/**
 * 绑定事件
 */
function bindEvents() {
    // 刷新按钮
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', handleRefresh);
    }

    // 导出按钮
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExport);
    }

    // 全屏按钮
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', handleFullscreen);
    }

    // 表格排序
    window.sortTable = handleSortTable;
}

/**
 * 刷新数据
 */
function handleRefresh() {
    showToast('正在刷新数据...');

    // 模拟数据刷新
    setTimeout(() => {
        if (window.ChartManager) {
            // 添加随机波动模拟数据更新
            const { evaluationData } = window.EVALUATION_DATA;
            const newData = evaluationData.map(group => ({
                ...group,
                total: Math.min(100, Math.max(50, group.total + (Math.random() - 0.5) * 2))
            }));

            window.ChartManager.update(newData);
            renderStats();
        }

        showToast('数据已更新');
    }, 800);
}

/**
 * 导出报告
 */
function handleExport() {
    showToast('正在生成报告...');

    // 创建导出内容
    const { evaluationData, groups, calculateStats } = window.EVALUATION_DATA;
    const stats = calculateStats();

    const reportContent = `
分拣机器人智能评价系统 - 评价报告
生成时间：${new Date().toLocaleString('zh-CN')}

===== 统计概览 =====
班级总人数：${stats.totalStudents}人
小组数量：${stats.groupCount}组
班级平均分：${stats.avgScore}分
优秀率：${stats.excellentRate}%
达标率：${stats.passRate}%

===== 各组成绩 =====
${evaluationData.map(g => `
组${g.groupId}: ${g.total}分 (${g.total >= 90 ? '优秀' : g.total >= 80 ? '良好' : g.total >= 70 ? '达标' : '待提高'})
  - 课前：${g.pre}分
  - 课中：${g.during}分
  - 课后：${g.post}分
  - 知识考核：${g.knowledge}分
  - 技能考核：${g.skill}分
  - 素养考核：${g.quality}分
  - 证书/大赛：${g.certificate}分
`).join('')}

===== 小组成员 =====
${groups.map(g => `${g.name}: ${g.members.join('、')}`).join('\n')}
`;

    // 下载文件
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `评价报告_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('报告已导出');
}

/**
 * 全屏显示
 */
function handleFullscreen() {
    const container = document.querySelector('.container');

    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            console.log('全屏失败:', err);
            showToast('无法进入全屏模式');
        });
    } else {
        document.exitFullscreen();
    }
}

/**
 * 表格排序
 */
function handleSortTable(type) {
    const { evaluationData, getGrade } = window.EVALUATION_DATA;
    const tbody = document.getElementById('scoreTableBody');

    if (!tbody) return;

    let sortedData = [...evaluationData];

    if (type === 'score') {
        // 按总分排序
        sortedData.sort((a, b) => b.total - a.total);
    } else if (type === 'group') {
        // 按组别排序
        sortedData.sort((a, b) => a.groupId - b.groupId);
    }

    // 重新渲染表格
    sortedData.forEach((data, index) => {
        const row = tbody.children[index];
        if (row) {
            const group = window.EVALUATION_DATA.groups.find(g => g.id === data.groupId);
            const grade = getGrade(data.total);

            row.querySelector('td:nth-child(3)').textContent = data.pre;
            row.querySelector('td:nth-child(4)').textContent = data.during;
            row.querySelector('td:nth-child(5)').textContent = data.post;
            row.querySelector('td:nth-child(6)').textContent = data.knowledge;
            row.querySelector('td:nth-child(7)').textContent = data.skill;
            row.querySelector('td:nth-child(8)').textContent = data.quality;
            row.querySelector('td:nth-child(9)').textContent = data.certificate;
            row.querySelector('td:nth-child(10) strong').textContent = data.total;

            // 更新颜色类
            const cells = row.querySelectorAll('.score-' + grade.grade);
            cells.forEach(cell => {
                cell.className = `score-${grade.grade}`;
            });

            // 更新进度条
            const progressFill = row.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = data.total + '%';
            }

            // 更新等级文本
            const gradeText = row.querySelector('td:last-child span');
            if (gradeText) {
                gradeText.textContent = grade.text;
                gradeText.className = `score-${grade.grade}`;
            }
        }
    });

    showToast(type === 'score' ? '已按分数排序' : '已按组别排序');
}

/**
 * 显示提示消息
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// 监听全屏变化
document.addEventListener('fullscreenchange', () => {
    const btn = document.getElementById('fullscreenBtn');
    if (btn) {
        btn.innerHTML = document.fullscreenElement
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                 <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"/>
               </svg>`
            : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                 <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
               </svg>`;
    }
});

// 页面可见性变化时暂停/恢复动画
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时可以考虑暂停动画
    } else {
        // 页面显示时恢复
    }
});
