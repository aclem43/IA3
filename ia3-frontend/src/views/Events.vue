<script setup lang="ts">
import { type trafficEvent, getEvents } from "@/scripts/events";
import { Ref } from "vue";
import { ref } from "vue";
import { onMounted } from "vue";

const data: Ref<trafficEvent[]> = ref([]);

onMounted(async () => {
  data.value = await getEvents();
});

const genIcon = (event: trafficEvent) => {
  switch (event.event_type) {
    case "Roadworks":
      return "mdi-hard-hat";
    case "Flooding":
      return "mdi-home-flood";
    default:
      return "mdi-alert";
  }
};
</script>

<template>
  <div class="pa-4 d-flex gap-1 flex-column" style="gap: 10px">
    <v-container>
      <v-row>
        <v-col v-for="event in data" v-bind:key="event.id" cols="4">
          <v-card height="100%">
            <v-card-title>
              <v-icon> {{ genIcon(event) }}</v-icon>
              {{ event.event_type }}</v-card-title
            >
            <v-card-subtitle>
              {{ new Date(event.duration.start).toDateString() }} <br />
              {{ event.road_summary.road_name }},
              {{ event.road_summary.locality }},
              {{ event.road_summary.postcode }}
            </v-card-subtitle>
            <v-card-text>
              {{ event.advice }}
            </v-card-text>
            <v-card-text v-if="event.information != undefined">
              Further Information Avalible:
              {{ event.information }}
            </v-card-text>
            <v-card-text> </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
