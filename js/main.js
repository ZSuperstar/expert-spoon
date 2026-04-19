/**
 * 分拣机器人智能评价系统 - 主程序
 * 处理页面交互、数据渲染、事件绑定等
 */

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 模拟加载进度
    let progress = 0;
    const progressBar = document.querySelector('.loading-progress');

    const progressInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            setTimeout(() => {
                initApp();
            }, 300);
        }
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }, 200);
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
    setTimeout(() => {
        showToast('✨ 数据加载完成');
    }, 500);
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

    // 按总分排序
    const sortedData = [...evaluationData].sort((a, b) => b.total - a.total);

    tbody.innerHTML = sortedData.map((data, index) => {
        const group = groups.find(g => g.id === data.groupId);
        const grade = getGrade(data.total);
        const members = group ? group.members.join(',') : '';
        const rankClass = index < 3 ? `rank-${index + 1}` : '';

        return `
            <tr data-group-id="${data.groupId}">
                <td class="rank-cell ${rankClass}">${index + 1}</td>
                <td><strong>${group ? group.name : '组' + data.groupId}</strong></td>
                <td class="members-cell" title="${members}">${members}</td>
                <td>${data.pre.toFixed(1)}</td>
                <td>${data.during}</td>
                <td>${data.post.toFixed(1)}</td>
                <td>${data.knowledge.toFixed(1)}</td>
                <td>${data.skill.toFixed(1)}</td>
                <td>${data.quality.toFixed(1)}</td>
                <td>${data.certificate.toFixed(1)}</td>
                <td><strong style="color: ${getColorForGrade(grade.grade)}">${data.total}</strong></td>
                <td><span class="grade-badge grade-${grade.grade}">${grade.text}</span></td>
            </tr>
        `;
    }).join('');
}

/**
 * 根据等级获取颜色
 */
function getColorForGrade(grade) {
    const colors = {
        excellent: '#43e97b',
        good: '#4facfe',
        average: '#fa709a',
        poor: '#f5576c'
    };
    return colors[grade] || '#fff';
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
            <h4>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                ${group.name}
            </h4>
            <div class="member-list">
                ${group.members.map(member => `<span class="member-tag">${member}</span>`).join('')}
            </div>
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
    showToast('🔄 正在刷新数据...');

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
            renderScoreTable();
        }

        showToast('✨ 数据已更新');
    }, 800);
}

/**
 * 导出报告
 */
function handleExport() {
    showToast('📊 正在生成报告...');

    // 创建导出内容
    const { evaluationData, groups, calculateStats } = window.EVALUATION_DATA;
    const stats = calculateStats();

    const reportContent = `
╔══════════════════════════════════════════════════════════╗
║     分拣机器人智能评价系统 - 评价报告                      ║
╚══════════════════════════════════════════════════════════╝

生成时间：${new Date().toLocaleString('zh-CN')}

═══════════════════════════════════════════════════════════
  统计概览
═══════════════════════════════════════════════════════════

  班级总人数：${stats.totalStudents}人
  小组数量：${stats.groupCount}组
  班级平均分：${stats.avgScore}分
  优秀率：${stats.excellentRate}%
  达标率：${stats.passRate}%

═══════════════════════════════════════════════════════════
  各组成绩
═══════════════════════════════════════════════════════════
${evaluationData.map(g => `
  【组${g.groupId}】${g.total}分 ${getGradeText(g.total)}
  ────────────────────────────────────────────
    课前预习：${g.pre}分
    课中实践：${g.during}分
    课后巩固：${g.post}分
    知识考核：${g.knowledge}分
    技能考核：${g.skill}分
    素养考核：${g.quality}分
    证书/大赛：${g.certificate}分
`).join('')}
═══════════════════════════════════════════════════════════
  小组成员
═══════════════════════════════════════════════════════════
${groups.map(g => `  ${g.name}: ${g.members.join(' · ')}`).join('\n')}

═══════════════════════════════════════════════════════════
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

    showToast('✅ 报告已导出');
}

/**
 * 获取等级文本
 */
function getGradeText(score) {
    if (score >= 90) return '优秀';
    if (score >= 80) return '良好';
    if (score >= 70) return '达标';
    return '待提高';
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
    const tbody = document.getElementById('scoreTableBody');

    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll('tr'));
    const { evaluationData, getGrade } = window.EVALUATION_DATA;

    if (type === 'score') {
        // 按总分排序
        rows.sort((a, b) => {
            const scoreA = parseFloat(a.querySelectorAll('td')[9].textContent);
            const scoreB = parseFloat(b.querySelectorAll('td')[9].textContent);
            return scoreB - scoreA;
        });
    } else if (type === 'group') {
        // 按组别排序
        rows.sort((a, b) => {
            const idA = parseInt(a.dataset.groupId);
            const idB = parseInt(b.dataset.groupId);
            return idA - idB;
        });
    }

    // 重新添加排序后的行
    rows.forEach((row, index) => {
        tbody.appendChild(row);
        // 更新排名
        const rankCell = row.querySelector('.rank-cell');
        if (rankCell) {
            rankCell.textContent = index + 1;
            rankCell.className = 'rank-cell' + (index < 3 ? ` rank-${index + 1}` : '');
        }
    });

    showToast(type === 'score' ? '📊 已按分数排序' : '📋 已按组别排序');
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
    }, 2500);
}

// 监听全屏变化
document.addEventListener('fullscreenchange', () => {
    const btn = document.getElementById('fullscreenBtn');
    if (btn) {
        btn.innerHTML = document.fullscreenElement
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                 <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"/>
               </svg>
               <span>退出全屏</span>`
            : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                 <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
               </svg>
               <span>全屏</span>`;
    }
});
