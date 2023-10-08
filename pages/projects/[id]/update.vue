<template>
  <DefaultLayout title="Update/Edit Project">
    <div class="flex space-x-4 w-full">
      <div class="w-full">
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
            <option :value="ProjectStatus.Planning_Design">
              Planning/Design
            </option>
            <option :value="ProjectStatus.Pending">Pending</option>
            <option :value="ProjectStatus.Active">Active</option>
            <option :value="ProjectStatus.Completed">Completed</option>
          </select>
        </NCard>
        <br />
        <ProjectTags />
        <br />
        <p class="text-green-400">{{ message }}</p>

        <NButton @click="updateProject" class="mt-2">Update Project</NButton>
      </div>
      <div class="w-full">
        <NCard class="bg-slate-100">
          <b>Requested Contributors</b>
          <div v-for="member in membersFixed">
            <NCard :key="member.id">
              <div class="flex flex-row justify-between">
                <div class="flex flex-col">
                  <b>{{ member.name }}</b>
                  <br />
                  <b>Reason for interest/availability</b>
                  <br />
                  {{ member.reason }}
                </div>
                <div class="flex flex-col">
                  <NButton @click="acceptMember(member.id, member.request)"
                    >Accept</NButton
                  >
                  <NButton
                    @click="declineMember(member.id, member.request)"
                    class="mt-2"
                    >Decline</NButton
                  >
                </div>
              </div>
            </NCard>
          </div>
        </NCard>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { NInput, NButton, NCard } from "naive-ui";
import { DefaultLayout, ProjectTags } from "#components";
import { Project, ProjectStatus } from "@prisma/client";

type ProjectWithTags<T> = Partial<T> & { tags: string[] };

const { $client } = useNuxtApp();

const route = useRoute();

const membersFixed = computed(() => {
  return members.data?.value?.map((member) => {
    return {
      id: member.user.id,
      name: member.user.name,
      reason: member.reason,
      request: member.id,
    };
  });
});

const status = ref<string>("");

const project = await $client.projects.get_individual_project.useQuery({
  id: route.params.id as string,
});

const members = await $client.projects.get_requested_members.useQuery({
  id: route.params.id as string,
});

const acceptMember = async (id: string, request: string) => {
  await $client.projects.accept_member.mutate({
    id: route.params.id as string,
    user: id,
    request,
  });

  members.refresh();
};

const declineMember = async (id: string, request: string) => {
  await $client.projects.decline_member.mutate({
    id: route.params.id as string,
    user: id,
    request,
  });
  members.refresh();
};

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
