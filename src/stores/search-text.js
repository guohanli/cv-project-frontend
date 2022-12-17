import { ref } from "vue";
import { defineStore } from "pinia";

export const useSearchTextStore = defineStore("searchText", () => {
  const searchText = ref("");
  function updateSearchText(newSearchText) {
    searchText.value = newSearchText;
  }

  return { searchText, updateSearchText };
});
