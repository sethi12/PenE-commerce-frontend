"use client";

import { PenZoneLogo } from "./Navbar";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Collections",
      links: [
        { label: "Fountain Pens", href: "#" },
        { label: "3D Pens & Filaments", href: "#" },
        { label: "Ballpoint & Rollerball", href: "#" },
        { label: "Inks & Refills", href: "#" },
        { label: "Limited Editions", href: "#" },
      ],
    },
    {
      title: "Craft & Care",
      links: [
        { label: "Bespoke Engraving", href: "#" },
        { label: "Maintenance & Repair", href: "#" },
        { label: "Nib Fitting Guide", href: "#" },
        { label: "Warranty", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Our Story", href: "#" },
        { label: "Delhi Atelier", href: "#" },
        { label: "Sustainability", href: "#" },
        { label: "Contact Us", href: "#" },
      ],
    },
  ];

  return (
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
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h4 className="font-display text-xs uppercase tracking-widest text-ink font-semibold">
                  {section.title}
                </h4>
                <ul className="flex flex-col gap-2.5 font-body text-sm text-graphite">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="transition-colors duration-200 hover:text-brass"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
  );
}