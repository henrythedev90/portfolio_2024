"use client";
import React, { useState, useRef } from "react";
import classes from "./Form.module.css";
import Button from "../Button/Button";
import ReCAPTCHA from "react-google-recaptcha";

function Form() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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
    setError("");
    setIsSubmitting(true);

    // Get reCAPTCHA token
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      setError("Please complete the reCAPTCHA verification");
      setIsSubmitting(false);
      return;
    }

    fetch("/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        recaptchaToken: token,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          // Handle specific error responses from the API
          if (data.error) {
            throw new Error(data.error);
          }
          throw new Error("Network response was not ok");
        }
        return data;
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
        // Reset reCAPTCHA
        recaptchaRef.current?.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message || "Failed to send message. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
        />
      </div>

      <div className={classes.recaptcha_container}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          size="normal"
        />
      </div>

      {error && (
        <div className={`${classes.error}`}>
          <p>{error}</p>
        </div>
      )}

      {submitted ? (
        <div className={`${classes.success}`}>
          <p>Thank You! Message was sent!</p>
        </div>
      ) : null}

      <Button
        text={isSubmitting ? "Sending..." : "Send"}
        type={"submit"}
        variant="secondary"
        disabled={isSubmitting}
      />
    </form>
  );
}

export default Form;
