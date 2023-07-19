import { Ref } from "vue";
import { ref } from "vue";

const filters: Ref<Filter[]> = ref([]);
export interface Filter {
  value: string;
  properties: string[];
  operator: "eq" | "like" | "notlike";
}
export const filterData = (data: unknown[], filters: Filter[]) => {
  if (filters.length === 0) {
    return data;
  }
  return data.filter((item) => {
    return filters.some((filter) => {
      return filter.properties.some((property) => {
        const value = getProperty(item, property);
        if (value == undefined || value == null) {
          console.log(filter);
          return false;
        }
        return compare(value, filter.value, filter.operator);
      });
    });
  });
};
export const getProperty = (item: any, property: string): string => {
  const propertyList = property.split(".");
  let value: any;

  for (const prop of propertyList) {
    if (item[prop] == undefined) {
      if (value == undefined) {
        return "";
      }
      value = value[prop];
    } else if (item[prop] == null) {
      return "";
    } else {
      value = item[prop];
    }
  }
  if (value == undefined) {
    return "";
  }
  return value;
};
export const compare = (
  value: string,
  filterValue: string,
  operator: string
) => {
  if (value.toLowerCase()) {
    value = value.toLowerCase();
  }

  switch (operator) {
    case "eq":
      return value === filterValue;
    case "like":
      return value.includes(filterValue);
    case "notlike":
      return !value.includes(filterValue);
    default:
      return false;
  }
};
export const getFilters = () => {
  return filters;
};
export const addFilter = (filter: Filter) => {
  filters.value.push(filter);
  saveFilters();
};
export const removeFilter = (filter: Filter) => {
  const index = filters.value.indexOf(filter);
  filters.value.splice(index, 1);
  saveFilters();
};
export const saveFilters = () => {
  localStorage.setItem("filters", JSON.stringify(filters.value));
};
export const loadFilters = () => {
  const savedFilters = localStorage.getItem("filters");
  if (savedFilters) {
    console.log("loaded filters");
    filters.value = JSON.parse(savedFilters);
  }
};
