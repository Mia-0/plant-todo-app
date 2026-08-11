export interface Book {
  title: string;
  author: string;
  category: string;
  reason: string;
}

export const RECOMMENDED_BOOKS: Book[] = [
  { title: '三体', author: '刘慈欣', category: '科幻', reason: '中国科幻巅峰之作，雨果奖获奖作品' },
  { title: '活着', author: '余华', category: '文学', reason: '人生必读经典，感受生命的力量' },
  { title: '小王子', author: '圣埃克苏佩里', category: '文学', reason: '写给成年人的童话，短小精悍' },
  { title: '原子习惯', author: '詹姆斯·克利尔', category: '自我提升', reason: '用小习惯改变人生，实操性强' },
  { title: '非暴力沟通', author: '马歇尔·卢森堡', category: '沟通', reason: '改善人际关系，学会好好说话' },
  { title: '被讨厌的勇气', author: '岸见一郎', category: '心理学', reason: '阿德勒心理学通俗解读，获得心灵自由' },
  { title: '人类简史', author: '尤瓦尔·赫拉利', category: '历史', reason: '从全新视角看人类文明发展' },
  { title: '刻意练习', author: '安德斯·艾利克森', category: '自我提升', reason: '科学方法成为任何领域的专家' },
  { title: '万历十五年', author: '黄仁宇', category: '历史', reason: '以独特视角解读明朝兴衰' },
  { title: '追风筝的人', author: '卡勒德·胡赛尼', category: '文学', reason: '关于友谊与救赎的感人故事' },
  { title: '原则', author: '瑞·达利欧', category: '商业', reason: '桥水基金创始人的生活与工作原则' },
  { title: '苏菲的世界', author: '乔斯坦·贾德', category: '哲学', reason: '小说形式了解西方哲学史，通俗有趣' },
  { title: '思考，快与慢', author: '丹尼尔·卡尼曼', category: '心理学', reason: '诺贝尔奖得主揭示大脑思考机制' },
  { title: '百年孤独', author: '加西亚·马尔克斯', category: '文学', reason: '魔幻现实主义代表作，文学瑰宝' },
  { title: '断舍离', author: '山下英子', category: '生活', reason: '通过整理物品整理人生' },
  { title: '自控力', author: '凯利·麦格尼格尔', category: '心理学', reason: '科学提升意志力，掌控自己的生活' },
  { title: '如何阅读一本书', author: '莫提默·艾德勒', category: '自我提升', reason: '学会高效阅读，受益终生' },
  { title: '贫穷的本质', author: '阿比吉特·班纳吉', category: '社会学', reason: '诺贝尔经济学奖得主揭示贫困真相' },
  { title: '影响力', author: '罗伯特·西奥迪尼', category: '心理学', reason: '了解说服心理学的经典著作' },
  { title: '局外人', author: '阿尔贝·加缪', category: '文学', reason: '存在主义文学经典，短小震撼' },
];
