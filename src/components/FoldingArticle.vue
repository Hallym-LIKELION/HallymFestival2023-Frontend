<template>
  <div class="wrapper">
    <div class="header">
      <p class="id" v-text="id"></p>
      <p class="title" v-text="title"></p>
      <div class="icon">
        <img :src="arrowImage" />
      </div>
    </div>
    <transition name="expand" @enter="expandEnter" @leave="expandLeave">
      <div class="article" v-if="showContent">
        <p class="content" v-text="content"></p>
      </div>
    </transition>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import arrowImage from '@/assets/down.png';

export default {
  data() {
    return {
      arrowImage
    };
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: 'Untitled Announcement'
    },
    content: {
      type: String,
      default: '내용입니다.'
    },
    showContent: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    expandEnter(element, done) {
      return gsap.timeline({ onComplete: done }).fromTo(
        element,
        {
          height: 0,
          marginBottom: 0
        },
        {
          duration: 0.2,
          height: 'auto',
          marginBottom: '16px'
        }
      );
    },
    expandLeave(element, done) {
      return gsap
        .timeline({ onComplete: done })
        .to(element, { duration: 0.2, height: 0, marginBottom: 0 });
    }
  }
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  overflow: hidden;
}

.header {
  width: 100%;
  height: 42px;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  font-size: 16pt;
}

.header > .title {
  width: 100%;
  margin: 0 16px;
  text-align: left;

  /* 텍스트 오버플로우를 ... 으로 숨기기 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon {
  width: 24px;
  line-height: 0; /* 이미지 수직 정렬 */
}

.icon > img {
  width: 100%;
  object-fit: contain;
}

.article {
  width: 100%;
  margin-bottom: 16px;
}

.content {
  margin: 0 28px;
}

.hidden {
  display: none;
}
</style>
