export const useCurrency = (amount: number | Ref<number>) => {
  const currency = computed(() => {
    const value = isRef(amount) ? amount.value : amount

    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(value)
  })

  return {
    currency,
  }
}
