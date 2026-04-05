export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const uid = request.nextUrl.searchParams.get("uid");
  const folder = request.nextUrl.searchParams.get("folder") ?? "INBOX";

  if (!uid || isNaN(Number(uid))) {
    return NextResponse.json({ error: "Valid uid required" }, { status: 400 });
  }

  try {
    const { ImapFlow } = await import("imapflow");
    const { simpleParser } = await import("mailparser");

    const client = new ImapFlow({
      host: process.env.SMTP_HOST!,
      port: 993,
      secure: true,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
      tls: { rejectUnauthorized: false },
      disableAutoIdle: true,
      logger: false,
    });

    await client.connect();
    const lock = await client.getMailboxLock(folder);
    let result;

    try {
      await client.messageFlagsAdd(
        { uid: Number(uid) },
        ["\\Seen"],
        { uid: true }
      );

      const msg = await client.fetchOne(uid, { source: true }, { uid: true });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const msgAny = msg as any;
      if (!msgAny?.source) {
        return NextResponse.json({ error: "Message not found" }, { status: 404 });
      }

      const parsed = await simpleParser(msgAny.source);

      result = {
        uid,
        subject: parsed.subject ?? "(no subject)",
        from: parsed.from?.text ?? "",
        to: Array.isArray(parsed.to)
          ? parsed.to.map((a) => a.text).join(", ")
          : (parsed.to?.text ?? ""),
        date: parsed.date ?? null,
        html: parsed.html || null,
        text: parsed.text ?? "",
      };
    } finally {
      lock.release();
    }

    await client.logout();
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email/message]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
