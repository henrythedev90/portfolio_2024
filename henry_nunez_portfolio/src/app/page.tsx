import React from "react";
import Hero from "./_lib/Hero/Hero";
import Skills from "./_lib/Skills/Skills";
import Carousel from "./components/Carousel/Carousel";
import { PROJECTS } from "./components/data/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Carousel projects={PROJECTS} />
    </>
  );
}
