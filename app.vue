<template>
  <div>
    <NConfigProvider inline-theme-disabled>
      <NMessageProvider>
        <NNotificationProvider>
          <NLoadingBarProvider>
            <NDialogProvider>
              <NuxtPage />
            </NDialogProvider>
          </NLoadingBarProvider>
        </NNotificationProvider>
      </NMessageProvider>
    </NConfigProvider>
  </div>
</template>

<script setup lang="ts">
import {
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  NLoadingBarProvider,
  NDialogProvider,
} from "naive-ui";
</script>
