<template>
  <BaseButton :class="{'hover:bg-cyan-600 bg-cyan-700':!disabled, 'bg-gray-400':disabled}" :disabled="props.disabled" :to="props.to">
    <slot />
  </BaseButton>
</template>
<script lang="ts" setup>
import { RouteLocationRaw } from '#vue-router'

const props = defineProps({
  to: { type: Object as PropType<RouteLocationRaw> },
  disabled: { type: Boolean }
})
</script>
