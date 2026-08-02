"use client";

import { Receipt, Plus } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EmptyState({
  title = "No expenses found",
  description = "Start tracking your spending by adding your first expense.",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-3xl
        bg-[#f7f1e8]
        px-6
        py-14
        text-center
        shadow-[10px_10px_25px_#c9c2b8,-10px_-10px_25px_#ffffff]
        dark:bg-neutral-900
        dark:shadow-none
      "
    >
      {/* Icon */}

      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-[#f7f1e8]
          text-blue-500
          shadow-[6px_6px_12px_#c9c2b8,-6px_-6px_12px_#ffffff]
          dark:bg-neutral-800
          dark:text-blue-400
          dark:shadow-none
        "
      >
        <Receipt size={30} strokeWidth={1.8} />
      </div>

      {/* Title */}

      <h3
        className="
          mt-6
          text-xl
          font-black
          tracking-tight
          text-gray-900
          dark:text-white
        "
      >
        {title}
      </h3>

      {/* Description */}

      <p
        className="
          mt-2
          max-w-md
          text-sm
          leading-6
          text-gray-500
          dark:text-gray-400
        "
      >
        {description}
      </p>

      {/* Add Expense Button */}

      <Link
        href="/expenses/new"
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-2xl
          bg-blue-500
          px-6
          py-3
          text-sm
          font-semibold
          text-white
          shadow-lg
          transition
          duration-200
          hover:-translate-y-0.5
          hover:bg-blue-600
          hover:shadow-xl
        "
      >
        <Plus size={18} />
        Add Expense
      </Link>
    </motion.div>
  );
}
