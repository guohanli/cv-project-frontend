<!-- eslint-disable vue/no-unused-vars -->
<template>
  <PageHeader :title="$route.params.category" />
  <div
    class="delete"
    :class="{ cancel: available_operate === 'cancel' }"
    @click="changeOperate"
  >
    {{ available_operate }}
  </div>
  <WaterfallArea
    :shake="available_operate === 'cancel'"
    :list="list"
    @get-animate="updateAnimateList"
    @delete-image="deleteImage"
  />
</template>

<script setup>
// @ts-nocheck

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import PageHeader from "../components/PageHeader.vue";
import WaterfallArea from "../components/WaterfallArea.vue";

const list = ref();
const route = useRoute();
const available_operate = ref("delete");

onMounted(async () => {
  list.value = await (
    await fetch(
      `http://127.0.0.1:5173/api/get_category_imgs?category=${route.params.category}`
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
}
</script>
<style lang="scss" scoped>
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
