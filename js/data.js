/**
 * 分拣机器人智能评价系统 - 数据配置
 */

// 评价权重
const EVALUATION_CONFIG = {
    weights: {
        preClass: 0.10,
        duringClass: 0.40,
        postClass: 0.10,
        knowledge: 0.10,
        skill: 0.10,
        quality: 0.10,
        certificate: 0.10
    }
};

// 小组数据
const GROUPS = [
    { id: 1, name: '第一组', members: ['董惠泽', '孙朝政', '刘硕', '刘星宇', '轩辕昊宇'] },
    { id: 2, name: '第二组', members: ['张宇', '吴政洋', '张浩宇', '周鹏帅', '杨欣锐'] },
    { id: 3, name: '第三组', members: ['李泽', '周光源', '于恩泽', '谯誉州', '尤荣泽'] },
    { id: 4, name: '第四组', members: ['杨家琦', '娄建雨', '许晨昊', '王兴凤', '牟欣炜'] },
    { id: 5, name: '第五组', members: ['王祖昊', '侯树桐', '孙凯睿', '问泽坤', '李锦程'] },
    { id: 6, name: '第六组', members: ['顾兴洋', '刘光月', '张晓娇', '李鸿涛', '牛立昊'] }
];

// 评价数据
const GROUP_EVALUATION_DATA = [
    { groupId: 1, pre: 8.5, during: 35, post: 8.5, knowledge: 9, skill: 8.5, quality: 9, certificate: 8.5, total: 87, weeklyScores: [78, 80, 83, 85, 86, 87] },
    { groupId: 2, pre: 9.0, during: 37, post: 9.0, knowledge: 9.5, skill: 9, quality: 9.5, certificate: 9, total: 92, weeklyScores: [85, 87, 88, 90, 91, 92] },
    { groupId: 3, pre: 7.5, during: 30, post: 7.5, knowledge: 8, skill: 7.5, quality: 8, certificate: 7.5, total: 76, weeklyScores: [68, 70, 72, 74, 75, 76] },
    { groupId: 4, pre: 8.0, during: 33, post: 8.0, knowledge: 8.5, skill: 8, quality: 8.5, certificate: 8, total: 82, weeklyScores: [75, 77, 79, 80, 81, 82] },
    { groupId: 5, pre: 9.5, during: 38, post: 9.5, knowledge: 10, skill: 9.5, quality: 10, certificate: 9.5, total: 96, weeklyScores: [88, 90, 92, 93, 95, 96] },
    { groupId: 6, pre: 7.0, during: 28, post: 7.0, knowledge: 7.5, skill: 7, quality: 7.5, certificate: 7, total: 71, weeklyScores: [62, 65, 67, 68, 70, 71] }
];

// 能力维度
const CAPABILITY_DATA = {
    labels: ['理论知识', '工艺规划', '程序编写', '装夹操作', '团队协作', '职业素养'],
    data: {
        1: [85, 88, 82, 85, 90, 88],
        2: [90, 92, 88, 90, 88, 92],
        3: [75, 78, 72, 75, 80, 78],
        4: [80, 82, 78, 80, 85, 82],
        5: [95, 96, 92, 94, 98, 96],
        6: [70, 72, 68, 70, 75, 72]
    }
};

// 技能点
const SKILL_DATA = {
    labels: ['分拣分类', '工艺规划', '装夹操作', '程序编写', '入库流程', '出库流程'],
    average: [82, 85, 80, 83, 81, 79]
};

// 周次
const WEEK_LABELS = ['第 1 周', '第 2 周', '第 3 周', '第 4 周', '第 5 周', '第 6 周'];

// 颜色
const COLORS = {
    groups: [
        { bg: 'rgba(102, 126, 234, 0.8)', border: '#667EEA' },
        { bg: 'rgba(67, 233, 123, 0.8)', border: '#43e97b' },
        { bg: 'rgba(250, 112, 154, 0.8)', border: '#fa709a' },
        { bg: 'rgba(79, 172, 254, 0.8)', border: '#4facfe' },
        { bg: 'rgba(240, 147, 251, 0.8)', border: '#F093FB' },
        { bg: 'rgba(245, 87, 108, 0.8)', border: '#F5576C' }
    ]
};

// 等级判定
function getGrade(score) {
    if (score >= 90) return { grade: 'excellent', text: '优秀' };
    if (score >= 80) return { grade: 'good', text: '良好' };
    if (score >= 70) return { grade: 'average', text: '达标' };
    return { grade: 'poor', text: '待提高' };
}

// 计算统计数据
function calculateStats() {
    const total = GROUPS.length * 5;
    const avgScore = GROUP_EVALUATION_DATA.reduce((sum, g) => sum + g.total, 0) / GROUP_EVALUATION_DATA.length;
    const excellentCount = GROUP_EVALUATION_DATA.filter(g => g.total >= 90).length;
    const passCount = GROUP_EVALUATION_DATA.filter(g => g.total >= 70).length;

    return {
        totalStudents: total,
        groupCount: GROUPS.length,
        avgScore: avgScore.toFixed(1),
        excellentRate: Math.round(excellentCount / GROUP_EVALUATION_DATA.length * 100),
        passRate: Math.round(passCount / GROUP_EVALUATION_DATA.length * 100)
    };
}

// 导出数据
window.EVALUATION_DATA = {
    config: EVALUATION_CONFIG,
    groups: GROUPS,
    evaluationData: GROUP_EVALUATION_DATA,
    capabilityData: CAPABILITY_DATA,
    skillData: SKILL_DATA,
    weekLabels: WEEK_LABELS,
    colors: COLORS,
    getGrade: getGrade,
    calculateStats: calculateStats
};
