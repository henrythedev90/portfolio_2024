import React from "react";
import Form from "../../../../Components/Form/Form";
import Container from "../../../../Components/Container/Container";
import {
  CONTACT_LIST,
  CONTACT_INFO,
} from "../../../../Components/data/linkList";
import Link from "next/link";

const Contact = () => {
  return (
    <div>
      <Container>
        <div>
          <h3>Contact Me!</h3>
          <ul>
            {CONTACT_INFO.map((i, index) => (
              <li key={index}>
                <span>
                  <i className={i.icon}></i>
                </span>
                <p>{i.string}</p>
              </li>
            ))}
          </ul>
          <div>
            {CONTACT_LIST.map((c, index) => (
              <Link href={c.href} key={index} target="_blank" rel="noreferrer">
                <i className={`${c.devicon}`}></i>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Form />
        </div>
      </Container>
    </div>
  );
};

export default Contact;
