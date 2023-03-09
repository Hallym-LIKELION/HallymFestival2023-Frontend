<template>
  <header>
    <button @click="showMenu = !showMenu">
      <img :src="menuButtonImage" width="32" />
    </button>
    <p>2023 한림대학교 비봉축전</p>
  </header>
  <div class="wrapper">
    <nav :class="{ hidden: !showMenu }">
      <template v-for="{ url, name } in navList">
        <RouterLink :to="'/' + url" v-text="name" />
      </template>
    </nav>

    <RouterView v-slot="{ Component }" class="router-view">
      <Transition name="slide-right" mode="out-in">
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
        { name: '로그인', url: 'login' }
      ]
    };
  }
};
</script>

<style scoped>
header {
  width: 100%;
  height: 72px;
  background-color: #999999;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
}
header > button {
  margin-left: 24px;
  /* 이미지를 하얗게 */
  filter: brightness(0) invert(1);
  background: none;
  border: none;
  cursor: pointer;
}
header > p {
  margin-right: 24px;
  font-size: 16pt;
  font-weight: 600;
  color: white;
}
.wrapper {
  padding-top: 72px;
}
nav {
  height: 100%;
  display: flex;
  position: fixed;
  flex-direction: column;
  background-color: #777777;
  padding: 8px;
  overflow: auto;
  z-index: 99;
}
nav.hidden {
  display: none;
}
nav > * {
  width: 300px;
  font-size: 24pt;
  margin: 10px;
  text-decoration: none;
  color: white;
  font-weight: 600;
  padding: 8px 16px;
}
.router-view {
  max-width: 768px;
  min-height: calc(100vh - 72px);
  margin: auto;
}

/* 트랜지션 기능 테스트 */
.slide-right-enter-active {
  transition: opacity 0.25s ease;
}
.slide-right-leave-active {
  transition: opacity 0.25s ease;
}

.slide-right-enter-from {
  opacity: 0;
}
.slide-right-enter-to {
  opacity: 1;
}
.slide-right-leave-from {
  opacity: 1;
}
.slide-right-leave-to {
  opacity: 0;
}
</style>
