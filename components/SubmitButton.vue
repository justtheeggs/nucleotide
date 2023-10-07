<template>
  <BaseButton :class="{'hover:bg-lime-600 bg-lime-700':!disabled, 'bg-gray-400':disabled}" :to="props.to">
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
