<template>
  <main>
    <div class="introment" ref="introPhrase">
      <p>"과거에서 일어나는 우리의 설레는 이야기 ..."</p>
    </div>

    <div class="logo" ref="logo">
      <img src="@/assets/logo.png" alt=""/>
    </div>

    <div class="title" ref="title">
      <h3>한림대학교 비봉축전</h3>
      <br />
      <p>2023.05.16 ~ 05.18</p>
    </div>
    <div class="menu" ref="menu">
      <RouterLink to="/timetable">타임 테이블</RouterLink>
      <RouterLink to="/boothmap">부스 배치도</RouterLink>
      <RouterLink to="/program">프로그램</RouterLink>
      <RouterLink to="/announcement">공지사항</RouterLink>
    </div>
    <div class="test-group" ref="boothTest">
      <button @click="openBoothRecommendation">부스 유형 추천 테스트하러 가기</button>
    </div>

    <div class="sponsor" ref="sponsor">
      <p>이 웹사이트는</p>
      <br /><br />
      <img src="@/assets/naverlogo.png" alt="" />
      <br /><br />
      <p>의 서버 후원을 받아 제작되었습니다.</p>
      <br /><br />
    </div>
  </main>
</template>

<script>
import { gsap } from 'gsap';
import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      storytelling: ''
    };
  },
  methods: {
    openBoothRecommendation() {
      window.open('https://hallym-booth.vercel.app/', '_blank');
    }
  },
  mounted() {
    // 슬로건 애니메이션
    gsap.fromTo(
      this.$refs.introPhrase,
      {
        transform: 'translateY(-20%)',
        opacity: 0
      },
      {
        delay: 0.25,
        duration: 1,
        transform: 'none',
        opacity: 1,
        ease: 'Expo.easeOut'
      }
    );

    // 포스터 애니메이션
    gsap.fromTo(
      this.$refs.logo,
      {
        opacity: 0,
        transform: 'scale(0.5)'
      },
      {
        delay: 0.75,
        duration: 1.5,
        transform: 'none',
        opacity: 1,
        ease: 'Expo.easeOut'
      }
    );

    // 타이틀 애니메이션
    gsap.fromTo(
      this.$refs.title,
      {
        opacity: 0,
        transform: 'translateY(100%)'
      },
      {
        delay: 0.75,
        duration: 2,
        transform: 'none',
        opacity: 1,
        ease: 'Expo.easeOut'
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
          delay: 1.75 + i * 0.25,
          duration: 0.5,
          transform: 'none',
          opacity: 1,
          pointerEvents: 'auto'
        }
      );
    }

    // 부스 유형 애니메이션
    gsap.fromTo(
      this.$refs.boothTest,
      {
        transform: 'translateX(-10%)',
        opacity: 0,
        pointerEvents: 'none'
      },
      {
        delay: 2.75,
        duration: 0.5,
        transform: 'none',
        opacity: 1,
        pointerEvents: 'auto'
      }
    );

    // 스폰서 애니메이션
    gsap.fromTo(
      this.$refs.sponsor,
      {
        opacity: 0,
        transform: 'scale(0.5)'
      },
      {
        delay: 3.25,
        duration: 1.5,
        transform: 'none',
        opacity: 1,
        ease: 'Expo.easeOut'
      }
    );
  }
};
</script>
<style scoped>
.sponsor {
  margin-top: 32px;
  text-align: center;
  color: white;
}
.sponsor img{
  width: 50%
}
p {
  text-align: center;
  color: white;
}
h1 {
  font-size: 20pt;
  text-align: center;
}
.logo {
  width: 70%;
  max-width: 320px;
  margin: -18px auto;
  display: flex;
  justify-content: center;
  color: white;
}

.logo > img {
  width: 100%;
}
.introment {
  margin-top: 64px;
  font-family: 'Nanum Gothic', sans-serif;
  font-style: normal;
  font-size: 12pt;
  text-align: center;
  word-break: keep-all;
  letter-spacing: 4px;
  color: white;
}

.title {
  font-family: 'Nanum Gothic', sans-serif;
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
  font-size: 1rem;
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
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
}
</style>
