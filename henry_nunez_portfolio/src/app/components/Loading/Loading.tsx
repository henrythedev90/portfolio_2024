import React from "react";

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
    <main className={`loading-container loading-theme-${theme}`}>
      <div className="loading">Loading...</div>
      <div className="loading">by Henry Nuñez</div>
    </main>
  );
};

export default Loading;
