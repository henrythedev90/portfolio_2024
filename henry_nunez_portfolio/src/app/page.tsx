import { Fragment } from "react";
import Hero from "../app/_lib/Hero/Hero";
// import Image from "next/image";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <div>Skills</div>
      <div>Project</div>
      <div>Contact</div>
    </Fragment>
  );
}
