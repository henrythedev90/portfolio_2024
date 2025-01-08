"use client";
// import type { Metadata } from "next";
import React, { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./_lib/Header/Header";
import Footer from "./_lib/Footer/Footer";
import "./globals.css";
import useLocalStorage from "use-local-storage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [isMounted, setIsMounted] = useState(false);

  const availableThemes = ["light", "dark", "blue", "green"];

  useEffect(() => {
    const themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (!theme) {
      setTheme(themeMode ? "dark" : "light");
    }
    setIsMounted(true);
  }, [theme, setTheme]);

  if (!isMounted) {
    return null;
  }

  return (
    <html lang="en" data-theme={theme}>
      <head>
        <title>Henry Nuñez</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header
          theme={theme}
          setTheme={setTheme}
          availableThemes={availableThemes}
        />
        <main>{children}</main>
        <Footer
          theme={theme}
          setTheme={setTheme}
          availableThemes={availableThemes}
        />
      </body>
    </html>
  );
}
