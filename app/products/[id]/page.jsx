"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Loader2,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Zap,
  Plus,
  Minus,
  Fingerprint,
} from "lucide-react";

function NibScratch() {
  return (
    <svg className="nib-scratch" viewBox="0 0 84 14">
      <path d="M2 8 C 20 2, 34 12, 52 6 S 78 2, 82 7" />
    </svg>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id;

  const [product, setProduct] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(true);

  // Quantity and purchase states
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Image gallery states
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const allImagesRef = useRef([]);

  // Auto-scroll effect for gallery (4s delay per image as requested)
  useEffect(() => {
    if (allImagesRef.current.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % allImagesRef.current.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [product]);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetails = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${baseUrl}/api/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        const prod = data.product || data;
        setProduct(prod);

        // Collect all images for the slider
        const imagesList = [];
        if (prod.mainImage?.url) imagesList.push(prod.mainImage.url);
        if (prod.otherImages && Array.isArray(prod.otherImages)) {
          prod.otherImages.forEach((img) => {
            if (img?.url) imagesList.push(img.url);
          });
        }
        allImagesRef.current = imagesList;

        // Fetch Brand Name if ID exists
        if (prod.brand) {
          try {
            const brandRes = await fetch(`${baseUrl}/api/brands`);
            if (brandRes.ok) {
              const brandData = await brandRes.json();
              const brands = brandData.brands || brandData;
              const matchedBrand = brands.find(
                (b) => (b.id || b._id) === prod.brand
              );
              if (matchedBrand) setBrandName(matchedBrand.name);
            }
          } catch (err) {
            console.error("Failed to fetch brand name", err);
          }
        }

        // Fetch Collection Name if ID exists
        if (prod.collection) {
          try {
            const colRes = await fetch(`${baseUrl}/api/collections`);
            if (colRes.ok) {
              const colData = await colRes.json();
              const collections = colData.collections || colData;
              const matchedCol = collections.find(
                (c) => (c.id || c._id) === prod.collection
              );
              if (matchedCol) setCollectionName(matchedCol.name);
            }
          } catch (err) {
            console.error("Failed to fetch collection name", err);
          }
        }
      } catch (error) {
        console.error("Error loading product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Handler for swiping/dragging vertically on the image frame
  const handleDragEnd = (e, info) => {
    const swipeThreshold = 30;
    if (allImagesRef.current.length <= 1) return;

    if (info.offset.y < -swipeThreshold) {
      setActiveImageIndex((prev) => (prev + 1) % allImagesRef.current.length);
    } else if (info.offset.y > swipeThreshold) {
      setActiveImageIndex((prev) => (prev - 1 + allImagesRef.current.length) % allImagesRef.current.length);
    }
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleBuyNow = () => {
    router.push(`/checkout?product=${productId}&qty=${quantity}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center bg-paper">
        <Loader2 className="h-8 w-8 animate-spin text-brass" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
        <h2 className="font-display text-2xl italic text-ink">Instrument not found</h2>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-full border border-line bg-paper px-6 py-2.5 font-mono text-xs uppercase text-ink transition-colors hover:border-brass hover:text-brass"
        >
          <ArrowLeft className="h-4 w-4" /> Return to archive
        </button>
      </div>
    );
  }

  const currentImageUrl = allImagesRef.current[activeImageIndex] || product.mainImage?.url;
  const productRef = String(product.id || productId).slice(-6).toUpperCase();

  const discountPercent =
    product.price && product.discountedPrice && product.price > product.discountedPrice
      ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
      : null;

  const renderConditionBadge = (condition) => {
    if (!condition) return null;
    const lower = condition.toLowerCase();
    let badgeStyle = "border-line text-graphite";
    if (lower === "fresh") badgeStyle = "border-brass/40 text-brass bg-brass/5";
    else if (lower === "sale") badgeStyle = "border-amber-500/40 text-amber-600 bg-amber-500/5";
    else if (lower === "preowned") badgeStyle = "border-graphite/40 text-graphite bg-graphite/5";

    return (
      <span className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider capitalize ${badgeStyle}`}>
        {condition}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-paper px-6 py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Navigation back */}
        <button
          onClick={() => router.back()}
          className="group mb-12 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-graphite transition-colors hover:text-brass"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to collection
        </button>

        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left Column: Image frame */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="group relative aspect-[4/5] w-full cursor-grab overflow-hidden rounded-[2rem] border border-line bg-paper-raised shadow-2xl shadow-brass/5 transition-all duration-500 hover:border-brass active:cursor-grabbing"
            >
              <AnimatePresence mode="wait">
                {currentImageUrl && (
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentImageUrl}
                      alt={product.name || "Writing Instrument"}
                      fill
                      priority
                      className="object-contain p-10 sm:p-14"
                      sizes="(max-width: 1024px) 100vw, 600px"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Authenticity stamp, top-left */}
              <div className="absolute left-6 top-6 z-10 flex items-center gap-1.5 rounded-full border border-line bg-paper/85 px-3 py-1.5 backdrop-blur-md">
                <ShieldCheck className="h-3 w-3 text-brass" />
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-graphite">
                  Authenticated
                </span>
              </div>

              {/* Frame counter, top-right — quiet, not the main navigation cue */}
              {allImagesRef.current.length > 1 && (
                <div className="absolute right-6 top-6 z-10 font-mono text-[10px] tracking-widest text-graphite/70">
                  FIG. {String(activeImageIndex + 1).padStart(2, "0")} / {String(allImagesRef.current.length).padStart(2, "0")}
                </div>
              )}

              {/* Bottom fade for legibility of dots/hint over busy images */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper-raised/90 to-transparent" />

              {/* Dot pagination — the primary navigation cue */}
              {allImagesRef.current.length > 1 && (
                <div className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                  {allImagesRef.current.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View image ${idx + 1}`}
                      className="p-1"
                    >
                      <span
                        className={`block rounded-full transition-all duration-300 ${
                          activeImageIndex === idx
                            ? "h-1.5 w-5 bg-brass"
                            : "h-1.5 w-1.5 bg-graphite/30 hover:bg-graphite/50"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-graphite/50">
                  Swipe to cycle views
                </span>
              </div>
            </motion.div>

            {/* Thumbnail selector gallery */}
            {allImagesRef.current.length > 1 && (
              <div className="scrollbar-none flex items-center gap-3 overflow-x-auto pb-1">
                {allImagesRef.current.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border bg-paper-raised transition-all duration-300 ${
                      activeImageIndex === idx
                        ? "scale-105 border-brass shadow-md shadow-brass/10"
                        : "border-line opacity-55 hover:opacity-90"
                    }`}
                  >
                    <Image src={imgUrl} alt={`Thumbnail ${idx + 1}`} fill className="object-contain p-2.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col gap-9 lg:col-span-5"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2.5">
                {brandName && (
                  <span className="rounded-full border border-brass/30 bg-brass/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-brass">
                    {brandName}
                  </span>
                )}
                {collectionName && (
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-graphite">
                    {collectionName}
                  </span>
                )}
                {renderConditionBadge(product.condition)}
              </div>

              <div>
                <h1 className="font-display text-4xl italic leading-[1.08] text-ink sm:text-5xl">
                  {product.name}
                </h1>
                <div className="mt-3 flex items-center gap-3">
                  <NibScratch />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-graphite/60">
                    REF. {productRef}
                  </span>
                </div>
              </div>

              <div className="mt-1 flex items-baseline gap-4">
                {product.discountedPrice ? (
                  <>
                    <span className="font-mono text-3xl font-medium tracking-tight text-brass">
                      ₹{Number(product.discountedPrice).toLocaleString("en-IN")}
                    </span>
                    {product.price && product.price > product.discountedPrice && (
                      <span className="font-mono text-sm text-graphite/50 line-through">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </span>
                    )}
                    {discountPercent && (
                      <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] font-medium tracking-wide text-paper">
                        −{discountPercent}%
                      </span>
                    )}
                  </>
                ) : (
                  <span className="font-mono text-3xl font-medium tracking-tight text-brass">
                    ₹{Number(product.price || 0).toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {typeof product.stock === "number" && (
                <span className="font-mono text-[11px] tracking-wide text-graphite/70">
                  {product.stock > 0
                    ? `${product.stock} in stock, ready to ship`
                    : "Currently out of stock"}
                </span>
              )}
            </div>

            <div className="hairline" />

            {/* Description */}
            <div className="flex flex-col gap-3">
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-graphite">
                Craftsmanship &amp; Overview
              </h3>
              <p className="font-body text-[15px] leading-relaxed text-graphite">
                {product.description || "No description provided for this heirloom instrument."}
              </p>
            </div>

            {/* Specifications */}
            {product.color && (
              <div className="relative overflow-hidden rounded-2xl border border-line bg-paper-raised py-5 pl-6 pr-5">
                <div className="absolute inset-y-0 left-0 w-[3px] bg-brass" />
                <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-brass">
                  Technical Specifications
                </h3>
                <p className="whitespace-pre-line font-body text-xs leading-loose text-graphite">
                  {product.color}
                </p>
              </div>
            )}

            {/* Quantity Selector & Purchase Actions */}
            <div className="flex flex-col gap-4 pt-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-graphite">
                  Quantity
                </span>
                <div className="flex items-center rounded-xl border border-line bg-paper-raised p-1">
                  <button
                    onClick={handleDecrement}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-graphite transition-colors hover:bg-brass/10 hover:text-brass"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-mono text-sm font-medium text-ink">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-graphite transition-colors hover:bg-brass/10 hover:text-brass"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-brass bg-paper px-6 py-4 font-mono text-xs uppercase tracking-wider text-brass shadow-lg shadow-brass/5 transition-all duration-300 hover:bg-brass hover:text-paper active:scale-95 disabled:opacity-50"
                >
                  {isAddingToCart ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShoppingBag className="h-4 w-4" />
                  )}
                  {isAddingToCart ? "Securing..." : "Add to Bag"}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="group flex items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-4 font-mono text-xs uppercase tracking-wider text-paper shadow-xl shadow-ink/10 transition-all duration-300 hover:bg-brass active:scale-95"
                >
                  <Zap className="h-4 w-4 text-brass transition-colors duration-300 group-hover:text-ink" />
                  Acquire Now
                </button>
              </div>
            </div>

            {/* Trust Assurances — ledger style, matching the craftsmanship
                section elsewhere on the site */}
            <div className="flex flex-col gap-5 border-t border-line pt-6">
              {[
                [ShieldCheck, "Authenticated lineage", "Every piece verified against its maker's records."],
                [Sparkles, "Hand-balanced finish", "Weighted and tested before it ships."],
                [Fingerprint, "Traceable provenance", `Serial REF. ${productRef}, logged to this listing.`],
              ].map(([Icon, title, body], i) => (
                <div key={title} className="flex gap-4">
                  <span className="font-mono text-xs text-brass">0{i + 1}</span>
                  <div className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brass" />
                    <div>
                      <p className="font-body text-sm text-ink">{title}</p>
                      <p className="mt-0.5 font-body text-xs leading-relaxed text-graphite">{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}