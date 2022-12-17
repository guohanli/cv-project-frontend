<template>
  <div class="img-wrapper" @click="openGallery">
    <img :src="props.src" />
    <span>{{ props.text }}</span>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
  src: String,
  text: String,
});
const router = useRouter();
function openGallery() {
  if (props.text?.toLowerCase() !== "people") {
    router.push({ name: "gallery", params: { category: props.text } });
  } else {
    router.push({ name: "peopleAlbum" });
  }
}
</script>

<style lang="scss" scoped>
.img-wrapper {
  position: relative;
  width: 224px;
  height: 224px;
  cursor: pointer;
}

img {
  width: 224px;
  height: 224px;
  object-fit: cover;

  filter: drop-shadow(0px 15px 30px rgba(0, 0, 0, 0.5));
  border-radius: 30px;
}

span {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 739;
  font-size: 32px;
  line-height: 20px;
  /* or 62% */

  display: flex;
  align-items: center;
  text-transform: capitalize;

  color: #fffdfd;
  font-stretch: 100;
}
</style>
