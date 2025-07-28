-- Fix the search_path for the update function to address security warning
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';

-- Grant proper permissions
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO authenticated, anon;