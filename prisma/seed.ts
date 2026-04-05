import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialClients = [
  { name: "Alice Johnson", company: "Aetheris Lab", va: "Sarah M.", status: "Active", agentStatus: "Active", email: "alice@aetheris.com" },
  { name: "Bob Smith", company: "CloudScale", va: "Dave K.", status: "Onboarding", agentStatus: "Training", email: "bob@cloudscale.io" },
  { name: "Charlie Brown", company: "Z-Tech", va: "Elena R.", status: "Active", agentStatus: "Active", email: "charlie@ztech.biz" },
  { name: "Diana Prince", company: "Themyscira AI", va: "Sarah M.", status: "Offline", agentStatus: "Offline", email: "diana@themys.ai" },
  { name: "Eve Online", company: "CCP Studio", va: "Dave K.", status: "Training", agentStatus: "Training", email: "eve@ccp.com" },
];

async function main() {
  const count = await prisma.client.count();
  if (count > 0) {
    console.log(`Database already has ${count} clients, skipping seed.`);
    return;
  }

  await prisma.client.createMany({ data: initialClients });
  console.log(`Seeded ${initialClients.length} clients.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
