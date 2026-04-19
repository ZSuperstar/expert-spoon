/**
 * 分拣机器人智能评价系统 - 图表配置 (现代鲜艳配色)
 * 使用 Chart.js 创建各种可视化图表
 */

// Chart.js 全局配置 - 现代主题
Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// 鲜艳渐变配色方案
const MODERN_COLORS = {
    // 主色调
    primary: '#667EEA',
    secondary: '#764BA2',

    // 组别颜色 - 鲜艳渐变
    groups: [
        { bg: 'rgba(102, 126, 234, 0.8)', border: '#667EEA' },     // 组 1 - 紫蓝
        { bg: 'rgba(240, 147, 251, 0.8)', border: '#F093FB' },     // 组 2 - 粉红
        { bg: 'rgba(245, 87, 108, 0.8)', border: '#F5576C' },      // 组 3 - 珊瑚红
        { bg: 'rgba(79, 172, 254, 0.8)', border: '#4facfe' },      // 组 4 - 天蓝
        { bg: 'rgba(67, 233, 123, 0.8)', border: '#43e97b' },      // 组 5 - 薄荷绿
        { bg: 'rgba(250, 112, 154, 0.8)', border: '#fa709a' }      // 组 6 - 樱花粉
    ],

    // 状态颜色
    success: '#00ff88',
    warning: '#ffaa00',
    danger: '#ff6b6b',
    info: '#4facfe'
};

// 图表实例存储
const charts = {};

/**
 * 1. 各组综合得分对比柱状图
 */
