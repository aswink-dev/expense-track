"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WelcomeScreen({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-9999 flex min-h-screen items-center justify-center bg-[#f8f7f4] dark:bg-neutral-950"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onAnimationComplete={() => {
          setTimeout(() => {
            onComplete();
          }, 800);
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/logo.png"
            alt="ExpenseTrack"
            width={90}
            height={90}
            priority
            className="object-contain"
          />
        </motion.div>

        <motion.h1
          className="mt-5 text-3xl font-black tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span className="text-blue-500">Expense</span>
          <span className="text-green-500">Track</span>
        </motion.h1>

        <motion.p
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          Manage your money smarter
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
