<script setup lang="ts">
import {
  addFilter,
  filterData,
  getFilters,
  removeFilter,
  loadFilters,
  type Filter,
} from "@/scripts/filters";
import { getWebcams, type WebCam } from "@/scripts/traffic";
import { computed } from "vue";
import { Ref } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";

const key = ref(0);

const data: Ref<WebCam[]> = ref([]);
const search: Ref<string> = ref("");
const filters = getFilters();

const filteredData: Ref<WebCam[]> = computed(() => {
  console.log(filters.value);
  return filterData(data.value, filters.value) as WebCam[];
});
const add = () => {
  if (search.value.length > 0) {
    addFilter({
      value: search.value,
      operator: "like",
      properties: ["location.locality", "description", "location.postcode"],
    });
  }
};

const remove = (filter: Filter) => {
  removeFilter(filter);
};

onMounted(async () => {
  data.value = await getWebcams();
  loadFilters();
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
              <v-btn hide-details size="large" @click="add">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div class="filter-tags">
              <v-chip
                v-for="(filter, idx) in filters"
                v-bind:key="idx"
                @click:close="remove(filter)"
                closable
              >
                {{ filter.value }}</v-chip
              >
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
