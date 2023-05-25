<script setup lang="ts">
import AppBar from "./components/AppBar.vue";
</script>

<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>
