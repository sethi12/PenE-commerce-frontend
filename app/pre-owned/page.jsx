"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, ArrowRight, Package } from "lucide-react";

export default function PreownedPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exitingProductId, setExitingProductId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const response = await fetch(`${baseUrl}/api/products`);
        
        if (response.ok) {
          const data = await response.json();
          const productList = data.products || data;
          
          // Filter to only include products where condition is "preowned"
          const preownedList = productList.filter(
            (product) => product.condition && product.condition.toLowerCase() === "preowned"
          );
          
          setProducts(preownedList);
        }
      } catch (error) {
        console.error("Failed to fetch preowned products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (e, productId) => {
    e.preventDefault();
    setExitingProductId(productId);
    
    // Play exit/disappear animation before pushing route
    setTimeout(() => {
      router.push(`/products/${productId}`);
    }, 600);
  };

  // Helper function to format condition tag styling & text
  const renderConditionBadge = (condition) => {
    if (!condition) return null;
    const lower = condition.toLowerCase();
    let badgeStyle = "border-line text-graphite bg-paper/80";
    if (lower === "fresh") badgeStyle = "border-brass/40 text-brass bg-paper/90 backdrop-blur-sm";
    else if (lower === "sale") badgeStyle = "border-amber-500/40 text-amber-600 bg-paper/90 backdrop-blur-sm";
    else if (lower === "preowned") badgeStyle = "border-graphite/40 text-graphite bg-paper/90 backdrop-blur-sm";

    return (
      <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider capitalize ${badgeStyle}`}>
        {condition}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center bg-paper">
        <Loader2 className="h-8 w-8 animate-spin text-brass" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-start gap-4">
          <span className="label-mono">The curated archive</span>
          <h1 className="font-display text-4xl italic text-ink sm:text-5xl lg:text-6xl">
            Pre-Owned Instruments.
          </h1>
          <p className="max-w-xl font-body text-sm text-graphite sm:text-base">
            Carefully preserved, time-tested writing instruments looking for their next chapter.
          </p>
        </div>

        <div className="hairline mb-16" />

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="py-24 text-center font-body text-sm text-graphite">
            No pre-owned instruments currently available in the archive.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => {
              const productId = product._id || product.id;
              const productName = product.name || "Signature Instrument";
              const productPrice = product.discountedPrice || product.price || 0;
              const imageUrl = product.mainImage?.url;
              const isExiting = exitingProductId === productId;

              return (
                <motion.div
                  key={productId}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{
                    opacity: isExiting ? 0 : 1,
                    y: isExiting ? -16 : 0,
                    scale: isExiting ? 0.92 : 1,
                    filter: isExiting ? "blur(8px)" : "blur(0px)",
                  }}
                  transition={{ 
                    duration: isExiting ? 0.6 : 0.5, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: isExiting ? 0 : i * 0.05 
                  }}
                  onClick={(e) => handleProductClick(e, productId)}
                  className="group flex flex-col cursor-pointer"
                >
                  {/* Bordered Image Frame Only */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-500 group-hover:border-brass group-hover:shadow-xl group-hover:shadow-brass/5">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={productName}
                        fill
                        className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 350px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Package className="h-10 w-10 text-graphite/20" />
                      </div>
                    )}

                    {/* Numbering Pill */}
                    <div className="absolute left-4 top-4 z-10">
                      <span className="rounded-full border border-line bg-paper/80 px-2.5 py-1 font-mono text-[10px] text-brass backdrop-blur-sm">
                        No. {String(i + 1).padStart(3, "0")}
                      </span>
                    </div>

                    {/* Condition Badge Pill */}
                    {product.condition && (
                      <div className="absolute right-4 top-4 z-10">
                        {renderConditionBadge(product.condition)}
                      </div>
                    )}

                    {/* Arrow Action Button */}
                    <div className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper/90 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:border-brass group-hover:bg-brass group-hover:text-paper">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Product Details Below */}
                  <div className="mt-4 flex flex-col gap-1 px-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl italic text-ink transition-colors group-hover:text-brass line-clamp-1">
                        {productName}
                      </h3>
                      <span className="font-mono text-sm font-medium text-brass">
                        ₹{Number(productPrice).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <p className="font-body text-xs text-graphite line-clamp-1">
                      {product.description || "Hand-balanced writing instrument."}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}