"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/components/AuthProvider";
import DashboardPreview from "@/components/DashboardPreview";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <main className="min-h-screen bg-[#f7f1e8] dark:bg-neutral-950">
      {/* Navbar */}

      <Navbar />

      {/* Hero Section */}

      <section
        className="
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-14
          px-6
          py-16
          sm:py-20
          lg:grid-cols-2
          lg:gap-20
          lg:px-8
          lg:py-28
        "
      >
        {/* Left Content */}

        <div>
          {/* Badge */}

          <div
            className="
              mb-6
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
              dark:bg-neutral-900
              dark:text-blue-400
              dark:shadow-none
            "
          >
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Your personal finance companion
          </div>

          {/* Heading */}

          <h1
            className="
              max-w-2xl
              text-5xl
              font-black
              leading-[1.05]
              tracking-tight
              text-gray-900
              sm:text-6xl
              lg:text-7xl
              dark:text-white
            "
          >
            Manage Your Money
            <span className="block text-blue-500 dark:text-blue-400">
              Like A Personal Ledger
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-6
              max-w-xl
              text-lg
              leading-relaxed
              text-gray-600
              dark:text-gray-400
            "
          >
            Track expenses, understand your spending, and build better
            financial habits with a beautiful personal finance dashboard.
          </p>

          {/* Authentication Buttons */}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {loading ? (
              <div
                className="
                  h-12
                  w-36
                  animate-pulse
                  rounded-2xl
                  bg-[#f7f1e8]
                  shadow-[inset_4px_4px_8px_#c9c2b8,inset_-4px_-4px_8px_#ffffff]
                  dark:bg-neutral-900
                  dark:shadow-none
                "
              />
            ) : user ? (
              <Link
                href="/dashboard"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-500
                  px-7
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  transition
                  hover:-translate-y-0.5
                  hover:bg-blue-600
                "
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-500
                    px-7
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    transition
                    hover:-translate-y-0.5
                    hover:bg-blue-600
                  "
                >
                  Get Started
                </Link>

                <Link
                  href="/login"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#f7f1e8]
                    px-7
                    py-3.5
                    text-sm
                    font-semibold
                    text-gray-700
                    shadow-[5px_5px_12px_#c9c2b8,-5px_-5px_12px_#ffffff]
                    transition
                    hover:-translate-y-0.5
                    dark:bg-neutral-900
                    dark:text-gray-300
                    dark:shadow-none
                  "
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Benefits */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-x-6
              gap-y-3
              text-sm
              font-medium
              text-gray-500
              dark:text-gray-400
            "
          >
            <span className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              Track expenses
            </span>

            <span className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              View spending insights
            </span>

            <span className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              Manage your budget
            </span>
          </div>
        </div>

        {/* Dashboard Preview */}

        <div className="relative">
          {/* Background Glow */}

          <div
            className="
              absolute
              -inset-5
              -z-10
              rounded-[2.5rem]
              bg-blue-200/40
              blur-3xl
              dark:bg-blue-900/20
            "
          />

          {/* Preview Card */}

          <div
            className="
              rounded-3xl
              bg-[#f7f1e8]
              p-3
              shadow-[10px_10px_25px_#c9c2b8,-10px_-10px_25px_#ffffff]
              dark:bg-neutral-900
              dark:shadow-none
            "
          >
            <DashboardPreview user={user} />
          </div>
        </div>
      </section>
    </main>
  );
}