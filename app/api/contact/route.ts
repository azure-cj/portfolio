// NOTE: GMAIL_PASS must be a Gmail App Password, NOT your regular Gmail password.
// To generate one: Google Account → Security → 2-Step Verification → App Passwords
// Create an app password for "Mail" and paste it in .env.local as GMAIL_PASS
// Also add GMAIL_USER and GMAIL_PASS in Vercel dashboard → Settings → Environment Variables

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"NodeShift Contact" <${process.env.GMAIL_USER}>`,
      to: "christopheraureo18@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:monospace;background:#0a0a0a;color:#fff;padding:24px;border-radius:8px;">
          <h2 style="color:#b9ff4b;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="color:#a1a1aa;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send" },
      { status: 500 }
    );
  }
}
