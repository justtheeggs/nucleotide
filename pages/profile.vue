<template>
  <DefaultLayout title="Profile">
    <hr class="mb-6" />
    <ProfileUsername />
    <br />
    <ProfileTags />
    <br />
    <ProfileAbout />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { DefaultLayout } from "#components";
import ProfileUsername from "../components/profile/ProfileUsername.vue";
import ProfileAbout from "../components/profile/ProfileAbout.vue";
definePageMeta({ middleware: "auth" });
</script>
