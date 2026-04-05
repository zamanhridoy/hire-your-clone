export const runtime = "nodejs";

import { updateClient, deleteClient } from "@/lib/clientStore";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateClient(Number(id), body);
    if (!updated) {
      return Response.json({ error: "Client not found" }, { status: 404 });
    }
    return Response.json({ client: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteClient(Number(id));
    if (!deleted) {
      return Response.json({ error: "Client not found" }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: msg }, { status: 500 });
  }
}
