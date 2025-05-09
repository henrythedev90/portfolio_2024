import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import classes from "./PageTransition.module.css";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll position to top when pathname changes
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    // Add a class to trigger the fade-in animation when the pathname changes
    const mainContent = document.querySelector(`.${classes.mainContent}`);
    if (mainContent) {
      mainContent.classList.add(classes.fadeIn);
      // Remove the class after animation completes
      const timer = setTimeout(() => {
        mainContent.classList.remove(classes.fadeIn);
      }, 900); // Match this with the CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <div className={classes.pageTransition}>
      <main className={classes.mainContent}>{children}</main>
    </div>
  );
};

export default PageTransition;
