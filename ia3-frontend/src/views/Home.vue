<script setup lang="ts">
import { getWebcams, type WebCam } from "@/scripts/traffic";
import { Ref } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";

const data: Ref<WebCam[]> = ref([]);
onMounted(async () => {
  data.value = await getWebcams();
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="4" md="6" v-for="(item, index) in data" :key="index">
        <v-card>
          <v-img :src="item.image_url" height="200px"></v-img>
          <v-card-title>{{ item.location.locality }}</v-card-title>
          <v-card-text>{{ item.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
