import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://ymebuupcsfbpqwixmcfy.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "sb_publishable_L08eJ0qrdeeyjcEv4uJ3qQ_FiVc54Y3",
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL || "https://foot-vision-future.vercel.app",
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      "https://foot-vision-future.vercel.app/api/v1",
  },
};

export default nextConfig;
