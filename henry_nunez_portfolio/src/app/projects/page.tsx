"use client";
import React from "react";
import { PROJECTS } from "../components/data/projects";
import ProjectCard from "../_lib/ProjectCard/ProjectCard";

export default function Projects() {
  return (
    <div>
      {PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
