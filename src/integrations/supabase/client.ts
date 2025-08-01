// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cvbrycdiugeomlkpzhps.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2YnJ5Y2RpdWdlb21sa3B6aHBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTc3MjksImV4cCI6MjA2OTI3MzcyOX0.SMb4_UamxNXs3QZ3rFkunaxpZ_V5ot_DYRhPm3C0F2Y";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});