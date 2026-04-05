export const runtime = "nodejs";

import { getClients, addClient } from "@/lib/clientStore";

export async function GET() {
  try {
    const clients = await getClients();
    return Response.json({ clients });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, va, status, agentStatus } = body;

    if (!name?.trim() || !email?.trim()) {
      return Response.json({ error: "Name and email are required" }, { status: 400 });
    }

    const client = await addClient({
      name: name.trim(),
      company: (company || "").trim(),
      email: email.trim(),
      va: va || "Unassigned",
      status: status || "Onboarding",
      agentStatus: agentStatus || "Offline",
    });

    return Response.json({ client }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: msg }, { status: 500 });
  }
}
