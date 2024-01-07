<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu :options="transactionViewOptions" v-model="selectedView" />
    </div>
  </section>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
  >
    <Trend
      color="green"
      title="Income"
      :amount="incomeTotal"
      :last-amount="4100"
      :loading="pending"
    />
    <Trend
      color="red"
      title="Expense"
      :amount="expenseTotal"
      :last-amount="3800"
      :loading="pending"
    />
    <Trend
      color="green"
      title="Investments"
      :amount="4000"
      :last-amount="3000"
      :loading="pending"
    />
    <Trend
      color="red"
      title="Saving"
      :amount="4000"
      :last-amount="4100"
      :loading="pending"
    />
  </section>
  <section class="flex justify-between mb-10">
    <div>
      <h2 class="text-2xl font-extrabold">Transactions</h2>
      <div class="text-gray-500 dark:text-gray-400">
        You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this
        period
      </div>
    </div>
    <div>
      <UModal v-model="isOpen">
        <UCard>
          <template #header> Add Transaction </template>
          <div>Hello!</div>
        </UCard>
      </UModal>
      <UButton
        icon="i-heroicons-plus-circle"
        color="white"
        variant="solid"
        label="Add"
        @click="isOpen = true"
      />
    </div>
  </section>

  <section v-if="!pending">
    <div
      v-for="(transactionsOnDay, date) in transactionsGroupedByDate"
      :key="date"
      class="mb-10"
    >
      <DailyTransactionSummary :date="date" :transactions="transactionsOnDay" />
      <Transaction
        v-for="transaction in transactionsOnDay"
        :key="transaction.id"
        :transaction="transaction"
        @deleted="refreshTransactions()"
      />
    </div>
  </section>
  <section v-else>
    <USkeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i" />
  </section>
</template>
<script setup lang="ts">
import type { Transaction } from '~/types/transaction'

const transactionViewOptions = ['Yearly', 'Monthly', 'Daily']

const selectedView = ref(transactionViewOptions[1])
const isOpen = ref(false)

const { fetchTransactions } = useTransactions()
const { transactions, pending } = await fetchTransactions()

const filterTransactionsByType = (type: 'Income' | 'Expense') =>
  computed(() => transactions.value?.filter((t) => t.type === type))

const calculateTotal = (filteredTransactions: Ref<Transaction[] | undefined>) =>
  computed(
    () => filteredTransactions.value?.reduce((sum, t) => sum + t.amount!, 0)
  )

const income = filterTransactionsByType('Income')
const expense = filterTransactionsByType('Expense')

const incomeTotal = calculateTotal(income)
const expenseTotal = calculateTotal(expense)

const incomeCount = computed(() => income.value?.length)
const expenseCount = computed(() => expense.value?.length)

const refreshTransactions = async () => {
  const result = await fetchTransactions()
  transactions.value = result.transactions.value
}

const transactionsGroupedByDate = computed(() => {
  const grouped: Record<string, Transaction[]> = {}

  for (const transaction of transactions.value!) {
    const date = new Date(transaction.created_at).toISOString().split('T')[0]
    if (!grouped[date]) {
      grouped[date] = []
    }
    grouped[date].push(transaction)
  }
  return grouped
})
</script>
