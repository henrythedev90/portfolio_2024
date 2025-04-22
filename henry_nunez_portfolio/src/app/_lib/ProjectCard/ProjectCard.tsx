import React from "react";
import Link from "next/link";
import Container from "@/app/components/Container/Container";
import { Project } from "@/app/components/data/projects";
import classes from "./style/ProjectCard.module.css";
import Image from "next/image";
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Container>
      <div className={classes.project_card_container}>
        <div className={classes.project_card}>
          <Link
            href={project.github}
            target="_blank"
            className={classes.project_card_link}
          >
            GitHub
          </Link>
          <h3>{project.title}</h3>
          <Link
            href={project.link}
            target="_blank"
            className={classes.project_card_link}
          >
            Live
          </Link>
        </div>
        <div className={classes.project_card_technologies}>
          {project.technologies.map((technology: string) => (
            <p key={technology}>{technology}</p>
          ))}
        </div>
        <div className={classes.project_card_description}>
          <p>{project.description}</p>
        </div>
        <div className={classes.project_card_image}>
          <Image
            src={project.image}
            alt={project.image_alt}
            width={360}
            height={280}
          />
        </div>
      </div>
    </Container>
  );
};

export default ProjectCard;
