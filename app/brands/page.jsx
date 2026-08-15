"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ArrowLeft, ArrowRight, Package } from "lucide-react";

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [exitingBrandId, setExitingBrandId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const [brandsRes, productsRes] = await Promise.all([
          fetch(`${baseUrl}/api/brands`),
          fetch(`${baseUrl}/api/products`),
        ]);

        if (brandsRes.ok) {
          const brandsData = await brandsRes.json();
          setBrands(brandsData.brands || brandsData);
        }

        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData.products || productsData);
        }
      } catch (error) {
        console.error("Failed to fetch brands or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBrandClick = (brand) => {
    const brandId = brand.id || brand._id;
    setExitingBrandId(brandId);
    
    // Delay state change slightly to allow the click animation to play out
    setTimeout(() => {
      setSelectedBrand(brand);
      setExitingBrandId(null);
    }, 600);
  };

  const handleBackToBrands = () => {
    setSelectedBrand(null);
  };

  // Filter products matching the selected brand
  const filteredProducts = selectedBrand
    ? products.filter((product) => {
        const pBrand = product.brand;
        const brandId = selectedBrand.id || selectedBrand._id;
        if (!pBrand) return false;
        if (typeof pBrand === "object") {
          return (pBrand._id || pBrand.id) === brandId;
        }
        return pBrand === brandId;
      })
    : [];

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
          {selectedBrand ? (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleBackToBrands}
              className="group flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-graphite transition-colors hover:text-brass"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to all houses
            </motion.button>
          ) : (
            <span className="label-mono">Crafted by lineage</span>
          )}

          <h1 className="font-display text-4xl italic text-ink sm:text-5xl lg:text-6xl">
            {selectedBrand ? selectedBrand.name : "The Houses of Writing."}
          </h1>

          <p className="max-w-xl font-body text-sm text-graphite sm:text-base">
            {selectedBrand
              ? `Exploring signature instruments and archival releases from ${selectedBrand.name}.`
              : "Select a maker to inspect their lineage of handcrafted writing instruments."}
          </p>
        </div>

        <div className="hairline mb-16" />

        {/* Brand Selection View */}
        {!selectedBrand ? (
          <div>
            {brands.length === 0 ? (
              <div className="py-20 text-center font-body text-sm text-graphite">
                No brand houses registered at the moment.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {brands.map((brand, i) => {
                  const brandId = brand.id || brand._id;
                  const isExiting = exitingBrandId === brandId;

                  return (
                    <motion.div
                      key={brandId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: isExiting ? 0 : 1,
                        scale: isExiting ? 0.92 : 1,
                        filter: isExiting ? "blur(8px)" : "blur(0px)",
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                      onClick={() => handleBrandClick(brand)}
                      className="group flex flex-col cursor-pointer"
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-500 group-hover:border-brass group-hover:shadow-xl group-hover:shadow-brass/5">
                        {brand.logo ? (
                          <Image
                            src={brand.logo}
                            alt={brand.name}
                            fill
                            className="object-contain p-8 filter grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 350px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package className="h-12 w-12 text-graphite/30" />
                          </div>
                        )}

                        <div className="absolute left-4 top-4 z-10">
                          <span className="rounded-full border border-line bg-paper/80 px-2.5 py-1 font-mono text-[10px] text-brass backdrop-blur-sm">
                            Maker No. {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper/90 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:border-brass group-hover:bg-brass group-hover:text-paper">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col gap-1 px-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-display text-xl italic text-ink transition-colors group-hover:text-brass">
                            {brand.name}
                          </h3>
                          <span className="font-mono text-xs text-graphite">
                            Est. {new Date(brand.createdAt || Date.now()).getFullYear()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Filtered Products View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-body text-base text-graphite">
                  No instruments currently cataloged under {selectedBrand.name}.
                </p>
                <button
                  onClick={handleBackToBrands}
                  className="mt-6 rounded-full bg-ink px-6 py-2.5 font-body text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
                >
                  Explore other makers
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product, i) => {
                  const productId = product._id || product.id;
                  const productName = product.name || "Signature Instrument";
                  const productPrice = product.discountedPrice || product.price || 0;
                  const imageUrl = product.mainImage?.url;

                  return (
                    <motion.article
                      key={productId}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="group flex flex-col"
                    >
                      <Link href={`/products/${productId}`} className="group/img block">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-500 group-hover:border-brass group-hover:shadow-xl group-hover:shadow-brass/5">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={productName}
                              fill
                              className="object-contain p-8 transition-transform duration-700 ease-out group-hover/img:scale-105"
                              sizes="(max-width: 768px) 100vw, 350px"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <Package className="h-10 w-10 text-graphite/20" />
                            </div>
                          )}

                          <div className="absolute left-4 top-4 z-10">
                            <span className="rounded-full border border-line bg-paper/80 px-2.5 py-1 font-mono text-[10px] text-brass backdrop-blur-sm">
                              No. {String(i + 1).padStart(3, "0")}
                            </span>
                          </div>

                          <div className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper/90 opacity-0 backdrop-blur-md transition-all duration-300 group-hover/img:opacity-100 group-hover/img:border-brass group-hover/img:bg-brass group-hover/img:text-paper">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </Link>

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
          </motion.div>
        )}
      </div>
    </div>
  );
}