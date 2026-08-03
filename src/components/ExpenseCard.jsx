"use client";

import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";

const CATEGORY_STYLES = {
  Food: {
    icon: "🍔",
    className:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400",
  },
  Shopping: {
    icon: "🛒",
    className:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  },
  Travel: {
    icon: "✈️",
    className:
      "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-400",
  },
  Entertainment: {
    icon: "🎬",
    className:
      "bg-pink-50 text-pink-600 dark:bg-pink-950/30 dark:text-pink-400",
  },
  Bills: {
    icon: "🧾",
    className:
      "bg-yellow-50 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400",
  },
  Health: {
    icon: "💊",
    className: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
  },
  Education: {
    icon: "📚",
    className:
      "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400",
  },
  Other: {
    icon: "📦",
    className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
};

export default function ExpenseCard({ expense, setExpenses }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    try {
      setDeleting(true);

      const res = await fetch(`/api/expenses/${expense._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setExpenses((prev) => prev.filter((item) => item._id !== expense._id));

        toast.success("Expense deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete expense");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  const date = new Date(expense.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const category = CATEGORY_STYLES[expense.category] || CATEGORY_STYLES.Other;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        x: -30,
      }}
      whileHover={{
        y: -2,
      }}
      className="
        flex
        flex-col
        gap-5
        rounded-2xl
        bg-[#f7f1e8]
        p-5
        shadow-[6px_6px_14px_#c9c2b8,-6px_-6px_14px_#ffffff]
        transition
        duration-300
        sm:flex-row
        sm:items-center
        sm:justify-between
        dark:bg-neutral-900
        dark:shadow-none
      "
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            text-xl
            shadow-[inset_3px_3px_6px_rgba(0,0,0,0.08),inset_-3px_-3px_6px_rgba(255,255,255,0.7)]
            dark:shadow-none
            ${category.className}
          `}
        >
          {category.icon}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-bold text-gray-900 dark:text-white">
            {expense.title}
          </h3>

          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span
              className={`
                rounded-full
                px-2.5
                py-1
                text-xs
                font-semibold
                ${category.className}
              `}
            >
              {expense.category}
            </span>

            <span className="text-xs text-gray-500 dark:text-gray-400">
              {date}
            </span>
          </div>

          {expense.note && (
            <p className="mt-2 max-w-xl truncate text-sm text-gray-500 dark:text-gray-400">
              {expense.note}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 sm:justify-end">
        <p className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
          ₹{Number(expense.amount).toLocaleString("en-IN")}
        </p>

        <div className="flex items-center gap-2">
          <Link
            href={`/expenses/edit/${expense._id}`}
            aria-label="Edit expense"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#f7f1e8]
              text-gray-500
              shadow-[4px_4px_8px_#c9c2b8,-4px_-4px_8px_#ffffff]
              transition
              hover:-translate-y-0.5
              hover:text-blue-500
              dark:bg-neutral-900
              dark:text-gray-400
              dark:shadow-none
              dark:hover:bg-neutral-800
              dark:hover:text-blue-400
            "
          >
            <Pencil size={17} />
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            aria-label="Delete expense"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#f7f1e8]
              text-gray-500
              shadow-[4px_4px_8px_#c9c2b8,-4px_-4px_8px_#ffffff]
              transition
              hover:-translate-y-0.5
              hover:text-red-500
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:bg-neutral-900
              dark:text-gray-400
              dark:shadow-none
              dark:hover:bg-neutral-800
              dark:hover:text-red-400
            "
          >
            {deleting ? (
              <span className="text-xs">...</span>
            ) : (
              <Trash2 size={17} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
