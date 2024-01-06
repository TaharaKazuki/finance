import type { Database } from '~/types/supabase'

const supabase = useSupabaseClient<Database>()

export const useTransactions = () => {
  const fetchTransactions = () => {
    const { data: transactions, pending } = useAsyncData(
      'transactions',
      getData
    )
    return { transactions, pending }
  }

  return { fetchTransactions }
}

const getData = async () => {
  const { data, error } = await supabase.from('transactions').select()
  if (error) return []
  return data
}
