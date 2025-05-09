import React, { useState } from "react";
import classes from "../SkillsImage/SkillsImage.module.css";

type ImageProps = {
  title: string;
  icon: string;
};

const SkillsImage = ({ title, icon }: ImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={classes.skill_item}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>
        <i className={`devicon-${icon}${isHovered ? " colored" : ""}`}></i>
      </span>
      <h5>{title.charAt(0).toUpperCase() + title.slice(1)}</h5>
    </div>
  );
};
export default SkillsImage;
