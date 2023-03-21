<template>
  <div class="wrapper">
    <div class="image">
      <img :src="image" alt="" />
    </div>
    <p class="title" v-text="title"></p>
    <p class="description" v-text="description"></p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return 'Untitled Program';
      }
    },
    description: {
      type: String,
      default() {
        return '프로그램 설명.';
      }
    },
    image: {
      type: String,
      default() {
        return 'https://via.placeholder.com/700x400/D9D9D9/b8b8b8';
      }
    }
  }
};
</script>
<style scoped>
p {
  margin: 0;
}
.wrapper {
  width: 100%;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
}

.image {
  max-width: 100%;
}

.image > img {
  width: 100%;
  max-height: 240px;
  object-fit: contain;
}

.wrapper > .title {
  font-size: 18pt;
  font-weight: 600;
}

.wrapper p {
  width: 100%;
  /* 텍스트 오버플로우를 ... 으로 숨기기 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
