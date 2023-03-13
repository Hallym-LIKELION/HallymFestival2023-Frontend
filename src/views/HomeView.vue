<template>
  <main>
    <div class="poster">
      <img :src="festivalImage" alt="한림대학교 비봉축전" />
    </div>

    <h1>(2023 축제 슬로건)</h1>

    <div class="menu">
      <RouterLink to="/timetable">타임 테이블</RouterLink>
      <RouterLink to="/boothmap">부스 배치도</RouterLink>
      <RouterLink to="/program">프로그램</RouterLink>
      <RouterLink to="/announcement">공지사항</RouterLink>
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
  margin: 0;
  font-size: 20pt;
  text-align: center;
}

.poster {
  padding: 36px 0;
  display: flex;
  justify-content: center;
}

.poster > img {
  max-height: 38vh;
  width: auto;
}

.menu {
  max-width: 380px;
  margin: auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 24px;
}

.menu > * {
  width: 100%;
  margin: 4px;
  padding: 12px 0;
  border-radius: 4px;
  font-size: 16pt;
  text-align: center;
  text-decoration: none;
  color: black;
  background-color: lightgray;
}
</style>
