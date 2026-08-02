"use client";

import { useEffect, useState } from "react";

export default function DashboardPreview({ user }) {
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    async function loadDashboardData() {
      try {
        setLoading(true);

        const [expensesRes, statsRes] = await Promise.all([
          fetch("/api/expenses", {
            credentials: "include",
          }),
          fetch("/api/expenses/stats", {
            credentials: "include",
          }),
        ]);

        const expensesData = await expensesRes.json();
        const statsData = await statsRes.json();

        if (expensesData.success) {
          setExpenses(expensesData.expenses || []);
        }

        if (statsData.success) {
          setStats(statsData.stats || null);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

  if (user && loading) {
    return (
      <div
        className="
          rounded-3xl
          bg-[#f7f1e8]
          p-6
          shadow-[inset_4px_4px_10px_#c9c2b8,inset_-4px_-4px_10px_#ffffff]
          dark:bg-neutral-900
          dark:shadow-none
        "
      >
        <div className="h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-neutral-800" />

        <div className="mt-4 h-10 w-48 animate-pulse rounded bg-gray-200 dark:bg-neutral-800" />

        <div className="mt-8 space-y-3">
          <div className="h-20 animate-pulse rounded-2xl bg-gray-200 dark:bg-neutral-800" />

          <div className="h-20 animate-pulse rounded-2xl bg-gray-200 dark:bg-neutral-800" />
        </div>

        <div className="mt-7 h-3 animate-pulse rounded-full bg-gray-200 dark:bg-neutral-800" />
      </div>
    );
  }


  if (!user) {
    return (
      <PreviewCard
        title="Monthly Overview"
        amount="₹65,530"
        expenses={[
          {
            title: "Food",
            category: "Monthly expense",
            amount: 530,
            emoji: "🍔",
          },
          {
            title: "Shopping",
            category: "Monthly expense",
            amount: 65000,
            emoji: "🛒",
          },
        ]}
        percentage={75}
      />
    );
  }


  if (expenses.length === 0) {
    return (
      <div className="py-8 text-center">
        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-blue-500
            text-3xl
            shadow-lg
          "
        >
          📊
        </div>

        <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
          Your dashboard is ready
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Start adding expenses to see your spending overview here.
        </p>
      </div>
    );
  }


  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0,
  );

  const recentExpenses = expenses.slice(0, 2);

  return (
    <PreviewCard
      title="Your Spending Overview"
      amount={`₹${total.toLocaleString("en-IN")}`}
      expenses={recentExpenses.map((expense) => ({
        title: expense.title,
        category: expense.category,
        amount: expense.amount,
        emoji: getCategoryEmoji(expense.category),
      }))}
      percentage={75}
    />
  );
}

function PreviewCard({ title, amount, expenses, percentage }) {
  return (
    <div
      className="
        rounded-3xl
        bg-[#f7f1e8]
        p-6
        shadow-[inset_4px_4px_10px_#c9c2b8,inset_-4px_-4px_10px_#ffffff]
        dark:bg-neutral-900
        dark:shadow-none
      "
    >

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            {amount}
          </h2>
        </div>

        <div
          className="
            rounded-xl
            bg-blue-50
            px-3
            py-2
            text-sm
            font-semibold
            text-blue-500
            dark:bg-blue-950/40
            dark:text-blue-400
          "
        >
          This month
        </div>
      </div>


      <div className="mt-6 border-t border-gray-200/70 dark:border-neutral-800" />

      <div className="mt-6 space-y-3">
        {expenses.map((expense, index) => (
          <div
            key={index}
            className="
              flex
              items-center
              justify-between
              gap-4
              rounded-2xl
              bg-[#f7f1e8]
              p-4
              shadow-[4px_4px_8px_#c9c2b8,-4px_-4px_8px_#ffffff]
              dark:bg-neutral-800
              dark:shadow-none
            "
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-500
                  text-lg
                "
              >
                {expense.emoji}
              </span>

              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-900 dark:text-white">
                  {expense.title}
                </p>

                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  {expense.category}
                </p>
              </div>
            </div>

            <span className="shrink-0 font-bold text-gray-900 dark:text-white">
              ₹{Number(expense.amount).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-7">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-600 dark:text-gray-400">
            Monthly budget
          </span>

          <span className="font-semibold text-gray-900 dark:text-white">
            {percentage}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-800">
          <div
            className="h-full rounded-full bg-blue-500 transition-all"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function getCategoryEmoji(category) {
  const emojis = {
    Food: "🍔",
    Shopping: "🛒",
    Travel: "✈️",
    Transport: "🚗",
    Entertainment: "🎬",
    Bills: "🧾",
    Health: "💊",
    Education: "📚",
  };

  return emojis[category] || "💰";
}