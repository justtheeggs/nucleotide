<template>
  <NuxtLink :to="openProject">
    <NCard v-if="user != undefined" class="bg-slate-100">
      <div class="flex flex-col w-full">
        <div class="flex">
          <div
            class="w-[100px] h-[100px] rounded-md"
            :class="{ 'bg-slate-400': user.image == null }"
          >
            <img
              v-if="user.image != null"
              :src="(user.image as string)"
            >
          </div>
          <div class="flex flex-col ml-2">
            <div class="text-2xl">
              {{ user.name }}
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div v-for="tag in user.tags" class="flex">
            <NTag>{{ tag }}</NTag>
          </div>
        </div>
      </div>
    </NCard>
  </NuxtLink>
</template>
<script lang="ts" setup>
import { NTag, NCard } from 'naive-ui'
import { User } from '@prisma/client'
type UserWithTags<T> = Partial<T> & { tags: string[] };

const props = defineProps({
  user: { type: Object as PropType<UserWithTags<User>> }
})

const openProject = computed(() => {
  return `/project/${props.user?.id}`
})
</script>
