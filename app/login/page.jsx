"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, ArrowRight, PenTool, Loader2, Eye, EyeOff } from "lucide-react";
import { useTheme } from "../components/theme-provider";

export default function AuthPage() {
  const { theme } = useTheme();
  
  // UI States
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Optimized smooth form transition variants
  const formVariants = {
    hidden: (isLoginState) => ({
      opacity: 0,
      x: isLoginState ? -20 : 20,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (isLoginState) => ({
      opacity: 0,
      x: isLoginState ? 20 : -20,
      transition: { duration: 0.2, ease: "easeIn" },
    }),
  };

  const toggleAuthMode = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setError("");
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (!isLogin && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    try {
      setIsSubmitting(true);

      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const body = isLogin
        ? { email: email.trim(), password }
        : { name: name.trim(), email: email.trim(), password };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      setPassword("");
      if (!isLogin) {
        setName("");
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Authentication error:", error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper px-4 py-12 font-body text-ink selection:bg-brass selection:text-paper">
      
      {/* ───────── Optimized Static Ambient Glows (No CPU-heavy infinite loops) ───────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-brass/10 blur-[90px]" />
        <div className="absolute bottom-[-10%] right-[10%] h-[400px] w-[400px] rounded-full bg-line/20 blur-[80px]" />
      </div>

      {/* ───────── Auth Container ───────── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Reduced heavy backdrop blur from xl to md for smooth rendering */}
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-paper-raised p-8 shadow-xl backdrop-blur-md sm:p-12">
          
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(var(--tw-gradient-stops))] from-brass/10 to-transparent [background-size:16px_16px] opacity-30" />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-10 text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-brass/20 bg-brass/10 text-brass">
                <PenTool className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-ink">
                {isLogin ? "Welcome Back" : "Join the Atelier"}
              </h1>
              <p className="mt-2 text-sm text-graphite">
                {isLogin
                  ? "Enter your credentials to access your collection."
                  : "Sign up to begin your journey with PenZone."}
              </p>
            </div>

            {/* Form Area */}
            <div className="relative">
              <AnimatePresence custom={isLogin} mode="wait">
                <motion.form
                  key={isLogin ? "login" : "signup"}
                  custom={isLogin}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full space-y-5"
                  onSubmit={handleSubmit}
                >
                  
                  {/* Signup Name Field */}
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="font-mono text-xs uppercase tracking-widest text-graphite">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-graphite/50" />
                        <input
                          type="text"
                          placeholder="Architect John"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={isSubmitting}
                          className="w-full rounded-xl border border-line bg-paper py-3 pl-12 pr-4 text-sm text-ink outline-none transition-all placeholder:text-graphite/40 focus:border-brass focus:ring-1 focus:ring-brass/50 disabled:opacity-50"
                        />
                      </div>
                    </div>
                  )}

                  {/* Shared Email Field */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-graphite">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-graphite/50" />
                      <input
                        type="email"
                        placeholder="john@studio.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-line bg-paper py-3 pl-12 pr-4 text-sm text-ink outline-none transition-all placeholder:text-graphite/40 focus:border-brass focus:ring-1 focus:ring-brass/50 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Shared Password Field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-mono text-xs uppercase tracking-widest text-graphite">
                        Password
                      </label>
                      {isLogin && (
                        <a href="#" className="text-xs text-brass transition-colors hover:text-ink">
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-graphite/50" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-line bg-paper py-3 pl-12 pr-12 text-sm text-ink outline-none transition-all placeholder:text-graphite/40 focus:border-brass focus:ring-1 focus:ring-brass/50 disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isSubmitting}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-graphite/50 transition-colors hover:text-ink disabled:opacity-50"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error State */}
                  {error && (
                    <div className="rounded-xl border border-red-900/30 bg-red-500/10 px-4 py-3 text-sm text-red-500 dark:text-red-400">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3.5 text-sm font-medium text-paper transition-all duration-200 hover:bg-brass hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {isLogin ? "Signing In..." : "Creating Account..."}
                      </>
                    ) : (
                      <>
                        {isLogin ? "Sign In" : "Create Account"}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              </AnimatePresence>
            </div>

            {/* Toggle Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-graphite">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  disabled={isSubmitting}
                  className="font-medium text-brass transition-all hover:text-ink hover:underline hover:underline-offset-4 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}