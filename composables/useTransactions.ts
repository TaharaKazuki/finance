import type { Database } from '~/types/supabase'

export const useTransactions = () => {
  const fetchTransactions = async () => {
    const { data: transactions, pending } = await useAsyncData(
      'transactions_get',
      getData
    )
    return { transactions, pending }
  }

  const deleteTransition = async (id: number) => {
    await useAsyncData('transactions_delete', () => deleteData(id))
  }

  return { fetchTransactions, deleteTransition }
}

const getData = async () => {
  const supabase = useSupabaseClient<Database>()
  const { data, error } = await supabase.from('transactions').select()
  if (error) return []
  return data
}

const deleteData = async (id: number) => {
  const supabase = useSupabaseClient<Database>()
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
