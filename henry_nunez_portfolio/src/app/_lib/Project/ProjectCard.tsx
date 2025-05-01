import React from "react";
import Link from "next/link";
import { Project } from "@/app/components/data/projects";
import classes from "./style/ProjectCard.module.css";
import Image from "next/image";
import Button from "@/app/components/Button/Button";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className={classes.project_card_container}>
      <Image
        src={project.image}
        alt={project.image_alt}
        width={360}
        height={280}
        className={classes.project_image}
        style={{
          width: "100%",
          height: "280px",
          maxWidth: "360px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div className={classes.project_card_technologies}>
        {project.technologies.slice(0, 3).map((technology: string) => (
          <p key={technology} style={{ width: "100px", textAlign: "center" }}>
            {technology}
          </p>
        ))}
        {project.technologies.length > 3 && (
          <p style={{ width: "100px", textAlign: "center", cursor: "pointer" }}>
            +{project.technologies.length - 3}
          </p>
        )}
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className={classes.project_card_links}>
        <Link href={project.github} target="_blank">
          <Button text="GitHub" />
        </Link>
        <Link href={project.link} target="_blank">
          <Button text="Live" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
