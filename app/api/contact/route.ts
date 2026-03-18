import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/sendEmail";

interface ContactBody {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: ContactBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, email, message } = body;

  // ── Server-side validation ───────────────────────────────────────────────
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json(
      { success: false, error: "Name is required." },
      { status: 422 }
    );
  }

  if (
    !email ||
    typeof email !== "string" ||
    !EMAIL_RE.test(email.trim())
  ) {
    return NextResponse.json(
      { success: false, error: "A valid email address is required." },
      { status: 422 }
    );
  }

  if (
    !message ||
    typeof message !== "string" ||
    message.trim().length < 10
  ) {
    return NextResponse.json(
      { success: false, error: "Message must be at least 10 characters." },
      { status: 422 }
    );
  }

  // ── Send via Resend ──────────────────────────────────────────────────────
  try {
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] sendEmail error:", err);
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to send your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
