import {
  Gamepad2,
  Sparkles,
  Trophy,
  TrendingUp,
} from "lucide-react";

const iconMap = {
  level: Trophy,
  xp: Sparkles,
  games: Gamepad2,
  achievements: TrendingUp,
};

function StatCard({
  title,
  value,
  change,
  positive = true,
  icon = "level",
  subtitle,
}) {
  const Icon = iconMap[icon] || Sparkles;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-500/40">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-500/5 transition-transform duration-500 group-hover:scale-150" />

      <div className="relative flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <Icon size={21} />
        </div>

        <span
          className={`rounded-full px-2 py-1 text-[11px] font-bold ${
            positive
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
          }`}
        >
          {change}
        </span>
      </div>

      <div className="relative mt-5">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>

        <h3 className="mt-1 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          {value}
        </h3>

        <p className="mt-2 text-xs font-medium text-slate-400 dark:text-slate-500">
          {subtitle}
        </p>
      </div>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-700 group-hover:w-[90%]" />
      </div>
    </div>
  );
}

export default StatCard;