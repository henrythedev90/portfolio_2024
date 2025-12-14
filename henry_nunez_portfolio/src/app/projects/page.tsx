"use client";
import React, { useState, useEffect } from "react";
import classes from "../_lib/Project/style/ProjectCard.module.css";
import Loading from "../components/Loading/Loading";
import ProjectContent from "../_lib/Project/ProjectContent";
import Container from "../components/Container/Container";
import LetterGlitch from "../components/LetterGlitch/LetterGlitch";

export default function Projects() {
  const [isMounted, setIsMounted] = useState(false);
  const [glitchColors, setGlitchColors] = useState<string[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Get theme colors from CSS variables
    const getThemeColors = () => {
      const root = document.documentElement;
      const accent = getComputedStyle(root).getPropertyValue("--accent").trim();
      const shadeDark = getComputedStyle(root)
        .getPropertyValue("--shade-dark")
        .trim();
      const shadeMedium = getComputedStyle(root)
        .getPropertyValue("--shade-medium")
        .trim();

      return [accent, shadeDark, shadeMedium];
    };

    // Set initial colors
    setGlitchColors(getThemeColors());

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setGlitchColors(getThemeColors());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    return () => observer.disconnect();
  }, []);

  return isMounted ? (
    <Container>
      <div className={classes.projects_container}>
        <div className={classes.projects_title}>
          <div className={classes.letter_glitch_wrapper}>
            {glitchColors.length > 0 && (
              <LetterGlitch
                glitchColors={glitchColors}
                glitchSpeed={33}
                centerVignette={false}
                outerVignette={true}
                smooth={true}
              />
            )}
          </div>
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
