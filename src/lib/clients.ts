export interface Client {
  id: number;
  name: string;
  company: string;
  va: string;
  status: string;
  agentStatus: string;
  email: string;
}

export const initialClients: Client[] = [
  { id: 1, name: "Alice Johnson", company: "Aetheris Lab", va: "Sarah M.", status: "Active", agentStatus: "Active", email: "alice@aetheris.com" },
  { id: 2, name: "Bob Smith", company: "CloudScale", va: "Dave K.", status: "Onboarding", agentStatus: "Training", email: "bob@cloudscale.io" },
  { id: 3, name: "Charlie Brown", company: "Z-Tech", va: "Elena R.", status: "Active", agentStatus: "Active", email: "charlie@ztech.biz" },
  { id: 4, name: "Diana Prince", company: "Themyscira AI", va: "Sarah M.", status: "Offline", agentStatus: "Offline", email: "diana@themys.ai" },
  { id: 5, name: "Eve Online", company: "CCP Studio", va: "Dave K.", status: "Training", agentStatus: "Training", email: "eve@ccp.com" },
];
