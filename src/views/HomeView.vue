<template>
  <label class="add-icon" for="newImage">
    <!-- <img src="../assets/imgs/add.png" /> -->
    <svg
      t="1671131776770"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2679"
      width="64"
      height="64"
    >
      <path
        d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
        fill="#db639b"
        p-id="2680"
      ></path>
    </svg>
  </label>
  <div class="logo">AL ALBUM</div>
  <div class="search-wrapper">
    <input
      type="text"
      v-model="currentSearchText"
      @keyup.enter="
        () => {
          updateSearchText(currentSearchText);
          $router.push({ name: 'textSearch' });
        }
      "
      placeholder="What are you looking for?"
    />
    <label for="fileInput"><Camera></Camera></label>
  </div>

  <input
    v-show="false"
    type="file"
    id="fileInput"
    @change="getFile($event)"
    accept=".png,.jpeg,.jpg"
  />

  <input
    v-show="false"
    type="file"
    id="newImage"
    @change="update_image($event)"
    accept=".png,.jpeg,.jpg"
  />

  <footer>
    <ClassAlbum
      v-for="cover in covers"
      :src="cover.img_path"
      :text="cover.category"
      :key="cover.category"
    ></ClassAlbum>
  </footer>
</template>

<script setup>
// @ts-nocheck

import Camera from "../components/icons/iconCamera.vue";
import ClassAlbum from "../components/ClassAlbum.vue";
import { onMounted, ref } from "vue";
import { useSearchTextStore } from "../stores/search-text";
import { useSearchImageStore } from "../stores/search-image";
import { useRouter } from "vue-router";

const covers = ref();
const query_image = ref();
const currentSearchText = ref("");
const { updateSearchImage } = useSearchImageStore();
const { updateSearchText } = useSearchTextStore();
const router = useRouter();

const getCoversData = async () => {
  covers.value = (
    await (await fetch("http://127.0.0.1:5173/api/get_covers")).json()
  ).sort((a, b) => {
    if (a.category === "people" || b.category === "others") {
      return -1;
    } else if (b.category === "people" || a.category === "others") {
      return 1;
    } else {
      return 0;
    }
  });
};

onMounted(() => {
  getCoversData();
});

async function getFile(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    query_image.value = e.target.result;
  };
  const formData = new FormData();
  formData.append("query_image", file);

  const result_image = await (
    await fetch("http://127.0.0.1:5173/api/search_img_by_img", {
      method: "POST",
      body: formData,
    })
  ).json();
  e.target.value = "";
  updateSearchImage({ query_image, result_image });
  router.push({ name: "imageSearch" });
}

async function update_image(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    query_image.value = e.target.result;
  };
  const formData = new FormData();
  formData.append("new_image", file);

  await (
    await fetch("http://127.0.0.1:5173/api/new_image", {
      method: "POST",
      body: formData,
    })
  ).text();
  e.target.value = "";
  getCoversData();
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Zeyada&display=swap");
.add-icon {
  position: absolute;
  top: -100px;
  right: 20px;

  cursor: pointer;
}

.logo {
  /* AI ALBUM */

  width: 600px;
  height: 151px;
  margin: 120px auto;
  margin-bottom: 20px;

  font-family: "Zeyada";
  font-style: normal;
  font-weight: 400;
  font-size: 128px;
  line-height: 202px;
  font-feature-settings: "liga" off;

  color: #ff8383;
}

.search-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 852px;
  height: 112px;
  margin: 0 auto;

  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(241, 241, 241, 0.5);
  border-radius: 8px;

  filter: drop-shadow(0px 4px 12px rgba(87, 87, 87, 0.25));

  input {
    border: none;
    background: transparent;
    width: 750px;
    height: 40px;
    margin-left: 20px;

    font-family: "Roboto";
    font-style: normal;
    font-size: 40px;
    font-weight: 400;
    color: #777777;

    outline: none;
  }
}

footer {
  width: 1200px;
  margin: 80px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  row-gap: 60px;
}
</style>
