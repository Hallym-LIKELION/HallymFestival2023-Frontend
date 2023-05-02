<template>
  <main>
    <div class="container">
      <div class="background" :style="{ backgroundPositionY: `${10 + 20 * scroll}%` }"></div>

      <Transition name="fade">
        <div class="dimmer" v-if="showMenu" @click="() => (showMenu = false)"></div>
      </Transition>

      <div class="header">
        <header>
          <button @click="showMenu = !showMenu">
            <img :src="menuButtonImage" width="24" />
          </button>
          <RouterLink class="title" to="/" @click="showMenu = false"
            ><img src="@/assets/logo2.png" alt=""
          /></RouterLink>
        </header>
      </div>

      <div class="wrapper">
        <Transition name="slide">
          <div v-show="showMenu" class="nav-menu">
            <nav>
              <div class="top-menu">
                <template v-for="{ url, name, callback = () => (showMenu = false) } in navList">
                  <RouterLink :to="url" v-text="name" @click="callback" />
                </template>
              </div>
              <div class="bottom-menu">
                <template
                  v-for="{ url, name, callback = () => (showMenu = false) } in navBottomList"
                >
                  <RouterLink :to="url" v-text="name" @click="callback" />
                </template>
              </div>
            </nav>
            <button class="close" @click="showMenu = false">
              <img :src="Icon.close" />
            </button>
          </div>
        </Transition>

        <div class="router-view">
          <RouterView v-slot="{ Component }" @reload="reload">
            <Transition name="fade" mode="out-in">
              <component :is="Component" :key="update" />
            </Transition>
          </RouterView>
        </div>
        <div ref="footer">
          <Footer></Footer>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { gsap } from 'gsap';
import { RouterLink, RouterView } from 'vue-router';
import AOS from 'aos';
import { Icon } from './library/icon';
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
      update: true,
      scrollTarget: null,
      navList: [
        { name: '공지사항', url: '/announcement' },
        { name: '부스', url: '/boothmap' },
        { name: '시간표', url: '/timetable' },
        { name: '프로그램', url: '/program' },
        { name: '굿즈', url: '/goods' },
        { name: '방명록', url: '/comment' },
        { name: '만든이들', url: '/aboutus' },
        { name: '나의 부스', url: '', callback: this.openMyBooth }
      ],
      navBottomList: [
        { name: '관리자 페이지', url: '/admin' },
        { name: '로그아웃', url: '', callback: this.logout },
        { name: '로그인', url: '/login' }
      ],
      Icon
    };
  },
  created() {
    // 애니메이션 라이브러리 init
    AOS.init();

    this.$router.beforeEach((to, from, next) => {
      this.footerAnimation();
      next();
    });

    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {},
  methods: {
    async openMyBooth(evt) {
      evt.stopPropagation();

      // 부스 없으면 부스 만들기
      // 추후 관련 API 스펙 확정후 제작.
      // const result = await this.createBooth();

      this.$router.push('/booth/1');
      this.showMenu = false;
    },
    async createBooth() {
      const res = await API.CreateBooth(
        '이름 없는 부스',
        '여러분들의 부스를 잘 나타내는 설명을 적어보세요!',
        '테스트',
        '부스'
      );

      if (!res.result.includes('success')) {
        alert('오류: 부스를 생성하는데 실패했습니다.\n' + res.result);
        return;
      }

      return res;
    },
    handleScroll(evt) {
      const elementTop = document.documentElement.scrollTop;
      const elementHeight = document.documentElement.scrollHeight;
      const bodyTop = document.body.scrollTop;
      const bodyHeight = document.body.scrollHeight;

      const percentage =
        (elementTop || bodyTop) /
        ((elementHeight || bodyHeight) - document.documentElement.clientHeight);

      this.scroll = percentage;
    },
    footerAnimation() {
      gsap.fromTo(
        this.$refs.footer,
        {
          transform: 'none'
        },
        {
          duration: 0.2,
          transform: 'translateY(100%)'
        }
      );
      gsap.fromTo(
        this.$refs.footer,
        {
          transform: 'translateY(100%)'
        },
        {
          delay: 0.5,
          duration: 0.5,
          transform: 'none'
        }
      );
    },
    logout(evt) {
      evt.stopPropagation();
      API.DeleteToken();
      const adminOnlyList = ['/admin', '/admin/comment', '/admin/boothComment'];
      const currentPath = this.$router.currentRoute.value.path;
      console.log(currentPath, adminOnlyList.includes(currentPath));
      if (adminOnlyList.includes(currentPath)) {
        console.log('go home');
        this.$router.push('/');
      } else {
        this.reload();
      }
    },
    reload() {
      this.update = !this.update;
      this.footerAnimation();
    }
  }
};
</script>

<style scoped>
.container {
  min-height: calc(100vh - 70px);
  overflow: auto;
  margin: 0;
  background: rgb(2, 16, 41);
  background-position: center;
  position: relative;
  z-index: 0;
}

.background {
  width: 824px;
  height: 100vh;
  left: 50%;
  margin-left: -412px;
  position: fixed;

  z-index: -1;
  background-image: url('./assets/back.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

header {
  width: 824px;
  height: 56px;
  left: 50%;
  margin-left: -412px;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

@media screen and (max-width: 824px) {
  header {
    left: 0;
    margin-left: 0;
    width: 100%;
  }
}

header > button {
  left: 12px;
  width: 32px;
  height: 32px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
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
  overflow: hidden;
}

/* 사이드 메뉴 열었을때 배경 흐리게 */
.dimmer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: #00000077;
  opacity: 1;
  transition: opacity 0.25s;
}

.dimmer.hidden {
  opacity: 0;
}

.nav-menu {
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 999;
}

nav {
  height: 100%;
  padding: 24px 8px;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
}

nav > div {
  display: flex;
  flex-direction: column;
  /* overflow: auto; */
}

nav > div > * {
  width: 240px;
  padding: 12px 0;
  padding-left: 24px;
  font-size: 13pt;
  color: black;
  text-decoration: none;
}
nav :hover {
  color: #ca434c;
}

.nav-menu > .close {
  width: 36px;
  height: 36px;
  margin-top: 24px;
  margin-left: 24px;
  color: white;
  font-size: 24pt;
}

.router-view {
  max-width: 824px;
  min-height: calc(100vh - 70px);
  box-sizing: border-box;
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
