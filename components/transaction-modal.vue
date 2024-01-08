<template>
  <UModal v-model="isModalOpen">
    <UCard>
      <template #header> Add Transaction </template>
      <UForm :state="formState" ref="form" @submit.prevent="save">
        <UFormGroup
          :required="true"
          label="Transaction Type"
          name="type"
          class="mb-4"
        >
          <USelect
            placeholder="Select the transaction type"
            :options="types"
            v-model="formState.type"
          />
        </UFormGroup>

        <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
          <UInput
            type="number"
            placeholder="Amount"
            v-model.number="formState.amount"
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
            v-model="formState.created_at"
          />
        </UFormGroup>

        <UFormGroup
          label="Description"
          hint="Optional"
          name="description"
          class="mb-4"
        >
          <UInput placeholder="Description" v-model="formState.description" />
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
            v-model="formState.category"
          />
        </UFormGroup>

        <UButton type="submit" color="black" variant="solid" label="Save" />
      </UForm>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
import { types, categoriesOptions } from '~/const/constants'
import { UForm } from '../.nuxt/components'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const formState = ref({
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined,
})

const form = ref()

const save = async () => {
  form.value.validate()
}

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
