import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@/app/components/data/projects";
import Container from "@/app/components/Container/Container";
import classes from "./style/ProjectContent.module.css";

const ProjectContent = () => {
  return (
    <Container>
      <section className={classes.projects_section}>
        <div className={classes.projects_content}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default ProjectContent;
