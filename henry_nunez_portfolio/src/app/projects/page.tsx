"use client";
import React, { useState, useEffect } from "react";
import classes from "../_lib/Project/style/ProjectCard.module.css";
import Loading from "../components/Loading/Loading";
import ProjectContent from "../_lib/Project/ProjectContent";
import Container from "../components/Container/Container";

export default function Projects() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    setIsMounted(true);

    // Get the current theme from localStorage or document
    try {
      // Try to get from localStorage first
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setCurrentTheme(savedTheme);
        return;
      }

      // If not in localStorage, try to get from HTML attribute
      const docTheme = document.documentElement.getAttribute("data-theme");
      if (docTheme) {
        setCurrentTheme(docTheme);
        return;
      }

      // Fallback to checking if the user prefers dark mode
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setCurrentTheme(prefersDark ? "dark" : "light");
    } catch (e) {
      console.error("Error getting theme:", e);
      // Keep default "light" theme if there's an error
    }
  }, []);

  return isMounted ? (
    <Container>
      <div className={classes.projects_container}>
        <div className={classes.projects_title}>
          <h2 className={classes.title}>
            <span className={classes.title_span}>P</span>rojects
          </h2>
        </div>
        <ProjectContent />
      </div>
    </Container>
  ) : (
    <Loading />
  );
}

// className={classes.projects_title}
// style={{
//   backgroundImage: 'url("/images/wireframe.png")',
//   backgroundSize: 'contain',
//   backgroundRepeat: 'no-repeat',
//   backgroundPosition: 'center',
//   width: '100%',
//   height: '100px'
// }}
