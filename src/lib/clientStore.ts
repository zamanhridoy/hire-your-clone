import { prisma } from "./prisma";
import { type Client, initialClients } from "./clients";

export async function getClients(): Promise<Client[]> {
  const clients = await prisma.client.findMany({ orderBy: { id: "asc" } });
  return clients.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    company: c.company,
    va: c.va,
    status: c.status,
    agentStatus: c.agentStatus,
  }));
}

export async function addClient(client: Omit<Client, "id">): Promise<Client> {
  const created = await prisma.client.create({ data: client });
  return {
    id: created.id,
    name: created.name,
    email: created.email,
    company: created.company,
    va: created.va,
    status: created.status,
    agentStatus: created.agentStatus,
  };
}

export async function updateClient(
  id: number,
  data: Partial<Omit<Client, "id">>
): Promise<Client | null> {
  try {
    const updated = await prisma.client.update({ where: { id }, data });
    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      company: updated.company,
      va: updated.va,
      status: updated.status,
      agentStatus: updated.agentStatus,
    };
  } catch {
    return null;
  }
}

export async function deleteClient(id: number): Promise<boolean> {
  try {
    await prisma.client.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function seedClients(): Promise<void> {
  const count = await prisma.client.count();
  if (count === 0) {
    await prisma.client.createMany({
      data: initialClients.map(({ id, ...rest }) => rest),
    });
  }
}
