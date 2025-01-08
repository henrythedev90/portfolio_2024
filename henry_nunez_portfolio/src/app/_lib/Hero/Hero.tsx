import React from "react";
import Container from "../../../../Components/Container/Container";
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={classes.hero_container}>
      <Container>
        <div className={classes.hero_row}>
          <div>First child of div</div>
          <div>Second child of div</div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
