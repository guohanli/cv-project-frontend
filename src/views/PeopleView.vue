<!-- eslint-disable vue/no-unused-vars -->
<template>
  <PageHeader title="People" />
  <div
    class="delete"
    :class="{ cancel: available_operate === 'cancel' }"
    @click="changeOperate"
  >
    {{ available_operate }}
  </div>
  <footer>
    <PersonAlbum
      v-for="cover in covers"
      :class="{ active: cover.face_category_id === current_select_id }"
      :src="cover.src"
      :count="cover.count"
      :key="cover.face_category_id"
      @click="change_select(cover.face_category_id)"
    />
  </footer>
  <WaterfallArea
    :shake="available_operate === 'cancel'"
    :list="list"
    @get-animate="updateAnimateList"
    @delete-image="deleteImage"
  />
</template>

<script setup>
// @ts-nocheck

import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import PageHeader from "../components/PageHeader.vue";
import PersonAlbum from "../components/PersonAlbum.vue";
import WaterfallArea from "../components/WaterfallArea.vue";

const covers = ref();
const current_select_id = ref();
const available_operate = ref("delete");
const route = useRoute();
const list = ref();
console.log(route);

const getPeopleCovers = async () => {
  covers.value = await (
    await fetch(`http://127.0.0.1:5173/api/get_face_covers`)
  ).json();
  if (covers.value.length > 0) {
    current_select_id.value = covers.value[0].face_category_id;
  }
};
onMounted(() => {
  getPeopleCovers();
});

function change_select(new_select_id) {
  current_select_id.value = new_select_id;
}

watch(current_select_id, async (current_id) => {
  list.value = await (
    await fetch(
      `http://127.0.0.1:5173/api/get_somebody_faces?face_category_id=${current_id}`
    )
  ).json();
});

async function updateAnimateList(index) {
  list.value[index] = await (
    await fetch(
      `http://127.0.0.1:5173/api/get_animate?img_url=${list.value[index].src}`
    )
  ).json();
}

function changeOperate() {
  const next_op_dic = {
    delete: "cancel",
    cancel: "delete",
  };
  available_operate.value = next_op_dic[available_operate.value];
}

async function deleteImage(index) {
  await (
    await fetch(`http://127.0.0.1:5173/api/delete_image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list.value[index].id),
    })
  ).text();
  list.value.splice(index, 1);
  getPeopleCovers();
}
</script>
<style lang="scss" scoped>
footer {
  width: 1200px;
  margin: 80px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  row-gap: 60px;
}

.active {
  filter: drop-shadow(0px 15px 30px rgba(0, 0, 0, 0.5));
}

.delete {
  position: absolute;
  top: 30px;
  right: 30px;

  color: #af1111;
  background: #e4bfcd;
  border-radius: 31px;

  width: 197px;
  height: 80px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 40px;

  text-align: center;
  text-transform: capitalize;
  padding-top: 5px;

  filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.5));
}

.cancel {
  background-color: bisque;
}
</style>
