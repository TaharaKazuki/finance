<template>
  <UModal v-model="isModalOpen">
    <UCard>
      <template #header> Add Transaction </template>
      <div>Hello!</div>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
