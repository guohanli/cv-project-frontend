<!-- eslint-disable vue/no-unused-vars -->
<template>
  <Waterfall
    class="gallery-waterfall"
    :list="props.list"
    :width="600"
    :gutter="30"
  >
    <template #item="{ item, url, index }">
      <div
        class="shake-wrapper"
        :class="{
          shake: shake,
          'shake-hard': shake,
          'shake-constant': shake,
          'shake-constant--hover': shake,
        }"
      >
        <img :src="url" @click="$emit('getAnimate', index)" />
        <IconDelete
          v-if="shake"
          class="icon-delete"
          @click="$emit('deleteImage', index)"
        />
      </div>

      <svg width="0" height="0">
        <filter id="shake-filter">
          <!--定义feTurbulence滤镜-->
          <feTurbulence baseFrequency="0.02" seed="0">
            <!--这是svg动画的定义方式，通过动画不断改变seed的值，形成抖动效果-->
            <animate
              attributeName="seed"
              dur="1s"
              keyTimes="0;0.5;1"
              values="1;2;3"
              repeatCount="indefinite"
            ></animate>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="10" />
        </filter>
      </svg>
    </template>
  </Waterfall>
</template>

<script setup>
import { Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/style.css";
import IconDelete from "../components/icons/IconDelete.vue";
const props = defineProps(["list", "shake"]);
</script>

<style lang="scss" scoped>
.waterfall-list {
  background-color: unset;
}

.gallery-waterfall {
  margin-bottom: 80px;
  img {
    width: 100%;
    object-fit: cover;
    filter: drop-shadow(0px 15px 15px rgba(0, 0, 0, 0.5));
    border-radius: 30px;
    padding: 10px;
  }
}

.gallery-waterfall img.delete-shake {
  filter: drop-shadow(0px 15px 15px rgba(0, 0, 0, 0.5)) url(#shake-filter);
}

.icon-delete {
  position: absolute;
  top: 20px;
  right: 20px;
}

.shake-wrapper {
  font-size: 0;
  vertical-align: top;
}
</style>
