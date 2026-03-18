import { Resend } from "resend";

export interface EmailPayload {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(payload: EmailPayload) {
  // Instantiate lazily inside the function — prevents the Resend SDK from
  // throwing during Next.js static build page collection when RESEND_API_KEY
  // is not present in the build environment.
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, email, message } = payload;

  const { data, error } = await resend.emails.send({
    // "from" must be a verified domain in your Resend account.
    // Use onboarding@resend.dev while testing.
    from: "Portfolio Contact <onboarding@resend.dev>",
    // Set CONTACT_EMAIL in .env.local to receive messages at your address.
    to: [process.env.CONTACT_EMAIL ?? "you@example.com"],
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#ededed;">
        <h2 style="color:#22d3ee;margin-bottom:16px;">New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#22d3ee;">${email}</a></p>
        <hr style="border-color:#27272a;margin:16px 0;" />
        <p style="white-space:pre-wrap;">${message}</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
