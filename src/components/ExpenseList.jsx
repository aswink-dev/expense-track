"use client";

import { useEffect, useState } from "react";
import ExpenseCard from "./ExpenseCard";
import EmptyState from "./EmptyState";

export default function ExpenseList({ expenses = [], setExpenses }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        setLoading(true);

        const res = await fetch("/api/expenses", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          setExpenses(data.expenses || []);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    fetchExpenses();
  }, [setExpenses]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              h-24
              animate-pulse
              rounded-2xl
              shadow-[inset_4px_4px_8px_#c9c2b8,inset_-4px_-4px_8px_#ffffff]
              bg-[#f7f1e8] dark:bg-neutral-900
              dark:shadow-none
            "
          />
        ))}
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <EmptyState
        icon="💸"
        title="No expenses yet"
        description="Start tracking your spending by adding your first expense."
      />
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense._id || expense.id}
          expense={expense}
          setExpenses={setExpenses}
        />
      ))}
    </div>
  );
}
