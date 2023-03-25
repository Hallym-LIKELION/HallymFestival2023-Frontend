<template>
  <main>
    <div class="poster" ref="poster">
      <img :src="festivalImage" alt="한림대학교 비봉축전" />
    </div>

    <h1 ref="slogan">(2023 축제 슬로건)</h1>

    <div class="menu" ref="menu">
      <RouterLink to="/timetable">타임 테이블</RouterLink>
      <RouterLink to="/boothmap">부스 배치도</RouterLink>
      <RouterLink to="/program">프로그램</RouterLink>
      <RouterLink to="/announcement">공지사항</RouterLink>
    </div>
  </main>
</template>

<script>
import { gsap } from 'gsap';
import { RouterLink } from 'vue-router';
import festivalImage from '@/assets/poster.jpg';

export default {
  data() {
    return {
      festivalImage,
      storytelling: ''
    };
  },
  mounted() {
    // 포스터 애니메이션
    gsap.fromTo(
      this.$refs.poster,
      {
        opacity: 0,
        transform: 'scale(0.7)'
      },
      {
        delay: 0.25,
        duration: 0.5,
        opacity: 1,
        transform: 'none'
      }
    );

    // 슬로건 애니메이션
    gsap.fromTo(
      this.$refs.slogan,
      {
        opacity: 0
      },
      {
        delay: 0.75,
        duration: 1,
        opacity: 1
      }
    );

    // 메뉴 애니메이션
    for (let i = 0; i < 4; i++) {
      gsap.fromTo(
        this.$refs.menu.childNodes[i],
        {
          transform: 'translateX(-10%)',
          opacity: 0,
          pointerEvents: 'none'
        },
        {
          delay: 1.25 + i * 0.25,
          duration: 0.5,
          transform: 'none',
          opacity: 1,
          pointerEvents: 'auto'
        }
      );
    }
  }
};
</script>

<style scoped>
.se1{
  text-align: center;
  display: flex;
  padding: 36px 0;
  justify-content:space-between;
}

h1 {
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
