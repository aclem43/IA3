<script setup lang="ts">
import { ref } from "vue";
import { getWebcams } from "./scripts/traffic";
import { onMounted } from "vue";

onMounted(async () => {
  console.log(await getWebcams());
});
</script>

<template>
  <v-app>
    <v-app-bar density="compact" rounded>
      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>
