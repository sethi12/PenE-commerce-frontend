// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { ThemeToggle } from "./theme-toggle";
// import Image from "next/image";
// import { useTheme } from "./theme-provider";
// import { useAuth } from "./auth-provider";

// export function PenZoneLogo() {
//   const { theme } = useTheme();

//   return (
//     <a href="/" className="group flex items-center gap-2.5" aria-label="PenZone home">
//       <Image
//         src="/logo.png"
//         alt="PenZone Logo"
//         width={240}
//         height={80}
//         priority
//         className={`h-12 w-auto object-contain transition-all duration-300 ease-out group-hover:scale-105 ${
//           theme === "dark" ? "brightness-0 invert" : ""
//         }`}
//       />
//     </a>
//   );
// }

// function NavLink({ children, href, ...props }) {
//   return (
//     <a
//       href={href}
//       {...props}
//       className="group relative inline-flex items-center py-1 text-graphite transition-colors duration-300 hover:text-brass"
//     >
//       <span className="mr-0 h-1 w-1 scale-0 rounded-full bg-brass opacity-0 transition-all duration-300 ease-out group-hover:mr-1.5 group-hover:scale-100 group-hover:opacity-100" />
//       <span className="relative transition-[letter-spacing] duration-300 group-hover:tracking-wide">
//         {children}
//         <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-brass transition-transform duration-300 ease-out group-hover:scale-x-100" />
//       </span>
//     </a>
//   );
// }

// function IconButton({ children, label, onClick, badge, className = "", href }) {
//   const content = (
//     <>
//       {children}
//       {badge ? (
//         <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brass font-mono text-[9px] text-paper">
//           {badge}
//         </span>
//       ) : null}
//     </>
//   );

//   const baseClasses = `relative flex h-9 w-9 items-center justify-center rounded-full text-ink transition-all duration-200 hover:scale-110 hover:bg-brass/10 hover:text-brass ${className}`;

//   if (href) {
//     return (
//       <a href={href} aria-label={label} className={baseClasses}>
//         {content}
//       </a>
//     );
//   }

//   return (
//     <button onClick={onClick} aria-label={label} className={baseClasses}>
//       {content}
//     </button>
//   );
// }

// export function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const { user, loading } = useAuth();

