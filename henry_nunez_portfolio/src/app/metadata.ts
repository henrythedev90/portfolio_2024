import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Henry Nuñez | Full Stack Developer",
    template: "%s | Henry Nuñez",
  },
  description:
    "Full Stack Developer specializing in React, Next.js, and TypeScript. Building modern web applications with a focus on performance and user experience.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Portfolio",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript",
    "Node.js",
    "HTML5",
    "CSS3",
    "Responsive Design",
    "UI/UX",
    "Web Applications",
    "API Development",
    "Database",
    "Git",
    "GitHub",
    "Agile Development",
    "Problem Solving",
    "Code Optimization",
    "Performance",
    "User Experience",
  ],
  authors: [{ name: "Henry Nuñez" }],
  creator: "Henry Nuñez",
  publisher: "Henry Nuñez",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.henry-nunez.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.henry-nunez.com",
    title: "Henry Nuñez | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, and TypeScript. Building modern web applications with a focus on performance and user experience.",
    siteName: "Henry Nuñez Portfolio",
    images: [
      {
        url: "/images/Henry_Nunez.png",
        width: 1200,
        height: 630,
        alt: "Henry Nuñez Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@stoic1190",
    creator: "@stoic1190",
    title: "Henry Nuñez | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, and TypeScript. Building modern web applications with a focus on performance and user experience.",
    images: {
      url: "/images/Henry_Nunez.png",
      alt: "Henry Nuñez - Software Engineer",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "k87w8aKkeETMQlSCvLBFTE7rMWMUbSBtDcYR-rWvQ-4",
  },
};
