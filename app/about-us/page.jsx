"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Feather,
  Cpu,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Compass,
  Award,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../components/theme-provider";

// Reusable animation variants for scroll reveals
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function AboutPage() {
  const { theme } = useTheme();
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const values = [
    {
      icon: Feather,
      title: "Artisanal Heritage",
      description:
        "Every fountain pen nib is hand-balanced, ground, and tested in our Delhi studio to deliver effortless ink flow.",
    },
    {
      icon: Cpu,
      title: "3D Engineering Precision",
      description:
        "We push the boundaries of creative technology with high-precision 3D pens designed for architects, designers, and creators.",
    },
    {
      icon: ShieldCheck,
      title: "Built for Generations",
      description:
        "Machined from solid brass, titanium, and resin, our writing instruments are built to outlast the notebooks they fill.",
    },
  ];

  const milestones = [
    { value: "12,000+", label: "Instruments Crafted" },
    { value: "100%", label: "Hand-Finished & Inspected" },
    { value: "Delhi, IN", label: "Master Atelier Origin" },
    { value: "4.9 / 5", label: "Global Collector Rating" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-paper font-body text-ink transition-colors duration-500 selection:bg-brass selection:text-paper">
      
      {/* ───────── Mobile Top Bar (Ensuring Page is Reachable & Navigable) ─────────
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-line bg-paper/80 px-6 py-4 backdrop-blur-md md:hidden">
        <a href="/" className="font-display text-lg font-semibold tracking-tight text-ink">
          Pen<span className="text-brass">Zone</span>
        </a>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-paper-raised text-ink"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {/* <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[73px] z-40 border-b border-line bg-paper p-6 shadow-2xl md:hidden"
          >
            <nav className="flex flex-col gap-4 font-mono text-sm uppercase tracking-wider">
              <a href="/shop" onClick={() => setMobileMenuOpen(false)} className="py-2 text-ink hover:text-brass">
                Shop Archive
              </a>
              <a href="/collections" onClick={() => setMobileMenuOpen(false)} className="py-2 text-ink hover:text-brass">
                Collections
              </a>
              <a href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-brass">
                Our Story
              </a>
              <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-ink hover:text-brass">
                Contact Us
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────── Ambient Background Glows (Animated) ───────── */}
      {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[-10%] h-[300px] w-[300px] rounded-full bg-brass/10 blur-[100px] md:h-[600px] md:w-[600px] md:blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute right-[-10%] top-[30%] h-[250px] w-[250px] rounded-full bg-brass/5 blur-[90px] md:h-[500px] md:w-[500px] md:blur-[120px]"
        />
        <div className="absolute bottom-[-10%] left-[-5%] h-[300px] w-[300px] rounded-full bg-line/20 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-20 px-6 py-12 md:space-y-32 md:px-10 md:py-32">
         */} 
        {/* ───────── 1. Hero Section ───────── */}
        <motion.section 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="mx-auto max-w-4xl space-y-6 text-center md:space-y-8"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-brass backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              The Atelier Story
            </div>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl md:text-7xl">
            Where tactile heritage meets <br className="hidden md:block" />
            <span className="italic text-brass">architectural innovation.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-base font-light leading-relaxed text-graphite md:text-xl">
            Born in the vibrant heart of Delhi, PenZone was founded on a singular principle: writing instruments should be as precise as architectural blueprints and as expressive as fine art.
          </motion.p>
        </motion.section>

        {/* ───────── 2. Story Grid Section ───────── */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12"
        >
          {/* Visual Showcase Box */}
          <motion.div variants={fadeUp} className="group relative lg:col-span-6">
            <div className="relative flex h-[380px] w-full flex-col justify-end overflow-hidden rounded-[2rem] border border-line bg-paper-raised p-6 shadow-2xl transition-transform duration-700 hover:scale-[1.02] sm:h-[450px] md:h-[550px] md:p-8">
              
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-paper-raised via-paper-raised/40 to-transparent" />
              
              {/* Decorative Matrix Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(var(--tw-gradient-stops))] from-brass/20 to-transparent [background-size:24px_24px] opacity-30" />

              <div className="relative z-20 space-y-4">
                <div className="inline-block rounded-lg border border-brass/20 bg-paper/50 px-3 py-1 font-mono text-xs uppercase tracking-widest text-brass backdrop-blur-md">
                  Est. Delhi Atelier
                </div>
                <h3 className="text-2xl font-semibold leading-snug text-ink md:text-3xl">
                  Hand-turned barrels, <br/> ground in-house.
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-graphite md:text-base">
                  From traditional brass fountain pens to high-precision 3D pens, every creation undergoes multi-stage polishing and calibration by our master artisans.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text Narrative */}
          <motion.div variants={fadeUp} className="space-y-6 lg:col-span-6 lg:pl-10 md:space-y-8">
            <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-brass">
              <Compass className="h-4 w-4" />
              Our Philosophy
            </div>

            <h2 className="text-3xl font-semibold leading-snug tracking-tight text-ink md:text-4xl lg:text-5xl">
              Crafting instruments <br/> that earn their ink.
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-graphite md:text-base lg:text-lg">
              <p>
                In an increasingly digital world, the physical act of writing or drawing remains irreplaceable. PenZone started as a boutique workshop dedicated to repairing vintage nibs and crafting custom fountain pens for Delhi's calligraphers.
              </p>
              <p>
                Today, we have evolved into a hybrid studio. We combine century-old nib-fitting techniques with cutting-edge 3D filament pens—enabling creators to draw not just on paper, but directly into the air.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 rounded-2xl border border-line bg-paper-raised px-4 py-3 font-mono text-xs text-ink transition-colors hover:border-brass/50">
                <MapPin className="h-4 w-4 text-brass" />
                Delhi Studio & Lab
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-line bg-paper-raised px-4 py-3 font-mono text-xs text-ink transition-colors hover:border-brass/50">
                <Award className="h-4 w-4 text-brass" />
                Lifetime Guarantee
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ───────── 3. Core Pillars / Values ───────── */}
        <section className="space-y-12 md:space-y-16">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mx-auto max-w-2xl space-y-3 text-center md:space-y-4"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">The PenZone Pillars</h2>
            <p className="text-base text-graphite md:text-lg">
              How we approach every barrel, nib, and filament extruding pen we produce.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  variants={fadeUp}
                  key={item.title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-line bg-paper-raised p-6 transition-all duration-500 hover:-translate-y-2 hover:border-brass/40 hover:shadow-2xl hover:shadow-brass/5 md:p-8"
                >
                  <div className="absolute right-0 top-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-brass/5 blur-3xl transition-all duration-500 group-hover:bg-brass/15" />
                  
                  <div className="relative z-10 space-y-4 md:space-y-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brass/20 bg-brass/10 text-brass transition-transform duration-500 group-hover:scale-110 md:h-14 md:w-14">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-ink md:text-2xl">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-graphite md:text-base">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ───────── 4. Stats Bar ───────── */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative overflow-hidden rounded-[2rem] border border-line bg-paper-raised p-8 sm:p-12 md:rounded-[2.5rem] md:p-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brass/5 via-transparent to-brass/5 opacity-50" />
          <div className="relative z-10 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-8">
            {milestones.map((stat) => (
              <div key={stat.label} className="space-y-2 text-center">
                <p className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-graphite sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ───────── 5. CTA Banner ───────── */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="group relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[2rem] border border-brass/30 bg-gradient-to-br from-brass/15 via-paper-raised to-paper p-8 md:flex-row md:rounded-[2.5rem] sm:p-16"
        >
          {/* Animated background element for CTA */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brass/20 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-brass/30" />

          <div className="relative z-10 space-y-3 text-center md:text-left md:space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl md:text-4xl">
              Ready to find your signature instrument?
            </h3>
            <p className="max-w-xl text-sm text-graphite md:text-lg">
              Explore our curated fountain pen collections or dive into next-generation 3D drafting tools.
            </p>
          </div>

          <div className="relative z-10 w-full shrink-0 md:w-auto">
            <a
              href="/collections"
              className="group/btn flex w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-base font-medium text-paper transition-all hover:bg-brass hover:shadow-[0_0_20px_rgba(var(--brass-rgb),0.3)] md:w-auto"
            >
              Browse Collections
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </div>
        </motion.section>

      </div>

  );
}