import React from "react";
import Image from "next/image";
import classes from "./style/BlogPost.module.css";
import Link from "next/link";
interface BlogPostPropsContent {
  id: number;
  title: string;
  image: string;
  type: string;
  content: string;
  slug: string;
}

const BlogPost = ({
  id,
  image,
  title,
  type,
  content,
  slug,
}: BlogPostPropsContent) => {
  return (
    <div key={id} className={classes.blog_post_container}>
      <Link href={`/blog/${slug}`}>
        <Image src={image} alt={title} width={368} height={252} />
        <span>{type}</span>
        <h3>{title}</h3>
        <p>{content}</p>
      </Link>
    </div>
  );
};

export default BlogPost;
