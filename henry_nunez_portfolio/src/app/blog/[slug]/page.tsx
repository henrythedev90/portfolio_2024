import { BLOG_POSTS } from "@/app/components/data/blogPostList";
import { CONTACT_LIST } from "@/app/components/data/linkList";
import Container from "@/app/components/Container/Container";
import Image from "next/image";
import classes from "../style/BlogSinglePost.module.css";
import Link from "next/link";

// Simulate an API call to fetch blog posts
async function getBlogPosts() {
  // In a real app, this would be an actual API call
  // Example: const response = await fetch('https://api.example.com/posts');
  // return await response.json();

  // For now, we'll simulate a delay to demonstrate async behavior
  await new Promise((resolve) => setTimeout(resolve, 100));
  return BLOG_POSTS.posts;
}

// Simulate fetching a single post
async function getBlogPost(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  // Resolve the params promise
  const resolvedParams = await params;

  // Fetch the specific post
  const post = await getBlogPost(resolvedParams.slug);

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
    <div className={classes.blog_single_post_container}>
      <Container>
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
      </Container>
    </div>
  );
}
