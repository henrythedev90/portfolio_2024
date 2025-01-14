import React /* { useEffect, useRef, useState } */ from "react";
import Container from "../../components/Container/Container";
import { NAV_LINK } from "../../components/data/navLinks";
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

  // const footerDiv = document.querySelector("#footerDiv");
  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         console.log("Div is visible on the screen");
  //       } else {
  //         console.log("Div si not visible");
  //       }
  //     });
  //   },
  //   {
  //     threshold: 0.1, // Adjust the threshold as needed
  //   }
  // );

  // if (footerDiv) {
  //   observer.observe(footerDiv);
  // }
  return (
    <footer id="footerDiv">
      <Container>
        <div className={classes.footer_container}>
          <div className={`${classes.footer_menu}`}>
            {NAV_LINK.map((item, index) => (
              <Link href={item.path} key={index}>
                {item.display}
              </Link>
            ))}
          </div>
          <div className={classes.theme_buttons}>
            <span>Theme:</span>

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
                    marginBottom: "10px", // Add some spacing between buttons
                  }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
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
