<template>
  <NuxtLink
    class="px-8 py-4 font-inter text-center text-white cursor-pointer rounded-lg inline-block font-bold text-lg my-8 lg:my-0"
    :to="disabled?undefined:props.to"
  >
    <slot />
  </NuxtLink>
</template>
<script lang="ts" setup>
import { RouteLocationRaw } from '#vue-router'

const props = defineProps({
  to: { type: Object as PropType<RouteLocationRaw> },
  disabled: { type: Boolean }
})

function block () {
  alert('here')
  return false
}
</script>
