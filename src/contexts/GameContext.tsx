import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { GameData, Plant, CareIssue, TodoItem, LongTermGoal } from '../types';
import {
  loadGameData, saveGameData, getToday, getActivePlant, CARE_TASKS,
} from '../utils/storage';
import {
  getGrowthStage, shouldRefreshIssues, generateIssues,
  CARE_GOLD, TODO_GOLD, STREAK_BONUS_GOLD, STREAK_DAYS_REQUIRED,
  randomLongTermGoalReward, getTodayTodoGold, canEarnTodoGold,
  createTodoItem,
} from '../utils/gameLogic';

interface GameContextType {
  data: GameData;
  activePlant: Plant;
  // Plant care
  refreshPlantIssues: () => void;
  completeCareTask: (issue: CareIssue) => void;
  // Todos
  addTodo: (title: string, source?: TodoItem['source'], goalId?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  // Long-term goals
  addLongTermGoal: (goal: LongTermGoal) => void;
  deleteLongTermGoal: (id: string) => void;
  completeLongTermGoal: (id: string) => void;
  updateGoalProgress: (id: string, note: string) => void;
  // Shop
  buySeed: (plantType: string, price: number) => boolean;
  // Plant management
  switchPlant: (plantId: string) => void;
  createPlantFromSeed: (plantType: string) => void;
  // Settings
  setDailyGoldCap: (cap: number) => void;
  // Stats
  todayGold: number;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<GameData>(loadGameData);
  const [refreshKey] = useState(0);

  const activePlant = getActivePlant(data);

  // Persist data on every change
  useEffect(() => {
    saveGameData(data);
  }, [data]);

  // Check for issue refresh on mount and periodically
  useEffect(() => {
    const checkIssues = () => {
      const now = Date.now();
      const plant = getActivePlant(data);
      if (shouldRefreshIssues(plant, now)) {
        const issues = generateIssues(plant);
        if (issues.length > 0) {
          setData(prev => {
            const updated = { ...prev };
            const plants = updated.user.plants.map(p =>
              p.id === plant.id
                ? { ...p, currentIssues: issues, lastIssueTime: now }
                : p
            );
            updated.user = { ...updated.user, plants };
            return updated;
          });
        }
      }
    };

    checkIssues();
    const interval = setInterval(checkIssues, 5 * 60 * 1000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, [data.user.activePlantId, refreshKey]);

  // Refresh plant issues
  const refreshPlantIssues = useCallback(() => {
    const now = Date.now();
    const plant = getActivePlant(data);
    const issues = generateIssues({ ...plant, currentIssues: [] });
    setData(prev => {
      const updated = { ...prev };
      updated.user.plants = updated.user.plants.map(p =>
        p.id === plant.id
          ? { ...p, currentIssues: issues, lastIssueTime: now }
          : p
      );
      return updated;
    });
  }, [data]);

  // Complete a care task
  const completeCareTask = useCallback((issue: CareIssue) => {
    const today = getToday();
    setData(prev => {
      const updated = { ...prev };
      const plant = getActivePlant(updated);
      const taskInfo = CARE_TASKS.find(t => t.issue === issue);

      // Remove issue from plant
      updated.user.plants = updated.user.plants.map(p =>
        p.id === plant.id
          ? {
              ...p,
              currentIssues: p.currentIssues.filter(i => i !== issue),
              careCount: p.careCount + 1,
              totalCareCount: p.totalCareCount + 1,
            }
          : p
      );

      // Update stage
      updated.user.plants = updated.user.plants.map(p =>
        p.id === plant.id
          ? { ...p, stage: getGrowthStage(p.totalCareCount) }
          : p
      );

      // Add gold
      updated.user.gold += taskInfo?.goldReward || CARE_GOLD;

      // Update streak
      if (updated.user.lastCareDate !== today) {
        const lastDate = updated.user.lastCareDate;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);

        if (lastDate === yesterdayStr) {
          updated.user.streak += 1;
        } else {
          updated.user.streak = 1;
        }
        updated.user.lastCareDate = today;

        // Check streak bonus
        if (updated.user.streak === STREAK_DAYS_REQUIRED && updated.user.lastStreakBonusDate !== today) {
          updated.user.gold += STREAK_BONUS_GOLD;
          updated.user.lastStreakBonusDate = today;
        }
      }

      return updated;
    });
  }, []);

  // Add todo
  const addTodo = useCallback((title: string, source?: TodoItem['source'], goalId?: string) => {
    const todo = createTodoItem(title, source, goalId);
    setData(prev => ({ ...prev, todos: [...prev.todos, todo] }));
  }, []);

  // Toggle todo completion
  const toggleTodo = useCallback((id: string) => {
    const today = getToday();
    setData(prev => {
      const todo = prev.todos.find(t => t.id === id);
      if (!todo) return prev;

      const wasCompleted = todo.completed;

      // If completing (not uncompleting), check gold cap
      if (!wasCompleted && !canEarnTodoGold(prev)) return prev;

      // Update todo
      const todos = prev.todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );

      // Update daily stats
      let dailyStats = [...prev.dailyStats];
      let stats = dailyStats.find(s => s.date === today);
      if (!stats) {
        stats = { date: today, goldFromTodo: 0, completedTodos: [] };
        dailyStats.push(stats);
      }

      const gold = prev.user.gold;
      if (!wasCompleted) {
        stats.goldFromTodo += TODO_GOLD;
        stats.completedTodos.push(id);
      } else {
        stats.goldFromTodo = Math.max(0, stats.goldFromTodo - TODO_GOLD);
        stats.completedTodos = stats.completedTodos.filter(tid => tid !== id);
      }

      return {
        ...prev,
        todos,
        dailyStats,
        user: { ...prev.user, gold: !wasCompleted ? gold + TODO_GOLD : gold - TODO_GOLD },
      };
    });
  }, []);

  // Delete todo
  const deleteTodo = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      todos: prev.todos.filter(t => t.id !== id),
    }));
  }, []);

  // Add long-term goal
  const addLongTermGoal = useCallback((goal: LongTermGoal) => {
    setData(prev => ({
      ...prev,
      longTermGoals: [...prev.longTermGoals, goal],
    }));
  }, []);

  // Delete long-term goal
  const deleteLongTermGoal = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      longTermGoals: prev.longTermGoals.filter(g => g.id !== id),
    }));
  }, []);

  // Complete long-term goal
  const completeLongTermGoal = useCallback((id: string) => {
    setData(prev => {
      const goal = prev.longTermGoals.find(g => g.id === id);
      if (!goal || goal.completed) return prev;

      const reward = randomLongTermGoalReward();
      return {
        ...prev,
        longTermGoals: prev.longTermGoals.map(g =>
          g.id === id
            ? { ...g, completed: true, completedAt: getToday(), goldReward: reward }
            : g
        ),
        user: { ...prev.user, gold: prev.user.gold + reward },
      };
    });
  }, []);

  // Update goal progress note
  const updateGoalProgress = useCallback((id: string, note: string) => {
    setData(prev => ({
      ...prev,
      longTermGoals: prev.longTermGoals.map(g =>
        g.id === id ? { ...g, progressNote: note } : g
      ),
    }));
  }, []);

  // Buy seed from shop
  const buySeed = useCallback((plantType: string, price: number): boolean => {
    let success = false;
    setData(prev => {
      if (prev.user.gold < price) return prev;
      if (prev.user.ownedSeeds.includes(plantType as any)) return prev;
      success = true;
      return {
        ...prev,
        user: {
          ...prev.user,
          gold: prev.user.gold - price,
          ownedSeeds: [...prev.user.ownedSeeds, plantType as any],
        },
      };
    });
    return success;
  }, []);

  // Switch active plant
  const switchPlant = useCallback((plantId: string) => {
    setData(prev => ({
      ...prev,
      user: { ...prev.user, activePlantId: plantId },
    }));
  }, []);

  // Create plant from seed
  const createPlantFromSeed = useCallback((plantType: string) => {
    setData(prev => {
      const now = Date.now();
      const newPlant: Plant = {
        id: 'plant-' + now,
        type: plantType as any,
        name: plantType, // Will be resolved to Chinese name in UI
        stage: 'seedling',
        careCount: 0,
        totalCareCount: 0,
        currentIssues: [],
        lastIssueTime: 0,
        createdAt: now,
      };
      return {
        ...prev,
        user: {
          ...prev.user,
          plants: [...prev.user.plants, newPlant],
          activePlantId: newPlant.id,
          ownedSeeds: prev.user.ownedSeeds.filter(s => s !== plantType),
        },
      };
    });
  }, []);

  // Set daily gold cap
  const setDailyGoldCap = useCallback((cap: number) => {
    setData(prev => ({
      ...prev,
      user: { ...prev.user, dailyGoldCap: cap },
    }));
  }, []);

  const todayGold = getTodayTodoGold(data);

  return (
    <GameContext.Provider
      value={{
        data,
        activePlant,
        refreshPlantIssues,
        completeCareTask,
        addTodo,
        toggleTodo,
        deleteTodo,
        addLongTermGoal,
        deleteLongTermGoal,
        completeLongTermGoal,
        updateGoalProgress,
        buySeed,
        switchPlant,
        createPlantFromSeed,
        setDailyGoldCap,
        todayGold,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
