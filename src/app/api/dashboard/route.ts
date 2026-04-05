export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [total, byStatus, byAgent, recent] = await Promise.all([
      prisma.client.count(),
      prisma.client.groupBy({ by: ["status"], _count: true }),
      prisma.client.groupBy({ by: ["agentStatus"], _count: true }),
      prisma.client.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          company: true,
          status: true,
          agentStatus: true,
          createdAt: true,
        },
      }),
    ]);

    const statusMap = Object.fromEntries(
      byStatus.map((s) => [s.status, s._count])
    );
    const agentMap = Object.fromEntries(
      byAgent.map((a) => [a.agentStatus, a._count])
    );

    const activeClones = agentMap["Active"] ?? 0;
    const training = agentMap["Training"] ?? 0;
    const offline = agentMap["Offline"] ?? 0;
    const onboarding = statusMap["Onboarding"] ?? 0;
    const activeClients = statusMap["Active"] ?? 0;

    return Response.json({
      stats: {
        totalClients: total,
        activeClones,
        training,
        offline,
        onboarding,
        activeClients,
      },
      recent,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: msg }, { status: 500 });
  }
}
