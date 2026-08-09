"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

// The pen scene touches window/canvas — keep it client-only, no SSR.
const PenScene = dynamic(
  () => import("./components/pen-scene").then((m) => m.PenScene),
  { ssr: false }
);

function NibScratch() {
  return (
    <svg className="nib-scratch" viewBox="0 0 84 14">
      <path d="M2 8 C 20 2, 34 12, 52 6 S 78 2, 82 7" />
    </svg>
  );
}

const collection = [
  { no: "001", name: "The Meridian", material: "Brushed steel · fine nib", price: "$185" },
  { no: "002", name: "The Foundry", material: "Ebonite · medium nib", price: "$240" },
  { no: "003", name: "The Cartographer", material: "Brass barrel · italic nib", price: "$210" },
  { no: "004", name: "The Solicitor", material: "Ebony resin · fine nib", price: "$260" },
];

export default function Home() {
  return (
    <div className="bg-paper">
      {/* ---------------- Hero ---------------- */}
      <section className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 pt-32 pb-16 lg:flex-row lg:gap-4 lg:px-10 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex w-full flex-col items-start gap-6 text-left lg:w-1/2"
        >
          <span className="label-mono">Est. Delhi — Handset in small runs</span>
          <h1 className="font-display text-5xl italic leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            A pen that
            <br />
            <span className="not-italic">earns its ink.</span>
          </h1>
          <NibScratch />
          <p className="max-w-md font-body text-lg leading-8 text-graphite">
            Brass-weighted, hand-balanced, and built to outlast the
            notebooks it fills. Every barrel is turned, polished, and
            tested before it leaves the bench.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#collection"
              className="rounded-full bg-ink px-7 py-3 font-body text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              Shop the collection
            </a>
            <a
              href="#craftsmanship"
              className="rounded-full border border-line px-7 py-3 font-body text-sm font-medium text-ink transition-colors hover:border-brass hover:text-brass"
            >
              How it's made
            </a>
          </div>
        </motion.div>

        <div className="w-full lg:w-1/2">
          <PenScene />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="hairline" />
      </div>

      {/* ---------------- Collection strip ---------------- */}
      <section id="collection" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="label-mono">The collection</span>
            <h2 className="mt-2 font-display text-3xl italic text-ink sm:text-4xl">
              Four pens, one standard.
            </h2>
          </div>
        </div>

        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {collection.map((pen, i) => (
            <motion.article
              key={pen.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group w-64 shrink-0 snap-start rounded-2xl border border-line bg-paper-raised p-6 transition-colors hover:border-brass"
            >
              <span className="label-mono">No. {pen.no}</span>
              <div className="my-6 flex h-32 items-center justify-center">
                <div className="h-24 w-1.5 rounded-full bg-gradient-to-b from-ink via-ink to-brass transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6" />
              </div>
              <h3 className="font-display text-xl italic text-ink">{pen.name}</h3>
              <p className="mt-1 font-body text-sm text-graphite">{pen.material}</p>
              <p className="mt-4 font-mono text-sm text-brass">{pen.price}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="hairline" />
      </div>

      {/* ---------------- Craftsmanship ---------------- */}
      <section
        id="craftsmanship"
        className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-2 lg:gap-16 lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="label-mono">Craftsmanship</span>
          <h2 className="mt-2 font-display text-3xl italic leading-tight text-ink sm:text-4xl">
            Six stages between bar stock and your desk.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {[
            ["Turning", "Brass and ebonite barrels are lathe-turned to a 0.1mm tolerance."],
            ["Nib grinding", "Each nib is hand-ground and tested across three paper weights."],
            ["Lacquer", "Four coats, cured and hand-polished between each pass."],
          ].map(([title, body], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4 border-b border-line pb-6 last:border-0"
            >
              <span className="font-mono text-sm text-brass">0{i + 1}</span>
              <div>
                <h3 className="font-display text-lg text-ink">{title}</h3>
                <p className="mt-1 font-body text-sm leading-6 text-graphite">{body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-line px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <span className="font-display text-lg italic text-ink">PenZone</span>
          <p className="font-mono text-xs text-graphite">
            © {new Date().getFullYear()} PenZone Pen Co. — Delhi
          </p>
        </div>
      </footer>
    </div>
  );
}