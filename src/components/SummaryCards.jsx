"use client";

import { Wallet, Receipt, CalendarDays, Trophy } from "lucide-react";

import AnimatedCard from "./AnimatedCard";

export default function SummaryCards({ expenses = [] }) {
  // Total expenses
  const total = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  // Number of transactions
  const count = expenses.length;

  // Current month spending
  const now = new Date();

  const currentMonth = expenses
    .filter((expense) => {
      const date = new Date(expense.date);

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  // Calculate spending by category
  const categories = {};

  expenses.forEach((expense) => {
    categories[expense.category] =
      (categories[expense.category] || 0) + Number(expense.amount || 0);
  });

  // Find highest spending category
  let topCategory = "None";

  if (Object.keys(categories).length > 0) {
    topCategory = Object.keys(categories).reduce((a, b) =>
      categories[a] > categories[b] ? a : b,
    );
  }

  // Format currency
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const cards = [
    {
      title: "Total Expense",
      value: formatCurrency(total),
      description: "All time spending",
      icon: Wallet,
    },
    {
      title: "Transactions",
      value: count.toLocaleString("en-IN"),
      description: "Total expenses recorded",
      icon: Receipt,
    },
    {
      title: "This Month",
      value: formatCurrency(currentMonth),
      description: "Spending this month",
      icon: CalendarDays,
    },
    {
      title: "Top Category",
      value: topCategory,
      description:
        topCategory === "None"
          ? "No expenses yet"
          : "Highest spending category",
      icon: Trophy,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <AnimatedCard key={card.title}>
            <div
              className="
                group
                h-full
                rounded-3xl
                bg-[#f7f1e8]
                p-6
                shadow-[8px_8px_20px_#c9c2b8,-8px_-8px_20px_#ffffff]
                transition
                duration-300
                hover:-translate-y-0.5
                dark:bg-neutral-900
                dark:shadow-none
              "
            >
              <div className="flex items-start justify-between gap-4">
                {/* Content */}

                <div className="min-w-0">
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    {card.title}
                  </p>

                  <h2
                    className="
                      mt-3
                      truncate
                      text-2xl
                      font-black
                      tracking-tight
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {card.value}
                  </h2>

                  <p
                    className="
                      mt-2
                      text-xs
                      font-medium
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    {card.description}
                  </p>
                </div>

                {/* Icon */}

                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-500
                    text-white
                    shadow-lg
                    transition
                    duration-300
                    group-hover:scale-105
                    group-hover:-rotate-3
                  "
                >
                  <Icon size={21} strokeWidth={2.2} />
                </div>
              </div>

              {/* Decorative Accent */}
              <div className="mt-6 flex items-center gap-1.5">
                <div className="h-1.5 w-12 rounded-full bg-blue-500" />
                <div className="h-1.5 w-3 rounded-full bg-green-500" />
              </div>
            </div>
          </AnimatedCard>
        );
      })}
    </div>
  );
}
