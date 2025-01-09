import { Fragment } from "react";
import Hero from "../app/_lib/Hero/Hero";
import Skills from "../app/_lib/Skills/Skills";
import Contact from "../app/_lib/Contact/Contact";
// import Image from "next/image";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <Skills />
      <div>Project</div>
      <Contact />
    </Fragment>
  );
}
