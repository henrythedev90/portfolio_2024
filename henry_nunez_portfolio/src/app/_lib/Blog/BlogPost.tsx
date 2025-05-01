import React from "react";
import Image from "next/image";
import classes from "./style/BlogPost.module.css";
import Link from "next/link";
import { BlogPost as BlogPostType } from "../../components/data/blogPostList";

const BlogPost = ({ params }: { params: BlogPostType }) => {
  return (
    <div key={params.id} className={classes.blog_post_container}>
      <Link href={`/blog/${params.slug}`}>
        <Image src={params.image} alt={params.title} width={368} height={252} />
        <span>{params.type}</span>
        <h3>{params.title}</h3>
        <p>{params.content}</p>
      </Link>
    </div>
  );
};

export default BlogPost;
