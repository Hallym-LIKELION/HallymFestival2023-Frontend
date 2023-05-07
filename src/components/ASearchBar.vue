<template>
  <div class="wrapper">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="change"
      placeholder="검색어를 입력하세요"
    />
    <div class="button" @click="change">
      <img :src="Icon.findWhite" alt="" />
    </div>
  </div>
</template>

<script>
import { Icon } from '../library/icon';

export default {
  data() {
    return {
      Icon
    };
  },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    change(evt) {
      this.$emit('change', evt);
    }
  }
};
</script>

<style scoped>
.wrapper {
  border-radius: 12px;
  display: flex;
  align-items: center;
  width: 300px;
  overflow: hidden;
}

img {
  width: 20px;
  height: 20px;
}

.button {
  width: 56px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5c859b;

  cursor: pointer;
}

input {
  width: 100%;
  height: 36px;
  padding: 8px 12px;
  box-sizing: border-box;
  background-color: white;
  outline: none;
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
