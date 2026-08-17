"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Loader2, ArrowRight, PenTool } from "lucide-react";
import { useTheme } from "../components/theme-provider"; // Adjust path to theme-provider if needed

function SearchContent() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  // Extended catalog supporting product names, brand names, and collection names
  const catalog = [
    {
      id: 1,
      name: "Atelier Pro 3D Pen v2",
      brand: "AtelierCraft",
      collection: "Master Series",
      price: "$189.00",
      tag: "Best Seller",
    },
    {
      id: 2,
      name: "PLA Silk Filament Spool (1kg)",
      brand: "PolySmith",
      collection: "Filament Essentials",
      price: "$32.00",
      tag: "New",
    },
    {
      id: 3,
      name: "Ergonomic Brass Nozzle Kit",
      brand: "PenZone Studio",
      collection: "Maintenance",
      price: "$45.00",
      tag: "Essential",
    },
    {
      id: 4,
      name: "Mastercraft Studio Bundle",
      brand: "AtelierCraft",
      collection: "Curated Bundles",
      price: "$240.00",
      tag: "Save 15%",
    },
    {
      id: 5,
      name: "Titanium Precision Extruder",
      brand: "Vanguard",
      collection: "Master Series",
      price: "$115.00",
      tag: "Pro Spec",
    },
    {
      id: 6,
      name: "Carbon Fiber ABS Filament",
      brand: "PolySmith",
      collection: "Filament Essentials",
      price: "$48.00",
      tag: "High Strength",
    },
  ];

  // Update query state if URL parameter changes
  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) {
      setQuery(q);
    }
  }, [searchParams]);

  const categories = ["All", "Master Series", "Filament Essentials", "Maintenance", "Curated Bundles"];

  // Real-time alphabetical / substring search across product name, brand name, and collection name
  const filteredProducts = catalog.filter((item) => {
    const searchLower = query.toLowerCase().trim();
    const matchesQuery =
      searchLower === "" ||
      item.name.toLowerCase().includes(searchLower) ||
      item.brand.toLowerCase().includes(searchLower) ||
      item.collection.toLowerCase().includes(searchLower);

    const matchesCategory =
      selectedCategory === "All" || item.collection === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  };

  return (
    <div className="relative min-h-screen bg-paper px-4 pb-24 pt-32 font-body text-ink selection:bg-brass selection:text-paper md:px-10 lg:px-16 transition-colors duration-500">
      
      {/* ───────── Ambient Background Glows ───────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[10%] h-[500px] w-[500px] rounded-full bg-brass/10 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[15%] h-[400px] w-[400px] rounded-full bg-line/20 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-brass/20 bg-brass/10 text-brass">
            <Search className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Search Atelier Catalog
          </h1>
          <p className="mt-2 text-sm text-graphite">
            Instantly explore instruments, brands, and collections as you type.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="relative mx-auto max-w-2xl">
          <div className="relative flex items-center">
            <Search className="absolute left-5 h-5 w-5 text-graphite/50" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search by product name, brand, or collection..."
              autoFocus
              className="w-full rounded-2xl border border-line bg-paper-raised py-4 pl-14 pr-12 text-base text-ink shadow-sm outline-none transition-all placeholder:text-graphite/40 focus:border-brass focus:ring-1 focus:ring-brass/50"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 rounded-full p-1.5 text-graphite/60 transition-colors hover:bg-brass/10 hover:text-ink"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Collection Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 font-mono text-xs tracking-wider transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-brass text-paper shadow-sm"
                  : "border border-line bg-paper-raised text-graphite hover:border-brass hover:text-ink"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Section */}
        <div className="mt-12">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-graphite">
              <Loader2 className="h-8 w-8 animate-spin text-brass" />
              <p className="mt-3 text-sm font-mono tracking-wide">Filtering catalog...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              <AnimatePresence>
                {filteredProducts.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-paper-raised p-6 shadow-sm transition-all duration-300 hover:border-brass hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-widest text-brass">
                          {item.brand} • {item.collection}
                        </span>
                        <span className="rounded-full bg-brass/10 px-2.5 py-1 font-mono text-[10px] text-brass">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-medium text-ink group-hover:text-brass transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-line/50 pt-4">
                      <span className="font-mono text-sm font-semibold text-ink">
                        {item.price}
                      </span>
                      <a
                        href={`/products/${item.id}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-brass transition-colors hover:text-ink"
                      >
                        <span>View Instrument</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-paper-raised text-graphite/50">
                <PenTool className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-ink">No instruments found</h3>
              <p className="mt-1 max-w-sm text-sm text-graphite">
                No matching results found for "{query}". Try searching for another product, brand, or collection name.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-6 rounded-xl border border-line bg-paper-raised px-5 py-2.5 font-mono text-xs tracking-wider text-ink transition-colors hover:border-brass hover:text-brass"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-paper text-brass">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}