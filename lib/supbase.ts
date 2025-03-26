import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL??"";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

if (!supabaseKey || !supabaseUrl) {
    console.log("Missing Supabase Key or supabase Url Please check your environment variables.");
}

const sb = createClient(supabaseUrl, supabaseKey);

export { sb } 