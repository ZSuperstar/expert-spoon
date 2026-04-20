/**
 * 分拣机器人智能评价系统 - 主程序
 */

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initApp, 500);
});

function initApp() {
    // 隐藏加载
    document.getElementById('loading').classList.add('hidden');

    // 渲染统计
    renderStats();

    // 渲染图表
    if (window.ChartManager) {
        window.ChartManager.init();
    }

    // 渲染表格
    renderScoreTable();

    // 渲染成员
    renderMembers();

    showToast('✨ 数据加载完成');
}

// 渲染统计
function renderStats() {
    const { calculateStats, getGrade } = window.EVALUATION_DATA;
    const stats = calculateStats();

    animateValue('totalStudents', 0, stats.totalStudents, 1000);
    animateValue('avgScore', 0, parseFloat(stats.avgScore), 1500);
    animateValue('excellentRate', 0, stats.excellentRate, 1000, '%');
    animateValue('passRate', 0, stats.passRate, 1000, '%');

    const avg = parseFloat(stats.avgScore);
    const levelEl = document.getElementById('avgLevel');
    if (levelEl) {
        if (avg >= 90) levelEl.textContent = '优秀';
        else if (avg >= 80) levelEl.textContent = '良好';
        else if (avg >= 70) levelEl.textContent = '达标';
        else levelEl.textContent = '待提高';
    }
}

// 数字动画
function animateValue(id, start, end, duration, suffix = '') {
    const el = document.getElementById(id);
    if (!el) return;

    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const current = start + (range * easeOut);

        el.textContent = Number.isInteger(end) ? Math.floor(current) + suffix : current.toFixed(1) + suffix;

        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

// 渲染表格
function renderScoreTable() {
    const { evaluationData, groups, getGrade } = window.EVALUATION_DATA;
    const tbody = document.getElementById('scoreTable');
    if (!tbody) return;

    const sorted = [...evaluationData].sort((a, b) => b.total - a.total);

    tbody.innerHTML = sorted.map((data, index) => {
        const group = groups.find(g => g.id === data.groupId);
        const grade = getGrade(data.total);
        const rankClass = index < 3 ? `rank-${index + 1}` : '';

        return `
            <tr>
                <td class="${rankClass}">${index + 1}</td>
                <td><strong>${group ? group.name : '第' + data.groupId + '组'}</strong></td>
                <td>${data.pre.toFixed(1)}</td>
                <td>${data.during}</td>
                <td>${data.post.toFixed(1)}</td>
                <td>${data.knowledge.toFixed(1)}</td>
                <td>${data.skill.toFixed(1)}</td>
                <td>${data.quality.toFixed(1)}</td>
                <td>${data.certificate.toFixed(1)}</td>
                <td><strong style="color: ${getColor(grade.grade)}">${data.total}</strong></td>
                <td><span class="grade-${grade.grade}">${grade.text}</span></td>
            </tr>
        `;
    }).join('');
}

// 获取颜色
function getColor(grade) {
    const colors = {
        excellent: '#43e97b',
        good: '#4facfe',
        average: '#fa709a',
        poor: '#f5576c'
    };
    return colors[grade] || '#fff';
}

// 渲染成员
function renderMembers() {
    const { groups } = window.EVALUATION_DATA;
    const grid = document.getElementById('membersGrid');
    if (!grid) return;

    grid.innerHTML = groups.map(group => `
        <div class="member-card">
            <h4>🔹 ${group.name}</h4>
            <div class="member-list">
                ${group.members.map(m => `<span class="member-tag">${m}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}
