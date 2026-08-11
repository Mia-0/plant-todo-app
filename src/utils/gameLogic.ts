import type { Plant, CareIssue, GrowthStage, GameData, TodoItem, LongTermGoal, FitnessTarget } from '../types';
import { CARE_TASKS, getToday } from './storage';

// ===== 成长阶段计算 =====
export function getGrowthStage(totalCareCount: number): GrowthStage {
  if (totalCareCount >= 30) return 'blooming';
  if (totalCareCount >= 10) return 'mature';
  return 'seedling';
}

export function getStageLabel(stage: GrowthStage): string {
  switch (stage) {
    case 'seedling': return '幼苗';
    case 'mature': return '成株';
    case 'blooming': return '开花';
  }
}

export function getNextStageInfo(totalCareCount: number): { next: GrowthStage; remaining: number } | null {
  const stage = getGrowthStage(totalCareCount);
  if (stage === 'blooming') return null;
  const next = stage === 'seedling' ? 'mature' : 'blooming';
  const threshold = stage === 'seedling' ? 10 : 30;
  return { next, remaining: threshold - totalCareCount };
}

// ===== 负面状态刷新 =====
const MIN_REFRESH_MS = 6 * 60 * 60 * 1000;  // 6 hours
const MAX_REFRESH_MS = 10 * 60 * 60 * 1000; // 10 hours

const ALL_ISSUES: CareIssue[] = ['water', 'nutrient', 'light', 'pest'];

export function shouldRefreshIssues(plant: Plant, now: number): boolean {
  if (plant.lastIssueTime === 0) return true;
  const elapsed = now - plant.lastIssueTime;
  // Use deterministic "random" based on plant ID and date
  const seed = hashString(plant.id + getToday());
  const threshold = MIN_REFRESH_MS + (seed % (MAX_REFRESH_MS - MIN_REFRESH_MS));
  return elapsed >= threshold;
}

export function generateIssues(plant: Plant): CareIssue[] {
  const availableIssues = ALL_ISSUES.filter(i => !plant.currentIssues.includes(i));
  if (availableIssues.length === 0) return plant.currentIssues;

  const seed = hashString(plant.id + getToday() + 'issues');
  const count = Math.min((seed % 2) + 1, availableIssues.length, 3 - plant.currentIssues.length);

  // Fisher-Yates shuffle with seeded random
  const shuffled = [...availableIssues];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed * (i + 1) + i) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return [...plant.currentIssues, ...shuffled.slice(0, count)].slice(0, 3);
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// ===== 连续天数 =====
export function calculateStreak(lastCareDate: string): number {
  if (!lastCareDate) return 0;

  const last = new Date(lastCareDate);
  const today = new Date(getToday());
  const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0 || diffDays === 1) return 1; // Maintain or start streak
  return 0; // Streak broken
}

// ===== 金币奖励 =====
export const CARE_GOLD = 20;
export const TODO_GOLD = 5;
export const STREAK_BONUS_GOLD = 50;
export const STREAK_DAYS_REQUIRED = 3;
export const DEFAULT_DAILY_GOLD_CAP = 100;

export function randomLongTermGoalReward(): number {
  // Random between 100 and 500, step 10
  const rewards = [100, 120, 150, 180, 200, 220, 250, 280, 300, 350, 400, 450, 500];
  const idx = Math.floor(Date.now() % rewards.length);
  return rewards[idx];
}

// ===== 每日金币统计 =====
export function getTodayTodoGold(data: GameData): number {
  const today = getToday();
  const stats = data.dailyStats.find(s => s.date === today);
  return stats?.goldFromTodo || 0;
}

export function canEarnTodoGold(data: GameData): boolean {
  return getTodayTodoGold(data) < data.user.dailyGoldCap;
}

// ===== 代办 =====
export function createTodoItem(title: string, source?: TodoItem['source'], goalId?: string): TodoItem {
  return {
    id: 'todo-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    title,
    completed: false,
    date: getToday(),
    goldReward: TODO_GOLD,
    source,
    goalId,
  };
}

// ===== 长期目标 =====
export function createLongTermGoal(
  type: LongTermGoal['type'],
  title: string,
  description: string,
  extras?: Partial<LongTermGoal>
): LongTermGoal {
  return {
    id: 'goal-' + Date.now(),
    type,
    title,
    description,
    completed: false,
    createdAt: getToday(),
    ...extras,
  };
}

// ===== 身材目标 =====
export function getTargetsForMeasurements(): FitnessTarget[] {
  return [
    { part: '大臂', current: 0, target: 0 },
    { part: '腰围', current: 0, target: 0 },
    { part: '大腿', current: 0, target: 0 },
    { part: '体重', current: 0, target: 0 },
    { part: '胸围', current: 0, target: 0 },
    { part: '臀围', current: 0, target: 0 },
  ];
}

export function getCareTaskInfo(issue: CareIssue) {
  return CARE_TASKS.find(t => t.issue === issue)!;
}
