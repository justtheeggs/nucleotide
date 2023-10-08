<template>
    <DefaultLayout title="project">
        <div class="flex flex-row mb-10 items-center gap-96">
            <img class="h-auto w-56 flex justify-center items-center" :src="(data?.images as string)">
            <div class="flex flex-1 flex-col justify-center items-center">
                <h1 class="text-4xl text-cyan-950 mb-10">{{ data?.name }}</h1>
                <p>{{ data?.description }}</p>
            </div>
        </div>
        <div class="flex justify-center items-center text-4xl mb-10">
            <p>Status: {{ getStatus(data?.status) }}</p>
        </div>
        <div class="flex gap-10">
            
            <div class="flex-1 border-2 border-solid p-4">
                <h1 class="text-lg mb-4">Tags:</h1>
                <!-- {{ data?.tags }}
                {{ getTagNames(data?.tags) }}
                <p v-for="tag in getTagNames(data?.tags)">{{ tag.name }}</p> -->
                <div class="flex gap-3 flex-wrap">
                    <NTag :bordered="false" v-for="tag in getTagNames(data?.tags)">{{ tag.name }}</NTag>
                </div>
            </div>
            <!-- <p>Tags: {{ data?.tags }}</p> -->
            <div class="flex-1 border-2 border-solid p-4">
                <h1 class="text-lg mb-4">Links:</h1>
                <div class="flex flex-row gap-5">
                    <a class="hover:text-cyan-700" target="_blank" :href="'//' + link.value" v-for="link in data?.links">{{ link.name }}</a>
                </div>
            </div>
            
        </div>
    </DefaultLayout>
    <!-- <img :src="getUploadingFile(files?.item(0))" /> -->
    <!-- <button @click="open()">Open</button>
    <br/> -->
    <!-- <button @click="submit">Submit</button> -->
</template>

<script lang="ts" setup>
import { DefaultLayout } from '#components';
import { ProjectStatus, ProjectTag, Tag } from '@prisma/client';
import { NTag } from 'naive-ui';
const { $client } = useNuxtApp()
const route = useRoute()
const { data } = await $client.projects.get_individual_project.useQuery({ id: (route.params.id as string) })

import { useFileDialog } from "@vueuse/core";
import { read, stat } from 'fs';
const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*", // Set to accept only image files
});

const imageUpload = ref<string>("");
const imageError = ref<string | null>(null);

function getTagNames(tags: ProjectTag[] | undefined): Tag[]{
    if(!tags) return [] as Tag[];
    let pids = tags.map(t => t.tag_id);
    console.log(pids)
    const { data } = $client.projects.get_project_tagnames.useQuery({ids: pids})
    console.log(data)
    return data.value;
}

function getStatus(status: ProjectStatus | undefined){
    if(!status) return;
    if(status === ProjectStatus.Planning_Design)
        return "Planning/Design";
    return status;
}

function getUploadingFile(file: File | null | undefined){
    if (file != null) {
        //check the size of the file
        if (file.size > 1000000) {
        imageError.value = "Image is too big";
        return;
        }
        console.log(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result != null) {
                imageUpload.value = reader.result as string;
            }
        };
    }
    return imageUpload.value;
}

const submit = () => {
  const file = files.value?.item(0);
  if (file != null) {
    //check the size of the file
    if (file.size > 1000000) {
      imageError.value = "Image is too big";
      return;
    }
    console.log(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (reader.result != null) {
        //imageUpload.value = reader.result as string;

      }
    };
  }
};

</script>


