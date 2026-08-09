import {
  Fraunces,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

// Display face — luxury/editorial brand typography
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

// Body face — clean and highly readable
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Utility face — specifications, prices, SKUs
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});