"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-gray-200
          bg-white
          dark:border-gray-700
          dark:bg-gray-900
        "
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        border
        border-gray-200
        bg-white
        text-gray-600
        transition
        hover:bg-gray-50
        dark:border-gray-700
        dark:bg-gray-900
        dark:text-gray-300
        dark:hover:bg-gray-800
      "
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
