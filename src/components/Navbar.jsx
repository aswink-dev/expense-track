"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import ProfileMenu from "./ProfileMenu";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "./AuthProvider";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { user, loading } = useAuth();

  return (
    <nav
      className="
        sticky
        top-0
        z-40
        border-b
        border-gray-200/60
        bg-[#f7f1e8]/95
        backdrop-blur
        dark:border-gray-800
        dark:bg-neutral-950/95
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
          lg:px-8
        "
      >
        {/* Logo */}

        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt=""
            className="h-15 w-15 object-contain"
          />
          <span className="text-2xl font-black tracking-tight">
            <span className="text-blue-500">Expense</span>
            <span className="text-green-500">Track</span>
          </span>
        </div>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/"
            className="
              rounded-xl
              px-4
              py-2
              text-sm
              font-semibold
              text-gray-600
              transition
              hover:bg-black/5
              hover:text-gray-900
              dark:text-gray-400
              dark:hover:bg-white/5
              dark:hover:text-white
            "
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="
              rounded-xl
              px-4
              py-2
              text-sm
              font-semibold
              text-gray-600
              transition
              hover:bg-black/5
              hover:text-gray-900
              dark:text-gray-400
              dark:hover:bg-white/5
              dark:hover:text-white
            "
          >
            Dashboard
          </Link>

          {/* Profile */}

          {loading ? (
            <div
              className="
                h-12
                w-32
                animate-pulse
                rounded-2xl
                bg-black/5
                dark:bg-white/5
              "
            />
          ) : (
            <ProfileMenu user={user} />
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-[#f7f1e8]
            text-gray-700
            shadow-[5px_5px_12px_#c9c2b8,-5px_-5px_12px_#ffffff]
            transition
            hover:-translate-y-0.5
            dark:bg-neutral-900
            dark:text-gray-300
            dark:shadow-none
            dark:hover:bg-neutral-800
            md:hidden
          "
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div
          className="
            border-t
            border-gray-200/60
            bg-[#f7f1e8]
            px-6
            py-5
            dark:border-gray-800
            dark:bg-neutral-950
            md:hidden
          "
        >
          {/* Navigation Links */}

          <div className="space-y-2">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="
                block
                rounded-2xl
                px-4
                py-3
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:bg-black/5
                dark:text-gray-300
                dark:hover:bg-white/5
              "
            >
              Home
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="
                block
                rounded-2xl
                px-4
                py-3
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:bg-black/5
                dark:text-gray-300
                dark:hover:bg-white/5
              "
            >
              Dashboard
            </Link>
          </div>

          {/* Bottom Controls */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-between
              border-t
              border-gray-200/60
              pt-5
              dark:border-gray-800
            "
          >
            {/* Profile */}

            {!loading && <ProfileMenu user={user} />}

            {/* Theme Toggle - Last */}

            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
