import {
  CheckCircle2,
  Gamepad2,
  Trophy,
  UserPlus,
  Zap,
} from "lucide-react";

import { activities } from "../data/dashboardData";

const iconMap = {
  achievement: Trophy,
  game: Gamepad2,
  friend: UserPlus,
  level: Zap,
};

function ActivityTable({ items = activities, onActivityClick }) {
  const handleActivityClick = (activity) => {
    if (typeof onActivityClick === "function") {
      onActivityClick(activity);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-black text-slate-900 dark:text-white">
            Recent Activity
          </h3>

          <p className="mt-1 text-xs font-medium text-slate-400">
            Your latest gaming activity
          </p>
        </div>

        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[620px]">
          <thead>
            <tr className="border-b border-slate-100 text-left dark:border-slate-800">
              <th className="px-5 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Activity
              </th>

              <th className="px-5 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Details
              </th>

              <th className="px-5 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Time
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((activity) => {
              const Icon = iconMap[activity.type] || Zap;

              return (
                <tr
                  key={activity.id}
                  onClick={() => handleActivityClick(activity)}
                  className="group cursor-pointer transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  {/* Activity */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-transform duration-300 group-hover:scale-105 dark:bg-violet-500/10 dark:text-violet-400">
                        <Icon size={17} />

                        {activity.type === "achievement" && (
                          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-fuchsia-500 dark:border-slate-900" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">
                          {activity.title}
                        </p>

                        <p className="mt-1 truncate text-[11px] text-slate-400">
                          ID #{String(activity.id).padStart(4, "0")}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Details */}
                  <td className="px-5 py-4">
                    <p className="max-w-[280px] truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                      {activity.description}
                    </p>
                  </td>

                  {/* Time */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {activity.time}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4 text-right">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <CheckCircle2 size={12} />
                      Completed
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-slate-100 md:hidden dark:divide-slate-800">
        {items.map((activity) => {
          const Icon = iconMap[activity.type] || Zap;

          return (
            <button
              key={activity.id}
              type="button"
              onClick={() => handleActivityClick(activity)}
              className="group flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-transform duration-300 group-hover:scale-105 dark:bg-violet-500/10 dark:text-violet-400">
                <Icon size={17} />

                {activity.type === "achievement" && (
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-fuchsia-500 dark:border-slate-900" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">
                    {activity.title}
                  </p>

                  <span className="shrink-0 text-[10px] font-semibold text-slate-400">
                    {activity.time}
                  </span>
                </div>

                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                  {activity.description}
                </p>

                <div className="mt-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <CheckCircle2 size={10} />
                    Completed
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
            <Gamepad2 size={22} />
          </div>

          <h4 className="mt-4 text-sm font-black text-slate-800 dark:text-white">
            No recent activity
          </h4>

          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
            Start playing a game or unlock an achievement to see activity
            here.
          </p>
        </div>
      )}
    </div>
  );
}

export default ActivityTable;