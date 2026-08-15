import "./globals.css";
import { fraunces, inter, jetbrainsMono } from "./lib/fonts";
import { ThemeProvider } from "./components/theme-provider";
import { LenisProvider } from "./components/lenis-provider";
import { AuthProvider } from "./components/auth-provider"; // <-- Added import
import { Navbar } from "./components/Navbar";
import { CustomCursor } from "./components/custom-cursor";

export const metadata = {
  title: "PenZone — Pens made to be kept",
  description:
    "Precision-balanced fountain pens in solid brass and hand-lacquered barrels.",
};

// Runs before paint to avoid a light/dark flash on load.
const noFlashScript = `
(function () {
  try {
    var stored = localStorage.getItem('velin-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="bg-paper text-ink">
        <ThemeProvider>
          {/* AuthProvider wraps the layout so Navbar and children can access useAuth() */}
          <AuthProvider>
            <LenisProvider>
              <CustomCursor />
              <Navbar />
              <main>{children}</main>
            </LenisProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}