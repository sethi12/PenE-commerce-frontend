"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Loader2,
  ShieldCheck,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const getGuestCartId = () => {
  let cartId = localStorage.getItem("penzone_guest_cart");

  if (!cartId) {
    cartId = crypto.randomUUID();

    localStorage.setItem(
      "penzone_guest_cart",
      cartId
    );
  }

  return cartId;
};

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  /*
   * =====================================================
   * CART HEADERS
   * =====================================================
   */

  const getCartHeaders = () => {
    const headers = {};

    const guestCartId =
      localStorage.getItem(
        "penzone_guest_cart"
      );

    if (guestCartId) {
      headers["x-cart-id"] =
        guestCartId;
    }

    return headers;
  };

  /*
   * =====================================================
   * FETCH CART
   * =====================================================
   */

  const fetchCart = async () => {
    try {
      setLoading(true);

      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "";

      const guestCartId =
        getGuestCartId();

      const response = await fetch(
        `${baseUrl}/api/cart`,
        {
          method: "GET",
          headers: {
            "x-cart-id": guestCartId,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch cart"
        );
      }

      setItems(data.items || []);
      setSubtotal(
        Number(data.subtotal || 0)
      );
      setTotalItems(
        Number(data.totalItems || 0)
      );

    } catch (error) {
      console.error(
        "Fetch cart error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =====================================================
   * INITIAL LOAD
   * =====================================================
   */

  useEffect(() => {
    fetchCart();
  }, []);

  /*
   * =====================================================
   * UPDATE QUANTITY
   * =====================================================
   */

  const updateQuantity = async (
    productId,
    quantity
  ) => {
    if (quantity < 1) return;

    try {
      setUpdatingId(productId);

      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "";

      const guestCartId =
        getGuestCartId();

      const response = await fetch(
        `${baseUrl}/api/cart/${productId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
            "x-cart-id":
              guestCartId,
          },

          body: JSON.stringify({
            quantity,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update quantity"
        );
      }

      await fetchCart();

    } catch (error) {
      console.error(
        "Update quantity error:",
        error
      );

      alert(
        error.message ||
          "Failed to update quantity"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /*
   * =====================================================
   * REMOVE ITEM
   * =====================================================
   */

  const removeItem = async (
    productId
  ) => {
    try {
      setRemovingId(productId);

      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "";

      const guestCartId =
        getGuestCartId();

      const response = await fetch(
        `${baseUrl}/api/cart/${productId}`,
        {
          method: "DELETE",

          headers: {
            "x-cart-id":
              guestCartId,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to remove item"
        );
      }

      await fetchCart();

    } catch (error) {
      console.error(
        "Remove item error:",
        error
      );

      alert(
        error.message ||
          "Failed to remove item"
      );
    } finally {
      setRemovingId(null);
    }
  };

  /*
   * =====================================================
   * CLEAR CART
   * =====================================================
   */

  const clearCart = async () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to remove all items from your cart?"
      );

    if (!confirmed) return;

    try {
      setLoading(true);

      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "";

      const guestCartId =
        getGuestCartId();

      const response = await fetch(
        `${baseUrl}/api/cart`,
        {
          method: "DELETE",

          headers: {
            "x-cart-id":
              guestCartId,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to clear cart"
        );
      }

      setItems([]);
      setSubtotal(0);
      setTotalItems(0);

    } catch (error) {
      console.error(
        "Clear cart error:",
        error
      );

      alert(
        error.message ||
          "Failed to clear cart"
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =====================================================
   * LOADING
   * =====================================================
   */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-7 w-7 animate-spin text-brass" />

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
            Retrieving your collection
          </span>
        </div>
      </div>
    );
  }

  /*
   * =====================================================
   * EMPTY CART
   * =====================================================
   */

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-paper px-6 py-32 lg:px-12">
        <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center text-center">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-line bg-paper-raised"
          >
            <ShoppingBag className="h-7 w-7 text-brass" />
          </motion.div>

          <span className="font-mono text-xs uppercase tracking-[0.25em] text-brass">
            Your collection
          </span>

          <h1 className="mt-4 font-display text-5xl italic text-ink sm:text-6xl">
            Your bag is empty.
          </h1>

          <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-graphite">
            Your carefully selected writing instruments
            will appear here once you find something worth
            bringing home.
          </p>

          <Link
            href="/collections"
            className="group mt-10 flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-mono text-xs uppercase tracking-wider text-paper transition-all duration-300 hover:bg-brass"
          >
            Explore Collections

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

        </div>
      </div>
    );
  }

  /*
   * =====================================================
   * CART PAGE
   * =====================================================
   */

  return (
    <div className="min-h-screen bg-paper px-6 py-28 lg:px-12 lg:py-36">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-12"
        >
          <Link
            href="/collections"
            className="group mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-graphite transition-colors hover:text-brass"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />

            Continue Shopping
          </Link>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-brass">
                Your collection
              </span>

              <h1 className="mt-3 font-display text-5xl italic text-ink sm:text-6xl">
                Shopping Bag
              </h1>
            </div>

            <span className="font-mono text-xs uppercase tracking-widest text-graphite">
              {totalItems}{" "}
              {totalItems === 1
                ? "Instrument"
                : "Instruments"}
            </span>

          </div>
        </motion.div>

        <div className="hairline mb-10" />

        {/* Main grid */}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">

          {/* =================================================
              ITEMS
          ================================================= */}

          <div className="lg:col-span-7">

            <div className="mb-5 flex items-center justify-between">

              <span className="font-mono text-xs uppercase tracking-[0.15em] text-graphite">
                Selected Instruments
              </span>

              <button
                onClick={clearCart}
                className="font-mono text-[10px] uppercase tracking-wider text-graphite transition-colors hover:text-red-500"
              >
                Clear Bag
              </button>

            </div>

            <div className="divide-y divide-line">

              <AnimatePresence mode="popLayout">

                {items.map((item) => {

                  const product =
                    item.product;

                  const image =
                    product?.mainImage?.url;

                  const isUpdating =
                    updatingId ===
                    item.productId;

                  const isRemoving =
                    removingId ===
                    item.productId;

                  return (
                    <motion.div
                      key={item.productId}
                      layout
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -30,
                      }}
                      className="relative flex gap-5 py-7"
                    >

                      {/* Product Image */}

                      <Link
                        href={`/product/${item.productId}`}
                        className="relative h-32 w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-line bg-paper-raised sm:h-36 sm:w-32"
                      >
                        {image ? (
                          <Image
                            src={image}
                            alt={
                              product.name ||
                              "Product"
                            }
                            fill
                            sizes="150px"
                            className="object-contain p-3 transition-transform duration-500 hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <ShoppingBag className="h-5 w-5 text-graphite/30" />
                          </div>
                        )}
                      </Link>

                      {/* Details */}

                      <div className="flex min-w-0 flex-1 flex-col justify-between">

                        <div>

                          <div className="flex items-start justify-between gap-3">

                            <Link
                              href={`/product/${item.productId}`}
                              className="font-display text-xl italic leading-tight text-ink transition-colors hover:text-brass"
                            >
                              {product.name}
                            </Link>

                            <button
                              onClick={() =>
                                removeItem(
                                  item.productId
                                )
                              }
                              disabled={
                                isRemoving
                              }
                              className="flex-shrink-0 rounded-full p-2 text-graphite transition-colors hover:bg-red-500/10 hover:text-red-500"
                              aria-label="Remove item"
                            >
                              {isRemoving ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>

                          </div>

                          {product.description && (
                            <p className="mt-2 line-clamp-2 max-w-lg font-body text-xs leading-relaxed text-graphite">
                              {
                                product.description
                              }
                            </p>
                          )}

                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

                          {/* Quantity */}

                          <div className="flex items-center rounded-xl border border-line bg-paper-raised p-1">

                            <button
                              disabled={
                                isUpdating ||
                                item.quantity <= 1
                              }
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-graphite transition-colors hover:bg-brass/10 hover:text-brass disabled:opacity-30"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>

                            <span className="w-10 text-center font-mono text-xs text-ink">
                              {isUpdating ? (
                                <Loader2 className="mx-auto h-3.5 w-3.5 animate-spin" />
                              ) : (
                                item.quantity
                              )}
                            </span>

                            <button
                              disabled={
                                isUpdating ||
                                (typeof product.stock ===
                                  "number" &&
                                  item.quantity >=
                                    product.stock)
                              }
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-graphite transition-colors hover:bg-brass/10 hover:text-brass disabled:opacity-30"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>

                          </div>

                          {/* Price */}

                          <div className="text-right">

                            <div className="font-mono text-lg font-medium text-brass">
                              ₹
                              {Number(
                                item.itemTotal || 0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </div>

                            {item.quantity > 1 && (
                              <div className="font-mono text-[10px] text-graphite">
                                ₹
                                {Number(
                                  item.price || 0
                                ).toLocaleString(
                                  "en-IN"
                                )}{" "}
                                each
                              </div>
                            )}

                          </div>

                        </div>

                      </div>

                    </motion.div>
                  );
                })}

              </AnimatePresence>

            </div>
          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <div className="lg:col-span-5">

            <div className="sticky top-28 rounded-[2rem] border border-line bg-paper-raised p-7 shadow-xl shadow-brass/5 sm:p-9">

              <div className="mb-8">

                <span className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
                  Order Summary
                </span>

                <h2 className="mt-3 font-display text-3xl italic text-ink">
                  Your selection
                </h2>

              </div>

              <div className="hairline mb-6" />

              {/* Summary */}

              <div className="space-y-4">

                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-graphite">
                    Items
                  </span>

                  <span className="font-mono text-sm text-ink">
                    {totalItems}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-graphite">
                    Subtotal
                  </span>

                  <span className="font-mono text-sm text-ink">
                    ₹
                    {Number(
                      subtotal
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-graphite">
                    Shipping
                  </span>

                  <span className="font-mono text-xs text-brass">
                    CALCULATED AT CHECKOUT
                  </span>
                </div>

              </div>

              <div className="hairline my-7" />

              <div className="flex items-end justify-between">

                <span className="font-display text-xl italic text-ink">
                  Estimated Total
                </span>

                <span className="font-mono text-2xl font-medium text-brass">
                  ₹
                  {Number(
                    subtotal
                  ).toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              {/* Checkout */}

              <Link
                href="/checkout"
                className="group mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-ink px-6 py-4 font-mono text-xs uppercase tracking-wider text-paper shadow-xl shadow-ink/10 transition-all duration-300 hover:bg-brass"
              >
                Proceed to Checkout

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Trust */}

              <div className="mt-7 flex items-start gap-3 border-t border-line pt-6">

                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-brass" />

                <div>
                  <p className="font-body text-xs text-ink">
                    Secure acquisition
                  </p>

                  <p className="mt-1 font-body text-[11px] leading-relaxed text-graphite">
                    Your order and payment details
                    are protected throughout checkout.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}