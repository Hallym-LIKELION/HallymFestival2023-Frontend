<template>
  <main>
    <div class="introment">
    <p>"우리의 모든 시간은 연결되어있어"</p>
  </div>
  <div class="logo">
      <img src="@/assets/logo.png" alt="" />
  </div>
  <div class ="title">
    <h3>한림대학교 비봉축전</h3><br>
    <p>2023.05.16 ~ 05.18</p>
  </div>
    <div class="menu" ref="menu">
      <RouterLink to="/timetable">타임 테이블</RouterLink>
      <RouterLink to="/boothmap">부스 배치도</RouterLink>
      <RouterLink to="/program">프로그램</RouterLink>
      <RouterLink to="/announcement">공지사항</RouterLink>
    </div>
    <div class="test-group">
        <button @click="openBoothRecommendation">부스 유형 추천 테스트하러 가기</button>
    </div>
    <div class ="DownBtn">
          <p>Scroll</p>
          <img src="@/assets/downscroll.png" alt="" />
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
  methods: {
    openBoothRecommendation() {
      alert('준비중');
    }
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
p{
  text-align: center;
  color: white;

}
h1 {
  font-size: 20pt;
  text-align: center;
}
.logo {
  display: flex;
  justify-content: center;
  color: white;
}
.introment {
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-size: 15px;
  line-height: 13px;
  text-align: center;
  letter-spacing: 0.15em;
  margin: 0;
  padding: 36px 0;
  color: white;
}

.title{
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  color: white;
}
.menu {
  max-width: 320px;
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
  padding: 10px 0;
  border-radius: 46.25px;
  font-size: 13pt;
  text-align: center;
  text-decoration: none;
  color: black;
  background-color: lightgray;
  opacity: 0.7;
}
.test-group {
  max-width: 320px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 24px;
}

.test-group > button {
  width: 100%;
  margin: 4px 0;
  padding: 10px 0;
  border-radius: 46.25px;
  background-color: #ca434c;
  opacity: 0.7;
  color: white;
  font-size: 13pt;
  text-align: center;
  text-decoration: none;
}
.DownBtn{
  margin: 0;
  padding: 36px 0;
  display: flex;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  color: white;
  opacity: 0.7;

}
</style>
