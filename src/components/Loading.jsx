"use client";

import { motion } from "framer-motion";

export default function Loading({ message = "Loading..." }) {
  return (
    <main className="min-h-screen bg-[#f7f1e8] px-6 py-10 dark:bg-neutral-950">
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-3xl
            bg-[#f7f1e8]
            px-10
            py-8
            shadow-[10px_10px_25px_#c9c2b8,-10px_-10px_25px_#ffffff]
            dark:bg-neutral-900
            dark:shadow-none
          "
        >
          {/* Spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              h-10
              w-10
              rounded-full
              border-4
              border-gray-200
              border-t-blue-500
              dark:border-neutral-700
              dark:border-t-blue-400
            "
          />

          {/* Message */}
          <p className="mt-5 text-sm font-semibold text-gray-600 dark:text-gray-300">
            {message}
          </p>
        </motion.div>
      </div>
    </main>
  );
}
