<template>
  <main>
    <h1>2023 한림대학교 비봉축전</h1>

    <div class="poster">
      <img :src="festivalImage" alt="한림대학교 비봉축전" />
    </div>

    <div class="menu">
      <RouterLink to="/announcement">공지사항</RouterLink>
      <RouterLink to="/boothmap">부스 배치도</RouterLink>
      <RouterLink to="/timetable">타임 테이블</RouterLink>
    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import festivalImage from '@/assets/poster.jpg';

export default {
  data() {
    return {
      festivalImage
    };
  }
};
</script>

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
  border-radius: 24px;
  text-decoration: none;
  color: black;
  background-color: lightgray;
}
</style>
