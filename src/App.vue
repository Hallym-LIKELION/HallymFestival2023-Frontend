<template>
  <main>
    <div class="container">
      <div class="background" :style="{ backgroundPositionY: `${10 + 20 * scroll}%` }">
        <Transition name="fade">
          <div v-if="decoration">
            <img
              ref="post"
              class="post"
              src="@/assets/post.png"
              alt=""
              :style="{ marginBottom: `calc(${3 * scroll}% - 12px` }"
            />
            <img
              ref="letter"
              class="letter"
              src="@/assets/letter.png"
              alt=""
              :style="{ marginBottom: `calc(${3 * scroll}% - 24px` }"
            />
          </div>
        </Transition>
      </div>

      <Transition name="fade">
        <div class="dimmer" v-if="showMenu" @click="() => (showMenu = false)"></div>
      </Transition>

      <div class="header">
        <header>
          <button @click="showMenu = !showMenu">
            <img :src="Icon.hamburger" width="24" />
          </button>
          <RouterLink class="title" to="/" @click="showMenu = false"
            ><img src="@/assets/logo.png" alt=""
          /></RouterLink>
        </header>
      </div>

      <div class="wrapper">
        <Transition name="slide">
          <div v-show="showMenu" class="nav-menu">
            <nav>
              <div class="top-menu">
                <template
                  v-for="{
                    url,
                    name,
                    roleList = [0, 1, 2],
                    callback = () => (showMenu = false)
                  } in navList"
                >
                  <RouterLink
                    :to="url"
                    v-text="name"
                    @click="callback"
                    v-if="roleList.includes(role)"
                  />
                </template>
              </div>
              <div class="bottom-menu">
                <template
                  v-for="{
                    url,
                    name,
                    roleList = [0, 1, 2],
                    callback = () => (showMenu = false)
                  } in navBottomList"
                >
                  <RouterLink
                    :to="url"
                    v-text="name"
                    @click="callback"
                    v-if="roleList.includes(role)"
                  />
                </template>
                <p v-if="role > 0" style="font-size: 11pt">
                  계정: {{ id }}님 ({{ ['부스운영자', '관리자'][role - 1] }})
                </p>
              </div>
            </nav>
            <button class="close" @click="showMenu = false">
              <img :src="Icon.close" />
            </button>
          </div>
        </Transition>

        <div class="router-view">
          <RouterView v-slot="{ Component }" @reload="reload" @login="login">
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
import Cookies from 'js-cookie';
import { gsap } from 'gsap';
import { RouterLink, RouterView } from 'vue-router';
import { Icon } from './library/icon';
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
      scroll: 0,
      role: API.GetAuthority(),
      id: Cookies.get('id'),
      update: true,
      scrollTarget: null,
      navList: [
        { name: '공지사항', url: '/announcement' },
        { name: '부스', url: '/boothmap' },
        { name: '타임 테이블', url: '/timetable' },
        { name: '프로그램', url: '/program' },
        { name: '굿즈', url: '/goods' },
        { name: '방명록', url: '/comment' },
        { name: '만든이들', url: '/aboutus' }
      ],
      navBottomList: [
        { name: '나의 부스', url: '', callback: this.openMyBooth, roleList: [1] },
        { name: '관리자 페이지', url: '/admin', roleList: [2] },
        { name: '로그아웃', url: '', callback: this.logout, roleList: [1, 2] },
        { name: '로그인', url: '/login', roleList: [0] }
      ],
      Icon
    };
  },
  computed: {
    decoration() {
      return (
        this.$router.currentRoute.value.name !== undefined &&
        ['/', '/admin', '/login'].includes(this.$router.currentRoute.value.path)
      );
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.footerAnimation();
      next();
    });

    window.addEventListener('scroll', this.handleScroll);

    API.GetAPI();
  },

  methods: {
    async openMyBooth(evt) {
      evt.stopPropagation();

      const id = await API.GetMyBooth();

      this.$router.push('/booth/' + id);
      this.showMenu = false;
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
    login(result) {
      this.role = result.role;
      this.id = result.id;
    },
    logout(evt) {
      evt.stopPropagation();
      API.DeleteToken();

      const adminOnlyList = ['/admin', '/admin/comment', '/admin/boothComment'];
      const currentPath = this.$router.currentRoute.value.path;

      this.role = 0;
      this.id = '';

      if (adminOnlyList.includes(currentPath)) {
        this.$router.push('/');
      } else {
        this.reload();
      }

      this.showMenu = false;
    },
    reload() {
      this.update = !this.update;
      this.footerAnimation();
    }
  },
  mounted() {}
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

  overflow: hidden;

  z-index: -1;
  background-image: url('./assets/back.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

.background .post {
  position: absolute;
  left: 50%;
  bottom: -100px;
  width: 220px;
  transform: translateX(-50%);
}
.background .letter {
  position: absolute;
  width: 100%;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}

@media screen and (max-width: 400px) {
  .background .letter {
    width: 500px;
  }
  .background .post {
    width: 160px;
    bottom: -30px;
  }
}

header {
  width: 824px;
  height: 56px;
  left: 50%;
  margin-left: -412px;
  background-color: #00000077;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  z-index: 99;
  overflow: hidden;
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

header > .title > img {
  height: 80px;
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
  overflow: hidden;
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
