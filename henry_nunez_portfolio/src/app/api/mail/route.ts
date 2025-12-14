import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";

// Helper function to detect device type from user agent
function getDeviceType(
  userAgent: string | null
): "mobile" | "desktop" | "tablet" | "unknown" {
  if (!userAgent) return "unknown";
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, services, recaptchaToken } = body;

    // Get request metadata for analytics
    const userAgent = request.headers.get("user-agent");
    const referer = request.headers.get("referer");
    const deviceType = getDeviceType(userAgent);

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

    // Save to MongoDB database
    try {
      const db = await getDb();
      const messagesCollection = db.collection("messages");

      const messageDoc = {
        name,
        email,
        message,
        services: services || [],
        deviceType,
        userAgent: userAgent || "unknown",
        referer: referer || "unknown",
        createdAt: new Date(),
        isRead: false,
        isArchived: false,
        isStarred: false,
        isContacted: false,
        projectTag: null as string | null,
      };

      const result = await messagesCollection.insertOne(messageDoc);
      console.log("Message saved to database:", result.insertedId);

      return NextResponse.json({
        message: "Message received and saved successfully",
      });
    } catch (dbError) {
      // Log detailed error information for debugging
      const errorMessage =
        dbError instanceof Error ? dbError.message : "Unknown database error";
      const errorStack =
        dbError instanceof Error ? dbError.stack : String(dbError);

      console.error("Error saving to database:", {
        message: errorMessage,
        stack: errorStack,
        name,
        email,
        timestamp: new Date().toISOString(),
      });

      // In production, return a user-friendly error
      // but log the full error details for debugging
      return NextResponse.json(
        {
          error: "Failed to save message. Please try again.",
          message:
            process.env.NODE_ENV === "development"
              ? errorMessage
              : "An error occurred while processing your message.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
