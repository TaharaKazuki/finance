import type { Database } from '~/types/supabase'

export const useTransactions = async () => {
  const supabase = useSupabaseClient<Database>()

  const fetchTransactions = async () => {
    const { data, error } = await supabase.from('transactions').select()
    if (error) return []
    return data
  }

  const { data: transactions, pending } = await useAsyncData(
    'transactions',
    fetchTransactions
  )

  return {
    transactions,
    pending,
  }
}
