import type { Exercise } from '../types';

export const EXERCISES: Exercise[] = [
  // 手臂
  { id: 'e1', name: '哑铃弯举', description: '手持哑铃，缓慢弯曲手肘再放下，锻炼肱二头肌', duration: '15分钟', targetPart: '大臂', difficulty: 'easy' },
  { id: 'e2', name: '俯身臂屈伸', description: '俯身单手撑椅，手臂向后伸展，紧致拜拜肉', duration: '10分钟', targetPart: '大臂', difficulty: 'medium' },
  { id: 'e3', name: '弹力带臂屈伸', description: '用弹力带做臂屈伸，有效紧致手臂线条', duration: '12分钟', targetPart: '大臂', difficulty: 'easy' },
  // 腰腹
  { id: 'e4', name: '平板支撑', description: '保持平板支撑姿势，收紧核心，从30秒开始逐步增加', duration: '10分钟', targetPart: '腰腹', difficulty: 'medium' },
  { id: 'e5', name: '卷腹', description: '平躺屈膝，缓慢卷起上半身，注意腰部贴地', duration: '15分钟', targetPart: '腰腹', difficulty: 'easy' },
  { id: 'e6', name: '俄罗斯转体', description: '坐姿双脚离地，双手合十左右扭转', duration: '10分钟', targetPart: '腰腹', difficulty: 'medium' },
  { id: 'e7', name: '空中蹬车', description: '仰卧模拟骑自行车动作，手肘交替触碰对侧膝盖', duration: '10分钟', targetPart: '腰腹', difficulty: 'medium' },
  // 臀腿
  { id: 'e8', name: '深蹲', description: '双脚与肩同宽，缓慢下蹲至大腿平行地面再起身', duration: '15分钟', targetPart: '臀腿', difficulty: 'easy' },
  { id: 'e9', name: '臀桥', description: '仰卧屈膝，臀部发力抬起至身体成一条直线', duration: '10分钟', targetPart: '臀腿', difficulty: 'easy' },
  { id: 'e10', name: '侧卧抬腿', description: '侧卧，上方腿伸直缓慢抬起再放下，锻炼大腿外侧', duration: '10分钟', targetPart: '大腿', difficulty: 'easy' },
  { id: 'e11', name: '弓步蹲', description: '前后脚站立，双膝弯曲下蹲，前膝不超过脚尖', duration: '12分钟', targetPart: '臀腿', difficulty: 'medium' },
  // 全身
  { id: 'e12', name: '波比跳', description: '从站立到蹲下、平板、跳起，高效燃脂动作', duration: '10分钟', targetPart: '全身', difficulty: 'hard' },
  { id: 'e13', name: '开合跳', description: '双脚跳跃打开同时双手头上击掌，简单燃脂', duration: '10分钟', targetPart: '全身', difficulty: 'easy' },
  { id: 'e14', name: '跳绳', description: '最简单的有氧运动，每天坚持效果显著', duration: '20分钟', targetPart: '全身', difficulty: 'easy' },
  { id: 'e15', name: '登山跑', description: '平板支撑姿势，交替提膝靠近胸口，高效燃脂', duration: '8分钟', targetPart: '全身', difficulty: 'hard' },
  // 胸部
  { id: 'e16', name: '俯卧撑', description: '经典上肢训练，可从跪姿开始逐步升级', duration: '10分钟', targetPart: '胸围', difficulty: 'medium' },
  // 拉伸
  { id: 'e17', name: '全身拉伸', description: '从头到脚的舒展拉伸，改善柔韧性', duration: '15分钟', targetPart: '全身', difficulty: 'easy' },
  { id: 'e18', name: '瑜伽拜日式', description: '经典瑜伽序列，舒展全身，放松身心', duration: '15分钟', targetPart: '全身', difficulty: 'easy' },
];
