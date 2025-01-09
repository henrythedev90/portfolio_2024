import React from "react";
import Form from "../../../../Components/Form/Form";
import Container from "../../../../Components/Container/Container";
import {
  CONTACT_LIST,
  CONTACT_INFO,
} from "../../../../Components/data/linkList";
import classes from "./Contact.module.css";
import Link from "next/link";

const Contact = () => {
  return (
    <div className={classes.contact_section}>
      <Container>
        <div className={classes.contact_container}>
          <div className={classes.contact_info}>
            <h3>Contact Me!</h3>
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
    </div>
  );
};

export default Contact;
