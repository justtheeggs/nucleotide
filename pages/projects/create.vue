<template>
  <DefaultLayout title="Create Project">
    <NCard class="bg-slate-100">
      <b>Name</b>
      <br />
      <NInput
        type="text"
        class="border outline-none mt-2"
        v-model:value="projectName"
      />
    </NCard>
    <br />
    <NCard class="bg-slate-100">
      <b>Description</b>
      <br />
      <NInput
        type="textarea"
        class="border outline-none mt-2"
        v-model:value="projectDescription"
      />
    </NCard>

    <NButton @click="createProject" class="mt-2">Create Project</NButton>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { NInput, NCard, NButton } from "naive-ui";
import { DefaultLayout } from "#components";

const { $client } = useNuxtApp();

const projectName = ref<string | null>(null);
const projectDescription = ref<string | null>(null);

const createProject = async () => {
  if (projectName.value != null || projectDescription.value != null) {
    console.log("Create projects");
    const result = await $client.create.createProject.mutate({
      name: projectName.value ?? "Untitled Project",
      description: projectDescription.value ?? "No description provided",
    });

    if ((result.status = true)) {
      navigateTo(`/projects/${result.id}`);
    } else {
      alert("Could not create project");
    }
  } else {
    alert("nop[e]");
  }
};
</script>
