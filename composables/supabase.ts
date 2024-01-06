import type { Database } from '~/types/supabase'

export const useSupabase = () => {
  const supabase = useSupabaseClient<Database>()
  return { supabase }
}
