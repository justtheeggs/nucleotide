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
      <text-input v-model="searchText" label="Search Our Projects" placeholder="Search..." />
    </div>
    <div class="">
      <div class="grid grid-cols-4 gap-4">
        <div v-for="project in filteredProjects">
          <ProjectItem :key="project.id" :project="project" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">

import { NInput } from 'naive-ui'
import { Project } from '@prisma/client'
import { DefaultLayout } from '#components'

  type ProjectWithTags<T> = Partial<T> & { tags: string[] };

const { $client } = useNuxtApp()

const projects = await $client.discover.getAllProjects.useQuery()
const searchText = ref('')

const cProjects = computed(() =>
  projects.data?.value.map((project) => {
    return project
  })
)

const filteredProjects = computed(() => {
  const projects = cProjects.value.filter((item) => {
    if (searchText) {
      return (item.name.toLowerCase().includes(searchText.value.toLowerCase()))
    }
    return true
  })
  return projects
})

</script>
