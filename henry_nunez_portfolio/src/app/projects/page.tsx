"use client";
import React, { useState, useEffect } from "react";
import { PROJECTS } from "../components/data/projects";
import ProjectCard from "../_lib/Project/ProjectCard";
import classes from "../_lib/Project/style/ProjectCard.module.css";
import Loading from "../components/Loading/Loading";
import ProjectContent from "../_lib/Project/ProjectContent";

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
    // <Container>
    <div className={classes.projects_container}>
      <div className={classes.projects_title}>
        <h2 className={classes.title}>
          &quot;<span className={classes.title_span}>P</span>rojects&quot;
        </h2>
      </div>
      <ProjectContent />
    </div>
  ) : (
    // </Container>
    <Loading currentTheme={currentTheme} />
  );
}
