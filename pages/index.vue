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
      <inline-button class="inline-block p-0">
        Search
      </inline-button>
    </div>
    <div class="">
      <div class="grid grid-cols-4">
        <div v-for="item in filteredProjects">
          <label>Project Name</label>{{ item.name }}
          <br>
          <lable>Project Tags</lable>
          <br>
          <lable>Project Tags</lable>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
/*

import { NInput } from 'naive-ui'
import { ProjectStatus, ProjectTag, Tag } from '@prisma/client'
import { DefaultLayout } from '#components'

const { $client } = useNuxtApp()
const searchText = ref('')
const { data } = await $client.search.search.useQuery({ textSearch: searchText.value })
*/

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
  return cProjects.value.filter((item) => {
    return (item.name.toLowerCase().indexOf(searchText.value.toLowerCase()))
  })
})

</script>
