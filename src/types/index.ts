// ===== 绿植相关 =====
export type PlantType = 'pothos' | 'cactus' | 'rose' | 'sunflower' | 'monstera' | 'succulent' | 'lavender';

export type GrowthStage = 'seedling' | 'mature' | 'blooming';

export type CareIssue = 'water' | 'nutrient' | 'light' | 'pest';

export type IssueStatus = 'normal' | 'warning' | 'critical';

export interface DimensionState {
  label: string;
  icon: string;
  issue: CareIssue;
  status: IssueStatus;
}

export interface Plant {
  id: string;
  type: PlantType;
  name: string;
  stage: GrowthStage;
  careCount: number;
  totalCareCount: number;
  currentIssues: CareIssue[];
  lastIssueTime: number; // timestamp
  createdAt: number;
}

// ===== 种子/商城 =====
export interface Seed {
  id: PlantType;
  name: string;
  emoji: string;
  price: number;
  description: string;
  color: string; // Tailwind color class for card bg
}

// ===== 用户/游戏状态 =====
export interface UserState {
  gold: number;
  streak: number; // 连续养护天数
  lastCareDate: string; // YYYY-MM-DD
  lastStreakBonusDate: string; // 上次发放连续成就的日期
  ownedSeeds: PlantType[]; // 已拥有的种子（不含初始绿萝）
  activePlantId: string;
  plants: Plant[]; // 所有已创建的植物
  dailyGoldCap: number; // 每日 todo 金币上限
}

// ===== Todo =====
export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  date: string; // YYYY-MM-DD
  goldReward: number;
  source?: 'custom' | 'fitness' | 'reading' | 'skill';
  goalId?: string;
}

// ===== 长期目标 =====
export type GoalType = 'fitness' | 'reading' | 'skill';

export interface BodyMeasurements {
  height: number; // cm
  weight: number; // kg
  chest: number;
  waist: number;
  hip: number;
  arm: number; // 大臂围
  thigh: number;
}

export interface FitnessTarget {
  part: string;
  current: number;
  target: number;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  targetPart: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LongTermGoal {
  id: string;
  type: GoalType;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  goldReward?: number;
  createdAt: string;
  // 身材管理
  measurements?: BodyMeasurements;
  targets?: FitnessTarget[];
  selectedExercises?: string[]; // exercise ids
  // 阅读
  bookTitle?: string;
  bookAuthor?: string;
  // 技能
  skillName?: string;
  progressNote?: string; // 用户自行更新的进度备注
}

// ===== 每日统计 =====
export interface DailyStats {
  date: string;
  goldFromTodo: number;
  completedTodos: string[]; // todo ids
}

// ===== 完整游戏数据 =====
export interface GameData {
  user: UserState;
  todos: TodoItem[];
  longTermGoals: LongTermGoal[];
  dailyStats: DailyStats[];
}

// ===== 成就 =====
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
