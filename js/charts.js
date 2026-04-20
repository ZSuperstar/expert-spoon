/**
 * 分拣机器人智能评价系统 - 图表配置
 */

Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

const charts = {};

// 1. 各组综合得分对比
function createGroupBarChart() {
    const ctx = document.getElementById('groupBarChart').getContext('2d');
    const { evaluationData, colors, getGrade } = window.EVALUATION_DATA;

    charts.groupBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: evaluationData.map(g => g.groupId + '组'),
            datasets: [{
                label: '综合得分',
                data: evaluationData.map(g => g.total),
                backgroundColor: colors.groups.map(g => g.bg),
                borderColor: colors.groups.map(g => g.border),
                borderWidth: 2,
                borderRadius: 10,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    titleColor: '#fff',
                    bodyColor: 'rgba(255, 255, 255, 0.9)',
                    padding: 12,
                    cornerRadius: 10,
                    callbacks: {
                        label: (ctx) => `得分：${ctx.parsed.y}分`
                    }
                }
            },
            scales: {
                y: {
                    min: 50,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.5)' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                }
            }
        }
    });
}

// 2. 成绩趋势图
function createTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    const { evaluationData, weekLabels, colors } = window.EVALUATION_DATA;

    charts.trend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weekLabels,
            datasets: evaluationData.map((g, i) => ({
                label: g.groupId + '组',
                data: g.weeklyScores,
                borderColor: colors.groups[i].border,
                backgroundColor: colors.groups[i].bg,
                borderWidth: 2,
                tension: 0.4,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 6
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        usePointStyle: true
                    }
                }
            },
            scales: {
                y: {
                    min: 50,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.5)' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                }
            }
        }
    });
}

// 3. 能力维度雷达图
function createRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    const { capabilityData, colors } = window.EVALUATION_DATA;

    charts.radar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: capabilityData.labels,
            datasets: [
                {
                    label: '第 1 组',
                    data: capabilityData.data[1],
                    borderColor: colors.groups[0].border,
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderWidth: 2,
                    pointRadius: 3
                },
                {
                    label: '第 5 组',
                    data: capabilityData.data[5],
                    borderColor: colors.groups[4].border,
                    backgroundColor: 'rgba(240, 147, 251, 0.2)',
                    borderWidth: 2,
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        usePointStyle: true
                    }
                }
            },
            scales: {
                r: {
                    min: 50,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: { color: 'rgba(255, 255, 255, 0.7)' },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        backdropColor: 'transparent'
                    }
                }
            }
        }
    });
}

// 4. 过程评价明细
function createProcessChart() {
    const ctx = document.getElementById('processChart').getContext('2d');
    const { evaluationData } = window.EVALUATION_DATA;

    charts.process = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: evaluationData.map(g => g.groupId + '组'),
            datasets: [
                {
                    label: '课前 (10%)',
                    data: evaluationData.map(g => g.pre),
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: '#667EEA',
                    borderWidth: 2,
                    borderRadius: 6
                },
                {
                    label: '课中 (40%)',
                    data: evaluationData.map(g => g.during),
                    backgroundColor: 'rgba(67, 233, 123, 0.8)',
                    borderColor: '#43e97b',
                    borderWidth: 2,
                    borderRadius: 6
                },
                {
                    label: '课后 (10%)',
                    data: evaluationData.map(g => g.post),
                    backgroundColor: 'rgba(250, 112, 154, 0.8)',
                    borderColor: '#fa709a',
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        usePointStyle: true
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    max: 60,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.5)' }
                },
                y: {
                    stacked: true,
                    grid: { display: false },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                }
            }
        }
    });
}

// 5. 技能点掌握
function createSkillChart() {
    const ctx = document.getElementById('skillChart').getContext('2d');
    const { skillData } = window.EVALUATION_DATA;

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(102, 126, 234, 0.9)');
    gradient.addColorStop(1, 'rgba(67, 233, 123, 0.7)');

    charts.skill = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: skillData.labels,
            datasets: [{
                label: '平均掌握度',
                data: skillData.average,
                backgroundColor: gradient,
                borderColor: '#667EEA',
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    min: 50,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.5)' }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
}

// 初始化所有图表
function initCharts() {
    createGroupBarChart();
    createTrendChart();
    createRadarChart();
    createProcessChart();
    createSkillChart();
}

// 导出
window.ChartManager = {
    init: initCharts
};
