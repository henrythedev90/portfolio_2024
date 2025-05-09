/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Container from "../../components/Container/Container";
import { NAV_LINK } from "../../components/data/navLinks";
import classes from "./Footer.module.css";
import Link from "next/link";

interface FooterProps {
  theme: string;
  setTheme: (theme: string) => void;
  availableThemes: string[];
}

const Footer = ({ theme, setTheme, availableThemes }: FooterProps) => {
  const date = new Date();
  const year = date.getFullYear();
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Update visibility state
      },
      { threshold: 0.1 } // Trigger when 10% of the footer is visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current); // Observe the footer element
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current); // Clean up observer
      }
    };
  }, []);

  return (
    <footer id="footerDiv" ref={footerRef}>
      <Container>
        <div className={classes.footer_container}>
          <div className={`${classes.footer_menu}`}>
            {NAV_LINK.map((item, index) => (
              <Link href={item.path} key={index}>
                {item.display}
              </Link>
            ))}
          </div>
          <div
            className={classes.theme_buttons}
            style={{
              position: isVisible ? "relative" : "fixed",
              bottom: isVisible ? "auto" : "50px",
              width: isVisible ? "auto" : "fit-content",
              display: "flex",
              flexDirection: isVisible ? "row" : "column",
              left: isVisible ? "auto" : "0px",
              rowGap: isVisible ? undefined : "10px",
              marginLeft: isVisible ? "0" : "10px",
              alignItems: "center",
              opacity: isVisible ? 1 : 0.8,
            }}
          >
            {isVisible ? <span>Theme:</span> : null}
            <label
              className={`${classes.switch} ${
                isVisible ? classes.visible : ""
              }`}
            >
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
              <span className={classes.slider}></span>
            </label>
          </div>
          <div className={`${classes.footer_creator}`}>
            <h6>Created by Henry Nuñez</h6>
          </div>
          <div className={`${classes.footer_copyright}`}>
            <p>
              &copy; Copyright {year} Developed by Henry Nuñez. All rights
              reserved.{" "}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
