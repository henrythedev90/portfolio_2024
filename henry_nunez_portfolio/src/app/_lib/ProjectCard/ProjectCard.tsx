import React from "react";
import Link from "next/link";

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <div>
      <h3>{project.title}</h3>
      <Link href={project.github} target="_blank">
        GitHub
      </Link>
      <Link href={project.link} target="_blank">
        Live
      </Link>
      <p>{project.description}</p>
      <p>{project.technologies.join(", ")}</p>
    </div>
  );
};

export default ProjectCard;
