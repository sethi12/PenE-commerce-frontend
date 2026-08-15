"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, Loader2, Sparkles } from "lucide-react";
import { PenZoneLogo } from "./Navbar";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [collections, setCollections] = useState([]);
  const [isWholesaleOpen, setIsWholesaleOpen] = useState(false);

  // Form states for Wholesale Enquiry
  const [wholesaleName, setWholesaleName] = useState("");
 const [wholesaleContact, setWholesaleContact] = useState("");
const [countryCodes, setCountryCodes] = useState([]);
const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${baseUrl}/api/collections`);
        if (res.ok) {
          const data = await res.json();
          const cols = data.collections || data;
          setCollections(cols.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to fetch collections for footer:", err);
      }
    };

    fetchCollections();

  }, []);
      useEffect(() => {
  const fetchCountryCodes = async () => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/codes"
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(
          data.msg || "Failed to fetch country codes"
        );
      }

      setCountryCodes(data.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch country codes:",
        error
      );
    }
  };

  fetchCountryCodes();
}, []);

const handleWholesaleSubmit = async (e) => {
  e.preventDefault();

  if (
    !wholesaleName.trim() ||
    !wholesaleContact.trim()
  ) {
    return;
  }

  try {
    setIsSubmitting(true);

    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "";

    const response = await fetch(
      `${baseUrl}/api/wholesale-enquiries`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

  body: JSON.stringify({
  name: wholesaleName.trim(),
  contact: `${selectedCountryCode} ${wholesaleContact.trim()}`,
}),
      }
    );


    const data =
      await response.json();


    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to submit enquiry"
      );
    }


    // Success
    setSubmitSuccess(true);


    // Reset and close modal
    setTimeout(() => {
      setSubmitSuccess(false);

      setWholesaleName("");

      setWholesaleContact("");

      setIsWholesaleOpen(false);
      setSelectedCountryCode("+91");
    }, 1500);

  } catch (error) {
    console.error(
      "Wholesale enquiry error:",
      error
    );

    alert(
      error.message ||
        "Failed to submit enquiry"
    );

  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <>
      <footer className="border-t border-line bg-paper/60 px-6 pt-16 pb-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Main Grid Section */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 pb-12 border-b border-line">
            {/* Brand & Newsletter Column */}
            <div className="flex flex-col items-start gap-5 lg:col-span-5 pr-0 lg:pr-8">
              <PenZoneLogo className="h-10" />
              
              <p className="font-body text-sm text-graphite max-w-sm leading-relaxed">
                Crafting fine writing instruments and high-precision 3D pens. Hand-finished with architectural precision in Delhi.
              </p>

              {/* Newsletter Subscription */}
              <div className="w-full max-w-sm mt-2">
                <span className="block font-display text-xs uppercase tracking-widest text-ink mb-2">
                  Join the Journal
                </span>
                <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-10 rounded-full border border-line bg-paper-raised px-4 text-xs text-ink outline-none transition-all placeholder:text-graphite focus:border-brass pr-24"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-4 rounded-full bg-brass text-paper font-body text-xs font-medium transition-transform hover:opacity-90 active:scale-95"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Nav Links Columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-7">
              {/* Collections Column (Dynamic) */}
              <div className="flex flex-col gap-4">
                <h4 className="font-display text-xs uppercase tracking-widest text-ink font-semibold">
                  Collections
                </h4>
                <ul className="flex flex-col gap-2.5 font-body text-sm text-graphite">
                  {collections.length > 0 ? (
                    collections.map((col) => {
                      const colId = col._id || col.id;
                      return (
                        <li key={colId}>
                          <Link
                            href={`/collections/${colId}`}
                            className="transition-colors duration-200 hover:text-brass line-clamp-1"
                          >
                            {col.name}
                          </Link>
                        </li>
                      );
                    })
                  ) : (
                    <li className="text-graphite/60 italic text-xs">Loading collections...</li>
                  )}
                </ul>
              </div>

              {/* Company Column */}
              <div className="flex flex-col gap-4">
                <h4 className="font-display text-xs uppercase tracking-widest text-ink font-semibold">
                  Company
                </h4>
                <ul className="flex flex-col gap-2.5 font-body text-sm text-graphite">
                  <li>
                    <Link
                      href="/about-us"
                      className="transition-colors duration-200 hover:text-brass"
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="transition-colors duration-200 hover:text-brass"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsWholesaleOpen(true)}
                      className="text-left transition-colors duration-200 hover:text-brass font-medium"
                    >
                      Wholesale Enquiry
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-mono text-xs text-graphite">
            <p>© {currentYear} PenZone Pen Co. — Delhi. All rights reserved.</p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-brass transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brass transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brass transition-colors">Shipping Info</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Wholesale Enquiry Modal */}
      {isWholesaleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-md rounded-3xl border border-line bg-paper p-8 shadow-2xl shadow-brass/10 animate-in fade-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setIsWholesaleOpen(false)}
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper text-graphite transition-colors hover:border-brass hover:text-brass"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col gap-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-brass">
                Partnership
              </span>
              <h3 className="font-display text-2xl italic text-ink">
                Wholesale Enquiry
              </h3>
              <p className="font-body text-xs text-graphite">
                Partner with PenZone for bespoke corporate orders and boutique stockist allocations.
              </p>
            </div>

            {submitSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                <Sparkles className="h-8 w-8 text-brass animate-pulse" />
                <h4 className="font-display text-lg italic text-ink">Enquiry Received</h4>
                <p className="font-body text-xs text-graphite">
                  Our trade division will connect with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWholesaleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs uppercase tracking-wider text-graphite">
                    Your Name / Establishment
                  </label>
                  <input
                    type="text"
                    required
                    value={wholesaleName}
                    onChange={(e) => setWholesaleName(e.target.value)}
                    placeholder="e.g. Sterling Fine Goods"
                    className="h-11 w-full rounded-xl border border-line bg-paper px-4 font-body text-sm text-ink outline-none transition-colors focus:border-brass"
                  />
                </div>

<div className="flex flex-col gap-1.5">
  <label className="font-mono text-xs uppercase tracking-wider text-graphite">
    Contact Number
  </label>

  <div className="flex gap-2">

    {/* Country Code */}
    <select
      value={selectedCountryCode}
      onChange={(e) =>
        setSelectedCountryCode(e.target.value)
      }
      className="
        h-11
        w-[120px]
        shrink-0
        rounded-xl
        border
        border-line
        bg-paper
        px-3
        font-body
        text-sm
        text-ink
        outline-none
        transition-colors
        focus:border-brass
      "
    >
      {countryCodes.map((country) => (
        <option
          key={`${country.code}-${country.dial_code}`}
          value={country.dial_code}
        >
          {country.code} {country.dial_code}
        </option>
      ))}
    </select>

    {/* Phone Number */}
    <input
      type="tel"
      required
      value={wholesaleContact}
      onChange={(e) => {
        // Only allow numbers
        const value =
          e.target.value.replace(/\D/g, "");

        setWholesaleContact(value);
      }}
      placeholder="98765 43210"
      className="
        h-11
        w-full
        rounded-xl
        border
        border-line
        bg-paper
        px-4
        font-body
        text-sm
        text-ink
        outline-none
        transition-colors
        focus:border-brass
      "
    />

  </div>
</div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-ink font-mono text-xs uppercase tracking-wider text-paper transition-all hover:bg-brass active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Submit Enquiry"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}