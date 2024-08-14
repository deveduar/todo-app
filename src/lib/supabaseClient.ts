// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Obtén las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Crea y exporta el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
