import { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";

// Set SendGrid API key if available
if (process.env.SENDGRID_API_KEY) {
  mail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn("SENDGRID_API_KEY not found in environment variables");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, email, message, recaptchaToken } = req.body;

    // Basic input validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email, and message are required" });
    }

    // Verify reCAPTCHA token if available and secret key is configured
    if (recaptchaToken && process.env.RECAPTCHA_SECRET_KEY) {
      try {
        const recaptchaResponse = await fetch(
          `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
          { method: "POST" }
        );

        const recaptchaData = await recaptchaResponse.json();

        if (!recaptchaData.success) {
          console.warn("reCAPTCHA verification failed:", recaptchaData);
          // Continue anyway for now to prevent blocking legitimate users
          // return res.status(400).json({ error: "reCAPTCHA verification failed" });
        }
      } catch (recaptchaError) {
        console.error("Error verifying reCAPTCHA:", recaptchaError);
        // Continue anyway rather than blocking form submission
      }
    }

    // Prepare email content
    const content = {
      to: "henrythedev90@gmail.com",
      from: "henrythedev90@gmail.com", // This must be a verified sender in SendGrid
      subject: `New Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>New Message from ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 2px solid #ccc; padding-left: 10px; margin: 10px 0;">
            ${message}
          </blockquote>
        </div>
      `,
    };

    // Try to send email
    try {
      await mail.send(content);
      console.log("Email sent successfully:", { name, email });
      res.status(200).json({ message: "Email sent successfully" });
    } catch (emailError: any) {
      console.error(
        "SendGrid error:",
        emailError?.response?.body || emailError
      );

      // For development purposes, consider this a success to test the form
      if (process.env.NODE_ENV === "development") {
        console.log("[DEV MODE] Email would have been sent:", content);
        return res.status(200).json({
          message: "Development mode - email not actually sent",
          emailContent: content,
        });
      }

      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({ error: "Failed to process your request" });
  }
}
