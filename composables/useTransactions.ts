import type { Database } from '~/types/supabase'
import type { Transaction } from '~/types/transaction'

export const useTransactions = () => {
  const fetchTransactions = () => {
    const { data: transactions, pending } = useAsyncData(
      'transactions_get',
      getData
    )
    return { transactions, pending }
  }

  const deleteTransaction = async (id: number) => {
    return await useAsyncData('transactions_delete', () => deleteData(id))
  }

  const upSertTransaction = async (formState: Omit<Transaction, 'id'>) => {
    return await useAsyncData('transactions_upSert', () =>
      upSertData(formState)
    )
  }

  return { fetchTransactions, deleteTransaction, upSertTransaction }
}

const getData = async () => {
  const supabase = useSupabaseClient<Database>()
  const { data, error } = await supabase
    .from('transactions')
    .select()
    .order('created_at', { ascending: false })
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

const upSertData = async (formState: Omit<Transaction, 'id'>) => {
  const supabase = useSupabaseClient<Database>()
  const toast = useToast()

  try {
    const { error } = await supabase
      .from('transactions')
      .upsert({ ...formState })
    if (!error) {
      toast.add({
        title: 'Transaction saved',
        icon: 'i-heroicons-check-circle',
      })
      return
    }
    throw error
  } catch (e: any) {
    toast.add({
      title: 'Transaction not saved',
      description: e.message,
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
    })
  }
}
