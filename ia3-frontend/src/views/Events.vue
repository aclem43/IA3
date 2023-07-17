<script setup lang="ts">
import { type trafficEvent, getEvents } from "@/scripts/events";
import { getNotificationData } from "@/scripts/notifications";
import {
  addNotificationFilter,
  filteredNotificationData,
  getNotificationFilters,
  loadNotificationFilters,
  removeNotificationFilter,
} from "@/scripts/notifications";
import { Ref } from "vue";
import { ref } from "vue";
import { onMounted } from "vue";

const data: Ref<trafficEvent[]> = getNotificationData();
const filteredData = filteredNotificationData;
const filters = getNotificationFilters();
const filter = ref("");
onMounted(async () => {
  data.value = await getEvents();
  loadNotificationFilters();
});

const addNotification = () => {
  if (filter.value.length > 0) {
    addNotificationFilter({
      value: filter.value,
      operator: "like",
      properties: ["event_type", "description"],
    });
  }
};

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
        <v-col cols="12">
          <v-card>
            <v-card-title>Notifications</v-card-title>
            <v-card-item>
              <div class="filter-group">
                <v-text-field
                  v-model="filter"
                  density="compact"
                  hide-details
                  variant="solo-filled"
                  label="Search"
                ></v-text-field>
                <v-menu bottom offset-y>
                  <template v-slot:activator="{ props }">
                    <div class="split-btn">
                      <v-btn color="primary" hide-details dark class="main-btn">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                      <v-btn
                        v-bind="props"
                        color="primary"
                        hide-details
                        dark
                        class="actions-btn"
                        ><v-icon left>mdi-menu-down</v-icon></v-btn
                      >
                    </div>
                  </template>

                  <v-list>
                    <v-list-item @click="console.log('test')">
                      <v-list-item-title>AND</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="console.log('test')">
                      <v-list-item-title>OR</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-btn hide-details size="large" @click="addNotification">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
              <div class="filter-tags">
                <v-chip
                  v-for="(filter, idx) in filters"
                  v-bind:key="idx"
                  @click:close="removeNotificationFilter(filter)"
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
        <v-col
          v-for="event in filteredData"
          v-bind:key="event.id"
          sm="12"
          md="4"
        >
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
<style>
.main-btn {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding-right: 2px !important;
}
.actions-btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 0 !important;
  min-width: 35px !important;
  margin-left: -3.5px;
}
.split-btn {
  display: inline-block;
}
</style>
