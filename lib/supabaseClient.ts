import { createClient } from "@supabase/supabase-js";

// Read public env vars; avoid non-null assertions so we don't throw at import time.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// If env vars are missing (for example during build in some environments),
// avoid calling createClient because it will throw. Export `supabase` as `any`
// so existing call sites don't break the type-check at import time. Server
// and API routes should check for its presence before using it.
export const supabase: any =
	supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
