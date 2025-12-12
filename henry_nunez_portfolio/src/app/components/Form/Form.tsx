"use client";
import React, { useState, useRef } from "react";
import classes from "./Form.module.css";
import Button from "../Button/Button";
import ReCAPTCHA from "react-google-recaptcha";

const SERVICES = [
  "Website design",
  "UX design",
  "User research",
  "Content creation",
  "Strategy & consulting",
  "Other",
];

function Form() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
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
    console.log("reCAPTCHA token:", token ? "Token received" : "No token");

    if (!token) {
      setError("Please complete the reCAPTCHA verification");
      setIsSubmitting(false);
      return;
    }

    // Debug info
    console.log("Submitting form with data:", {
      ...values,
      recaptchaToken: token ? "Token included" : "No token",
    });

    fetch("/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        services: selectedServices,
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
        setSelectedServices([]);
        // Reset reCAPTCHA
        recaptchaRef.current?.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(
          error.message || "Failed to submit message. Please try again."
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className={classes.form_wrapper}>
      <div className={classes.form_header}>
        <h2 className={classes.form_title}>
          Got ideas? I&apos;ve got the skills. Let&apos;s team up!
        </h2>
        <p className={classes.form_instructions}>
          Tell me more about yourself and what you&apos;ve got in mind.
        </p>
      </div>
      <form
        className={`${classes.form}`}
        method="post"
        onSubmit={handleOnSubmit}
      >
        <div className={`${classes.form_group}`}>
          <input
            type="text"
            placeholder="Your name"
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
            placeholder="you@company.com"
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
            placeholder="Tell us a little about the project..."
            name="message"
            onChange={handleChanges}
            value={values.message}
            autoComplete="off"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className={classes.services_section}>
          <label className={classes.services_label}>How can I help?</label>
          <div className={classes.services_grid}>
            {SERVICES.map((service) => (
              <label key={service} className={classes.service_checkbox}>
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  disabled={isSubmitting}
                />
                <span className={classes.checkbox_label}>{service}</span>
              </label>
            ))}
          </div>
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
            <p>Thank You! Your message has been received!</p>
          </div>
        ) : null}

        <div className={classes.buttonContainer}>
          <Button
            text={isSubmitting ? "Submitting..." : "Let's get started!"}
            type={"submit"}
            variant="secondary"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}

export default Form;
