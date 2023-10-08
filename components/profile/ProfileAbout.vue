import { NText } from 'naive-ui';
<template>
  <NCard class="bg-slate-100">
    <b>About</b>
    <br />
    <NInput class="mt-2" type="textarea" v-model:value="about" />

    <NButton @click="updateAbout" class="mt-2">Update Bio</NButton>
  </NCard>
</template>

<script setup lang="ts">
import { NInput, NButton, NCard } from "naive-ui";

const about = ref("");

const updateAbout = () => {};
</script>
