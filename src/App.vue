<template>
  <main>
    <Transition name="fade">
      <div class="dimmer" v-if="showMenu" @click="() => (showMenu = false)"></div>
    </Transition>

    <header>
      <button @click="showMenu = !showMenu">
        <img :src="menuButtonImage" width="24" />
      </button>
      <RouterLink class="title" to="/">2023 한림대학교 비봉축전</RouterLink>
    </header>

    <div class="wrapper">
      <Transition name="slide">
        <nav v-if="showMenu">
          <div class="top-menu">
            <template v-for="{ url, name } in navList">
              <RouterLink :to="'/' + url" v-text="name" @click="() => (showMenu = false)" />
            </template>
          </div>
          <div class="bottom-menu">
            <template v-for="{ url, name } in navBottomList">
              <RouterLink :to="'/' + url" v-text="name" @click="() => (showMenu = false)" />
            </template>
          </div>
        </nav>
      </Transition>

      <RouterView v-slot="{ Component }" class="router-view">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>

    <Footer></Footer>
  </main>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import AOS from 'aos';
import menuButtonImage from './assets/hamburger.png';
import Footer from './components/Footer.vue';

import * as API from './api/api-client.js';

window.API = API;

export default {
  components: {
    RouterLink,
    RouterView,
    Footer
  },
  data() {
    return {
      showMenu: false,
      menuButtonImage,
      scroll: 0,
      scrollTarget: null,
      navList: [
        { name: '공지사항', url: 'announcement' },
        { name: '부스', url: 'boothmap' },
        { name: '시간표', url: 'timetable' },
        { name: '프로그램', url: 'program' },
        { name: '굿즈', url: 'goods' },
        { name: '방명록', url: 'comment' },
        { name: '만든이들', url: 'aboutus' },
        { name: '(테)관리자홈', url: 'aboutus' }
      ],
      navBottomList: [
        { name: '로그인', url: 'login' },
        { name: '회원가입', url: 'owerhome' }
      ]
    };
  },
  created() {
    // 애니메이션 라이브러리 init
    AOS.init();
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
header {
  width: 100%;
  height: 56px;
  /* margin-top: -56px; */
  display: flex;
  position: fixed;
  background-color: #ffffff;
  box-shadow: 0px 1px 8px #00000066;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
header > button {
  left: 24px;
  height: 20px;
  position: absolute;
  /* 이미지를 하얗게 */
  background: none;
  border: none;
  cursor: pointer;
}
header > .title {
  text-align: center;
  padding: 10px 0;
  color: black;
  text-decoration: none;
  font-size: 16pt;
  font-weight: 600;
}
.wrapper {
  min-height: 100%;
}

/* 사이드 메뉴 열었을때 배경 흐리게 */
.dimmer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: #00000077;
  opacity: 1;
  transition: opacity 0.25s;
}

.dimmer.hidden {
  opacity: 0;
}

nav {
  height: calc(100% - 56px - 16px);
  margin-top: 56px;
  padding: 8px;
  background-color: #ffffff;
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  z-index: 99;
}

nav > div {
  display: flex;
  flex-direction: column;
  /* overflow: auto; */
}

nav > div > * {
  width: 180px;
  padding: 12px 0;
  padding-left: 24px;
  font-size: 13pt;
  color: black;
  text-decoration: none;
}

.router-view {
  max-width: 768px;
  min-height: calc(100vh - 56px - 70px);
  margin: auto;
  padding: 0 28px;
  padding-top: 56px;
}

/* 트랜지션 기능 테스트 */
.fade-enter-active {
  transition: opacity 0.25s ease;
}
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}

/* 트랜지션 기능 테스트 */
.slide-enter-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.slide-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-25%);
}
.slide-enter-to {
  opacity: 1;
}
.slide-leave-from {
  opacity: 1;
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-25%);
}
</style>
