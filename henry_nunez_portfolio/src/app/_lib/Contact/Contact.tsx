import React from "react";
import Form from "../../../../pages/components/Form/Form";
import Container from "../../../../pages/components/Container/Container";
import {
  CONTACT_LIST,
  CONTACT_INFO,
} from "../../../../pages/components/data/linkList";
import classes from "./Contact.module.css";
import Link from "next/link";
import SectionSubtitle from "../../../../pages/components/SectionSubtitle/ectionSubtitle";

const Contact = () => {
  return (
    <section id="contact" className={classes.contact_section}>
      <Container>
        <div className={classes.contact_container}>
          <div className={classes.contact_info}>
            <SectionSubtitle subTitle="Contact Me!" />
            <ul className={classes.contact_list}>
              {CONTACT_INFO.map((i, index) => (
                <li key={index} className={classes.contact_list_item}>
                  <span>
                    <i className={i.icon}></i>
                  </span>
                  <p>{i.string}</p>
                </li>
              ))}
            </ul>
            <div className={classes.contact_social_links}>
              {CONTACT_LIST.map((c, index) => (
                <Link
                  href={c.href}
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={`${c.devicon}`}></i>
                </Link>
              ))}
            </div>
          </div>
          <div className={classes.contact_form}>
            <Form />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
