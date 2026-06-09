import { createClient } from "@supabase/supabase-js";

const URL = "https://kholawemvxsjjfwtosyv.supabase.co";
const KEY = "sb_publishable_8xpN_a3IQTov2axmjIsL2Q_0qU3HvrA";

export const supabase = createClient(URL, KEY);