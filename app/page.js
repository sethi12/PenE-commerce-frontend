"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, ArrowRight, Package } from "lucide-react";
import { Footer } from "./components/footer";

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

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const response = await fetch(`${baseUrl}/api/products`);
        
        if (response.ok) {
          const data = await response.json();
          const productList = data.products || data;
          // Take the first 4 products for the home collection showcase
          setProducts(productList.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch products for home showcase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
              Curated instruments, uncompromising standard.
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="flex h-48 w-full items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-brass" />
          </div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center font-body text-graphite text-sm">
            No instruments available at the moment.
          </div>
        ) : (
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {products.map((product, i) => {
              const productId = product._id || product.id;
              const productName = product.name || "Signature Instrument";
              const productPrice = product.discountedPrice || product.price || 0;
              const imageUrl = product.mainImage?.url;

              return (
                <motion.article
                  key={productId}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group w-72 sm:w-80 shrink-0 snap-start flex flex-col"
                >
                  {/* Large Border Image Frame */}
                  <Link href={`/products/${productId}`} className="group/img block">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-500 group-hover:border-brass group-hover:shadow-xl group-hover:shadow-brass/5">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={productName}
                          fill
                          className="object-contain p-8 transition-transform duration-700 ease-out group-hover/img:scale-105"
                          sizes="(max-width: 768px) 100vw, 320px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Package className="h-10 w-10 text-graphite/20" />
                        </div>
                      )}

                      {/* Numbering Pill */}
                      <div className="absolute left-4 top-4 z-10">
                        <span className="rounded-full border border-line bg-paper/80 px-2.5 py-1 font-mono text-[10px] text-brass backdrop-blur-sm">
                          {String(i + 1).padStart(3, "0")}
                        </span>
                      </div>

                      {/* Explore Hover Button */}
                      <div className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper/90 opacity-0 backdrop-blur-md transition-all duration-300 group-hover/img:opacity-100 group-hover/img:border-brass group-hover/img:bg-brass group-hover/img:text-paper">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>

                  {/* Product Information Below */}
                  <div className="mt-4 flex flex-col gap-1 px-1">
                    <div className="flex items-center justify-between">
                      <Link href={`/products/${productId}`}>
                        <h3 className="font-display text-xl italic text-ink transition-colors group-hover:text-brass line-clamp-1">
                          {productName}
                        </h3>
                      </Link>
                      <span className="font-mono text-sm font-medium text-brass">
                        ₹{Number(productPrice).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <p className="font-body text-xs text-graphite line-clamp-1">
                      {product.description || "Hand-balanced writing instrument."}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
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

    
    </div>
  );
}