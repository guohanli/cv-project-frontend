<!-- eslint-disable vue/no-unused-vars -->
<template>
  <PageHeader title="Search Result" />
  <span class="search-text"
    >{{ searchText }}
    <span class="qoute">“</span>
  </span>
  <ImageCard :src="img" title="matched image" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useSearchTextStore } from "../stores/search-text";
import PageHeader from "../components/PageHeader.vue";
import ImageCard from "../components/ImageCard.vue";

const { searchText } = useSearchTextStore();
const img = ref();

onMounted(async () => {
  img.value = await (
    await fetch(`http://127.0.0.1:5173/api/search_image_by_text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchText),
    })
  ).json();
});
</script>
<style lang="scss" scoped>
.qoute {
  position: absolute;
  top: -60px;
  left: -80px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 128px;
  line-height: 150px;
  color: #847979;
}

.search-text {
  display: block;
  margin: 50px auto;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 48px;
  line-height: 56px;
  max-width: 1000px;
  text-indent: 50px;

  color: #686868;
}
</style>
