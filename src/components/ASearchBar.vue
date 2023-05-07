<template>
  <div class="home">
    <input
      type="text"
      name=""
      id=""
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value) "
      @change="change"
      placeholder="검색어를 입력하세요"
    />  <div class ="search" >
    <img :src="searchImage" alt="" />
  </div>
  </div>

</template>

<script>
import searchImage from '@/assets/ASearch.png';

export default {
  data() {
    return {
      searchImage
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
.home {
  padding: 8px 12px;
  border: 1px solid white;
  background-color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  width: 300px;
}

img {
  width: 20px;
  height:20px;
  margin-right: 8px;
}
.search{

}

input {
  width: 100%;
  background-color: white;
  border: none;
  outline: none;
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
