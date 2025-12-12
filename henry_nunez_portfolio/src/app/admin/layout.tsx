"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import classes from "./admin.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

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
          <button onClick={handleLogout} className={classes.logoutButton}>
            Logout
          </button>
        </div>
      </aside>
      <main className={classes.mainContent}>{children}</main>
    </div>
  );
}
