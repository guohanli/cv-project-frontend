<template>
  <div class="img-wrapper">
    <img :src="props.src" />
    <span>{{ props.title }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  src: String,
  title: String,
});
</script>

<style lang="scss" scoped>
.img-wrapper {
  margin: 0 auto;
  margin-bottom: 100px;
  display: block;
  display: flex;
  justify-content: center;
  white-space: nowrap;
  width: 800px;
  background: #e4b5b555;
  border-radius: 36px;
  box-shadow: 0px 6px 19px rgba(0, 0, 0, 0.25);

  span {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%, -50%);

    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    color: #ffffff;
    text-transform: uppercase;
    padding: 8px 20px;

    background: #d87a7a;
    border-radius: 25px;
  }

  img {
    width: 90%;
    margin-top: 50px;
    margin-bottom: 40px;
    background: url(.jpg), #d9d9d9;
    box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
  }
}
</style>
