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
    subject: `New Message from ${name}, ${email}`,
    text: `${name} "\n" ${email} "\n" ${message}`,
  };
  try {
    await mail.send(content).then(() => console.log({ content }));
  } catch (error) {
    console.log("this is the error", error);
  }
  res.status(200).json({ message: "Email sent", content: content });
}
