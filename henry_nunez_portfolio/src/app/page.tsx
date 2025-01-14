"use client";
import React, { useState, useEffect } from "react";
import Hero from "./_lib/Hero/Hero";
import Skills from "./_lib/Skills/Skills";
import Contact from "./_lib/Contact/Contact";
import Header from "./_lib/Header/Header";
import Footer from "./_lib/Footer/Footer";
import useLocalStorage from "use-local-storage";

export default function Home() {
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
    <body data-theme={theme}>
      <Header />
      <Hero />
      <Skills />
      {/* <div>Project</div> */}
      <Contact />
      <Footer
        theme={theme}
        setTheme={setTheme}
        availableThemes={availableThemes}
      />
    </body>
  );
}
