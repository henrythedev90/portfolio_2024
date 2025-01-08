import React /* { useEffect, useRef, useState } */ from "react";
import Container from "../../../../Components/Container/Container";
import { NAV_LINK } from "../../../../Components/data/navLinks";
import classes from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer>
      <Container>
        <div className={classes.footer_container}>
          <div className={`${classes.footer_menu}`}>
            {NAV_LINK.map((item, index) => (
              <Link href={item.path} key={index}>
                {item.display}
              </Link>
            ))}
          </div>
          <div className={`${classes.footer__creator}`}>
            <h6>Created by Henry Nuñez</h6>
          </div>
          <div className={`${classes.footer__copyright}`}>
            <p>
              &copy; Copyright {year} Developed by Henry Nuñez. All right
              reserved.{" "}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
