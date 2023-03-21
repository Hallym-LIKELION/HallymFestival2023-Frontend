<template>
  <div>
    <img :src="searchImage" alt="" />
    <input
      type="text"
      name=""
      id=""
      placeholder="Search..."
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
import searchImage from '@/assets/search.png';

export default {
  data() {
    return {
      searchImage
    };
  },
  props: ['modelValue'],
  emits: ['update:modelValue']
};
</script>

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
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
