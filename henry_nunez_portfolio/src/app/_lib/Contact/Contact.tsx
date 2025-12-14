import React from "react";
import Form from "../../components/Form/Form";
import { CONTACT_LIST, CONTACT_INFO } from "../../components/data/linkList";
import classes from "./Contact.module.css";
import Link from "next/link";
import Container from "@/app/components/Container/Container";
import Image from "next/image";
import call_me from "../../../../public/images/call_me.jpeg";

const Contact = () => {
  return (
    <section id="contact" className={classes.contact_section}>
      <Container>
        <div className={classes.contact_container}>
          <div className={classes.contact_info}>
            {/* <SectionSubtitle subTitle="Contact Me!" /> */}
            <div className={classes.contact_info_title}>
              <h2>
                <span>C</span>ontact <span>M</span>e!
              </h2>
            </div>
            <div className={classes.contact_info_image}>
              <Image
                src={call_me}
                alt="contact"
                width={450}
                height={450}
                priority={true}
              />
            </div>
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
