"use client";
import React, { useEffect, useRef } from "react";
import Container from "../../../../Components/Container/Container";
import classes from "./Header.module.css";
import Link from "next/link";
import { NAV_LINK } from "../../../../Components/data/navLinks";

const Header = () => {
  {
    /**useRef is null at start, you need to check node's existence before using it.*/
  }
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const headerFunc = () => {
      if (headerRef.current) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        headerRef.current.classList.toggle(
          classes.header_shrink,
          scrollTop > 5
        );
      }
    };
    window.addEventListener("scroll", headerFunc);
    return () => window.removeEventListener("scroll", headerFunc);
  }, []);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle(`${classes.menu_active}`);
    }
  };

  return (
    <header className={classes.header} ref={headerRef}>
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
          <div
            className={`${classes.navigation}`}
            onClick={toggleMenu}
            ref={menuRef}
          >
            <div className={classes.nav_menu}>
              {NAV_LINK.map((item, index) => (
                <Link href={item.path} key={index}>
                  {item.display}
                </Link>
              ))}
              <div className={`${classes.mobile_logo}`}>
                <Link href={"/"}>
                  <h1 className={classes.mobile_logo_title}>
                    <span>H</span>enry
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <span className={classes.mobile_menu}>
            <div className={classes.menu_line} onClick={toggleMenu}>
              <div>{/** this is the hamburger in the mobile menu*/}</div>
            </div>
          </span>
        </div>
      </Container>
    </header>
  );
};

export default Header;
