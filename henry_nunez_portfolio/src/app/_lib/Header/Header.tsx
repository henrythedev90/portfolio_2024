"use client";
import React, { useEffect, useRef } from "react";
import Container from "../../../../Components/Container/Container";
import classes from "./Header.module.css";
import Link from "next/link";
import { NAV_LINK } from "../../../../Components/data/navLinks";

type HeaderProps = {
  theme: string;
  setTheme: (theme: string) => void;
  availableThemes: string[];
};

const Header = ({ theme, setTheme, availableThemes }: HeaderProps) => {
  {
    /**useRef is null at start, you need to check node's existence before using it.*/
  }
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const headerFunc = () => {
    if (headerRef.current) {
      if (
        document.body.scrollTop > 5 ||
        document.documentElement.scrollTop > 5
      ) {
        headerRef.current.classList.add(classes.header_shrink);
      } else {
        headerRef.current.classList.remove(classes.header_shrink);
      }
    }
  };

  useEffect(() => {
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
          {/** this is where to toggle for theme buttons*/}
          <div className={classes.theme_buttons}>
            <div>
              {availableThemes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={classes.theme_single_button}
                  style={{
                    border:
                      theme === t
                        ? "1px solid var(--accent)"
                        : "1px solid var(--text-primary)",
                    borderRadius: theme === t ? "8px 25px" : "25px 8px",
                  }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {/** the navigation menu will go here */}
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
                  <h1 className="mobile_logo_title">
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
