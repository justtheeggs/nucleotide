<template>
  <DefaultLayout title="User Search">
    <div class="my-4">
      <lable class="block">
        Search Our Users
      </lable>
      <text-input v-model="searchText" label="Search Our Projects" placeholder="Search..." />
    </div>
    <div class="">
      <div class="grid grid-cols-4 gap-4">
        <div v-for="item in cUsers">
          <UserItem :key="item.id" :project="item" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">

import { NInput } from 'naive-ui'
import { User } from '@prisma/client'
import { DefaultLayout } from '#components'

type UserWithTags<T> = Partial<T> & { tags: string[] };

const { $client } = useNuxtApp()

const users = await $client.discover.getAllUsers.useQuery()
const searchText = ref('')
/*
const cUsers = computed(() => {
  let items
  if (users.data) {
    items = users.data?.value.map((item) => {
      return item
    })
  }
  return items
})

  const filteredUsers = computed(() => {
  const userList = cUsers.value.filter((item) => {

    if (searchText && item.name) {
      return (
        item.name.toLowerCase().includes(searchText.value.toLowerCase()) // ||
        // tagsContain(item.tags, searchText.value)
      )
    }

    return true
  })
  return userList
})

function tagsContain (tags, searchString):Boolean {
  let result = false

  tags.forEach((tag) => {
    if (tag.toLowerCase().includes(searchString.toLowerCase())) {
      result = true
    }
  })

  return result
} */

</script>
