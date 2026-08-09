"use client";

import { motion } from "motion/react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="relative flex h-7 w-14 items-center rounded-full border border-line bg-paper-raised px-1 transition-colors"
    >
      <motion.span
        className="flex h-5 w-5 items-center justify-center rounded-full bg-brass text-[10px] text-paper"
        animate={{ x: isDark ? 26 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      >
        {isDark ? "☾" : "☼"}
      </motion.span>
    </button>
  );
}