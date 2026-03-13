import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rlcpfffvxvsajnezsilw.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
