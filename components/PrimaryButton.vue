<template>
  <NuxtLink
    class="px-8 py-4 font-inter text-center text-white rounded-lg hover:bg-cyan-600 bg-cyan-700 inline-block my-8 lg:my-0"
    :to="props.to"
  >
    <slot />
  </NuxtLink>
</template>
<script lang="ts" setup>
import { RouteLocationRaw } from '#vue-router'

const props = defineProps({
  to: { type: Object as PropType<RouteLocationRaw> }
})
</script>
