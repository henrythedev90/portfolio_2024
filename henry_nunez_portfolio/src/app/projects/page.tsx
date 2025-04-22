"use client";
import React from "react";
import { PROJECTS } from "../components/data/projects";
import ProjectCard from "../_lib/ProjectCard/ProjectCard";
import Container from "../components/Container/Container";
import classes from "../_lib/ProjectCard/style/ProjectCard.module.css";

export default function Projects() {
  return (
    <Container>
      <section className={classes.projects_container}>
        <h2 className={classes.title}>
          <span className={classes.title_span}>P</span>rojects
        </h2>
        <div className={classes.projects_grid}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </Container>
  );
}
