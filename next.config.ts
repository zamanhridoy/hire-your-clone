import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["imapflow", "mailparser", "nodemailer"],
};

export default nextConfig;
