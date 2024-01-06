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

  const deleteTransition = (id: number) => {
    const { pending: isLoading } = useAsyncData('transactions', () =>
      deleteData(id)
    )
    return { isLoading }
  }

  return { fetchTransactions, deleteTransition }
}

const getData = async () => {
  const { data, error } = await supabase.from('transactions').select()
  if (error) return []
  return data
}

const deleteData = async (id: number) => {
  const toast = useToast()
  try {
    await supabase.from('transactions').delete().eq('id', id)
    toast.add({
      title: 'Transaction deleted',
      icon: 'i-heroicons-check-circle',
    })
  } catch (error) {
    toast.add({
      title: 'Transaction deleted',
      icon: 'i-heroicons-exclamation-circle',
    })
  }
}
