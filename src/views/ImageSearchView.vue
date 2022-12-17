<!-- eslint-disable vue/no-unused-vars -->
<template>
  <PageHeader title="Search Result" />
  <div class="flex-wrapper">
    <ImageCard class="query_img_card" :src="query_img" title="query image" />
    <ImageCard
      class="result_img_card"
      :src="result_img"
      title="matched image"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import PageHeader from "../components/PageHeader.vue";
import ImageCard from "../components/ImageCard.vue";
import { useSearchImageStore } from "../stores/search-image";

const { searchImage } = useSearchImageStore();
const query_img = ref();
const result_img = ref();

onMounted(async () => {
  const { query_image, result_image } = searchImage;
  query_img.value = query_image;
  result_img.value = result_image;
});
</script>
<style lang="scss" scoped>
.flex-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 80px auto;
  margin-bottom: 0;
}

.query_img_card {
  width: 45%;
}

.result_img_card {
  width: 45%;
}
</style>
