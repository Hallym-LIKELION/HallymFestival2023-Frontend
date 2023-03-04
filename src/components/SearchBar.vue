<script setup>
// defineProps({
//   msg: {
//     type: String,
//     required: true
//   }
// })

import searchImage from '@/assets/search.png'
</script>

<template>
  <div>
    <img :src="searchImage" alt="" />
    <input type="text" name="" id="" placeholder="TODO 여기 기능 구현" />
  </div>
</template>

<style scoped>
div {
  padding: 8px 12px;
  border: 1px solid gray;
  border-radius: 18px;
  display: flex;
  align-items: center;
  width: 300px;
}

img {
  width: 18px;
  margin-right: 8px;
}

input {
  width: 100%;
  border: none;
  outline: none;
}
</style>
