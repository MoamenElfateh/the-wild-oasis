// NORMAL WAY & NON-SECURITY
/* import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hjolrggonlqveatwjcwc.supabase.co";
const supabaseKey = "sb_publishable_Vr4QYCm_jpd-Y3eJA9qMAg_XTYmOTIi";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase; */

// MORE MODERN WAY & SECURITY
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