//   const navLinks = [
//     { label: "Collection", href: "/collections" },
//     { label: "Shop", href: "/products" },
//     { label: "Brands", href: "/brands" },
//     { label: "PreOwned", href: "/pre-owned" },
//     { label: "Sale", href: "/sale" },
//     { label: "About Us", href: "/about-us" },
//   ];

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 12);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const getFirstName = (fullName) => {
//     if (!fullName) return "Profile";
//     const first = fullName.split(" ")[0];
//     return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
//   };

//   const isSolidHeader = scrolled || mobileMenuOpen;

//   return (
//     <header
//       className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
//         isSolidHeader
//           ? "border-b border-line bg-paper/95 backdrop-blur-md"
//           : "border-b border-transparent bg-transparent"
//       }`}
//     >
//       <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
//         <PenZoneLogo />

//         {/* Desktop Navigation */}
//         <ul className="hidden items-center gap-8 font-body text-sm md:flex">
//           {navLinks.map((item) => (
//             <li key={item.label}>
//               <NavLink href={item.href}>{item.label}</NavLink>
//             </li>
//           ))}
//         </ul>

//         <div className="flex items-center gap-1">
//           {/* Search Toggle */}
//           <div className="flex items-center">
//             <AnimatePresence initial={false}>
//               {searchOpen && (
//                 <motion.input
//                   key="search"
//                   initial={{ width: 0, opacity: 0 }}
//                   animate={{ width: 150, opacity: 1 }}
//                   exit={{ width: 0, opacity: 0 }}
//                   transition={{ duration: 0.25, ease: "easeInOut" }}
//                   type="text"
//                   placeholder="Search 3D pens…"
//                   autoFocus
//                   onBlur={() => setSearchOpen(false)}
//                   className="mr-1 h-9 rounded-full border border-line bg-paper-raised px-3 font-body text-sm text-ink outline-none placeholder:text-graphite md:w-[180px]"
//                 />
//               )}
//             </AnimatePresence>
//             <IconButton label="Search" onClick={() => setSearchOpen((v) => !v)}>
//               <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
//                 <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
//                 <line x1="11.2" y1="11.2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//               </svg>
//             </IconButton>
//           </div>

//           {/* Desktop Auth Section */}
//           <div className="hidden md:flex items-center justify-center min-w-[36px] mx-1">
//             {loading ? (
//               <svg className="h-4 w-4 animate-spin text-graphite" viewBox="0 0 24 24" fill="none">
//                 <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
//                 <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
//               </svg>
//             ) : user ? (
//               <a href="/" className="font-mono text-sm tracking-widest text-brass transition-colors hover:text-ink">
//                 {getFirstName(user.name)}
//               </a>
//             ) : (
//               <IconButton label="Log in" href="/login">
//                 <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
//                   <circle cx="8.5" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.3" />
//                   <path d="M2.5 15c1-3.2 3.6-5 6-5s5 1.8 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//                 </svg>
//               </IconButton>
//             )}
//           </div>

//           {/* Shopping Bag Link */}
//           <IconButton label="Bag" href="/cart" badge={2}>
//             <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
//               <path d="M4 6h9l-.7 8.5a1 1 0 01-1 .9H5.7a1 1 0 01-1-.9L4 6z" stroke="currentColor" strokeWidth="1.3" />
//               <path d="M6.2 6V4.3a2.3 2.3 0 014.6 0V6" stroke="currentColor" strokeWidth="1.3" />
//             </svg>
//           </IconButton>

//           <div className="ml-1 hidden md:block">
//             <ThemeToggle />
//           </div>

//           {/* Mobile Menu Hamburger Toggle */}
//           <div className="ml-1 md:hidden">
//             <IconButton
//               label="Toggle menu"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
//                 {mobileMenuOpen ? (
//                   <path d="M4 4L13 13M13 4L4 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//                 ) : (
//                   <path d="M3 5H14M3 8.5H14M3 12H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//                 )}
//               </svg>
//             </IconButton>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu Dropdown */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="overflow-hidden border-t border-line bg-paper/95 backdrop-blur-md md:hidden"
//           >
//             <div className="flex flex-col px-6 py-6 font-body text-base text-ink">
//               <ul className="flex flex-col gap-5">
//                 {navLinks.map((item) => (
//                   <li key={item.label}>
//                     <a
//                       href={item.href}
//                       onClick={() => setMobileMenuOpen(false)}
//                       className="group relative inline-flex w-fit items-center transition-colors duration-300 hover:text-brass"
//                     >
//                       <span className="mr-0 h-1 w-1 scale-0 rounded-full bg-brass opacity-0 transition-all duration-300 ease-out group-hover:mr-1.5 group-hover:scale-100 group-hover:opacity-100" />
//                       <span className="relative">
//                         {item.label}
//                         <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-brass transition-transform duration-300 ease-out group-hover:scale-x-100" />
//                       </span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>

//               <hr className="my-6 border-line" />

//               <div className="flex items-center justify-between">

//                 {/* Mobile Auth Section */}
//                 {loading ? (
//                   <div className="flex items-center gap-2 text-graphite">
//                     <svg className="h-4 w-4 animate-spin text-graphite" viewBox="0 0 24 24" fill="none">
//                       <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
//                       <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
//                     </svg>
//                   </div>
//                 ) : user ? (
//                   <a
//                     href="/profile"
//                     className="group flex items-center gap-2 text-brass transition-colors duration-300 hover:text-ink"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="transition-colors group-hover:text-ink">
//                       <circle cx="8.5" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.3" />
//                       <path d="M2.5 15c1-3.2 3.6-5 6-5s5 1.8 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//                     </svg>
//                     <span className="font-mono tracking-widest">{getFirstName(user.name)}</span>
//                   </a>
//                 ) : (
//                   <a
//                     href="/login"
//                     className="group flex items-center gap-2 text-graphite transition-colors duration-300 hover:text-brass"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="transition-colors group-hover:text-brass">
//                       <circle cx="8.5" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.3" />
//                       <path d="M2.5 15c1-3.2 3.6-5 6-5s5 1.8 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//                     </svg>
//                     <span>Log in</span>
//                   </a>
//                 )}

//                 <ThemeToggle />
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import { useTheme } from "./theme-provider";
import { useAuth } from "./auth-provider";

export function PenZoneLogo() {
  const { theme } = useTheme();

  return (
    <a
      href="/"
      className="group flex items-center gap-2.5"
      aria-label="PenZone home"
    >
      <Image
        src="/logo.png"
        alt="PenZone Logo"
        width={240}
        height={80}
        priority
        className={`h-12 w-auto object-contain transition-all duration-300 ease-out group-hover:scale-105 ${
          theme === "dark" ? "brightness-0 invert" : ""
        }`}
      />
    </a>
  );
}

function NavLink({ children, href, ...props }) {
  return (
    <a
      href={href}
      {...props}
      className="group relative inline-flex items-center py-1 text-graphite transition-colors duration-300 hover:text-brass"
    >
      <span className="mr-0 h-1 w-1 scale-0 rounded-full bg-brass opacity-0 transition-all duration-300 ease-out group-hover:mr-1.5 group-hover:scale-100 group-hover:opacity-100" />
      <span className="relative transition-[letter-spacing] duration-300 group-hover:tracking-wide">
        {children}
        <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-brass transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </span>
    </a>
  );
}

function IconButton({ children, label, onClick, badge, className = "", href }) {
  const content = (
    <>
      {children}
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brass font-mono text-[9px] text-paper">
          {badge}
        </span>
      ) : null}
    </>
  );

  const baseClasses = `relative flex h-9 w-9 items-center justify-center rounded-full text-ink transition-all duration-200 hover:scale-110 hover:bg-brass/10 hover:text-brass ${className}`;

  if (href) {
    return (
      <a href={href} aria-label={label} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} aria-label={label} className={baseClasses}>
      {content}
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Live search results state
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [collections, setCollections] = useState([]);
  const [searchDataLoading, setSearchDataLoading] = useState(false);

  const searchRef = useRef(null);
  const { user, loading } = useAuth();

  const navLinks = [
    { label: "Collection", href: "/collections" },
    { label: "Shop", href: "/products" },
    { label: "Brands", href: "/brands" },
    { label: "PreOwned", href: "/pre-owned" },
    { label: "Sale", href: "/sale" },
    { label: "About Us", href: "/about-us" },
  ];

  // Track window size for responsive search input width
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch / Filter data in real-time as user types
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        setSearchDataLoading(true);

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

        const [productsRes, brandsRes, collectionsRes] = await Promise.all([
          fetch(`${baseUrl}/api/products`),
          fetch(`${baseUrl}/api/brands`),
          fetch(`${baseUrl}/api/collections`),
        ]);

        const productsData = await productsRes.json();
        const brandsData = await brandsRes.json();
        const collectionsData = await collectionsRes.json();

        if (productsRes.ok) {
          setProducts(productsData.products || productsData || []);
        }

        if (brandsRes.ok) {
          setBrands(brandsData.brands || brandsData || []);
        }

        if (collectionsRes.ok) {
          setCollections(collectionsData.collections || collectionsData || []);
        }
      } catch (error) {
        console.error("Failed to load search data:", error);
      } finally {
        setSearchDataLoading(false);
      }
    };

    fetchSearchData();
  }, []);

  const searchResults = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    if (!query) {
      return {
        products: [],
        brands: [],
        collections: [],
      };
    }

    const matchedProducts = products
      .filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const description = product.description?.toLowerCase() || "";
        return name.includes(query) || description.includes(query);
      })
      .slice(0, 6);

    const matchedBrands = brands
      .filter((brand) => {
        const name = brand.name?.toLowerCase() || "";
        return name.includes(query);
      })
      .slice(0, 5);

    const matchedCollections = collections
      .filter((collection) => {
        const name = collection.name?.toLowerCase() || "";
        return name.includes(query);
      })
      .slice(0, 5);

    return {
      products: matchedProducts,
      brands: matchedBrands,
      collections: matchedCollections,
    };
  }, [searchValue, products, brands, collections]);

  const getFirstName = (fullName) => {
    if (!fullName) return "Profile";
    const first = fullName.split(" ")[0];
    return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  };

  const isSolidHeader = scrolled || mobileMenuOpen;
  const hasResults =
    searchResults.products.length > 0 ||
    searchResults.brands.length > 0 ||
    searchResults.collections.length > 0;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isSolidHeader
          ? "border-b border-line bg-paper/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <PenZoneLogo />

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 font-body text-sm md:flex">
          {navLinks.map((item) => (
            <li key={item.label}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          {/* Search Toggle & Live Search Bar Container */}
          <div className="relative flex items-center" ref={searchRef}>
            <AnimatePresence initial={false}>
              {searchOpen && (
                <motion.div
                  key="search-container"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: isMobile ? 140 : 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="relative mr-1"
                >
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search..."
                    autoFocus
                    className="w-full h-9 rounded-full border border-line bg-paper-raised px-3 font-body text-xs text-ink outline-none placeholder:text-graphite md:text-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Fully Responsive Live Search Dropdown Results */}
            <AnimatePresence>
              {searchOpen && searchValue.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                className="
  fixed
  inset-x-4
  top-16
  mt-2
  sm:absolute
  sm:inset-auto
  sm:right-0
  sm:top-full
  sm:mt-2
  sm:w-96
  rounded-2xl
  border border-line
  bg-paper-raised
  p-3.5 sm:p-4
  shadow-2xl
  backdrop-blur-md
  z-[100]
  max-h-[calc(100vh-5.5rem)]
  sm:max-h-[420px]
  overflow-y-auto
  overscroll-contain
  touch-pan-y
  pointer-events-auto
"
                >
                  {searchDataLoading ? (
                    <div className="py-6 text-center font-mono text-xs text-graphite">
                      Loading search...
                    </div>
                  ) : hasResults ? (
                    <div className="space-y-4 font-body text-sm pb-2">
                      {/* Products Section */}
                      {searchResults.products.length > 0 && (
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-brass mb-2">
                            Products
                          </p>
                          <div className="space-y-1">
                            {searchResults.products.map((prod) => (
                              <a
                                key={prod._id || prod.id}
                                href={`/products/${prod._id || prod.id}`}
                                onClick={() => setSearchOpen(false)}
                                className="flex items-center justify-between rounded-lg p-2.5 sm:p-2 transition-colors hover:bg-brass/10 hover:text-brass"
                              >
                                <span className="font-medium text-ink truncate pr-2">
                                  {prod.name}
                                </span>
                                <span className="font-mono text-xs text-brass shrink-0">
                                  {prod.price ? `$${prod.price}` : ""}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Brands Section */}
                      {searchResults.brands.length > 0 && (
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-brass mb-2">
                            Brands
                          </p>
                          <div className="space-y-1">
                            {searchResults.brands.map((brand) => (
                              <a
                                key={brand._id || brand.id}
                                href={`/brands`}
                                onClick={() => setSearchOpen(false)}
                                className="block rounded-lg p-2.5 sm:p-2 font-medium text-ink transition-colors hover:bg-brass/10 hover:text-brass truncate"
                              >
                                {brand.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Collections Section */}
                      {searchResults.collections.length > 0 && (
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-brass mb-2">
                            Collections
                          </p>
                          <div className="space-y-1">
                            {searchResults.collections.map((col) => (
                              <a
                                key={col._id || col.id}
                                href={`/collections/${col._id || col.id}`}
                                onClick={() => setSearchOpen(false)}
                                className="block rounded-lg p-2.5 sm:p-2 font-medium text-ink transition-colors hover:bg-brass/10 hover:text-brass truncate"
                              >
                                {col.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-6 text-center font-mono text-xs text-graphite px-2">
                      No results found for "{searchValue}"
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <IconButton
              label="Search"
              onClick={() => {
                setSearchOpen((open) => {
                  if (open) {
                    setSearchValue("");
                  }
                  return !open;
                });
              }}
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <circle
                  cx="7"
                  cy="7"
                  r="5.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <line
                  x1="11.2"
                  y1="11.2"
                  x2="16"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </IconButton>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center justify-center min-w-[36px] mx-1">
            {loading ? (
              <svg
                className="h-4 w-4 animate-spin text-graphite"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  className="opacity-75"
                />
              </svg>
            ) : user ? (
              <a
                href="/profile"
                className="font-mono text-sm tracking-widest text-brass transition-colors hover:text-ink"
              >
                {getFirstName(user.name)}
              </a>
            ) : (
              <IconButton label="Log in" href="/login">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <circle
                    cx="8.5"
                    cy="5.5"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M2.5 15c1-3.2 3.6-5 6-5s5 1.8 6 5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </IconButton>
            )}
          </div>

          {/* Shopping Bag Link */}
          <IconButton label="Bag" href="/cart" badge={2}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path
                d="M4 6h9l-.7 8.5a1 1 0 01-1 .9H5.7a1 1 0 01-1-.9L4 6z"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M6.2 6V4.3a2.3 2.3 0 014.6 0V6"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
          </IconButton>

          <div className="ml-1 hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <div className="ml-1 md:hidden">
            <IconButton
              label="Toggle menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                {mobileMenuOpen ? (
                  <path
                    d="M4 4L13 13M13 4L4 13"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M3 5H14M3 8.5H14M3 12H14"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </IconButton>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-paper/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col px-6 py-6 font-body text-base text-ink">
              <ul className="flex flex-col gap-5">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group relative inline-flex w-fit items-center transition-colors duration-300 hover:text-brass"
                    >
                      <span className="mr-0 h-1 w-1 scale-0 rounded-full bg-brass opacity-0 transition-all duration-300 ease-out group-hover:mr-1.5 group-hover:scale-100 group-hover:opacity-100" />
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-brass transition-transform duration-300 ease-out group-hover:scale-x-100" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <hr className="my-6 border-line" />

              <div className="flex items-center justify-between">
                {loading ? (
                  <div className="flex items-center gap-2 text-graphite">
                    <svg
                      className="h-4 w-4 animate-spin text-graphite"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="opacity-25"
                      />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        className="opacity-75"
                      />
                    </svg>
                  </div>
                ) : user ? (
                  <a
                    href="/profile"
                    className="group flex items-center gap-2 text-brass transition-colors duration-300 hover:text-ink"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      className="transition-colors group-hover:text-ink"
                    >
                      <circle
                        cx="8.5"
                        cy="5.5"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                      <path
                        d="M2.5 15c1-3.2 3.6-5 6-5s5 1.8 6 5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="font-mono tracking-widest">
                      {getFirstName(user.name)}
                    </span>
                  </a>
                ) : (
                  <a
                    href="/login"
                    className="group flex items-center gap-2 text-graphite transition-colors duration-300 hover:text-brass"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      className="transition-colors group-hover:text-brass"
                    >
                      <circle
                        cx="8.5"
                        cy="5.5"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                      <path
                        d="M2.5 15c1-3.2 3.6-5 6-5s5 1.8 6 5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>Log in</span>
                  </a>
                )}

                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}