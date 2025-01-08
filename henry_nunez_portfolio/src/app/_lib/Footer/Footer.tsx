import React /* { useEffect, useRef, useState } */ from "react";
import Container from "../../../../Components/Container/Container";
import { NAV_LINK } from "../../../../Components/data/navLinks";
import classes from "./Footer.module.css";
import Link from "next/link";

type FooterProps = {
  theme: string;
  setTheme: (theme: string) => void;
  availableThemes: string[];
};

const Footer = ({ theme, setTheme, availableThemes }: FooterProps) => {
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
          <div className={classes.footer_button_theme}>
            <span>Pick a theme:</span>
            <div>
              {availableThemes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  style={{
                    border:
                      theme === t
                        ? "2px solid var(--accent)"
                        : "2px solid var(--text-primary)",
                    backgroundColor:
                      theme === t ? "var(--accent)" : "var(--background)",
                    color:
                      theme === t
                        ? "var(--text-primary)"
                        : "var(--text-secondary)",
                  }}
                >
                  {t.charAt(0).toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className={`${classes.footer_creator}`}>
            <h6>Created by Henry Nuñez</h6>
          </div>
          <div className={`${classes.footer_copyright}`}>
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
