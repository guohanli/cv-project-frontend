<template>
  <header>
    <IconReturn @click="goPreviousPage"></IconReturn>
    <h1>{{ props.title }}</h1>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";

import IconReturn from "../components/icons/IconReturn.vue";
const props = defineProps({
  title: String,
});

const router = useRouter();
function goPreviousPage() {
  router.back();
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;

  svg {
    position: absolute;
    left: 30px;
    top: 30px;
  }

  h1 {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 600;
    font-size: 64px;
    line-height: 75px;
    font-feature-settings: "liga" off;
    color: #474747;
    text-transform: capitalize;
  }
}
</style>
