import React from "react";
import Hero from "./_lib/Hero/Hero";
import Skills from "./_lib/Skills/Skills";
import Contact from "./_lib/Contact/Contact";
import Carousel from "./components/Carousel/Carousel";
import { PROJECTS } from "./components/data/projects";
// import RootLayout from "./layout";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Carousel projects={PROJECTS} />
      {/* <div>Project</div> */}
      <Contact />
    </>
  );
}
