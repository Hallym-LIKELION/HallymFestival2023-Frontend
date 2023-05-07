<template>
  <main>
    <div class="introment" ref="introPhrase">
      <p>"과거에서 일어나는 우리의 설레는 이야기 ..."</p>
    </div>

    <div class="logo" ref="logo">
      <img src="@/assets/logo.png" alt="" />
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
      <button @click="openBoothRecommendation">부스 유형 추천 테스트하러 가기</button>
    </div>

    <div class="sponsor" ref="sponsor">
      <img src="@/assets/naverlogo.png" alt="" @click="openNaverCloud" />
      <p @click="openNaverCloud">본 웹사이트는 NAVER CLOUD PLATFORM의 협찬을 받았습니다.</p>
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
    },
    openNaverCloud() {
      window.open('https://www.ncloud.com/', '_blank');
    }
  },
  mounted() {
    // 슬로건 애니메이션
    gsap.fromTo(
      this.$refs.introPhrase,
      {
        top: '50%',
        transform: 'translateY(-50%)',
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
        delay: 1.5,
        duration: 2,
        transform: 'none',
        opacity: 1,
        ease: 'Expo.easeOut'
      }
    );

    // 메뉴 애니메이션
    for (let i = 0; i < 5; i++) {
      gsap.fromTo(
        this.$refs.menu.childNodes[i],
        {
          transform: 'translateX(-10%)',
          opacity: 0,
          pointerEvents: 'none'
        },
        {
          delay: 2.5 + i * 0.25,
          duration: 0.5,
          transform: 'none',
          opacity: 1,
          pointerEvents: 'auto'
        }
      );
    }

    // 스폰서 애니메이션
    gsap.fromTo(
      this.$refs.sponsor,
      {
        opacity: 0,
        pointerEvents: 'none'
      },
      {
        delay: 4.25,
        duration: 1.5,
        opacity: 1,
        pointerEvents: 'auto',
        ease: 'Expo.easeOut'
      }
    );
  }
};
</script>
<style scoped>
main {
}

.sponsor {
  margin-top: 32px;
  text-align: center;
  color: white;
}
.sponsor img {
  width: 50%;
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
  margin: 8px;
  padding: 10px 0;
  border-radius: 46.25px;
  font-size: 12pt;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  color: #363636;
  background-color: #ffffffb3;
  opacity: 0.7;
}

.menu > button {
  color: white;
  background-color: #ca434cb3;
}

.sponsor {
  margin: 64px -28px;
  padding: 12px 0;
  padding-bottom: 48px;
  margin-bottom: 0;
  font-size: 9pt;
}

.sponsor > img {
  max-width: 140px;
  margin: 18px 0;
  cursor: pointer;
}

.sponsor > p {
  cursor: pointer;
}
</style>
