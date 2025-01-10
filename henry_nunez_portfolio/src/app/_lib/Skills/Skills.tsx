"use client";
import React, { useState, useCallback } from "react";
import Container from "../../../../Components/Container/Container";
import classes from "./Skills.module.css";
import SkillsImage from "../../../../Components/SkillsImage/SkillsImage";
import { SKILLS, SKILLS_TYPE } from "../../../../Components/data/skillsList";
import SectionSubtitle from "../../../../Components/SectionSubtitle/ectionSubtitle";
import Button from "../../../../Components/Button/Button";

const Skills = () => {
  const [openSkills, setOpenSkills] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1 >= SKILLS_TYPE.length ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev - 1 < 0 ? SKILLS_TYPE.length - 1 : prev - 1
    );
  }, []);
  return (
    <section id="skills" className={classes.skills_section}>
      <Container>
        {/* this is for large tablets, laptops and bigger screen */}
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
            <div>
              <SectionSubtitle subTitle="Skills" />
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
        </div>
        {/* this is for the tablets */}
        <div className={classes.skills_list_tablet}>
          <div className={classes.carousel_wrapper}>
            {currentSlide > 0 && (
              <Button type={"button"} onClick={prevSlide} text={"<"} />
            )}
            <div className={classes.carousel_container}>
              <div
                className="carousel_slide"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: "transform 0.5s ease-in-out",
                  display: "flex",
                  height: "100%",
                }}
              >
                {SKILLS_TYPE.map((skillType) => (
                  <div
                    key={skillType.type}
                    className={classes.skill_type_slide}
                    style={{ width: `${100 / SKILLS_TYPE.length}%` }}
                  >
                    <h2 className={classes.skills_list_desktop_title}>
                      {skillType.type.replace("_", " ")}
                    </h2>
                    <ul className={classes.carousel_skills_grid}>
                      {SKILLS.filter(
                        (skill) => skill.type === skillType.type
                      ).map((skill, skillIndex) => (
                        <SkillsImage
                          key={skillIndex}
                          title={skill.title}
                          icon={skill.icon}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            {currentSlide < SKILLS_TYPE.length - 1 && (
              <Button type={"button"} onClick={nextSlide} text={">"} />
            )}
          </div>
        </div>

        {/* This is mobile */}
        <div className={classes.skills_list_mobile}>
          <SectionSubtitle subTitle="Skills" />
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
    </section>
  );
};
export default Skills;