function createGroupBarChart() {
    const ctx = document.getElementById('groupBarChart').getContext('2d');
    const { evaluationData, getGrade } = window.EVALUATION_DATA;

    // 创建渐变
    const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient1.addColorStop(0, 'rgba(102, 126, 234, 0.9)');
    gradient1.addColorStop(1, 'rgba(118, 75, 162, 0.7)');

    charts.groupBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: evaluationData.map(g => `组${g.groupId}`),
            datasets: [{
                label: '综合得分',
                data: evaluationData.map(g => g.total),
                backgroundColor: MODERN_COLORS.groups.map(g => g.bg),
                borderColor: MODERN_COLORS.groups.map(g => g.border),
                borderWidth: 3,
                borderRadius: 12,
                barPercentage: 0.7,
                categoryPercentage: 0.8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    backdropFilter: 'blur(10px)',
                    titleColor: '#fff',
                    bodyColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 14,
                    displayColors: true,
                    cornerRadius: 12,
                    callbacks: {
                        label: function(context) {
                            const grade = getGrade(context.parsed.y);
                            return `得分：${context.parsed.y} - ${grade.text}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        callback: value => value + '分'
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

/**
 * 2. 能力维度分析雷达图
 */
function createRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    const { capabilityData } = window.EVALUATION_DATA;

    charts.radar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: capabilityData.labels,
            datasets: [
                {
                    label: '组 1',
                    data: capabilityData.data[1],
                    borderColor: MODERN_COLORS.groups[0].border,
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    pointBackgroundColor: MODERN_COLORS.groups[0].border,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: '组 5',
                    data: capabilityData.data[5],
                    borderColor: MODERN_COLORS.groups[4].border,
                    backgroundColor: 'rgba(67, 233, 123, 0.2)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    pointBackgroundColor: MODERN_COLORS.groups[4].border,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
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
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        color: 'rgba(255, 255, 255, 0.7)'
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
                        stepSize: 25,
                        color: 'rgba(255, 255, 255, 0.5)',
                        backdropColor: 'transparent'
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

/**
 * 3. 评价构成比例环形图
 */
function createDoughnutChart() {
    const ctx = document.getElementById('doughnutChart').getContext('2d');

    charts.doughnut = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['课前', '课中', '课后', '知识考核', '技能考核', '素养考核', '证书/大赛'],
            datasets: [{
                data: [5, 5, 40, 10, 10, 10, 5, 5],
                backgroundColor: [
                    '#667EEA', '#764BA2', '#F093FB',
                    '#F5576C', '#4facfe', '#00f2fe',
                    '#43e97b'
                ],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 12,
                        font: { size: 10 },
                        usePointStyle: true,
                        pointStyle: 'circle',
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    backdropFilter: 'blur(10px)',
                    titleColor: '#fff',
                    bodyColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 14,
                    cornerRadius: 12,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${percentage}%`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

/**
 * 4. 过程评价明细横向条形图
 */
function createProcessBarChart() {
    const ctx = document.getElementById('processBarChart').getContext('2d');
    const { evaluationData } = window.EVALUATION_DATA;

    charts.processBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: evaluationData.map(g => `组${g.groupId}`),
            datasets: [
                {
                    label: '课前 (10%)',
                    data: evaluationData.map(g => g.pre),
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: '#667EEA',
                    borderWidth: 2,
                    borderRadius: 8,
                    barPercentage: 0.7
                },
                {
                    label: '课中 (40%)',
                    data: evaluationData.map(g => g.during),
                    backgroundColor: 'rgba(67, 233, 123, 0.8)',
                    borderColor: '#43e97b',
                    borderWidth: 2,
                    borderRadius: 8,
                    barPercentage: 0.7
                },
                {
                    label: '课后 (10%)',
                    data: evaluationData.map(g => g.post),
                    backgroundColor: 'rgba(250, 112, 154, 0.8)',
                    borderColor: '#fa709a',
                    borderWidth: 2,
                    borderRadius: 8,
                    barPercentage: 0.7
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
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    backdropFilter: 'blur(10px)',
                    titleColor: '#fff',
                    bodyColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 14,
                    cornerRadius: 12
                }
            },
            scales: {
                x: {
                    stacked: true,
                    max: 60,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        callback: value => value + '分'
                    }
                },
                y: {
                    stacked: true,
                    grid: { display: false },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

/**
 * 5. 成绩趋势折线图
 */
function createTrendLineChart() {
    const ctx = document.getElementById('trendLineChart').getContext('2d');
    const { evaluationData, weekLabels } = window.EVALUATION_DATA;

    charts.trendLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weekLabels,
            datasets: evaluationData.map((group, index) => ({
                label: `组${group.groupId}`,
                data: group.weeklyScores,
                borderColor: MODERN_COLORS.groups[index % 6].border,
                backgroundColor: MODERN_COLORS.groups[index % 6].bg,
                borderWidth: 3,
                tension: 0.4,
                fill: false,
                pointRadius: 6,
                pointHoverRadius: 9,
                pointBackgroundColor: '#fff',
                pointBorderColor: MODERN_COLORS.groups[index % 6].border,
                pointBorderWidth: 3,
                pointHitRadius: 10
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    backdropFilter: 'blur(10px)',
                    titleColor: '#fff',
                    bodyColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 14,
                    cornerRadius: 12,
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    min: 50,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        callback: value => value + '分'
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });

    // 创建图例
    createTrendLegend();
}

// 创建趋势图图例
function createTrendLegend() {
    const legendContainer = document.getElementById('trendLegend');

    const legendItems = [
        { name: '组 1', color: MODERN_COLORS.groups[0].border },
        { name: '组 2', color: MODERN_COLORS.groups[1].border },
        { name: '组 3', color: MODERN_COLORS.groups[2].border },
        { name: '组 4', color: MODERN_COLORS.groups[3].border },
        { name: '组 5', color: MODERN_COLORS.groups[4].border },
        { name: '组 6', color: MODERN_COLORS.groups[5].border }
    ];

    legendContainer.innerHTML = legendItems.map(item => `
        <div class="legend-item">
            <div class="legend-color" style="background: ${item.color}; border-radius: 50%;"></div>
            <span>${item.name}</span>
        </div>
    `).join('');
}

/**
 * 6. 评价主体权重饼图
 */
function createEvaluatorChart() {
    const ctx = document.getElementById('evaluatorChart').getContext('2d');
    const { evaluatorWeights } = window.EVALUATION_DATA;

    charts.evaluator = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: evaluatorWeights.labels,
            datasets: [{
                data: evaluatorWeights.data,
                backgroundColor: [
                    '#667EEA', '#43e97b', '#fa709a', '#F093FB'
                ],
                borderWidth: 0,
                hoverOffset: 20
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 12,
                        font: { size: 10 },
                        usePointStyle: true,
                        pointStyle: 'circle',
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    backdropFilter: 'blur(10px)',
                    titleColor: '#fff',
                    bodyColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 14,
                    cornerRadius: 12,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

/**
 * 7. 技能点掌握情况柱状图
 */
function createSkillChart() {
    const ctx = document.getElementById('skillChart').getContext('2d');
    const { skillData } = window.EVALUATION_DATA;

    // 创建渐变色
    const gradient = ctx.createLinearGradient(0, 0, 0, 350);
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
                    backdropFilter: 'blur(10px)',
                    titleColor: '#fff',
                    bodyColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 14,
                    cornerRadius: 12,
                    callbacks: {
                        label: function(context) {
                            const score = context.parsed.y;
                            let level = '待提高';
                            if (score >= 90) level = '优秀';
                            else if (score >= 80) level = '良好';
                            else if (score >= 70) level = '达标';
                            return `掌握度：${score}分 (${level})`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 50,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        callback: value => value + '分'
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

/**
 * 8. 职业素养评价雷达图
 */
function createQualityRadarChart() {
    const ctx = document.getElementById('qualityRadarChart').getContext('2d');
    const { qualityDimensions } = window.EVALUATION_DATA;

    charts.qualityRadar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: qualityDimensions.labels,
            datasets: [
                {
                    label: '班级平均',
                    data: qualityDimensions.classAverage,
                    borderColor: '#667EEA',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#667EEA',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: '优秀标准',
                    data: qualityDimensions.excellent,
                    borderColor: '#43e97b',
                    backgroundColor: 'rgba(67, 233, 123, 0.1)',
                    borderWidth: 2,
                    borderDash: [8, 4],
                    pointRadius: 0,
                    pointHoverRadius: 0
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
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        color: 'rgba(255, 255, 255, 0.7)'
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
                        stepSize: 25,
                        color: 'rgba(255, 255, 255, 0.5)',
                        backdropColor: 'transparent'
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

/**
 * 初始化所有图表
 */
function initCharts() {
    createGroupBarChart();
    createRadarChart();
    createDoughnutChart();
    createProcessBarChart();
    createTrendLineChart();
    createEvaluatorChart();
    createSkillChart();
    createQualityRadarChart();
}

/**
 * 更新图表数据
 */
function updateCharts(newData) {
    // 更新柱状图
    if (charts.groupBar) {
        charts.groupBar.data.datasets[0].data = newData.map(g => g.total);
        charts.groupBar.update('active');
    }

    // 更新趋势图
    if (charts.trendLine) {
        charts.trendLine.data.datasets.forEach((dataset, index) => {
            dataset.data = newData[index].weeklyScores;
        });
        charts.trendLine.update('active');
    }

    // 更新过程评价图
    if (charts.processBar) {
        charts.processBar.data.datasets[0].data = newData.map(g => g.pre);
        charts.processBar.data.datasets[1].data = newData.map(g => g.during);
        charts.processBar.data.datasets[2].data = newData.map(g => g.post);
        charts.processBar.update('active');
    }
}

/**
 * 销毁所有图表
 */
function destroyCharts() {
    Object.values(charts).forEach(chart => chart.destroy());
}

// 导出
window.ChartManager = {
    init: initCharts,
    update: updateCharts,
    destroy: destroyCharts
};
