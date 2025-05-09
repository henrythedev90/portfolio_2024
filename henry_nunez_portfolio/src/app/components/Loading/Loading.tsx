"use client";
import React, { useEffect, useState } from "react";
import classes from "./Loading.module.css";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      // Get all images from the page
      const images = Array.from(document.getElementsByTagName("img"));
      const imageUrls = images.map((img) => img.src);

      // Add any additional images that might be in your data
      const additionalImages = [
        // Add any hardcoded image paths here
        "/images/wireframe.png",
        // Add more if needed
      ];

      const allImages = [...new Set([...imageUrls, ...additionalImages])];

      const loadImage = (url: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            resolve();
          };
          img.onerror = () => {
            resolve(); // Resolve even on error to continue loading
          };
          img.src = url;
        });
      };

      try {
        await Promise.all(allImages.map(loadImage));
        setIsLoading(false);
      } catch (error) {
        console.error("Error preloading images:", error);
        setIsLoading(false); // Continue even if there's an error
      }
    };

    preloadImages();
  }, []);

  return (
    <div className={`${classes.loading} ${isLoading ? classes.active : ""}`}>
      <div className={classes.loading_content}>
        <div className={classes.simpleLoader} />
        <div className={classes.loading_text}>by Henry Nuñez</div>
      </div>
    </div>
  );
};

export default Loading;
