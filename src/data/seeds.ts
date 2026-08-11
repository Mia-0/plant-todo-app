import type { Seed } from '../types';

export const SEEDS: Seed[] = [
  {
    id: 'cactus',
    name: '仙人掌',
    emoji: '🌵',
    price: 300,
    description: '耐旱好养，适合新手',
    color: '#A8D8A8',
  },
  {
    id: 'rose',
    name: '玫瑰花',
    emoji: '🌹',
    price: 500,
    description: '浪漫之选，花开美丽',
    color: '#F8D7DA',
  },
  {
    id: 'sunflower',
    name: '向日葵',
    emoji: '🌻',
    price: 400,
    description: '向阳而生，活力满满',
    color: '#FFF3CD',
  },
  {
    id: 'monstera',
    name: '龟背竹',
    emoji: '🪴',
    price: 800,
    description: '北欧风网红植物',
    color: '#C8E6C9',
  },
  {
    id: 'succulent',
    name: '多肉',
    emoji: '🪷',
    price: 200,
    description: '小巧可爱，不占地方',
    color: '#E8D5F5',
  },
  {
    id: 'lavender',
    name: '薰衣草',
    emoji: '💜',
    price: 600,
    description: '紫色浪漫，香气宜人',
    color: '#D6D5F5',
  },
];

export const PLANT_NAMES: Record<string, string> = {
  pothos: '绿萝',
  cactus: '仙人掌',
  rose: '玫瑰花',
  sunflower: '向日葵',
  monstera: '龟背竹',
  succulent: '多肉',
  lavender: '薰衣草',
};
