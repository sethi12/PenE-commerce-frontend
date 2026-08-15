"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Package,
  Sparkles,
} from "lucide-react";
import { useParams } from "next/navigation";

export default function CollectionDetailsPage() {
  const params = useParams();
  const collectionId = params?.id;

  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!collectionId) return;

    const fetchCollection = async () => {
      try {
        setLoading(true);
        setError("");

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

        // Fetch collection
        const collectionResponse = await fetch(
          `${baseUrl}/api/collections/${collectionId}`
        );

        const collectionData = await collectionResponse.json();

        if (!collectionResponse.ok) {
          throw new Error(
            collectionData.message || "Failed to fetch collection"
          );
        }

        const fetchedCollection =
          collectionData.collection || collectionData;
        setCollection(fetchedCollection);

        // Get product IDs
        const productIds = fetchedCollection.productIds || [];

        if (!Array.isArray(productIds) || productIds.length === 0) {
          setProducts([]);
          return;
        }

        // Fetch products in parallel
        const productResults = await Promise.all(
          productIds.map(async (productId) => {
            try {
              const response = await fetch(
                `${baseUrl}/api/products/${productId}`
              );

              if (!response.ok) return null;

              const data = await response.json();
              return data.product || data;
            } catch (error) {
              console.error(`Failed to fetch product ${productId}:`, error);
              return null;
            }
          })
        );

        setProducts(productResults.filter(Boolean));
      } catch (error) {
        console.error("Fetch collection error:", error);
        setError(error.message || "Failed to load collection");
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-brass" />
          <span className="font-mono text-xs tracking-widest text-graphite">
            CURATING GALLERY...
          </span>
        </div>
      </div>
    );
  }

  // Error / Not Found State
  if (error || !collection) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-paper-raised">
          <Package className="h-6 w-6 text-graphite/40" />
        </div>
        <h1 className="font-display text-4xl italic text-ink">
          Curation not found
        </h1>
        <p className="mt-3 max-w-sm text-sm text-graphite">
          {error || "This collection could not be located in our archive."}
        </p>
        <Link
          href="/collections"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-line bg-paper-raised px-6 py-3 font-mono text-xs tracking-wider text-ink transition-all duration-300 hover:border-brass hover:shadow-lg hover:shadow-brass/5"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          RETURN TO COLLECTIONS
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper pb-32 pt-32 lg:pt-40">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brass/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/collections"
            className="group inline-flex items-center gap-3 font-mono text-xs tracking-widest text-graphite transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            BACK TO CURATIONS
          </Link>
        </motion.div>

        {/* Collection Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised px-3.5 py-1 font-mono text-[10px] tracking-widest uppercase text-brass mb-6">
              <Sparkles className="h-3 w-3" />
              EXCLUSIVE CURATION
            </div>

            <h1 className="font-display text-5xl italic leading-[1.1] text-ink sm:text-6xl lg:text-7xl">
              {collection.name}
            </h1>

            <p className="mt-6 font-body text-lg leading-relaxed text-graphite">
              {collection.description ||
                "Explore the exquisite writing instruments hand-selected for this exclusive thematic compilation."}
            </p>
          </div>

          <div className="flex md:flex-col items-start md:items-end gap-2 shrink-0 border-t md:border-t-0 md:border-l border-line pt-6 md:pt-0 md:pl-8">
            <span className="font-mono text-xs tracking-widest text-graphite">
              VOLUME CATALOGUE
            </span>
            <span className="font-mono text-2xl font-medium text-brass">
              {String(products.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        <div className="hairline my-16" />

        {/* Empty Collection State */}
        {products.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[35vh] flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-paper-raised/50 p-12 text-center"
          >
            <Package className="h-10 w-10 text-graphite/30 mb-4" />
            <h2 className="font-display text-2xl italic text-ink">
              This gallery is currently empty
            </h2>
            <p className="mt-2 max-w-sm text-sm text-graphite font-body">
              New writing instruments are being curated for this collection. Check back shortly.
            </p>
          </motion.div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => {
              const productId = product._id || product.id;
              const hasDiscount =
                product.discountedPrice &&
                Number(product.discountedPrice) < Number(product.price);

              return (
                <motion.div
                  key={productId}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Link href={`/products/${productId}`} className="group block">
                    {/* Image Card Container */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-paper-raised transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-brass group-hover:shadow-xl group-hover:shadow-brass/5">
                      
                      {product.mainImage?.url ? (
                        <Image
                          src={product.mainImage.url}
                          alt={product.name || "Writing Instrument"}
                          fill
                          className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Package className="h-10 w-10 text-graphite/20" />
                        </div>
                      )}

                      {/* Numbering Pill */}
                      <div className="absolute left-4 top-4 z-10">
                        <span className="rounded-full border border-line bg-paper/80 px-2.5 py-1 font-mono text-[10px] text-brass backdrop-blur-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Condition Badge if available */}
                      {product.condition && (
                        <div className="absolute right-4 top-4 z-10">
                          <span className="rounded-full border border-line bg-paper/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-graphite backdrop-blur-sm">
                            {product.condition}
                          </span>
                        </div>
                      )}

                      {/* Explore Hover Button */}
                      <div className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper/90 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:border-brass group-hover:bg-brass group-hover:text-paper">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Product Information */}
                    <div className="mt-5">
                      <h2 className="font-display text-xl italic leading-tight text-ink transition-colors duration-300 group-hover:text-brass line-clamp-1">
                        {product.name}
                      </h2>

                      {product.description && (
                        <p className="mt-2 line-clamp-1 font-body text-xs leading-relaxed text-graphite">
                          {product.description}
                        </p>
                      )}

                      {/* Pricing & Stock Meta */}
                      <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-medium text-ink">
                            ₹
                            {Number(
                              product.discountedPrice || product.price || 0
                            ).toLocaleString("en-IN")}
                          </span>

                          {hasDiscount && (
                            <span className="font-mono text-xs text-graphite line-through">
                              ₹{Number(product.price).toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        {product.stock !== undefined && (
                          <span className="font-mono text-[9px] tracking-wider text-graphite">
                            {product.stock > 0 ? "AVAILABLE" : "SOLD OUT"}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}