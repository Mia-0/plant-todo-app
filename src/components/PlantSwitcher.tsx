import type { Plant } from '../types';
import { PLANT_NAMES } from '../data/seeds';
import { SmallPlantIcon } from '../utils/illustrations';
import { getStageLabel } from '../utils/gameLogic';
import { ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface PlantSwitcherProps {
  plants: Plant[];
  activePlantId: string;
  onSwitch: (plantId: string) => void;
}

export default function PlantSwitcher({ plants, activePlantId, onSwitch }: PlantSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const active = plants.find(p => p.id === activePlantId);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-leaf-100 text-sm text-leaf-700 font-medium"
      >
        <SmallPlantIcon plantType={active?.type || 'pothos'} size={18} />
        <span>{PLANT_NAMES[active?.type || 'pothos']}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-lg border border-gray-100 p-2 min-w-[180px] z-50">
          {plants.map(plant => (
            <button
              key={plant.id}
              onClick={() => {
                onSwitch(plant.id);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                plant.id === activePlantId ? 'bg-leaf-50' : 'hover:bg-gray-50'
              }`}
            >
              <SmallPlantIcon plantType={plant.type} size={24} />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">
                  {PLANT_NAMES[plant.type]}
                  {plant.id === activePlantId && (
                    <Check size={14} className="inline ml-1 text-leaf-600" />
                  )}
                </div>
                <div className="text-xs text-gray-400">
                  {getStageLabel(plant.stage)} · 养护 {plant.totalCareCount} 次
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
