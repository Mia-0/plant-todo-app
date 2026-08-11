import type { CareIssue } from '../types';
import { CARE_TASKS } from '../utils/storage';

interface MonitorPanelProps {
  currentIssues: CareIssue[];
}

export default function MonitorPanel({ currentIssues }: MonitorPanelProps) {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {CARE_TASKS.map((task) => {
        const hasIssue = currentIssues.includes(task.issue);
        return (
          <div
            key={task.issue}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all ${
              hasIssue
                ? 'bg-red-50 border border-red-200'
                : 'bg-leaf-50 border border-leaf-200'
            }`}
          >
            <span className="text-lg">{task.icon}</span>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">{task.label}</span>
              <span className={`text-xs font-semibold ${hasIssue ? 'text-red-600' : 'text-leaf-600'}`}>
                {hasIssue ? '⚠️ 异常' : '✅ 正常'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
