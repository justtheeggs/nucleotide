<template>
  <NuxtLink :to="openProject">
    <NCard v-if="project != undefined" class="bg-slate-100">
      <div class="flex flex-col w-full">
        <div class="flex">
          <div
            class="w-[100px] h-[100px] rounded-md"
            :class="{ 'bg-slate-400': project.images == null }"
          >
            <img
              :src="(project.images as string)"
              v-if="project.images != null"
            />
          </div>
          <div class="flex flex-col ml-2">
            <div class="text-3xl">{{ project.name }}</div>

            <div class="text-xl">
              {{ project.description ?? "No description provided" }}
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div v-for="tag in project.tags" class="flex">
            <NTag>{{ tag }}</NTag>
          </div>
        </div>
      </div>
    </NCard>
  </NuxtLink>
</template>
<script lang="ts" setup>
import { NTag, NCard } from "naive-ui";
import { Project } from "@prisma/client";
type ProjectWithTags<T> = Partial<T> & { tags: string[] };

const props = defineProps({
  project: { type: Object as PropType<ProjectWithTags<Project>> },
});

const openProject = computed(() => {
  return `/projects/${props.project?.id}`;
});
</script>
