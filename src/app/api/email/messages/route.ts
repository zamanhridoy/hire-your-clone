export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const folder = request.nextUrl.searchParams.get("folder") ?? "INBOX";

  try {
    const { ImapFlow } = await import("imapflow");

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

    const messages: object[] = [];
    const lock = await client.getMailboxLock(folder);

    try {
      const total: number = (client.mailbox as { exists: number }).exists ?? 0;

      if (total > 0) {
        const start = Math.max(1, total - 49);
        for await (const msg of client.fetch(`${start}:*`, {
          envelope: true,
          flags: true,
        })) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const from = (msg as any).envelope?.from?.[0];
          messages.push({
            uid: msg.uid,
            seq: msg.seq,
            subject: (msg as any).envelope?.subject ?? "(no subject)",
            from: from
              ? {
                  name: from.name || from.mailbox || "",
                  address: `${from.mailbox}@${from.host}`,
                }
              : { name: "Unknown", address: "" },
            date: (msg as any).envelope?.date ?? null,
            read: msg.flags?.has("\\Seen") ?? false,
          });
        }
      }
    } finally {
      lock.release();
    }

    await client.logout();
    messages.reverse();
    return NextResponse.json({ messages, total: messages.length });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email/messages]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
