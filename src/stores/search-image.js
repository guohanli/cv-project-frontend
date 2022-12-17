import { ref } from "vue";
import { defineStore } from "pinia";

export const useSearchImageStore = defineStore("searchImage", () => {
  const searchImage = ref();
  function updateSearchImage(newSearchImage) {
    searchImage.value = newSearchImage;
  }

  return { searchImage, updateSearchImage };
});
