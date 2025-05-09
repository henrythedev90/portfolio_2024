import React from "react";
import classes from "./Loading.module.css";

interface LoadingProps {
  currentTheme?: string;
}

const Loading = ({ currentTheme = "light" }: LoadingProps) => {
  // Get theme from HTML if not provided as prop (fallback)
  const theme =
    currentTheme ||
    (typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme") || "light"
      : "light");

  return (
    <div className={`${classes.loading} ${classes.active}`}>
      <div className={classes.loading_content}>
        <div className={classes.loading_text}>Loading...</div>
        <div className={classes.loading_text}>by Henry Nuñez</div>
      </div>
    </div>
  );
};

export default Loading;
