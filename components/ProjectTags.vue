<template>
  <NCard class="bg-slate-100">
    <b>Tags</b>
    <br />

    <NSelect
      :render-label="renderLabel"
      class="mt-2"
      v-model:value="selectedValues"
      multiple
      filterable
      placeholder="Search Songs"
      :options="tag"
      :loading="loading"
      clearable
      remote
      clear-filter-after-select
      @search="handleSearch"
    />
  </NCard>
</template>
<script setup lang="ts">
import { NCard, NButton, NAutoComplete, NSelect, SelectOption } from "naive-ui";
import debounce from "lodash/debounce";
import { VNodeChild } from "nuxt/dist/app/compat/capi";
const { $client } = useNuxtApp();

const value = ref("");

const tag = ref<any>([]);
const loading = ref(false);
const selectedValues = ref<any>();

const originalIds = ref<any>();
const route = useRoute();
onMounted(async () => {
  const userTags = await $client.tags.getProjectTags.mutate({
    id: route.params.id as string,
  });

  selectedValues.value = userTags;
});

const renderLabel = (option: SelectOption): VNodeChild => {
  if (option.type === "group") return option.label + "";
  if (option.label != null) {
    if ((option.label as string).includes(":")) {
      return (option.label as string).split(":")[1];
    } else {
      return option.label as string;
    }
  }

  return [option.label];
};

const handleSearch = debounce(async (search) => {
  console.log({ search });
  loading.value = true;
  const tags = await $client.tags.getTags.mutate({ name: search });
  loading.value = false;
  const customTag = {
    type: "group",
    label: "Add custom tag",
    value: null,
    children: [
      {
        label: search.substring(0, 15),
        value: ":" + search.substring(0, 15),
      },
    ],
  };
  if (tags != null && tags.length > 0) {
    if (search != "") {
      tags.push(customTag as any);
    }
    tag.value = tags;
  } else {
    tag.value = [customTag];
  }
}, 50);

watch(selectedValues, async (value) => {
  const updated = await $client.tags.addProjectTags.mutate({
    project: route.params.id as string,
    tags: selectedValues.value,
  });
});
</script>
