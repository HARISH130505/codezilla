import { createClient } from "@supabase/supabase-js";

// Read public env vars; avoid non-null assertions so we don't throw at import time.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// If env vars are missing (for example during build in some environments),
// avoid calling createClient because it will throw. Export `supabase` with a
// precise return type so we don't use `any` and satisfy the linter.
export const supabase: ReturnType<typeof createClient> | null =
	supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
