<script setup>
const props = defineProps(['title', 'content'])
</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <p>
      {{ content }}
    </p>
  </div>
</template>

<style scoped>
div {
  width: 100%;
  border-radius: 12px;
  background-color: lightgray;
  height: 70px;
  overflow: hidden;
}

h3 {
  margin: 0 8px;
  margin-top: 12px;
}

p {
  margin: 0 8px;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
