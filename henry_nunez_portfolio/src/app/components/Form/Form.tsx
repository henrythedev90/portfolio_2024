"use client";
import React, { useState, useEffect } from "react";
import classes from "./Form.module.css";
import Button from "../Button/Button";

function Form() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=" +
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    script.async = true;
    script.defer = true;
    script.onload = () => console.log("reCAPTCHA script loaded");
    document.body.appendChild(script);
  }, []);

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

  function handleReCaptchaVerify() {
    console.log("Executing reCAPTCHA...");
    console.log("Site Key:", process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

    (window as unknown as any).grecaptcha.ready(() => {
      console.log("reCAPTCHA is ready");
      (window as unknown as any).grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
          action: "submit",
        })
        .then((token: string) => {
          console.log("reCAPTCHA token generated:", token);
          setRecaptchaToken(token);
        })
        .catch((err: any) => {
          console.error("reCAPTCHA error:", err);
        });
    });
  }

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Submitting form with reCAPTCHA token:", recaptchaToken);

    if (!recaptchaToken) {
      console.error("reCAPTCHA verification failed. No token generated.");
      alert("Please complete the reCAPTCHA verification.");
      return;
    }
    fetch("/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, recaptchaToken }),
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
      <div
        className="g-recaptcha"
        data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        data-callback={handleReCaptchaVerify}
        data-size="invisible"
      >
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
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
