"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f7f4] px-6 py-16 dark:bg-neutral-900">
      <div className="w-full max-w-lg text-center">
        <Link href="/" className="inline-block">
          <Image
            src="/logo.png"
            alt="ExpenseTrack"
            width={220}
            height={60}
            priority
            className="mx-auto h-auto w-[180px]"
          />
        </Link>
        <p className="mt-4 text-7xl font-black tracking-tight text-blue-500 sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back to your financial dashboard.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="
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
              hover:-translate-y-0.5
              hover:bg-blue-600
            "
          >
            <Home size={17} />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-[#f7f1e8]
              border
              border-gray-500
              px-6
              py-3
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
            <ArrowLeft size={17} />
            Go Back
          </button>
        </div>
        <p className="mt-10 text-xs text-gray-400 dark:text-gray-600">
          ExpenseTrack · Your personal finance companion
        </p>
      </div>
    </main>
  );
}
