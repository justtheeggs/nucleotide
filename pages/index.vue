<template>
  <DefaultLayout title="Welcome to Nucleotide">
    <p>
      Nucleotide is a tool for pairing open science projects with with
      users.
    </p>
    <div class="my-4">
      <lable class="block">
        Search Our Projects
      </lable>
      <text-input v-model="test" label="Search Our Projects" placeholder="Search..." />
      <inline-button class="inline-block p-0">
        Search
      </inline-button>
      {{ test }}
    </div>
    <div class="" />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { NInput } from 'naive-ui'
import { DefaultLayout } from '#components'

const test = ref('')
</script>
