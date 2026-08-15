"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // Adjust the URL based on where your Express backend is running.
        // Example: http://localhost:5000/api/collections
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const response = await fetch(`${baseUrl}/api/collections`);
        
        if (response.ok) {
          const data = await response.json();
          // Adjust based on your API response structure (e.g., data.collections or just data)
          setCollections(data.collections || data);
        }
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="min-h-screen bg-paper pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 max-w-2xl"
        >
          <span className="font-mono text-sm tracking-widest text-brass">
            CURATIONS
          </span>
          <h1 className="mt-4 font-display text-5xl italic leading-tight text-ink sm:text-6xl">
            Pens for every <br />
            <span className="not-italic">purpose.</span>
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-graphite">
            Explore our handcrafted collections. From flagship models to 
            everyday workhorses, find the instrument that matches your hand.
          </p>
        </motion.div>

        <div className="hairline mb-16" />

        {/* Collections Grid */}
        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-brass" />
          </div>
        ) : collections.length === 0 ? (
          <div className="flex min-h-[30vh] items-center justify-center text-graphite font-body">
            No collections found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/collections/${collection.id}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-paper-raised p-8 transition-colors hover:border-brass"
                >
                  <div>
                    {/* Number / Metadata */}
                    <div className="mb-8 flex items-center justify-between">
                      <span className="font-mono text-sm text-brass">
                        No. {String(index + 1).padStart(3, "0")}
                      </span>
                      <span className="font-mono text-xs text-graphite">
                        {collection.productIds?.length || 0} ITEMS
                      </span>
                    </div>

                    {/* Aesthetic visual divider */}
                    <div className="mb-8 flex h-16 w-full items-center">
                      <div className="h-[1px] w-12 bg-brass transition-all duration-500 group-hover:w-full" />
                    </div>

                    {/* Collection Title */}
                    <h2 className="font-display text-2xl italic text-ink sm:text-3xl">
                      {collection.name}
                    </h2>
                  </div>

                  {/* Footer interaction link */}
                  <div className="mt-12 flex items-center gap-2 font-mono text-sm text-graphite transition-colors group-hover:text-ink">
                    <span>EXPLORE</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}