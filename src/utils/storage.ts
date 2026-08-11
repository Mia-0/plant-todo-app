import type { GameData, Plant, CareIssue } from '../types';

const STORAGE_KEY = 'plant-todo-game-data';

const DEFAULT_GAME_DATA: GameData = {
  user: {
    gold: 200,
    streak: 0,
    lastCareDate: '',
    lastStreakBonusDate: '',
    ownedSeeds: [],
    activePlantId: 'plant-1',
    plants: [],
    dailyGoldCap: 100,
  },
  todos: [],
  longTermGoals: [],
  dailyStats: [],
};

function getDefaultPlant(): Plant {
  return {
    id: 'plant-1',
    type: 'pothos',
    name: '绿萝',
    stage: 'seedling',
    careCount: 0,
    totalCareCount: 0,
    currentIssues: [],
    lastIssueTime: 0,
    createdAt: Date.now(),
  };
}

export function loadGameData(): GameData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const data = { ...DEFAULT_GAME_DATA };
      data.user.plants = [getDefaultPlant()];
      return data;
    }
    const data = JSON.parse(raw) as GameData;
    if (!data.user.plants || data.user.plants.length === 0) {
      data.user.plants = [getDefaultPlant()];
    }
    if (!data.dailyStats) data.dailyStats = [];
    return data;
  } catch {
    const data = { ...DEFAULT_GAME_DATA };
    data.user.plants = [getDefaultPlant()];
    return data;
  }
}

export function saveGameData(data: GameData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.error('Failed to save game data');
  }
}

export function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getActivePlant(data: GameData): Plant {
  const plant = data.user.plants.find(p => p.id === data.user.activePlantId);
  return plant || data.user.plants[0] || getDefaultPlant();
}

export interface CareTaskInfo {
  issue: CareIssue;
  label: string;
  actionLabel: string;
  icon: string;
  goldReward: number;
}

export const CARE_TASKS: CareTaskInfo[] = [
  { issue: 'water', label: '土壤湿度', actionLabel: '浇水', icon: '💧', goldReward: 20 },
  { issue: 'nutrient', label: '养分肥力', actionLabel: '施加营养液', icon: '🧪', goldReward: 20 },
  { issue: 'light', label: '光照时长', actionLabel: '挪动补光', icon: '☀️', goldReward: 20 },
  { issue: 'pest', label: '虫害情况', actionLabel: '喷洒驱虫药', icon: '🐛', goldReward: 20 },
];
