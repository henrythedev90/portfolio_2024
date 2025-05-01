export interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string;
  type: string;
  slug: string;
  date: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Building a Modern Portfolio with Next.js and TypeScript",
    content:
      "In this comprehensive guide, we'll explore how to create a stunning portfolio website using Next.js and TypeScript. From setting up the project structure to implementing responsive design, we'll cover everything you need to know. Learn about the benefits of static site generation, how to optimize images, and implement smooth animations that will make your portfolio stand out.",
    image: "/images/pexels-alleksana-4271927.png",
    type: "Tutorial",
    slug: "building-modern-portfolio-nextjs-typescript",
    date: "2024-03-15",
  },
  {
    id: 2,
    title: "The Power of CSS Grid: Creating Complex Layouts Made Simple",
    content:
      "CSS Grid has revolutionized web layout design. In this article, we'll dive deep into how to create complex, responsive layouts with minimal code. Discover practical examples of grid-based designs, learn about grid template areas, and understand how to combine Grid with Flexbox for powerful layout solutions. Perfect for both beginners and experienced developers.",
    image: "/images/pexels-alleksana-4271927.png",
    type: "CSS",
    slug: "power-css-grid-complex-layouts",
    date: "2024-02-14",
  },
  {
    id: 3,
    title: "State Management in React: Choosing the Right Solution",
    content:
      "With so many state management options available in React, how do you choose the right one? We'll compare Redux, Context API, Zustand, and other popular solutions. Learn about their strengths, weaknesses, and ideal use cases. Plus, get practical examples of implementing each solution in real-world applications.",
    image: "/images/pexels-alleksana-4271927.png",
    type: "React",
    slug: "state-management-react-choosing-solution",
    date: "2024-11-01",
  },
  {
    id: 4,
    title: "Building Accessible Web Applications: A Developer's Guide",
    content:
      "Web accessibility is crucial for creating inclusive digital experiences. This guide covers essential accessibility practices, from semantic HTML to ARIA attributes. Learn how to make your applications usable by everyone, including people with disabilities. We'll also explore tools and techniques for testing accessibility.",
    image: "/images/pexels-alleksana-4271927.png",
    type: "Accessibility",
    slug: "building-accessible-web-applications",
    date: "2024-10-01",
  },
  {
    id: 5,
    title: "Optimizing Performance in Next.js Applications",
    content:
      "Performance is key to user experience and SEO. In this article, we'll explore various techniques to optimize Next.js applications. From image optimization to code splitting, learn how to make your applications faster and more efficient. We'll also cover performance monitoring and debugging tools.",
    image: "/images/pexels-alleksana-4271927.png",
    type: "Performance",
    slug: "optimizing-performance-nextjs",
    date: "2024-08-24",
  },
  {
    id: 6,
    title: "TypeScript Best Practices for React Developers",
    content:
      "TypeScript can significantly improve your React development experience. This guide covers essential TypeScript patterns and best practices for React development. Learn about proper type definitions, generics, and how to avoid common pitfalls. Perfect for developers looking to enhance their type safety.",
    image: "/images/pexels-alleksana-4271927.png",
    type: "TypeScript",
    slug: "typescript-best-practices-react",
    date: "2024-07-15",
  },
];
