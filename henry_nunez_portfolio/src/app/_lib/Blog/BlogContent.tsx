import BlogPost from "./BlogPost";
import { BLOG_POST_LIST } from "@/app/components/data/blogPostList";
import Container from "@/app/components/Container/Container";
import classes from "./style/BlogContent.module.css";

const BlogContent = () => {
  return (
    <Container>
      <section className={classes.blog_posts_section}>
        <div className={classes.blog_posts_content}>
          {BLOG_POST_LIST.map((post) => (
            <BlogPost key={post.id} {...post} />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default BlogContent;
