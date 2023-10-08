import { NCard } from 'naive-ui';
<template>
  <NCard class="bg-slate-100">
    <b>Username</b>
    <br />
    <NInput
      :class="{
        'border-red-500': !validUsername && validUsername != null,
        'border-green-500': validUsername && validUsername != null,
      }"
      type="text"
      class="border outline-none mt-2"
      v-model:value="username"
      :status="usernameStatus"
      @keydown="onUsernameChange()"
    />
    <p :class="{ 'text-green-400': !error, 'text-red-400': error }">
      {{ message }}
    </p>

    <NButton @click="updateUsername" :disable="!canUpdateUsername" class="mt-2"
      >Update Username</NButton
    >
  </NCard>
</template>

<script setup lang="ts">
import debounce from "lodash/debounce";

const { $client } = useNuxtApp();

const getUsername = await $client.user.getUsername.useQuery();
const username = ref(getUsername.data?.value as string);
const validUsername = ref<boolean | null>(null);
const message = ref<string | null>(null);
const error = ref<boolean | null>(null);

const onUsernameChange = debounce(async () => {
  const hasUsername = await $client.user.usernameSearch.mutate({
    username: username.value,
  });

  if (hasUsername.valid) {
    validUsername.value = true;
    message.value = null;
  } else {
    validUsername.value = false;
    message.value = hasUsername.error;
    error.value = true;
  }
}, 300);

const usernameStatus = computed(() => {
  if (!validUsername && validUsername != null) return "error";
  if (validUsername && validUsername != null) return "success";
  return;
});

const canUpdateUsername = computed(() => {
  if (validUsername.value == null) {
    return true;
  }
  return username.value != getUsername.data?.value;
});
const updateUsername = async () => {
  const userNameUpdated = await $client.user.updateUsername.mutate({
    username: username.value,
  });

  message.value = userNameUpdated.message;
  error.value = userNameUpdated.error;
};

import { NCard, NButton, NInput } from "naive-ui";
</script>
