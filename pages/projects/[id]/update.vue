<template>
  <DefaultLayout title="Discover">
    <template v-if="projects.data != null">
      <div v-for="project in cProjects">
        <ProjectItem :project="project" :key="project.id" />
      </div>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { NInput } from "naive-ui";
import { DefaultLayout } from "#components";
import { Project } from "@prisma/client";

type ProjectWithTags<T> = Partial<T> & { tags: string[] };

const { $client } = useNuxtApp();

const projects = await $client.discover.getAllProjects.useQuery();

const cProjects = computed(() =>
  projects.data?.value.map((project) => {
    return project;
  })
);

const test = ref("");
</script>
