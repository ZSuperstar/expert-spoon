/**
 * 分拣机器人智能评价系统 - 数据配置
 * 包含学生分组、评价数据、评价标准等
 */

const EVALUATION_CONFIG = {
    // 评价权重配置
    weights: {
        preClass: 0.10,      // 课前 10%
        duringClass: 0.40,   // 课中 40%
        postClass: 0.10,     // 课后 10%
        knowledge: 0.10,     // 知识考核 10%
        skill: 0.10,         // 技能考核 10%
        quality: 0.10,       // 素养考核 10%
        certificate: 0.10    // 证书/大赛 10%
    },

    // 评分标准
    standards: {
        excellent: 90,       // 优秀标准
        pass: 70,            // 达标标准
        preExcellent: 9,     // 课前优秀
        prePass: 7,          // 课前达标
        duringExcellent: 36, // 课中优秀
        duringPass: 28,      // 课中达标
        postExcellent: 9,    // 课后优秀
        postPass: 7          // 课后达标
    }
};

// 小组数据
const GROUPS = [
    { id: 1, name: '组 1', members: ['董惠泽', '孙朝政', '刘硕', '刘星宇', '轩辕昊宇'] },
    { id: 2, name: '组 2', members: ['张宇', '吴政洋', '张浩宇', '周鹏帅', '杨欣锐'] },
    { id: 3, name: '组 3', members: ['李泽', '周光源', '于恩泽', '谯誉州', '尤荣泽'] },
    { id: 4, name: '组 4', members: ['杨家琦', '娄建雨', '许晨昊', '王兴凤', '牟欣炜'] },
    { id: 5, name: '组 5', members: ['王祖昊', '侯树桐', '孙凯睿', '问泽坤', '李锦程'] },
    { id: 6, name: '组 6', members: ['顾兴洋', '刘光月', '张晓娇', '李鸿涛', '牛立昊'] }
];

// 评价数据（模拟数据，实际部署时可通过 API 获取）
const GROUP_EVALUATION_DATA = [
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

// 能力维度数据（用于雷达图）
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

// 技能点数据
const SKILL_DATA = {
    labels: ['分拣机分类', '工艺规划', '装夹爪操作', '程序编写', '入库流程', '出库流程'],
    average: [82, 85, 80, 83, 81, 79]
};

// 评价主体权重
const EVALUATOR_WEIGHTS = {
    labels: ['教师评价', '企业导师', '学生自评', '学生互评'],
    data: [40, 30, 15, 15]
};

// 职业素养维度
const QUALITY_DIMENSIONS = {
    labels: ['爱岗敬业', '忠实奉献', '严谨科学', '精益求精', '团队合作'],
    classAverage: [85, 82, 88, 84, 86],
    excellent: [95, 95, 95, 95, 95]
};

// 周次标签
const WEEK_LABELS = ['第 1 周', '第 2 周', '第 3 周', '第 4 周', '第 5 周', '第 6 周'];

// 颜色配置
const CHART_COLORS = {
    group1: 'rgba(0, 212, 255, 1)',
    group2: 'rgba(0, 255, 136, 1)',
    group3: 'rgba(255, 170, 0, 1)',
    group4: 'rgba(255, 102, 255, 1)',
    group5: 'rgba(0, 153, 255, 1)',
    group6: 'rgba(255, 102, 102, 1)',
    fill1: 'rgba(0, 212, 255, 0.2)',
    fill2: 'rgba(0, 255, 136, 0.2)',
    fill3: 'rgba(255, 170, 0, 0.2)',
    fill4: 'rgba(255, 102, 255, 0.2)',
    fill5: 'rgba(0, 153, 255, 0.2)',
    fill6: 'rgba(255, 102, 102, 0.2)'
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
    const total = GROUP_EVALUATION_DATA.length * 5; // 每组 5 人
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
    evaluatorWeights: EVALUATOR_WEIGHTS,
    qualityDimensions: QUALITY_DIMENSIONS,
    weekLabels: WEEK_LABELS,
    colors: CHART_COLORS,
    getGrade: getGrade,
    calculateStats: calculateStats
};
