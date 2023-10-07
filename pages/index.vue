<template>
  <DefaultLayout title="Welcome to Nucleotide">
    <div>
      <input type="text" class="border-1 border-solid border-cyan-950 p-2 mr-4" value="test">
      <primary-button class="inline-block p-0">
        Search
      </primary-button>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { NInput } from 'naive-ui'
import { DefaultLayout } from '#components'
</script>
