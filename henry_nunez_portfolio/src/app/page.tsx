import { Fragment } from "react";
import Hero from "../app/_lib/Hero/Hero";
import Skills from "../app/_lib/Skills/Skills";
// import Image from "next/image";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <Skills />
      <div>Project</div>
      <div>Contact</div>
    </Fragment>
  );
}
