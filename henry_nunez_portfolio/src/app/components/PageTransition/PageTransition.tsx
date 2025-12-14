import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import classes from "./PageTransition.module.css";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const mainContentRef = useRef<HTMLElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    // Only animate if pathname actually changed (not on initial mount)
    if (
      prevPathnameRef.current !== null &&
      prevPathnameRef.current !== pathname
    ) {
      setShouldAnimate(true);

      // Reset scroll position to top when pathname changes
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }

      // Remove animation class after animation completes
      const timer = setTimeout(() => {
        setShouldAnimate(false);
      }, 500); // Match this with the CSS animation duration

      return () => clearTimeout(timer);
    }

    // Update previous pathname
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return (
    <div className={classes.pageTransition}>
      <main
        ref={mainContentRef}
        className={`${classes.mainContent} ${
          shouldAnimate ? classes.fadeIn : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default PageTransition;
