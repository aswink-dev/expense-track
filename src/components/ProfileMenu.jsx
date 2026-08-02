"use client";

import { useState } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfileMenu({ user }) {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const router = useRouter();

  async function logout() {
    try {
      setLoggingOut(true);

      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Logout failed");
        return;
      }

      setOpen(false);

      toast.success("Logged out successfully");

      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="
            rounded-2xl
            bg-[#f7f1e8]
            px-4
            py-2.5
            text-sm
            font-semibold
            text-gray-700
            shadow-[5px_5px_12px_#c9c2b8,-5px_-5px_12px_#ffffff]
            transition
            hover:-translate-y-0.5
            dark:bg-neutral-900
            dark:text-gray-300
            dark:shadow-none
            dark:hover:bg-neutral-800
          "
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => router.push("/register")}
          className="
            rounded-2xl
            bg-blue-500
            px-5
            py-2.5
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
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full md:w-auto">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="
    flex
    w-full
    h-10
    items-center
    gap-3
    rounded-xl
    border
    border-gray-200
    bg-white
    px-3
    py-2
    transition
    hover:bg-gray-50
    dark:border-gray-700
    dark:bg-gray-900
    dark:hover:bg-gray-800
    md:w-auto
  "
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
          {user.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
            {user.name || "User"}
          </p>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="
              absolute
              right-0
              z-50
              mt-4
              w-64
              overflow-hidden
              rounded-3xl
              bg-[#f7f1e8]
              p-2
              shadow-[10px_10px_25px_#c9c2b8,-10px_-10px_25px_#ffffff]
              dark:bg-neutral-900
              dark:shadow-none
            "
          >
            <div
              className="
                rounded-2xl
                bg-[#f7f1e8]
                px-4
                py-4
                dark:bg-neutral-800
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-500
                    text-white
                    shadow-md
                  "
                >
                  <User size={21} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                    {user.name || "User"}
                  </p>

                  {user.email && (
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              disabled={loggingOut}
              className="
                mt-2
                flex
                w-full
                items-center
                gap-3
                rounded-2xl
                px-4
                py-3
                text-sm
                font-semibold
                text-red-500
                transition
                hover:bg-red-500/10
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:text-red-400
                dark:hover:bg-red-500/10
              "
            >
              <LogOut size={19} />

              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
