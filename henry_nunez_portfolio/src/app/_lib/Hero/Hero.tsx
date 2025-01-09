"use client";
import React, { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import Container from "../../../../Components/Container/Container";
import selfie from "../../../../public/images/Henry_Nunez.png";
import classes from "./Hero.module.css";

const Hero = () => {
  const NA = "🌎";
  const AF = "🌍";
  const AS = "🌏";

  const globalEmoji = useMemo(() => [NA, AF, AS], []);
  const [currentEmoji, setCurrentEmoji] = useState(globalEmoji[0]);

  let i = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji(globalEmoji[i++ % globalEmoji.length]);
    }, 500);
    return () => clearInterval(interval);
  }, [globalEmoji, i]);

  return (
    <section className={classes.hero_container}>
      <Container>
        <div className={classes.hero_row}>
          <div className={classes.hero_content}>
            <h1>Hello World {currentEmoji}</h1>
            <p>
              My name is Henry Nuñez and I have a little over 4 years of
              dedicated experience as a Software Engineer, I’ve contributed to
              innovative fintech solutions and supported non-profit
              organizations with impactful front-end work. Known for my
              problem-solving abilities, I’ve consistently delivered effective
              resolutions to critical web application issues, combining
              technical expertise with a passion for making a difference. I’m
              excited about the possibility of collaborating with like-minded
              individuals to create innovative solutions. With my experience,
              I’m confident that together we can tackle challenges and make a
              meaningful impact. Let’s connect and explore how our skills and
              goals align!
            </p>
            <p>Occasionally I train for marathons and run long distance</p>
            <p>Currently based in New York City</p>
            <div className={classes.hero_button}>
              <a
                href="/papers/Henry_Nunez_Resume_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <button>Resume</button>
              </a>
            </div>
          </div>
          <div className={classes.hero_content_img}>
            <div>
              <Image
                alt="frontal image of Henry's face"
                src={selfie}
                width={300}
                height={400}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
