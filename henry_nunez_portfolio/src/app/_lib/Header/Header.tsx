import React from "react";
import Container from "../../../../Components/Container";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <Container>
        <div className={classes.nav_wrapper}></div>
      </Container>
    </header>
  );
};

export default Header;
