<template>
  <div class="wrapper">
    <Image :src="image" class="image" width="300" height="210" spinner-size="200" :alt="title" />
    <h4 class="title" v-text="title"></h4>
    <p class="description" v-text="description"></p>
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
  margin-bottom: 12px;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Nanum Gothic';
  overflow: hidden;
  color: black;
  display: flex;
  flex-direction: column;
}

:deep(.image) {
  width: 100%;
  border-radius: 8px;
  object-fit: contain;
}

.title {
  margin-top: 18px;
  font-family: 'Nanum Gothic';

  font-size: 20pt;
  font-weight: 600;

  display: flex;
  flex-direction: column;

  color: black;
}

.description {
  width: 100%;
  margin-top: 6px;
  margin-bottom: 18px;
  font-family: 'Nanum Gothic';

  color: black;

  /* 텍스트 오버플로우를 ... 으로 숨기기 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media screen and (max-width: 400px) {
  .title {
    font-size: 11pt;
  }

  .description {
    margin: 4px 0;
    font-size: 9pt;
  }
}
</style>
