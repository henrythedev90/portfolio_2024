import React from "react";
import Container from "../../../../Components/Container/Container";
import classes from "./Skills.module.css";
import SkillsImage from "../../../../Components/SkillsImage/SkillsImage";
import { SKILLS } from "../../../../Components/data/skillsList";

const Skills = () => {
  return (
    <div>
      <Container>
        <div className={classes.skills_container}>
          <div className={classes.skill_row_one}>
            {SKILLS.slice(0, 3).map(
              (item: { icon: string; title: string }, index: number) => (
                <SkillsImage key={index} icon={item.icon} title={item.title} />
              )
            )}
          </div>
          <div className={classes.skill_row_two}>
            <div className={classes.skill_row_one}>
              {SKILLS.slice(3, 6).map((item, index) => (
                <SkillsImage key={index} icon={item.icon} title={item.title} />
              ))}
            </div>
            <div className={classes.skill_row_one}>
              {SKILLS.slice(6, 9).map((item, index) => (
                <SkillsImage key={index} icon={item.icon} title={item.title} />
              ))}
            </div>
          </div>
          <div className={classes.skill_row_three}>
            <div className={classes.skill_row_one}>
              {SKILLS.slice(9, 10).map((item, index) => (
                <SkillsImage key={index} icon={item.icon} title={item.title} />
              ))}
            </div>
            <div>Skills</div>
            <div className={classes.skill_row_one}>
              {SKILLS.slice(10, 11).map((item, index) => (
                <SkillsImage key={index} icon={item.icon} title={item.title} />
              ))}
            </div>
          </div>
          <div className={classes.skill_row_two}>
            <div className={classes.skill_row_one}>
              {SKILLS.slice(11, 14).map((item, index) => (
                <SkillsImage key={index} icon={item.icon} title={item.title} />
              ))}
            </div>
            <div className={classes.skill_row_one}>
              {SKILLS.slice(14, 17).map((item, index) => (
                <SkillsImage key={index} icon={item.icon} title={item.title} />
              ))}
            </div>
          </div>
          <div className={classes.skill_row_one}>
            {SKILLS.slice(17).map((item, index) => (
              <SkillsImage key={index} icon={item.icon} title={item.title} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Skills;
