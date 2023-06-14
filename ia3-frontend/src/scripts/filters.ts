import { Ref } from "vue";
import { ref } from "vue";

const filters: Ref<Filter[]> = ref([]);

export interface Filter {
  value: string;
  properties: string[];
  operator: "eq" | "like" | "notlike";
}

export const filterData = (data: unknown[], filters: Filter[]) => {
  return data.filter((item) => {
    return filters.some((filter) => {
      return filter.properties.some((property) => {
        const value = getProperty(item, property);
        return compare(value, filter.value, filter.operator);
      });
    });
  });
};

const getProperty = (item: any, property: string): string => {
  const propertyList = property.split(".");
  let value: any;
  for (const prop of propertyList) {
    if (item[prop] == undefined) {
      value = value[prop];
    } else {
      value = item[prop];
    }
  }
  return value;
};

const compare = (value: string, filterValue: string, operator: string) => {
  value = value.toLowerCase();
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
