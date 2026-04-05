export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { to, subject, body } = await request.json();

    if (!to?.trim() || !subject?.trim() || !body?.trim()) {
      return NextResponse.json({ error: "to, subject and body are required" }, { status: 400 });
    }

    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: to.trim(),
      subject: subject.trim(),
      text: body,
      html: `<div style="font-family:sans-serif;white-space:pre-wrap">${body
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>")}</div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[send-email]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
