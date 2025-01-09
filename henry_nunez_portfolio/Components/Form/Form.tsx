"use client";
import React, { useState } from "react";
import classes from "./Form.module.css";

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
      method: "post",
      body: JSON.stringify(values),
    });
    setSubmitted(true);
    removeSuccess();
    setValues({
      name: "",
      email: "",
      message: "",
    });
  }
  return (
    <form className={`${classes.form}`} method="post" onSubmit={handleOnSubmit}>
      <div className={`${classes.form__group}`}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChanges}
          value={values.name}
          required
        />
      </div>
      <div className={`${classes.form__group}`}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChanges}
          value={values.email}
          required
        />
      </div>
      <div className={`${classes.form__group}`}>
        <textarea
          rows={5}
          placeholder="Message"
          name="message"
          onChange={handleChanges}
          value={values.message}
          required
        />
      </div>
      {submitted ? (
        <div className={`${classes.success}`}>
          <p>Thank You! Message was sent!</p>
        </div>
      ) : null}
      <button className="primary__btn">Send</button>
    </form>
  );
}

export default Form;
