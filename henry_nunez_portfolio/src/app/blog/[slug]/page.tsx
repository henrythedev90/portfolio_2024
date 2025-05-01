import { BLOG_POSTS } from "@/app/components/data/blogPostList";
import { CONTACT_LIST } from "@/app/components/data/linkList";
import Container from "@/app/components/Container/Container";
import Image from "next/image";
import classes from "./style/BlogSinglePost.module.css";
import Link from "next/link";

export async function generateStaticParams() {
  return BLOG_POSTS.posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.posts.find((post) => post.slug === params.slug);

  if (!post) {
    return (
      <Container>
        <div className={classes.blog_single_post_container}>
          <h1>Post not found</h1>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={classes.blog_single_post_container}>
        <div className={classes.blog_single_post_image}>
          <Image src={post.image} alt={post.title} width={1000} height={1000} />
        </div>
        <article className={classes.blog_single_post_article}>
          <div className={classes.blog_single_post_header}>
            <span>{post.type}</span>
            <h1>{post.title}</h1>
            <p>
              {post.date
                ? new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""}
            </p>
            <div className={classes.blog_single_post_social_links}>
              {CONTACT_LIST.map((contact) => (
                <Link href={contact.href} key={contact.name}>
                  <i className={contact.devicon}></i>
                </Link>
              ))}
            </div>
          </div>
          <div className={classes.blog_single_post_content}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </div>
        </article>
      </div>
    </Container>
  );
}
