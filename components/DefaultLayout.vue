<template>
  <Navbar />
  <div class="container md:container md:mx-auto lg:px-12 my-8">
    <PageHeader>{{ props.title }}</PageHeader>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Navbar } from '#components'

const props = defineProps({
  title: { type: String, required: true }
})
</script>
