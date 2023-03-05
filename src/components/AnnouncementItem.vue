<script setup>
const props = defineProps({
  title: 'string',
  content: 'string'
})
</script>

<template>
  <div>
    <h3 v-text="title" />
    <p v-text="content" />
  </div>
</template>

<style scoped>
div {
  width: 100%;
  border-radius: 4px;
  background-color: lightgray;
  height: 70px;
  overflow: hidden;
}

div > * {
  margin: 0 8px;

  /* 텍스트 오버플로우를 ... 으로 숨기기 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

h3 {
  margin-top: 12px;
}

p {
  margin-bottom: 12px;
}
</style>
