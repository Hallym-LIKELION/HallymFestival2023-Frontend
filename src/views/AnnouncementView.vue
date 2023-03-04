<script setup>
import SearchBar from '../components/SearchBar.vue'
</script>

<template>
  <main>
    <h1>공지사항</h1>
    <div class="search-bar"><SearchBar /></div>
  </main>
</template>

<style scoped>
h1 {
  font-size: 20pt;
  text-align: center;
  margin: 0;
  padding: 36px 0;
}

.search-bar {
  display: flex;
  justify-content: center;
}
</style>
