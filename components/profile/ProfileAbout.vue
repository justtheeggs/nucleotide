import { NText } from 'naive-ui';
<template>
  <NCard class="bg-slate-100">
    <b>About</b>
    <br />
    <NInput
      class="mt-2"
      type="textarea"
      v-model:value="about"
      @keydown="keyDown"
    />
    <p class="text-green-400">
      {{ message }}
    </p>
    <NButton @click="updateAbout" class="mt-2">Update Bio</NButton>
  </NCard>
</template>

<script setup lang="ts">
import { NInput, NButton, NCard } from "naive-ui";

const about = ref("");

const { $client } = useNuxtApp();

const message = ref<string | null>(null);

const getAbout = await $client.user.getAbout.useQuery();

onMounted(() => {
  about.value = getAbout.data?.value as string;
});

const keyDown = () => {
  message.value = null;
};

const updateAbout = () => {
  $client.user.updateAbout.mutate({ about: about.value });
  message.value = "Updated!";
};
</script>
