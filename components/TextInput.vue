<template>
  <input
    id="field"
    :value="modelValue"
    type="text"
    class="shadow border focus:outline-none focus:shadow-outline p-3 mr-4 rounded-lg w-1/3 lg"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event?.target?.value)"
  >
</template>
<script setup lang="ts">
const props = defineProps({
  placeholder: { type: String, default: '' },
  modelValue: { type: String, required: true }
})
defineEmits(['update:modelValue'])
</script>
