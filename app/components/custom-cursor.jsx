"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const INTERACTIVE_SELECTOR = "a, button, input, [role='button'], [data-cursor-hover]";

/**
 * Site-wide custom cursor shaped like a pen nib.
 * - Spring-follows the pointer with a slight lag, so it reads as a pen
 *   being dragged across the page rather than snapping to the mouse.
 * - Rotates to face the direction of travel.
 * - Turns brass and leaves a fading ink trail while hovering anything
 *   interactive (links, buttons).
 * Disabled entirely on touch/coarse-pointer devices.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [drops, setDrops] = useState([]);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  const rotate = useMotionValue(-38);
  const springRotate = useSpring(rotate, { damping: 22, stiffness: 220 });

  const last = useRef({ x: 0, y: 0, t: 0 });
  const dropTimer = useRef(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const now = performance.now();
      const dt = now - last.current.t;
      if (dt > 40) {
        const dx = e.clientX - last.current.x;
        const dy = e.clientY - last.current.y;
        if (Math.hypot(dx, dy) > 6) {
          rotate.set((Math.atan2(dy, dx) * 180) / Math.PI + 45);
        }
        last.current = { x: e.clientX, y: e.clientY, t: now };
      }
    };

    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(true);
    };
    const onOut = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(false);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // While hovering a link/button, drop small fading ink dots — the pen "writing".
  useEffect(() => {
    if (!enabled) return;
    if (hovering) {
      dropTimer.current = setInterval(() => {
        const id = Math.random().toString(36).slice(2);
        setDrops((prev) => [...prev.slice(-5), { id, x: x.get(), y: y.get() }]);
        setTimeout(() => {
          setDrops((prev) => prev.filter((d) => d.id !== id));
        }, 500);
      }, 140);
    }
    return () => clearInterval(dropTimer.current);
  }, [hovering, enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {drops.map((d) => (
        <motion.span
          key={d.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ left: d.x, top: d.y }}
          className="pointer-events-none fixed z-[999] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass"
        />
      ))}

      <motion.div
        style={{ left: springX, top: springY, rotate: springRotate }}
        animate={{ scale: pressed ? 0.85 : hovering ? 1.35 : 1 }}
        transition={{ scale: { duration: 0.18, ease: "easeOut" } }}
        className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2"
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          {/* body */}
          <path
            d="M17 2 L24 9 L10.5 22.5 L3 24 L4.5 16.5 L17 2 Z"
            fill={hovering ? "var(--brass)" : "var(--ink)"}
            style={{ transition: "fill 0.2s ease" }}
          />
          {/* cap facet */}
          <path
            d="M17 2 L24 9 L20.5 12.5 L13.5 5.5 L17 2 Z"
            fill={hovering ? "var(--brass-soft)" : "var(--graphite)"}
            style={{ transition: "fill 0.2s ease" }}
          />
          {/* tip */}
          <circle
            cx="4.5"
            cy="23"
            r="1.1"
            fill={hovering ? "var(--brass-soft)" : "var(--graphite)"}
            style={{ transition: "fill 0.2s ease" }}
          />
        </svg>
      </motion.div>
    </>
  );
}