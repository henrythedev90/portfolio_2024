"use client";
import React, { useState } from "react";
import classes from "./Form.module.css";
import Button from "../Button/Button";

function Form() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const removeSuccess = () => {
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setSubmitted(true);
        removeSuccess();
        setValues({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <form className={`${classes.form}`} method="post" onSubmit={handleOnSubmit}>
      <div className={`${classes.form_group}`}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChanges}
          value={values.name}
          required
          autoComplete="given-name"
        />
      </div>
      <div className={`${classes.form_group}`}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChanges}
          value={values.email}
          required
          autoComplete="off"
        />
      </div>
      <div className={`${classes.form_group}`}>
        <textarea
          rows={5}
          placeholder="Message"
          name="message"
          onChange={handleChanges}
          value={values.message}
          autoComplete="off"
          required
        />
      </div>
      {submitted ? (
        <div className={`${classes.success}`}>
          <p>Thank You! Message was sent!</p>
        </div>
      ) : null}
      <Button text={"Send"} type={"submit"} variant="secondary" />
    </form>
  );
}

export default Form;
