import React from "react";
import Container from "../../../../Components/Container/Container";
import classes from "./Header.module.css";
import Link from "next/link";
import { NAV_LINK } from "../../../../Components/data/navLinks";

const Header = () => {
  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.nav_wrapper}>
          {/** potential logo will go here */}
          <div className={classes.logo}>
            <Link href={"/"}>
              <h1>
                <span>H</span>enry
              </h1>
            </Link>
          </div>
          {/** the navigation menu will go here */}
          <div className={classes.navigation}>
            <div className={classes.nav_menu}>
              {NAV_LINK.map((item, index) => (
                <Link href={item.path} key={index}>
                  {item.display}
                </Link>
              ))}
              <div className={`${classes.mobile_logo}`}>
                <Link href={"/"}>
                  <h1 className="mobile_logo_title">
                    <span>H</span>enry
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <span>
            <i className="ri-menu-line"></i>
          </span>
        </div>
      </Container>
    </header>
  );
};

export default Header;
