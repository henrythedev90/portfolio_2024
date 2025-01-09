"use client";
import React, { useState } from "react";
import Container from "../../../../Components/Container/Container";
import classes from "./Skills.module.css";
import SkillsImage from "../../../../Components/SkillsImage/SkillsImage";
import { SKILLS, SKILLS_TYPE } from "../../../../Components/data/skillsList";

const Skills = () => {
  const [openSkills, setOpenSkills] = useState<string | null>(null);
  return (
    <div className={classes.skills_section}>
      <Container>
        {/* <div className={classes.skills_container}>
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
            <div>
              <h1>Skills</h1>
            </div>
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
        </div> */}
        <div className={classes.skills_list_mobile}>
          {SKILLS_TYPE.map((skillType) => (
            <div
              key={skillType.type}
              className={`skills_${skillType.type
                .toLowerCase()
                .replace(" ", "_")}`}
            >
              <div
                className={classes.toggle_skills}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenSkills(
                    openSkills === skillType.type ? null : skillType.type
                  );
                }}
              >
                <h1 className={classes.skills_list_mobile_title}>
                  {skillType.type.replace("_", "-")}
                </h1>
                {openSkills === skillType.type ? (
                  <div className={classes.chevron_arrow_up}></div>
                ) : (
                  <div className={classes.chevron_arrow_down}></div>
                )}
              </div>
              {openSkills === skillType.type && (
                <ul
                  className={`${classes.skills_list_mobile_item}${
                    openSkills === skillType.type ? "open" : ""
                  }`}
                >
                  {SKILLS.filter((item) => item.type === skillType.type).map(
                    (item, index) => (
                      <SkillsImage
                        key={index}
                        title={item.title}
                        icon={item.icon}
                      />
                    )
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
export default Skills;
