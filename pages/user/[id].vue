<template>
  <DefaultLayout title="About">
    <template v-if="data != null">
      <div v-for="project in data">
        <ProjectItem :project="project" :key="project.id" />
        <br />
      </div>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ProjectStatus, ProjectTag, Tag } from "@prisma/client";
import { NTag } from "naive-ui";
import { ProjectItem } from "#components";

const { $client } = useNuxtApp();
const route = useRoute();
const { data } = await $client.user.getUserProjects.useQuery({
  id: route.params.id as string,
});
</script>
