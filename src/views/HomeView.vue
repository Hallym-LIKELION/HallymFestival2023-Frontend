<script setup>
import { RouterLink } from 'vue-router'
import festivalImage from '@/assets/poster.jpg'
</script>

<template>
  <main>
    <h1>2023 한림대학교 비봉축전</h1>

    <div class="poster">
      <img :src="festivalImage" alt="한림대학교 비봉축전" />
    </div>

    <div class="menu">
      <RouterLink to="/announcement">공지사항</RouterLink>
      <RouterLink to="/boothmap">부스배치도</RouterLink>
      <RouterLink to="/timetable">타임 테이블</RouterLink>
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

.poster {
  display: flex;
  justify-content: center;
}

.poster > img {
  width: 100%;
  max-width: 360px;
  height: auto;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 24px;
}

.menu > * {
  margin: 16px;
  padding: 4px 12px;
  text-decoration: none;
  border-radius: 16px;
  color: black;
  background-color: lightgray;
}
</style>
