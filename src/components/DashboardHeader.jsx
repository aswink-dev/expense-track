"use client";

import { Wallet, Sparkles } from "lucide-react";

export default function DashboardHeader({ user }) {
  return (
    <div>

      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-[#f7f1e8]
          px-4
          py-2
          text-sm
          font-semibold
          text-blue-500
          shadow-[4px_4px_10px_#c9c2b8,-4px_-4px_10px_#ffffff]
          dark:bg-neutral-950
          dark:text-blue-400
          dark:shadow-none
        "
      >
        <Wallet size={16} />
        Personal Finance Dashboard
      </div>

      <div className="mt-5 flex items-center gap-3">
        <h1
          className="
            text-3xl
            font-black
            leading-tight
            tracking-tight
            text-gray-900
            dark:text-white
            sm:text-4xl
          "
        >
          Welcome back, {user?.name || "there"}
        </h1>

        <Sparkles
          size={24}
          className="
            hidden
            text-blue-500
            sm:block
            dark:text-blue-400
          "
        />
      </div>

      <p
        className="
          mt-3
          max-w-2xl
          text-base
          leading-relaxed
          text-gray-500
          dark:text-gray-400
        "
      >
        Here&apos;s an overview of your spending. Track your expenses, understand
        your habits, and stay in control of your financial goals.
      </p>

      <div className="mt-6 flex items-center gap-1.5">
        <div className="h-1.5 w-25 rounded-full bg-blue-500" />
        <div className="h-1.5 w-5 rounded-full bg-green-500" />
      </div>
    </div>
  );
}
