import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!URL) {
  throw new Error("VITE_SUPABASE_URL no está definida");
}

if (!KEY) {
  throw new Error("VITE_SUPABASE_ANON_KEY no está definida");
}

export const supabase = createClient(URL, KEY);