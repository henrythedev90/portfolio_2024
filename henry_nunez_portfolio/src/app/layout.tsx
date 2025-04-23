"use client";
import React, { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./_lib/Header/Header";
import Footer from "./_lib/Footer/Footer";
import "./globals.css";
import Loading from "./components/Loading/Loading";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The themeScript Inline Script (line 21)
// This is the key to fixing the theme flicker and persistence issues:
// Runs Before Anything Else: This is an inline script that executes before your React app even loads
// Immediately Sets Theme: It reads the theme from localStorage and applies it to the HTML element
// Prevents "Flash of Wrong Theme": By setting the theme before rendering, users never see the wrong theme, even for a split second
// Why This Approach Works
// The biggest challenge with themes in Next.js is timing:
// Standard React Approaches Don't Work Well:
// React's hooks run after rendering, causing a flash of the default theme
// Server-side rendering doesn't have access to user preferences
// Our Solution Uses Multiple Layers:
// The inline script sets the theme via classes and attributes before any content renders
// We also store theme in a global window variable as backup
// The React state syncs with this when it loads
// CSS is set up with multiple selector types to ensure theme applies correctly
// Redundant Theme Storage:
// Theme is stored in localStorage
// Also in window.__theme (as backup)
// In React state (currentTheme)
// As HTML attributes (data-theme)
// As CSS classes (theme-dark, etc.)
// This multi-layered approach ensures your theme persists across refreshes and renders correctly during every stage of the page lifecycle.

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
  const [currentTheme, setCurrentTheme] = useState("light"); // Default as placeholder during SSR
  const [isMounted, setIsMounted] = useState(false);
  const availableThemes = ["light", "dark", "blue", "green"];

  // Function to handle theme changes
  const handleSetTheme = (newTheme: string) => {
    // Update state
    setCurrentTheme(newTheme);

    // Update localStorage and DOM elements
    try {
      // Update localStorage
      localStorage.setItem("theme", newTheme);

      // Clear all existing theme classes
      availableThemes.forEach((theme) => {
        document.documentElement.classList.remove("theme-" + theme);
      });

      // Add the new theme class
      document.documentElement.classList.add("theme-" + newTheme);

      // Update data-theme attribute
      document.documentElement.setAttribute("data-theme", newTheme);

      // Set theme in window so it persists
      (window as any).__theme = newTheme;
    } catch (e) {
      console.error("Error saving theme:", e);
    }
  };

  // Initialize on mount
  useEffect(() => {
    try {
      // Get theme from localStorage or window.__theme (set by script)
      const savedTheme =
        localStorage.getItem("theme") || (window as any).__theme;

      // If found in storage or set by script, use it
      if (savedTheme && availableThemes.includes(savedTheme)) {
        setCurrentTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.documentElement.classList.add("theme-" + savedTheme);
      }
      // Otherwise check system preference
      else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const defaultTheme = prefersDark ? "dark" : "light";
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
        {/* Execute theme script immediately */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        <title>Henry Nuñez</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
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
            <main>{children}</main>
            <Footer
              theme={currentTheme}
              setTheme={handleSetTheme}
              availableThemes={availableThemes}
            />
          </>
        ) : (
          <Loading currentTheme={currentTheme} />
        )}
      </body>
    </html>
  );
}
