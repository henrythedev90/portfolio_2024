"use client";
import React, { useState, useEffect } from "react";
import classes from "../_lib/Project/style/ProjectCard.module.css";
import Loading from "../components/Loading/Loading";
import ProjectContent from "../_lib/Project/ProjectContent";
import Container from "../components/Container/Container";

export default function Projects() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <Container>
      <div className={classes.projects_container}>
        <div className={classes.projects_title}>
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

// className={classes.projects_title}
// style={{
//   backgroundImage: 'url("/images/wireframe.png")',
//   backgroundSize: 'contain',
//   backgroundRepeat: 'no-repeat',
//   backgroundPosition: 'center',
//   width: '100%',
//   height: '100px'
// }}
