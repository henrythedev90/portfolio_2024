import BlogPost from "./BlogPost";
import { BLOG_POSTS } from "@/app/components/data/blogPostList";
import Container from "@/app/components/Container/Container";
import classes from "./style/BlogContent.module.css";

const BlogContent = () => {
  return (
    <Container>
      <section className={classes.blog_posts_section}>
        <div className={classes.blog_posts_content}>
          {BLOG_POSTS.posts.map((post) => (
            <BlogPost key={post.id} params={post} />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default BlogContent;
