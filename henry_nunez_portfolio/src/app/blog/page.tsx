import React from "react";
import Container from "../components/Container/Container";
import classes from "./style/blog.module.css";
import BlogContent from "../_lib/Blog/BlogContent";

export default function Blog() {
  return (
    <Container>
      <div className={classes.blog_container}>
        <div className={classes.blog_title}>
          <h2>
            <span>B</span>log
          </h2>
        </div>
        <BlogContent />
      </div>
    </Container>
  );
}
