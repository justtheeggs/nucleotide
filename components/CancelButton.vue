<template>
  <BaseButton class="hover:bg-red-800 bg-red-900" :disabled="props.disabled" :to="props.to">
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
