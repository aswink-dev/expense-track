"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function MonthlyChart({ data = [] }) {
  return (
    <motion.div
      className="
        rounded-2xl
       bg-[#f7f1e8] dark:bg-neutral-900
        p-6
        shadow-sm
        transition
        hover:shadow-md
        dark:border-gray-800
      "
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Monthly Spending
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track your spending over time
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-75 items-center justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No monthly spending data available
          </p>
        </div>
      ) : (
        <div className="mt-6 h-75">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="month"
                tick={{
                  fill: "#6b7280",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#6b7280",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{
                  fill: "rgba(99, 102, 241, 0.06)",
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                }}
                formatter={(value) => [`₹${value}`, "Spending"]}
              />

              <Bar
                dataKey="amount"
                fill="#6366f1"
                radius={[8, 8, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
