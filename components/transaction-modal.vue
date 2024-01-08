<template>
  <div>Modal</div>
  <UModal v-model="isModalOpen">
    <UCard>
      <template #header> Add Transaction </template>
      <UForm
        :state="formState"
        :schema="schema"
        ref="form"
        @submit.prevent="save"
      >
        <UFormGroup
          :required="true"
          label="Transaction Type"
          name="type"
          class="mb-4"
        >
          <USelect
            placeholder="Select the transaction type"
            :options="types"
            v-model="formState.type as string"
          />
        </UFormGroup>

        <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
          <UInput
            type="number"
            placeholder="Amount"
            v-model.number="formState.amount as number"
          />
        </UFormGroup>

        <UFormGroup
          label="Transaction date"
          :required="true"
          name="created_at"
          class="mb-4"
        >
          <UInput
            type="date"
            icon="i-heroicons-calendar-days-20-solid"
            v-model="formState.created_at as string"
          />
        </UFormGroup>

        <UFormGroup
          label="Description"
          hint="Optional"
          name="description"
          class="mb-4"
        >
          <UInput
            placeholder="Description"
            v-model="formState.description as string"
          />
        </UFormGroup>

        <UFormGroup
          :required="true"
          label="Category"
          name="category"
          class="mb-4"
          v-if="formState.type === 'Expense'"
        >
          <USelect
            placeholder="Category"
            :options="categoriesOptions"
            v-model="formState.category as string"
          />
        </UFormGroup>

        <UButton type="submit" color="black" variant="solid" label="Save" />
      </UForm>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
import { types, categoriesOptions } from '~/const/constants'
import { schema } from '~/util/validationSchema'
import type { Transaction } from '~/types/transaction'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const initFormState = {
  type: null,
  amount: 0,
  created_at: '',
  description: null,
  category: null,
}

const formState = ref<Omit<Transaction, 'id'>>({
  ...initFormState,
})

const resetForm = () => {
  formState.value = { ...formState.value, ...initFormState }
  form.value.clear()
}
const { upSertTransaction } = useTransactions()

const form = ref()
const isLoading = ref(false)

const save = async () => {
  if (form.value.errors.length) return
  isLoading.value = true
  upSertTransaction(formState.value)
}

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!value) resetForm()
    emit('update:modelValue', value)
  },
})
</script>
