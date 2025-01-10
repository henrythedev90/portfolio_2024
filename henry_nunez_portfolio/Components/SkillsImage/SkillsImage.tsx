import React from "react";
import classes from "../SkillsImage/SkillsImage.module.css";

type ImageProps = {
  title: string;
  icon: string;
};

const SkillsImage = ({ title, icon }: ImageProps) => {
  return (
    <div className={classes.skill_item}>
      <span>
        <i className={`devicon-${icon} colored`}></i>
      </span>
      <h5>{title.charAt(0).toUpperCase() + title.slice(1)}</h5>
    </div>
  );
};
export default SkillsImage;
