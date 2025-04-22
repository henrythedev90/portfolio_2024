"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "../data/projects";
import classes from "./Carousel.module.css";

const Carousel = ({ projects }: { projects: Project[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 640, height: 400 });

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

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Auto advance slides every 5 seconds
  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isMounted, activeIndex]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={classes.carousel_container}>
      <section className={classes.carousel_section}>
        <h2 className={classes.carousel_title}>
          <span className={classes.carousel_title_span}>P</span>rojects
        </h2>
        <div className={classes.carousel}>
          <div className={classes.carousel_inner}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`${classes.carousel_item} ${
                  index === activeIndex ? classes.active : ""
                }`}
                style={{
                  transform: `translateX(${-activeIndex * 100}%)`,
                  opacity: index === activeIndex ? 1 : 0,
                }}
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
                    <Link href={project.github} target="_blank">
                      GitHub
                    </Link>
                    <Link href={project.link} target="_blank">
                      Live Demo
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={classes.carousel_controls}>
            <button
              className={`${classes.carousel_button} ${classes.carousel_prev}`}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              &lt;
            </button>
            <button
              className={`${classes.carousel_button} ${classes.carousel_next}`}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              &gt;
            </button>
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
      </section>
    </div>
  );
};

export default Carousel;
