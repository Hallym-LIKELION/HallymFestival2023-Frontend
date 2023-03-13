<template>
  <header>
    <button @click="showMenu = !showMenu">
      <img :src="menuButtonImage" width="32" />
    </button>
    <p>2023 한림대학교 비봉축전</p>
  </header>
  <div class="dimmer" :class="{ hidden: !showMenu }" @click="() => (showMenu = false)"></div>
  <div class="wrapper">
    <nav :class="{ hidden: !showMenu }">
      <template v-for="{ url, name, bottom = false } in navList">
        <RouterLink
          :to="'/' + url"
          v-text="name"
          :class="{ bottom }"
          @click="() => (showMenu = false)"
        />
      </template>
    </nav>

    <RouterView v-slot="{ Component }" class="router-view">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import menuButtonImage from '@/assets/hamburger.png';

export default {
  components: {
    RouterLink,
    RouterView
  },
  data() {
    return {
      showMenu: false,
      menuButtonImage,
      navList: [
        { name: 'HOME', url: '' },
        { name: '공지사항', url: 'announcement' },
        { name: '부스 배치도', url: 'boothmap' },
        { name: '타임 테이블', url: 'timetable' },
        { name: '프로그램', url: 'program' },
        { name: 'About Us', url: 'aboutus' },
        { name: 'API 데모 테스트', url: 'feature-test' },
        { name: '로그인', url: 'login', bottom: true }
      ]
    };
  }
};
</script>

<style scoped>
header {
  width: 100%;
  height: 72px;
  display: flex;
  position: fixed;
  background-color: #ffffff;
  box-shadow: 0px 1px 8px #00000066;
  align-items: center;
  justify-content: stretch;
  z-index: 999;
}
header > button {
  margin-left: 24px;
  position: absolute;
  /* 이미지를 하얗게 */
  background: none;
  border: none;
  cursor: pointer;
}
header > p {
  width: 100%;
  text-align: center;
  margin: 0;
  font-size: 18pt;
  font-weight: 600;
}
.wrapper {
  padding-top: 72px;
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
  height: 100%;
  background-color: #ffffff;
  display: flex;
  position: fixed;
  flex-direction: column;
  padding: 8px;
  overflow: auto;
  z-index: 99;
}

.hidden {
  display: none;
}

.bottom {
  margin-top: auto;
  margin-bottom: 96px;
}

nav > * {
  width: 240px;
  padding: 16px 0;
  padding-left: 24px;
  font-size: 16pt;
  color: black;
  text-decoration: none;
}

.router-view {
  max-width: 768px;
  min-height: calc(100vh - 72px);
  margin: auto;
}

@media screen and (max-width: 768px) {
  header > p {
    font-size: 14pt;
  }

  header > button {
    margin-left: 24px;
  }

  header > button > img {
    width: 24px;
  }
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
</style>
