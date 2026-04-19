/**
 * 分拣机器人智能评价系统 - 图表配置
 * 使用 Chart.js 创建各种可视化图表
 */

// Chart.js 全局配置
Chart.defaults.color = '#8ab';
Chart.defaults.borderColor = 'rgba(0, 150, 255, 0.2)';
Chart.defaults.font.family = "'Microsoft YaHei', 'PingFang SC', sans-serif";

// 图表实例存储
const charts = {};

/**
 * 1. 各组综合得分对比柱状图
 */
function createGroupBarChart() {
    const ctx = document.getElementById('groupBarChart').getContext('2d');
    const { evaluationData, colors, getGrade } = window.EVALUATION_DATA;

    charts.groupBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: evaluationData.map(g => `组${g.groupId}`),
            datasets: [{
                label: '综合得分',
                data: evaluationData.map(g => g.total),
                backgroundColor: [
                    colors.fill1, colors.fill2, colors.fill3,
                    colors.fill4, colors.fill5, colors.fill6
                ],
                borderColor: [
                    colors.group1, colors.group2, colors.group3,
                    colors.group4, colors.group5, colors.group6
                ],
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
                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                    titleColor: '#00d4ff',
                    bodyColor: '#e0f0ff',
                    borderColor: 'rgba(0, 150, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
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
                    grid: { color: 'rgba(0, 150, 255, 0.1)' },
                    ticks: { callback: value => value + '分' }
                },
                x: {
                    grid: { display: false }
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
    const { capabilityData, colors } = window.EVALUATION_DATA;

    charts.radar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: capabilityData.labels,
            datasets: [
                {
                    label: '组 1',
                    data: capabilityData.data[1],
                    borderColor: colors.group1,
                    backgroundColor: colors.fill1,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: '组 5',
                    data: capabilityData.data[5],
                    borderColor: colors.group5,
                    backgroundColor: colors.fill5,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
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
                        pointStyle: 'circle'
                    }
                }
            },
            scales: {
                r: {
                    min: 50,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 150, 255, 0.2)'
                    },
                    angleLines: {
                        color: 'rgba(0, 150, 255, 0.2)'
                    },
                    ticks: {
                        stepSize: 25,
                        showLabelBackdrop: false
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
                    'rgba(0, 212, 255, 0.8)',
                    'rgba(0, 153, 255, 0.8)',
                    'rgba(0, 255, 136, 0.8)',
                    'rgba(255, 170, 0, 0.8)',
                    'rgba(255, 102, 255, 0.8)',
                    'rgba(255, 102, 102, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ],
                borderWidth: 0,
                hoverOffset: 10
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
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                    titleColor: '#00d4ff',
                    bodyColor: '#e0f0ff',
                    borderColor: 'rgba(0, 150, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value}% (${percentage}%)`;
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
                    backgroundColor: 'rgba(0, 212, 255, 0.8)',
                    borderColor: 'rgba(0, 212, 255, 1)',
                    borderWidth: 1,
                    borderRadius: 5
                },
                {
                    label: '课中 (40%)',
                    data: evaluationData.map(g => g.during),
                    backgroundColor: 'rgba(0, 255, 136, 0.8)',
                    borderColor: 'rgba(0, 255, 136, 1)',
                    borderWidth: 1,
                    borderRadius: 5
                },
                {
                    label: '课后 (10%)',
                    data: evaluationData.map(g => g.post),
                    backgroundColor: 'rgba(255, 170, 0, 0.8)',
                    borderColor: 'rgba(255, 170, 0, 1)',
                    borderWidth: 1,
                    borderRadius: 5
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
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                    titleColor: '#00d4ff',
                    bodyColor: '#e0f0ff',
                    borderColor: 'rgba(0, 150, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                x: {
                    stacked: true,
                    max: 60,
                    grid: { color: 'rgba(0, 150, 255, 0.1)' },
                    ticks: { callback: value => value + '分' }
                },
                y: {
                    stacked: true,
                    grid: { display: false }
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
    const { evaluationData, weekLabels, colors } = window.EVALUATION_DATA;

    charts.trendLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weekLabels,
            datasets: evaluationData.map((group, index) => ({
                label: `组${group.groupId}`,
                data: group.weeklyScores,
                borderColor: [
                    colors.group1, colors.group2, colors.group3,
                    colors.group4, colors.group5, colors.group6
                ][index],
                backgroundColor: [
                    colors.fill1, colors.fill2, colors.fill3,
                    colors.fill4, colors.fill5, colors.fill6
                ][index],
                borderWidth: 3,
                tension: 0.4,
                fill: false,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: [
                    colors.group1, colors.group2, colors.group3,
                    colors.group4, colors.group5, colors.group6
                ][index],
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                    titleColor: '#00d4ff',
                    bodyColor: '#e0f0ff',
                    borderColor: 'rgba(0, 150, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    min: 50,
                    max: 100,
                    grid: { color: 'rgba(0, 150, 255, 0.1)' },
                    ticks: { callback: value => value + '分' }
                },
                x: {
                    grid: { display: false }
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
    const { colors } = window.EVALUATION_DATA;

    const legendItems = [
        { name: '组 1', color: colors.group1 },
        { name: '组 2', color: colors.group2 },
        { name: '组 3', color: colors.group3 },
        { name: '组 4', color: colors.group4 },
        { name: '组 5', color: colors.group5 },
        { name: '组 6', color: colors.group6 }
    ];

    legendContainer.innerHTML = legendItems.map(item => `
        <div class="legend-item">
            <div class="legend-color" style="background: ${item.color}"></div>
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
                    'rgba(0, 212, 255, 0.8)',
                    'rgba(0, 255, 136, 0.8)',
                    'rgba(255, 170, 0, 0.8)',
                    'rgba(255, 102, 255, 0.8)'
                ],
                borderWidth: 0,
                hoverOffset: 15
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
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                    titleColor: '#00d4ff',
                    bodyColor: '#e0f0ff',
                    borderColor: 'rgba(0, 150, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12,
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

    charts.skill = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: skillData.labels,
            datasets: [{
                label: '平均掌握度',
                data: skillData.average,
                backgroundColor: 'rgba(0, 212, 255, 0.6)',
                borderColor: 'rgba(0, 212, 255, 1)',
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                    titleColor: '#00d4ff',
                    bodyColor: '#e0f0ff',
                    borderColor: 'rgba(0, 150, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12,
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
                    grid: { color: 'rgba(0, 150, 255, 0.1)' },
                    ticks: { callback: value => value + '分' }
                },
                x: {
                    grid: { display: false },
                    ticks: {
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
    const { qualityDimensions, colors } = window.EVALUATION_DATA;

    charts.qualityRadar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: qualityDimensions.labels,
            datasets: [
                {
                    label: '班级平均',
                    data: qualityDimensions.classAverage,
                    borderColor: colors.group1,
                    backgroundColor: colors.fill1,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: '优秀标准',
                    data: qualityDimensions.excellent,
                    borderColor: colors.group2,
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
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
                        pointStyle: 'circle'
                    }
                }
            },
            scales: {
                r: {
                    min: 50,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 150, 255, 0.2)'
                    },
                    angleLines: {
                        color: 'rgba(0, 150, 255, 0.2)'
                    },
                    ticks: {
                        stepSize: 25,
                        showLabelBackdrop: false
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
