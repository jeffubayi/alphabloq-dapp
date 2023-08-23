import { createClient } from "@supabase/supabase-js";

const supabaseUrl: any = 'https://aaepbxpivppmvuaemajn.supabase.co';
const supabaseAnonKey: any = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhZXBieHBpdnBwbXZ1YWVtYWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA0NjE4MTMsImV4cCI6MTk3NjAzNzgxM30.s94W7_0_GNGoDbJuE-oUWuh9SY9jnOMy_9hgwfjmSwk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);