import { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";
import axios from "axios";

mail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    const { name, email, message, recaptchaToken } = req.body;
    if (!recaptchaToken) {
      return res.status(400).json({ message: "Recaptcha token is required" });
    }

    try {
      const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
          params: {
            secret: secretKey,
            response: recaptchaToken,
          },
        }
      );
      const { success } = response.data;
      if (!success) {
        return res
          .status(400)
          .json({ message: "Recaptcha verification failed" });
      }
      const content = {
        to: "henrythedev90@gmail.com",
        from: "henrythedev90@gmail.com",
        subject: `New Message from ${name}, ${email}`,
        text: `${name} "\n" ${email} "\n" ${message}`,
      };
      await mail.send(content).then(() => console.log({ content }));
      res.status(200).json({ message: "Email sent", content: content });
    } catch (error) {
      console.log("this is the error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
