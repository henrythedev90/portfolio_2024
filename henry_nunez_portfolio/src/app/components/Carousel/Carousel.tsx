"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "../data/projects";
import classes from "./Carousel.module.css";
import Button from "../Button/Button";
import Container from "../Container/Container";

const Carousel = ({ projects }: { projects: Project[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 640, height: 400 });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Set initial dimensions
    const updateDimensions = () => {
      const width = Math.min(640, window.innerWidth * 0.8);
      const height = Math.min(400, window.innerWidth * 0.5);
      setDimensions({ width, height });
    };

    updateDimensions();

    // Add event listener for window resize
    window.addEventListener("resize", updateDimensions);

    // Clean up
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match the transition duration in CSS
  }, [projects.length, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((prevIndex) =>
      prevIndex - 1 < 0 ? projects.length - 1 : prevIndex - 1
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match the transition duration in CSS
  }, [projects.length, isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;

    setIsAnimating(true);
    setActiveIndex(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match the transition duration in CSS
  };

  // Auto advance slides every 5 seconds
  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isMounted, nextSlide, isAnimating]);

  if (!isMounted) {
    return null;
  }

  return (
    <section className={classes.carousel_container}>
      <Container>
        <div className={classes.carousel_section}>
          <h2 className={classes.carousel_title}>
            <Link href="/projects">
              <span className={classes.carousel_title_span}>P</span>rojects
            </Link>
          </h2>
          <div className={classes.carousel}>
            <div className={classes.carousel_inner}>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`${classes.carousel_item} ${
                    index === activeIndex ? classes.active : ""
                  }`}
                >
                  <div className={classes.content}>
                    <h2 className={classes.project_title}>{project.title}</h2>
                    <div className={classes.project_tech}>
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span
                          className={classes.more_tech}
                          style={{ cursor: "pointer" }}
                        >
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className={classes.project_image}>
                      <Image
                        src={project.image}
                        alt={project.image_alt}
                        width={dimensions.width}
                        height={dimensions.height}
                        priority={index === activeIndex}
                      />
                    </div>
                    <p className={classes.project_description}>
                      {project.description}
                    </p>
                    <div className={classes.project_links}>
                      <Button
                        type="button"
                        onClick={() => window.open(project.github, "_blank")}
                        text="GitHub"
                      />
                      <Button
                        type="button"
                        onClick={() => window.open(project.link, "_blank")}
                        text="Live Demo"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={classes.carousel_controls}>
              <Button
                type="button"
                onClick={prevSlide}
                text={"<"}
                className={`${classes.carousel_button} ${classes.carousel_prev}`}
              />
              <Button
                type="button"
                onClick={nextSlide}
                text={">"}
                className={`${classes.carousel_button} ${classes.carousel_next}`}
              />
            </div>

            <div className={classes.carousel_indicators}>
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`${classes.carousel_indicator} ${
                    index === activeIndex ? classes.active : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Carousel;
