import { NextResponse } from "next/server";
import mail from "@sendgrid/mail";

// Set SendGrid API key if available
if (process.env.SENDGRID_API_KEY) {
  mail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn("SENDGRID_API_KEY not found in environment variables");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, recaptchaToken } = body;

    // Basic input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token if available and secret key is configured
    if (recaptchaToken && process.env.RECAPTCHA_SECRET_KEY) {
      try {
        console.log("Verifying reCAPTCHA token...");

        // Build the verification URL with properly encoded parameters
        const verifyUrl = new URL(
          "https://www.google.com/recaptcha/api/siteverify"
        );
        const formData = new URLSearchParams();
        formData.append("secret", process.env.RECAPTCHA_SECRET_KEY);
        formData.append("response", recaptchaToken);

        // Use the proper method for server-to-server reCAPTCHA verification
        const recaptchaResponse = await fetch(verifyUrl.toString(), {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        });

        const recaptchaData = await recaptchaResponse.json();
        console.log("reCAPTCHA response:", recaptchaData);

        if (!recaptchaData.success) {
          console.warn("reCAPTCHA verification failed:", recaptchaData);

          // Uncomment this for stricter verification
          // return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });

          // For now we'll continue to allow the form submission
        } else {
          console.log("reCAPTCHA verification successful");
        }
      } catch (recaptchaError) {
        console.error("Error verifying reCAPTCHA:", recaptchaError);
        // Continue anyway rather than blocking form submission
      }
    } else {
      // Log if we're skipping verification
      if (!recaptchaToken) {
        console.warn("No reCAPTCHA token provided");
      }
      if (!process.env.RECAPTCHA_SECRET_KEY) {
        console.warn("RECAPTCHA_SECRET_KEY not found in environment variables");
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
      return NextResponse.json({ message: "Email sent successfully" });
    } catch (emailError: any) {
      console.error(
        "SendGrid error:",
        emailError?.response?.body || emailError
      );

      // For development purposes, consider this a success to test the form
      if (process.env.NODE_ENV === "development") {
        console.log("[DEV MODE] Email would have been sent:", content);
        return NextResponse.json(
          {
            message: "Development mode - email not actually sent",
            emailContent: content,
          },
          { status: 200 }
        );
      }

      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
