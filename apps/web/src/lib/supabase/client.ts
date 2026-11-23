import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client for Client Components.
 * Uses NEXT_PUBLIC_ env vars that are inlined at build time.
 */
const DEFAULT_SUPABASE_URL = "https://ymebuupcsfbpqwixmcfy.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_L08eJ0qrdeeyjcEv4uJ3qQ_FiVc54Y3";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY
  );
}
