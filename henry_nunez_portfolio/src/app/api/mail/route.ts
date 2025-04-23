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
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Message</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header { 
              background-color: #fc4c02;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              padding: 20px;
              border: 1px solid #dddddd;
              border-top: none;
              border-radius: 0 0 5px 5px;
            }
            .message {
              background-color: #f9f9f9;
              border-left: 4px solid #fc4c02;
              padding: 15px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #666666;
              text-align: center;
              border-top: 1px solid #eeeeee;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>New Contact Form Message</h1>
          </div>
          <div class="content">
            <p>You have received a new message from your portfolio website contact form.</p>
            
            <h2>Contact Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            
            <h2>Message</h2>
            <div class="message">
              ${message.replace(/\n/g, "<br>")}
            </div>
            
            <p>You can reply directly to this email to respond to ${name}.</p>
          </div>
          
          <div class="footer">
            <p>This message was sent from the contact form on <a href="https://henry-nunez.com">henry-nunez.com</a> on ${new Date().toLocaleString()}</p>
            <p>© ${new Date().getFullYear()} Henry Nuñez Portfolio. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      text: `
        NEW CONTACT FORM MESSAGE
        
        From: ${name}
        Email: ${email}
        
        Message:
        ${message}
        
        Sent from henry-nunez.com contact form on ${new Date().toLocaleString()}
      `,
      replyTo: email,
    };

    // Try to send email
    try {
      await mail.send(content);
      console.log("Email sent successfully:", { name, email });
      return NextResponse.json({ message: "Email sent successfully" });
    } catch (emailError: unknown) {
      // Type cast for type safety
      const error = emailError as { response?: { body?: unknown } };

      console.error("SendGrid error:", error?.response?.body || emailError);

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
