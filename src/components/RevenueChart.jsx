import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { chartData } from "../data/dashboardData";

function RevenueChart() {
  return (
    <div className="h-full min-h-[320px] w-full">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 5,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="nexusGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="#8b5cf6"
                stopOpacity={0.35}
              />
              <stop
                offset="55%"
                stopColor="#06b6d4"
                stopOpacity={0.12}
              />
              <stop
                offset="100%"
                stopColor="#06b6d4"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800"
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fontWeight: 600,
              fill: "currentColor",
            }}
            className="text-slate-400"
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fontWeight: 600,
              fill: "currentColor",
            }}
            className="text-slate-400"
            tickFormatter={(value) => `${value}h`}
            width={45}
          />

          <Tooltip
            cursor={{
              stroke: "#8b5cf6",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              borderRadius: "14px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              background: "rgba(15, 23, 42, 0.95)",
              color: "#ffffff",
              boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
              padding: "10px 13px",
            }}
            labelStyle={{
              color: "#cbd5e1",
              fontWeight: 700,
              marginBottom: 4,
            }}
            formatter={(value) => [`${value} hours`, "Play time"]}
          />

          <Area
            type="monotone"
            dataKey="hours"
            stroke="#8b5cf6"
            strokeWidth={3}
            fill="url(#nexusGradient)"
            activeDot={{
              r: 6,
              stroke: "#ffffff",
              strokeWidth: 2,
              fill: "#8b5cf6",
            }}
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;