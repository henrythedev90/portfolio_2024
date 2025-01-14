import React, { useEffect, useRef, useState } from "react";
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
              bottom: isVisible ? "auto" : "0",
              width: "100%",
              right: "-2px",
              display: "flex",
            }}
          >
            {isVisible ? <span>Theme:</span> : null}

            <div
              style={{
                flexDirection: isVisible ? "row" : "column",
                opacity: isVisible ? "1" : "0.75",
              }}
            >
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
                    borderRadius:
                      theme === t
                        ? isVisible
                          ? "8px 25px"
                          : "50%"
                        : isVisible
                        ? "25px 8px"
                        : "50%",
                    marginBottom: "10px", // Add some spacing between buttons
                  }}
                >
                  {isVisible
                    ? t.charAt(0).toUpperCase() + t.slice(1)
                    : t.charAt(0).toUpperCase()}
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
