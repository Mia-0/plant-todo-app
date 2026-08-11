import type { Plant } from '../types';
import { getStageLabel, getNextStageInfo } from '../utils/gameLogic';
import { PLANT_NAMES } from '../data/seeds';
import { PlantIllustration } from '../utils/illustrations';

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  const stage = plant.stage;
  const stageLabel = getStageLabel(stage);
  const nextInfo = getNextStageInfo(plant.totalCareCount);
  const hasIssues = plant.currentIssues.length > 0;
  const allIssuesLong = plant.currentIssues.length > 0;

  return (
    <div className="flex flex-col items-center gap-2 py-3">
      {/* Plant name and stage */}
      <div className="text-center">
        <h2 className="text-lg font-bold text-gray-800">
          {PLANT_NAMES[plant.type] || plant.name}
        </h2>
        <div className="flex items-center gap-1.5 justify-center mt-0.5">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
            stage === 'blooming'
              ? 'bg-pink-100 text-pink-600'
              : stage === 'mature'
              ? 'bg-leaf-100 text-leaf-700'
              : 'bg-amber-50 text-amber-700'
          }`}>
            {stageLabel}阶段
          </span>
          {hasIssues && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-500 animate-pulse">
              ⚠️ 需要养护
            </span>
          )}
        </div>
      </div>

      {/* Plant illustration */}
      <div className={`transition-all duration-500 ${hasIssues && allIssuesLong ? 'animate-wiggle' : 'animate-float'}`}>
        <PlantIllustration
          plantType={plant.type}
          stage={stage}
          wilted={hasIssues && plant.currentIssues.length >= 3}
        />
      </div>

      {/* Progress to next stage */}
      {nextInfo && (
        <div className="w-full max-w-[200px]">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>成长进度</span>
            <span>{plant.totalCareCount}/{stage === 'seedling' ? 10 : 30}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-leaf-500 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (plant.totalCareCount / (stage === 'seedling' ? 10 : 30)) * 100)}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1 text-center">
            还需 {nextInfo.remaining} 次养护升级至{getStageLabel(nextInfo.next)}
          </p>
        </div>
      )}
      {!nextInfo && (
        <p className="text-xs text-pink-500 font-medium">🌺 已经满级开花啦！</p>
      )}
    </div>
  );
}
