<script setup lang="ts">
import { getWebcams, type WebCam } from "@/scripts/traffic";
import { computed } from "vue";
import { Ref } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";

const key = ref(0);

const data: Ref<WebCam[]> = ref([]);
const search: Ref<string> = ref("");

const filter = (item: WebCam, value: string) => {
  if (item.location.locality.toLowerCase().includes(value.toLowerCase())) {
    return true;
  }
  if (item.description.toLowerCase().includes(value.toLowerCase())) {
    return true;
  }
  if (item.location.postcode.toLowerCase().includes(value.toLowerCase())) {
    return true;
  }

  return false;
};

const filteredData: Ref<WebCam[]> = computed(() => {
  return data.value.filter((item) => filter(item, search.value));
});
onMounted(async () => {
  data.value = await getWebcams();

  setInterval(async () => {
    key.value += 1;
    console.log(key.value);
  }, 60000);
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Filters</v-card-title>
          <v-card-item>
            <div class="filter-group">
              <v-text-field
                v-model="search"
                density="compact"
                hide-details
                variant="solo-filled"
                label="Search"
              ></v-text-field>
              <v-btn hide-details size="large">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div class="filter-tags">
              <v-chip closable>4068</v-chip>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" v-for="(item, index) in filteredData" :key="index">
        <v-card>
          <v-img :src="item.image_url" :key="key"></v-img>
          <v-card-title>{{ item.location.locality }}</v-card-title>
          <v-card-text>{{ item.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.filter-group {
  display: flex;
  gap: 10px;
  padding: 10px;
}
.filter-tags {
  display: flex;
  gap: 5px;
}
</style>
