"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const COLORS = [
  "#3b82f6", // Blue
  "#22c55e", // Green
  "#f97316", // Orange
  "#ef4444", // Red
  "#06b6d4", // Cyan
  "#a855f7", // Purple
  "#eab308", // Yellow
  "#ec4899", // Pink
];

export default function ExpenseChart({ data = [] }) {
  return (
    <motion.div
      className="
        rounded-2xl
        bg-[#f7f1e8]
        p-6
        hover:shadow-md
        shadow-sm
        transition
        dark:bg-neutral-900
        dark:shadow-none
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
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
            Spending by Category
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            See where your money is going
          </p>
        </div>
      </div>

      {/* Chart */}

      {data.length === 0 ? (
        <div className="flex h-75 items-center justify-center">
          <div
            className="
              rounded-2xl
              bg-[#f7f1e8]
              px-5
              py-4
              text-center
              dark:bg-neutral-800
              dark:shadow-none
            "
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              No spending data available
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 h-75">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={55}
                paddingAngle={3}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  backgroundColor: "#f7f1e8",
                  color: "#111827",
                  
                  padding: "10px 14px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
