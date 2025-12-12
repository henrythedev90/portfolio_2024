"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import classes from "./admin.module.css";

// Define available themes
const AVAILABLE_THEMES = ["light", "dark"];
type Theme = (typeof AVAILABLE_THEMES)[number];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");
  const router = useRouter();
  const pathname = usePathname();

  // Apply theme to DOM - use useCallback to ensure it's stable
  const applyTheme = React.useCallback((theme: Theme) => {
    try {
      // Apply theme to both html and body
      document.documentElement.setAttribute("data-theme", theme);
      if (document.body) {
        document.body.setAttribute("data-theme", theme);
      }

      // Clear and add theme classes
      AVAILABLE_THEMES.forEach((t) => {
        document.documentElement.classList.remove("theme-" + t);
        if (document.body) {
          document.body.classList.remove("theme-" + t);
        }
      });
      document.documentElement.classList.add("theme-" + theme);
      if (document.body) {
        document.body.classList.add("theme-" + theme);
      }

      (window as Window & { __theme?: Theme }).__theme = theme;
    } catch (e) {
      console.error("Error applying theme:", e);
    }
  }, []);

  // Initialize theme
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // First, check if theme is already set on the DOM (from root layout)
        const domTheme = document.documentElement.getAttribute(
          "data-theme"
        ) as Theme;

        const customWindow = window as Window & { __theme?: Theme };
        const savedTheme =
          localStorage.getItem("theme") || customWindow.__theme || domTheme;

        let themeToSet: Theme;
        if (savedTheme && AVAILABLE_THEMES.includes(savedTheme as Theme)) {
          themeToSet = savedTheme as Theme;
        } else {
          const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          themeToSet = prefersDark ? "dark" : "light";
        }

        setCurrentTheme(themeToSet);
        applyTheme(themeToSet);
      } catch (e) {
        console.error("Error initializing theme:", e);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeTheme, 0);
    return () => clearTimeout(timer);
  }, [applyTheme]);

  // Handle theme change
  const handleSetTheme = React.useCallback(
    (newTheme: Theme) => {
      setCurrentTheme(newTheme);
      try {
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
      } catch (e) {
        console.error("Error saving theme:", e);
      }
    },
    [applyTheme]
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/verify");
        const data = await response.json();

        if (!data.authenticated && pathname !== "/admin/login") {
          router.push("/admin/login");
          return;
        }

        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Authentication check failed:", error);
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className={classes.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={classes.adminContainer}>
      <aside className={classes.sidebar}>
        <div className={classes.sidebarHeader}>
          <h2>Admin Panel</h2>
        </div>
        <nav className={classes.nav}>
          <Link
            href="/admin/messages"
            className={`${classes.navLink} ${
              pathname === "/admin/messages" ? classes.active : ""
            }`}
          >
            Messages
          </Link>
          {/* <Link
            href="/admin/dashboard"
            className={`${classes.navLink} ${
              pathname === "/admin/dashboard" ? classes.active : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/blog"
            className={`${classes.navLink} ${
              pathname === "/admin/blog" ? classes.active : ""
            }`}
          >
            Blog Posts
          </Link>
          <Link
            href="/admin/projects"
            className={`${classes.navLink} ${
              pathname === "/admin/projects" ? classes.active : ""
            }`}
          >
            Projects
          </Link> */}
        </nav>
        <div className={classes.sidebarFooter}>
          <div className={classes.themeToggle}>
            <span className={classes.themeLabel}>Theme:</span>
            <label className={classes.switch}>
              <input
                type="checkbox"
                checked={currentTheme === "dark"}
                onChange={() =>
                  handleSetTheme(currentTheme === "dark" ? "light" : "dark")
                }
              />
              <span className={classes.slider}></span>
            </label>
          </div>
          <button onClick={handleLogout} className={classes.logoutButton}>
            Logout
          </button>
        </div>
      </aside>
      <main className={classes.mainContent}>{children}</main>
    </div>
  );
}
