<script setup>
import SearchBar from '../components/SearchBar.vue'
import festivalImage from '@/assets/poster.jpg'
</script>

<template>
  <main>
    <h1>부스 배치도</h1>
    <div class="search-bar"><SearchBar /></div>
    <button @click="Tuesday">화요일</button>
    <button @click="Wednesday">수요일</button>
    <button @click="Thursday">목요일</button>

    <div class="poster">
      <img :src="festivalImage" alt="한림대학교 비봉축전" />
    </div>

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

.poster {
  display: flex;
  justify-content: center;
}

.poster > img {
  width: 100%;
  max-width: 200px;
  height: auto;
  object-fit: cover;
}

</style>