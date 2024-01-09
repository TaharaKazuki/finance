import type { Transaction } from '~/types/transaction'
import { INCOME, EXPENSE } from '../const/constants'

export const useFetchTransactions = () => {
  const { fetchTransactions } = useTransactions()
  const transactions = ref<Transaction[] | null>([])
  const pending = ref(false)

  const filterTransactionsByType = (type: typeof INCOME | typeof EXPENSE) =>
    computed(() => transactions.value?.filter((t) => t.type === type))

  const calculateTotal = (
    filteredTransactions: Ref<Transaction[] | undefined>
  ) =>
    computed(
      () => filteredTransactions.value?.reduce((sum, t) => sum + t.amount!, 0)
    )

  const income = filterTransactionsByType(INCOME)
  const expense = filterTransactionsByType(EXPENSE)

  const incomeTotal = calculateTotal(income)
  const expenseTotal = calculateTotal(expense)

  const incomeCount = computed(() => income.value?.length)
  const expenseCount = computed(() => expense.value?.length)

  const transactionsGroupedByDate = computed(() => {
    const grouped: Record<string, Transaction[]> = {}

    for (const transaction of transactions.value!) {
      const date = new Date(transaction.created_at!).toISOString().split('T')[0]
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(transaction)
    }
    return grouped
  })

  const refresh = async () => {
    pending.value = true
    const { transactions: refresh, pending: fetchPending } =
      await fetchTransactions()
    transactions.value = refresh.value
    pending.value = fetchPending.value
  }

  return {
    transactions: {
      all: transactions,
      grouped: {
        byDate: transactionsGroupedByDate,
      },
      income,
      expense,
      incomeTotal,
      expenseTotal,
      incomeCount,
      expenseCount,
    },
    refresh,
    pending,
  }
}
