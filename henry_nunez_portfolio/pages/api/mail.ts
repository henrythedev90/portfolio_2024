import { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, message } = req.body;

  const content = {
    to: "henrythedev90@gmail.com",
    from: "henrythedev90@gmail.com",
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
  try {
    await mail.send(content).then(() => console.log({ content }));
  } catch (error) {
    console.log("this is the error", error);
  }
  res.status(200).json({ message: "Email sent", content: content });
}
