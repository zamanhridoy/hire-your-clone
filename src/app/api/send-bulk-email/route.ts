export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { recipients, subject, body } = await request.json();

    if (!Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: "recipients array is required" }, { status: 400 });
    }
    if (!subject?.trim() || !body?.trim()) {
      return NextResponse.json({ error: "subject and body are required" }, { status: 400 });
    }

    const emails = recipients
      .map((r: string) => r.trim())
      .filter((r: string) => r && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r));

    if (emails.length === 0) {
      return NextResponse.json({ error: "No valid email addresses provided" }, { status: 400 });
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

    const htmlBody = `<div style="font-family:sans-serif;white-space:pre-wrap">${body
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>")}</div>`;

    const results: { email: string; status: "sent" | "failed"; error?: string }[] = [];

    for (const email of emails) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: email,
          subject: subject.trim(),
          text: body,
          html: htmlBody,
        });
        results.push({ email, status: "sent" });
      } catch (err) {
        results.push({
          email,
          status: "failed",
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    const sent = results.filter((r) => r.status === "sent").length;
    const failed = results.filter((r) => r.status === "failed").length;

    return NextResponse.json({ sent, failed, total: emails.length, results });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[send-bulk-email]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
