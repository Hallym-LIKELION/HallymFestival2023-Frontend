<template>
  <div class="wrapper">
    <Image :src="image" class="image" width="300" height="210" spinner-size="200" :alt="title" /><br>
    <p class="title" v-text="title"></p><br>
    <p class="description" v-text="description"></p><br>
    <hr style="border: solid 2px white " class ="line" />
  </div>
</template>

<script>
import Image from './Image.vue';
export default {
  components: {
    Image
  },
  props: {
    title: {
      type: String,
      default: 'Untitled Program'
    },
    description: {
      type: String,
      default: '프로그램 설명.'
    },
    image: {
      type: String,
      default: 'https://placehold.co/300x210'
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
  color:black;
}
.wrapper> .line {
  opacity : 0.3;
}

:deep(.image) {
  width: 100%;
  object-fit: contain;
}

.wrapper > .title {
  font-size: 18pt;
  font-weight: 600;
  color:black;
}

.wrapper p {
  width: 100%;
  /* 텍스트 오버플로우를 ... 으로 숨기기 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color:black;
}
</style>
