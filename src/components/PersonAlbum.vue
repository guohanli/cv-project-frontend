<template>
  <div class="img-wrapper">
    <img :src="props.src" />
    <span>{{ props.count }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  src: String,
  count: String,
});
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

  border-radius: 50%;
}

span {
  position: absolute;
  top: 40px;
  left: 20px;
  transform: translate(-50%, -50%);

  width: 80px;
  height: 80px;

  border-radius: 100%;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  text-align: center;
  /* identical to box height */
  color: #a74040;
  background: #ffcdcd;
}
</style>
