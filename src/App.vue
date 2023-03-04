<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import hamburgerBtnImage from '@/assets/hamburger.png'
const showMenu = ref(false)
</script>

<template>
  <header>
    <button @click="showMenu = !showMenu">
      <img :src="hamburgerBtnImage" width="32" />
    </button>
    <p>2023 한림대학교 비봉축전</p>
  </header>
  <div class="wrapper">
    <nav :class="{ hidden: !showMenu }">
      <RouterLink to="/">HOME</RouterLink>
      <RouterLink to="/announcement">공지사항</RouterLink>
      <RouterLink to="/boothmap">부스배치도</RouterLink>
      <RouterLink to="/timetable">타임 테이블</RouterLink>
      <RouterLink to="/program">프로그램</RouterLink>
    </nav>

    <RouterView class="router-view" />
  </div>
</template>

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
  border-radius: 8px;
  padding: 4px 7px;
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
  margin: auto;
}
</style>
