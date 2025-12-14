import React, { ReactNode } from "react";
import classes from "./LogoWall.module.css";

type LogoWallProps = {
  children: ReactNode;
  duplicates?: number; // Number of times to duplicate for seamless scroll (default: 3)
};

const LogoWall = ({ children, duplicates = 3 }: LogoWallProps) => {
  // Convert children to array and duplicate for seamless scrolling
  const childrenArray = React.Children.toArray(children);
  const duplicatedChildren = Array(duplicates)
    .fill(null)
    .flatMap(() => childrenArray);

  return (
    <div className={classes.logo_wall_container}>
      <div className={classes.gradient_left}></div>
      <div className={classes.gradient_right}></div>

      <div className={classes.scroll_container}>
        {duplicatedChildren.map((child, index) => (
          <div key={`logo-wall-item-${index}`} className={classes.tech_item}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoWall;
