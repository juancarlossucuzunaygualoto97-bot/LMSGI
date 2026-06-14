import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const hasCreds = supabaseUrl && supabaseKey;

export const supabase = hasCreds ? createClient(supabaseUrl!, supabaseKey!) : null;
