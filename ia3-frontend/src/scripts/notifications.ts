import { ref } from "vue";
import { Filter, getProperty, compare } from "./filters";
import { computed } from "vue";
import { trafficEvent } from "./events";

const notificationFilters = ref<Filter[]>([]);
const filterData = ref<trafficEvent[]>([]);

export const getNotificationData = () => {
  return filterData;
};

export const filteredNotificationData = computed(() => {
  console.log(notificationFilters.value.filter.length);
  if (notificationFilters.value.length === 0) {
    return filterData.value;
  }
  return filterData.value.filter((item) => {
    return notificationFilters.value.some((filter) => {
      return filter.properties.some((property) => {
        const value = getProperty(item, property);
        console.log(value);
        console.log(filter);
        return compare(value, filter.value, filter.operator);
      });
    });
  });
});

export const getNotificationFilters = () => {
  return notificationFilters;
};

export const addNotificationFilter = (filter: Filter) => {
  notificationFilters.value.push(filter);
  saveNotificationFilters();
};

export const removeNotificationFilter = (filter: Filter) => {
  const index = notificationFilters.value.indexOf(filter);
  notificationFilters.value.splice(index, 1);
  saveNotificationFilters();
};

export const saveNotificationFilters = () => {
  localStorage.setItem(
    "notificationFilters",
    JSON.stringify(notificationFilters.value)
  );
};

export const loadNotificationFilters = () => {
  const savedFilters = localStorage.getItem("notificationFilters");
  if (savedFilters) {
    console.log("loaded notification filters");
    notificationFilters.value = JSON.parse(savedFilters);
  }
};
