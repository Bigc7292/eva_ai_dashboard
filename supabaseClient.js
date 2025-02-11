import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL; // Load from .env
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY; // Load from .env

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
