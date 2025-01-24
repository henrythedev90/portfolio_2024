import React from "react";
import Hero from "./_lib/Hero/Hero";
import Skills from "./_lib/Skills/Skills";
import Contact from "./_lib/Contact/Contact";
import RootLayout from "./layout";

export default function Home() {
  return (
    <RootLayout>
      <Hero />
      <Skills />
      {/* <div>Project</div> */}
      <Contact />
    </RootLayout>
  );
}
