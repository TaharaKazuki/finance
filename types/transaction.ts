import type { Database } from '~/types/supabase'
export type Transaction = Database['public']['Tables']['transactions']['Row']
