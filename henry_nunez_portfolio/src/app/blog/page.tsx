import React from "react";
import Container from "../components/Container/Container";
import classes from "./style/blog.module.css";
import BlogContent from "../_lib/Blog/BlogContent";
export default function Blog() {
  return (
    <Container>
      <main className={classes.blog_container}>
        <div className={classes.blog_title}>
          <h2>
            &quot;<span>B</span>log&quot;
          </h2>
        </div>
        <BlogContent />
      </main>
    </Container>
  );
}
