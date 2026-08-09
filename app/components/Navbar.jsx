"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import { useTheme } from "./theme-provider";

export function PenZoneLogo() {
  const { theme } = useTheme();

  return (
    <a href="/" className="group flex items-center gap-2.5" aria-label="PenZone home">
      <Image
        src="/logo.png"
        alt="PenZone Logo"
        width={240}
        height={80}
        priority
        className={`h-12 w-auto object-contain transition-all duration-300 ease-out group-hover:scale-105 ${
          theme === "dark" ? "brightness-0 invert" : ""
        }`}
      />
    </a>
  );
}

function NavLink({ children, ...props }) {
  return (
    <a
      {...props}
      className="group relative inline-flex items-center py-1 text-graphite transition-colors duration-300 hover:text-brass"
    >
      <span className="mr-0 h-1 w-1 scale-0 rounded-full bg-brass opacity-0 transition-all duration-300 ease-out group-hover:mr-1.5 group-hover:scale-100 group-hover:opacity-100" />
      <span className="relative transition-[letter-spacing] duration-300 group-hover:tracking-wide">
        {children}
        <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-brass transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </span>
    </a>
  );
}

function IconButton({ children, label, onClick, badge, className = "" }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full text-ink transition-all duration-200 hover:scale-110 hover:bg-brass/10 hover:text-brass ${className}`}
    >
      {children}
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brass font-mono text-[9px] text-paper">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ["Collection", "Brands", "Sale", "About Us"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSolidHeader = scrolled || mobileMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isSolidHeader
          ? "border-b border-line bg-paper/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <PenZoneLogo />

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 font-body text-sm md:flex">
          {navLinks.map((item) => (
            <li key={item}>
              <NavLink href="#">{item}</NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          {/* Search Toggle */}
          <div className="flex items-center">
            <AnimatePresence initial={false}>
              {searchOpen && (
                <motion.input
                  key="search"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 150, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  type="text"
                  placeholder="Search 3D pens…"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                  className="mr-1 h-9 rounded-full border border-line bg-paper-raised px-3 font-body text-sm text-ink outline-none placeholder:text-graphite md:w-[180px]"
                />
              )}
            </AnimatePresence>
            <IconButton label="Search" onClick={() => setSearchOpen((v) => !v)}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
                <line x1="11.2" y1="11.2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </IconButton>
          </div>

          {/* Desktop Login */}
          <IconButton label="Log in" className="hidden md:flex">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <circle cx="8.5" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.3" />
              <path d="M2.5 15c1-3.2 3.6-5 6-5s5 1.8 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </IconButton>

          <IconButton label="Bag" badge={2}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M4 6h9l-.7 8.5a1 1 0 01-1 .9H5.7a1 1 0 01-1-.9L4 6z" stroke="currentColor" strokeWidth="1.3" />
              <path d="M6.2 6V4.3a2.3 2.3 0 014.6 0V6" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </IconButton>

          <div className="ml-1 hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <div className="ml-1 md:hidden">
            <IconButton
              label="Toggle menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                {mobileMenuOpen ? (
                  <path d="M4 4L13 13M13 4L4 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                ) : (
                  <path d="M3 5H14M3 8.5H14M3 12H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                )}
              </svg>
            </IconButton>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-paper/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col px-6 py-6 font-body text-base text-ink">
              <ul className="flex flex-col gap-5">
                {navLinks.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      onClick={() => setMobileMenuOpen(false)}
                      className="group relative inline-flex w-fit items-center transition-colors duration-300 hover:text-brass"
                    >
                      <span className="mr-0 h-1 w-1 scale-0 rounded-full bg-brass opacity-0 transition-all duration-300 ease-out group-hover:mr-1.5 group-hover:scale-100 group-hover:opacity-100" />
                      <span className="relative">
                        {item}
                        <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-brass transition-transform duration-300 ease-out group-hover:scale-x-100" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <hr className="my-6 border-line" />

              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="group flex items-center gap-2 text-graphite transition-colors duration-300 hover:text-brass"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="transition-colors group-hover:text-brass">
                    <circle cx="8.5" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M2.5 15c1-3.2 3.6-5 6-5s5 1.8 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <span>Log in</span>
                </a>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}