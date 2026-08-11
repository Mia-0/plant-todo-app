import { useState, useCallback, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import GoldBar from '../components/GoldBar';
import PlantCard from '../components/PlantCard';
import MonitorPanel from '../components/MonitorPanel';
import CareTaskCard from '../components/CareTaskCard';
import PlantSwitcher from '../components/PlantSwitcher';
import AchievementModal from '../components/AchievementModal';
import UpgradeModal from '../components/UpgradeModal';
import type { CareIssue, GrowthStage } from '../types';

export default function HomePage() {
  const { data, activePlant, completeCareTask, switchPlant } = useGame();
  const [showAchievement, setShowAchievement] = useState(false);
  const [upgradeStage, setUpgradeStage] = useState<GrowthStage | null>(null);
  const [prevStage, setPrevStage] = useState(activePlant.stage);

  // Detect stage upgrade
  useEffect(() => {
    if (activePlant.stage !== prevStage && activePlant.stage !== 'seedling') {
      setUpgradeStage(activePlant.stage);
      setTimeout(() => setUpgradeStage(null), 4000);
    }
    setPrevStage(activePlant.stage);
  }, [activePlant.stage]);

  // Detect streak achievement
  useEffect(() => {
    if (data.user.streak === 3 && data.user.lastStreakBonusDate) {
      setShowAchievement(true);
    }
  }, [data.user.lastStreakBonusDate]);

  const handleComplete = useCallback((issue: CareIssue) => {
    completeCareTask(issue);
  }, [completeCareTask]);

  const hasIssues = activePlant.currentIssues.length > 0;

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20">
      {/* Gold Bar */}
      <GoldBar gold={data.user.gold} streak={data.user.streak} />

      {/* Plant Switcher */}
      {data.user.plants.length > 1 && (
        <div className="px-4 pt-3 flex justify-end">
          <PlantSwitcher
            plants={data.user.plants}
            activePlantId={data.user.activePlantId}
            onSwitch={switchPlant}
          />
        </div>
      )}

      {/* Plant Card */}
      <div className="px-4">
        <PlantCard plant={activePlant} />
      </div>

      {/* Monitor Panel */}
      <div className="px-4 mt-2">
        <MonitorPanel currentIssues={activePlant.currentIssues} />
      </div>

      {/* Care Tasks */}
      <div className="px-4 mt-4 space-y-2">
        {hasIssues ? (
          <>
            <h3 className="text-sm font-semibold text-gray-700">
              ⚠️ 待处理养护任务 ({activePlant.currentIssues.length})
            </h3>
            {activePlant.currentIssues.map(issue => (
              <CareTaskCard
                key={issue}
                issue={issue}
                onComplete={handleComplete}
              />
            ))}
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-3xl mb-2">✨</div>
            <p className="text-sm text-gray-400">一切正常，绿植状态良好</p>
            <p className="text-xs text-gray-300 mt-1">过段时间再来看看吧</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AchievementModal
        show={showAchievement}
        onClose={() => setShowAchievement(false)}
      />
      <UpgradeModal
        show={upgradeStage !== null}
        onClose={() => setUpgradeStage(null)}
        stage={upgradeStage || 'mature'}
      />
    </div>
  );
}
