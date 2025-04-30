import { BLOG_POST_LIST } from "@/app/components/data/blogPostList";
import { CONTACT_LIST } from "@/app/components/data/linkList";
import Container from "@/app/components/Container/Container";
import Image from "next/image";
import classes from "./style/BlogSinglePost.module.css";
import Link from "next/link";
export async function generateStaticParams() {
  return BLOG_POST_LIST.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POST_LIST.find((post) => post.slug === params.slug);
  return (
    <Container>
      <main>
        <div className={classes.blog_single_post_image}>
          <Image
            src={post?.image || ""}
            alt={post?.title || ""}
            width={1000}
            height={1000}
          />
        </div>
        <div className={classes.blog_post_content}>
          <span>{post?.type}</span>
          <h1>{post?.title}</h1>
          <p>
            {new Date(post?.date || "").toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <div className={classes.blog_post_social_links}>
            {CONTACT_LIST.map((contact) => (
              <Link href={contact.href} key={contact.name}>
                <i className={contact.devicon}></i>
              </Link>
            ))}
          </div>
        </div>
        <div className={classes.blog_post_content}>
          <h1>{post?.title}</h1>
          <p>{post?.content}</p>
          <p>{post?.content}</p>
        </div>
      </main>
    </Container>
  );
}
