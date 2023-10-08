<template>
  <DefaultLayout title="">
    <div class="flex justify-end gap-5">
      <RouterLink
        v-if="authenticated"
        class="hover:text-cyan-700 text-xl bg-slate-300 p-2 rounded-md"
        :to="`/projects/${data?.id}/update/`"
        >Edit</RouterLink
      >
      <button
        class="hover:text-cyan-700 text-xl bg-cyan-300 p-2 rounded-md"
        @click="showRequest = true"
      >
        Request
      </button>
    </div>
    <div class="flex flex-row mb-10 items-center gap-96">
      <img
        class="h-auto w-56 flex justify-center items-center"
        :src="(data?.images as string)"
        v-if="data?.images"
      />
      <!--place holder div for image -->
      <div
        v-else
        class="flex w-[200px] h-[200px] rounded-md bg-slate-400 justify-center items-center"
      >
        <p>No image</p>
      </div>

      <div class="flex flex-1 flex-col justify-center items-center">
        <h1 class="text-4xl text-cyan-950 mb-10">{{ data?.name }}</h1>
        <p>{{ data?.description }}</p>
      </div>
    </div>
    <div class="flex justify-center items-center text-4xl mb-5">
      <p>Status: {{ getStatus(data?.status) }}</p>
    </div>
    <div class="flex justify-center items-center text-xl mb-5">
      <p>Geographic Location: United States/Eastern Timezone</p>
    </div>
    <div class="flex justify-center items-center text-xl mb-10">
      <p>Recruiting: Yes</p>
    </div>
    <div class="flex gap-10">
      <div class="flex-1 border-2 border-solid p-4">
        <h1 class="text-lg mb-4">Tags:</h1>
        <!-- {{ data?.tags }}
                {{ getTagNames(data?.tags) }}
                <p v-for="tag in getTagNames(data?.tags)">{{ tag.name }}</p> -->
        <div class="flex gap-3 flex-wrap">
          <NTag :bordered="false" v-for="tag in data?.tags">{{
            tag.tag.name
          }}</NTag>
        </div>
      </div>
      <!-- <p>Tags: {{ data?.tags }}</p> -->
      <div class="flex-1 border-2 border-solid p-4">
        <h1 class="text-lg mb-4">Links:</h1>
        <div class="flex flex-row gap-5">
          <a
            class="hover:text-cyan-700"
            target="_blank"
            :href="'//' + link.value"
            v-for="link in data?.links"
            >{{ link.name }}</a
          >
        </div>
      </div>
      <div class="flex-1 border-2 border-solid p-4">
        <h1 class="text-lg mb-4">Contributors:</h1>
        <div class="flex flex-row gap-5">
          <ul class="list-disc">
            <li class="ml-5" v-for="user in data?.members">
              <NuxtLink class="hover:text-cyan-700" :to="'/user/' + user.id">{{
                user.user.name
              }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <NModal v-model:show="showRequest">
      <NCard
        style="width: 600px"
        title="Join Request"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <NCard class="bg-slate-100">
          <b>Please describe you reasoning and availability</b>
          <br />
          <NInput
            type="textarea"
            class="border outline-none mt-2"
            v-model:value="reason"
          />
        </NCard>
        <br />
        <br />
        <NButton @click="join">Continue</NButton>
      </NCard>
    </NModal>
  </DefaultLayout>
  <!-- <img :src="getUploadingFile(files?.item(0))" /> -->
  <!-- <button @click="open()">Open</button>
    <br/> -->
  <!-- <button @click="submit">Submit</button> -->
</template>

<script lang="ts" setup>
import { DefaultLayout } from "#components";

import {
  NButton,
  NCard,
  NModal,
  NTag,
  NInput,
  useNotification,
} from "naive-ui";
const { $client } = useNuxtApp();
const route = useRoute();
const { data } = await $client.projects.get_individual_project.useQuery({
  id: route.params.id as string,
});
const { data: session, status, signOut } = useAuth();
const authenticated = computed(() => status.value === "authenticated");

const showRequest = ref(false);
const reason = ref("");
const notification = useNotification();

const join = async () => {
  if (authenticated.value) {
    const result = await $client.projects.request_member.mutate({
      project: route.params.id as string,
      reason: reason.value,
    });
    if (result.status) {
      showRequest.value = false;
      notification.success({
        title: "Success",
        description: "Your request has been sent",
      });
    }
  }
};

import { useFileDialog } from "@vueuse/core";

const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*", // Set to accept only image files
});

const imageUpload = ref<string>("");
const imageError = ref<string | null>(null);

function getStatus(status: string | undefined) {
  if (!status) return;
  if (status === "Planning_Design") return "Planning/Design";
  return status;
}

function getUploadingFile(file: File | null | undefined) {
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
