export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
  technologies: string[];
  image_alt: string;
}
export const PROJECTS = [
  {
    id: 1,
    title: "Henry's Dog Adoption Agency",
    description:
      "A modern web application for browsing and finding your perfect canine companion! This app allows users to browse available dogs, filter by various criteria, add favorites, and receive personalized matches based on their preferences.",
    link: "https://henrys-dog-adoption-agency.vercel.app/",
    github: "https://github.com/henrythedev90/henrys-dog-adoption-agency",
    image_alt: "Screenshot of Henry's Dog Adoption Agency",
    image: "/images/henrys-dog-adoption-agency.vercel.app_dogs_app.png",
    technologies: [
      "Next.js",
      "React Redux",
      "CSS Modules",
      "TypeScript",
      "Axios",
      "Frontend",
    ],
  },
  {
    id: 2,
    title: "Weather App",
    description:
      "A modern, responsive weather application that displays real-time weather information and forecasts with dynamic themes that change based on current weather conditions.",
    image: "/images/weather-app-ten-psi-94.vercel.app.png",
    link: "https://weather-app-ten-psi-94.vercel.app/",
    github: "https://github.com/henrythedev90/weather-app",
    image_alt: "Screenshot of Weather App",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "OpenWeather API",
      "Geolocation API",
      "Frontend",
    ],
  },
  {
    id: 3,
    title: "Retro Digital Clock",
    description:
      "A retro-style digital clock that displays the current time in a classic, vintage-inspired design. The clock features a sleek, minimalistic look with a retro-futuristic vibe, perfect for adding a touch of nostalgia to any space.",
    image: "/images/retro-clock.vercel.app.png",
    link: "https://retro-clock.vercel.app/",
    github: "https://github.com/henrythedev90/retro-clock",
    image_alt: "Screenshot of Retro Digital Clock",
    technologies: [
      "Next.js",
      "TypeScript",
      "CSS Modules",
      "Frontend",
      "React Hooks",
    ],
  },
];
