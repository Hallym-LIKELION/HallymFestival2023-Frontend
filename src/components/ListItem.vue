<script setup>
const props = defineProps({
  title: 'string',
  content: 'string',
  image: 'string',
  imageAlt: 'string'
})
</script>

<template>
  <div class="component-wrapper">
    <img :class="['image-content', { hidden: image === undefined }]" :src="image" :alt="imageAlt" />
    <div class="text-content">
      <h3 v-text="title" />
      <p v-text="content" />
    </div>
  </div>
</template>

<style scoped>
.component-wrapper {
  width: 100%;
  padding: 6px 0;
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 4px;
  background-color: lightgray;
  height: 70px;
  overflow: hidden;
}

.text-content {
  margin-left: 10px;
  overflow: hidden;
}

.text-content > * {
  margin: 0;
  margin-right: 10px;

  /* 텍스트 오버플로우를 ... 으로 숨기기 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.image-content {
  width: 60px;
  height: 60px;
  margin-left: 10px;
  border-radius: 4px;
  object-fit: cover;
}

.hidden {
  display: none;
}
</style>
