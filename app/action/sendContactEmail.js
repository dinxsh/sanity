"use server";
import { resend } from "../../lib/resend";
import ContactEmailTemplate from "../../components/Contatct/Contatc-email-format";

export async function sendContactEmail(username, fromEmail, message, subject) {
  try {
    const res = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "kashyap25ankit@gmail.com",
      subject: subject,
      html: ContactEmailTemplate({ username, message, fromEmail }),
    });

    if (!res.data) throw new Error(res.error.name);

    return {
      status: 200,
      message: "Sent successfully",
    };
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
}
