"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import Navbar from "@/components/Navbar";
import DashboardHeader from "@/components/DashboardHeader";
import SummaryCards from "@/components/SummaryCards";
import ExpenseList from "@/components/ExpenseList";
import ExpenseChart from "@/components/ExpenseChart";
import MonthlyChart from "@/components/MonthlyChart";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoadingUser(false);
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/expenses/stats", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    }

    loadStats();
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f1e8] dark:bg-neutral-950 text-gray-900  dark:text-white">
      {/* Navbar */}

      <Navbar user={user} loading={loadingUser} />

      {/* Dashboard */}

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        {/* Header */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <DashboardHeader user={user} />

          <Link
            href="/expenses/new"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              bg-gray-900
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:-translate-y-0.5
              hover:bg-gray-800
              dark:bg-white
              dark:text-gray-900
              dark:hover:bg-gray-100
            "
          >
            <Plus size={18} />
            Add Expense
          </Link>
        </div>

        {/* Summary Cards */}

        <div className="mt-8">
          <SummaryCards expenses={expenses} />
        </div>

        {/* Charts */}

        {stats && (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Category Chart */}

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                dark:border-gray-800
                dark:bg-gray-900
              "
            >
              <ExpenseChart data={stats.categories} />
            </div>

            {/* Monthly Chart */}

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                dark:border-gray-800
                dark:bg-gray-900
              "
            >
              <MonthlyChart data={stats.monthlyData} />
            </div>
          </div>
        )}

        {/* Recent Expenses */}

        <div
          className="
            mt-8
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-sm
            dark:border-gray-800
            dark:bg-gray-900
          "
        >
          {/* Section Header */}

          <div
            className="
              flex
              flex-col
              gap-3
              border-b
              border-gray-100
              px-6
              py-5
              sm:flex-row
              sm:items-center
              sm:justify-between
              dark:border-gray-800
            "
          >
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Recent Expenses
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Keep track of your latest spending activity.
              </p>
            </div>

            <Link
              href="/expenses/new"
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-xl
                border
                border-gray-200
                px-4
                py-2
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:bg-gray-50
                dark:border-gray-700
                dark:text-gray-200
                dark:hover:bg-gray-800
              "
            >
              <Plus size={16} />
              Add Expense
            </Link>
          </div>

          {/* Expense List */}

          <div className="p-6">
            <ExpenseList expenses={expenses} setExpenses={setExpenses} />
          </div>
        </div>
      </section>
    </main>
  );
}
