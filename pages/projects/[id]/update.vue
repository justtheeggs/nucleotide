<template>
  <DefaultLayout title="Update/Edit Project">
    <NCard class="bg-slate-100">
      <b>Name</b>
      <br />
      <NInput
        type="text"
        class="border outline-none mt-2"
        v-model:value="name"
      />
    </NCard>
    <br />
    <NCard class="bg-slate-100">
      <b>Description</b>
      <br />
      <NInput
        type="textarea"
        class="border outline-none mt-2"
        v-model:value="description"
      />
    </NCard>

    <NCard class="bg-slate-100">
      <b>Status</b>
      <br />
      <select v-model="status">
        <option :value="ProjectStatus.Planning_Design">Planning/Design</option>
        <option :value="ProjectStatus.Pending">Pending</option>
        <option :value="ProjectStatus.Active">Active</option>
        <option :value="ProjectStatus.Completed">Completed</option>
      </select>
    </NCard>

    <p class="text-green-400">{{ message }}</p>

    <NButton @click="updateProject" class="mt-2">Update Project</NButton>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { NInput, NButton, NSelect, NCard } from "naive-ui";
import { DefaultLayout } from "#components";
import { Project, ProjectStatus } from "@prisma/client";

type ProjectWithTags<T> = Partial<T> & { tags: string[] };

const { $client } = useNuxtApp();

const route = useRoute();

const status = ref<string>("");

const checkStatus = (status: ProjectStatus) => {
  console.log(project.data?.value?.status);
  console.log(project.data?.value?.status == status);
  if (status == project.data?.value?.status) {
    return true;
  }
  return false;
};

const statusOptions = [
  { label: "Planning/Design", value: ProjectStatus.Planning_Design },
  { label: "Active", value: "Planning_Active" },
  { label: "Pending", value: ProjectStatus.Pending },
  { label: "Completed", value: ProjectStatus.Completed },
];

const project = await $client.projects.get_individual_project.useQuery({
  id: route.params.id as string,
});

onMounted(() => {
  if (project.data != undefined) {
    console.log(project);
    name.value = project.data.value?.name as string;
    description.value = project.data.value?.description as string;
    status.value = project.data.value?.status as string;
  }
});

const name = ref<string | null>(null);
const description = ref<string | null>(null);

const message = ref<string | null>(null);
const updateProject = async () => {
  if (name.value != null || description.value != null) {
    const result = await $client.projects.update_project.mutate({
      id: route.params.id as string,
      name: name.value ?? "Untitled Project",
      description: description.value ?? "No description provided",
      status: status.value,
    });

    if ((result.status = true)) {
      message.value = result.message;
    } else {
      message.value = result.message;
      alert("Could not update project");
    }
  } else {
    console.log("example");
  }
};
</script>
