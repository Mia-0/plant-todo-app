import { useState } from 'react';
import type { LongTermGoal, BodyMeasurements, FitnessTarget } from '../types';

interface FitnessFormProps {
  goal: LongTermGoal;
  onSave: (measurements: BodyMeasurements, targets: FitnessTarget[]) => void;
}

const DEFAULT_MEASUREMENTS: BodyMeasurements = {
  height: 0, weight: 0, chest: 0, waist: 0, hip: 0, arm: 0, thigh: 0,
};

const PART_LABELS: { key: keyof BodyMeasurements; label: string; unit: string }[] = [
  { key: 'height', label: '身高', unit: 'cm' },
  { key: 'weight', label: '体重', unit: 'kg' },
  { key: 'chest', label: '胸围', unit: 'cm' },
  { key: 'waist', label: '腰围', unit: 'cm' },
  { key: 'hip', label: '臀围', unit: 'cm' },
  { key: 'arm', label: '大臂围', unit: 'cm' },
  { key: 'thigh', label: '大腿围', unit: 'cm' },
];

export default function FitnessForm({ goal, onSave }: FitnessFormProps) {
  const [measurements, setMeasurements] = useState<BodyMeasurements>(
    goal.measurements || DEFAULT_MEASUREMENTS
  );
  const [targets, setTargets] = useState<FitnessTarget[]>(
    goal.targets || [
      { part: '腰围', current: 0, target: 0 },
      { part: '大臂', current: 0, target: 0 },
    ]
  );

  const updateMeasurement = (key: keyof BodyMeasurements, value: number) => {
    setMeasurements(prev => ({ ...prev, [key]: value }));
  };

  const addTarget = () => {
    setTargets(prev => [...prev, { part: '', current: 0, target: 0 }]);
  };

  const updateTarget = (index: number, field: keyof FitnessTarget, value: string | number) => {
    setTargets(prev =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t))
    );
  };

  const removeTarget = (index: number) => {
    setTargets(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-700">身体数据</h4>
      <div className="grid grid-cols-2 gap-2">
        {PART_LABELS.map(({ key, label, unit }) => (
          <div key={key} className="flex items-center gap-2">
            <label className="text-xs text-gray-500 w-14">{label}</label>
            <input
              type="number"
              value={measurements[key] || ''}
              onChange={e => updateMeasurement(key, parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="flex-1 px-2 py-1.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-leaf-400"
            />
            <span className="text-xs text-gray-400">{unit}</span>
          </div>
        ))}
      </div>

      <h4 className="text-sm font-semibold text-gray-700 pt-2">瘦身塑形目标</h4>
      {targets.map((t, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={t.part}
            onChange={e => updateTarget(i, 'part', e.target.value)}
            placeholder="部位（如大臂）"
            className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-leaf-400"
          />
          <span className="text-xs text-gray-400">从</span>
          <input
            type="number"
            value={t.current || ''}
            onChange={e => updateTarget(i, 'current', parseFloat(e.target.value) || 0)}
            placeholder="当前"
            className="w-16 px-2 py-1.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-leaf-400"
          />
          <span className="text-xs text-gray-400">cm→</span>
          <input
            type="number"
            value={t.target || ''}
            onChange={e => updateTarget(i, 'target', parseFloat(e.target.value) || 0)}
            placeholder="目标"
            className="w-16 px-2 py-1.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-leaf-400"
          />
          <span className="text-xs text-gray-400">cm</span>
          <button onClick={() => removeTarget(i)} className="text-red-400 text-xs">删除</button>
        </div>
      ))}
      <button onClick={addTarget} className="text-xs text-leaf-600 font-medium">+ 添加目标维度</button>

      <button
        onClick={() => onSave(measurements, targets)}
        className="w-full py-2 rounded-xl bg-leaf-500 text-white text-sm font-medium active:scale-95"
      >
        保存数据
      </button>
    </div>
  );
}
