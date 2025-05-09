"use client";
import React, { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./_lib/Header/Header";
import Footer from "./_lib/Footer/Footer";
import "./globals.css";
import Loading from "./components/Loading/Loading";
import PageTransition from "./components/PageTransition/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define available themes as a constant array
const AVAILABLE_THEMES = ["light", "dark"];
type Theme = (typeof AVAILABLE_THEMES)[number];

// Define theme script as a string to execute before page loads
const themeScript = `
  (function() {
    try {
      // Get saved theme or use system preference as fallback
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
      
      // Apply theme immediately to prevent flash
      document.documentElement.setAttribute('data-theme', theme);
      
      // Set a fallback class on HTML element in case CSS variables aren't loaded yet
      document.documentElement.classList.add('theme-' + theme);
      
      // Also set a flag to indicate the theme has been set
      window.__theme = theme;
    } catch (e) {
      console.error('Theme initialization error:', e);
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");
  const [isMounted, setIsMounted] = useState(false);

  // Function to handle theme changes
  const handleSetTheme = (newTheme: Theme) => {
    // Update state
    setCurrentTheme(newTheme);

    // Update localStorage and DOM elements
    try {
      // Update localStorage
      localStorage.setItem("theme", newTheme);

      // Clear all existing theme classes
      AVAILABLE_THEMES.forEach((theme) => {
        document.documentElement.classList.remove("theme-" + theme);
      });

      // Add the new theme class
      document.documentElement.classList.add("theme-" + newTheme);

      // Update data-theme attribute
      document.documentElement.setAttribute("data-theme", newTheme);

      // Set theme in window so it persists
      (window as Window & { __theme?: Theme }).__theme = newTheme;
    } catch (e) {
      console.error("Error saving theme:", e);
    }
  };

  // Initialize on mount
  useEffect(() => {
    try {
      // Get theme from localStorage or window.__theme (set by script)
      const customWindow = window as Window & { __theme?: Theme };
      const savedTheme = localStorage.getItem("theme") || customWindow.__theme;

      // If found in storage or set by script, use it
      if (savedTheme && AVAILABLE_THEMES.includes(savedTheme as Theme)) {
        setCurrentTheme(savedTheme as Theme);
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.documentElement.classList.add("theme-" + savedTheme);
      }
      // Otherwise check system preference
      else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const defaultTheme: Theme = prefersDark ? "dark" : "light";
        setCurrentTheme(defaultTheme);
        localStorage.setItem("theme", defaultTheme);
        document.documentElement.setAttribute("data-theme", defaultTheme);
        document.documentElement.classList.add("theme-" + defaultTheme);
      }
    } catch (e) {
      console.error("Error initializing theme:", e);
    }

    setIsMounted(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Henry Nuñez | Full Stack Developer</title>
        <meta
          property="og:title"
          content="Henry Nuñez | Full Stack Developer"
        />
        <meta property="og:image" content="/images/Henry_Nunez.png" />
        <meta
          property="og:image:alt"
          content="Henry Nuñez - Software Engineer"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@stoic1190" />
        <meta name="twitter:creator" content="@stoic1190" />
        {/* Execute theme script immediately */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑🏾‍💻</text></svg>"
        />
        <link
          rel="stylesheet"
          as="style"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
          as="style"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        data-theme={currentTheme}
        suppressHydrationWarning={true}
      >
        {isMounted ? (
          <>
            <Header />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <Footer theme={currentTheme} setTheme={handleSetTheme} />
          </>
        ) : (
          <Loading currentTheme={currentTheme} />
        )}
      </body>
    </html>
  );
}
