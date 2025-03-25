import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ycjyaklxtjvhiftmhstn.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY ?? "";

if (!supabaseKey || !supabaseUrl) {
    console.log("Missing Supabase Key or supabase Url Please check your environment variables.");
}

const sb = createClient(supabaseUrl, supabaseKey);

export { sb } 