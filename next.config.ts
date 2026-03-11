import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zzieinvptpzmwduhrbqo.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
