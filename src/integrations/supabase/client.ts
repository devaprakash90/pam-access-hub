// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://olisvlegvoxufhuhbqit.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9saXN2bGVndm94dWZodWhicWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTY4MTYsImV4cCI6MjA1ODQ3MjgxNn0.2o2hOjQSeJuFRBKihDQORe4kd7XVCEMs2LkSkI8CQyE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);