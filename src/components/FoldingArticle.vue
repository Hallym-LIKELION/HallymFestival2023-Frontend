<template>
  <div class="wrapper">
    <div :class="['header', { selected: showContent }]">
      <p class="id" v-text="id"></p>
      <p class="title" v-text="title"></p>
      <div class="icon">
        <img :src="arrowImage" />
      </div>
    </div>
    <transition name="expand" @enter="expandEnter" @leave="expandLeave">
      <div class="article" v-if="showContent">
        <p class="content" v-text="content"></p>
        <div class="footer" v-if="role == 2">
          <button class="edit" @click="clickEdit">수정</button>
          <button class="delete" @click="clickDelete">삭제</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import arrowImage from '@/assets/down.png';
import { GetAuthority } from '../api/api-client';

export default {
  data() {
    return {
      arrowImage,
      role: GetAuthority()
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
    },
    clickEdit(evt) {
      this.$emit('clickEdit', this.id, this.title, this.content);
      evt.stopPropagation();
    },
    clickDelete(evt) {
      this.$emit('clickDelete', this.id, this.title);
      evt.stopPropagation();
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
  height: 36px;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  font-size: 14pt;
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

.header.selected > .title {
  font-weight: 600;
}
.header.selected > .id {
  font-weight: 600;
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
  font-size: 12pt;
  white-space: pre-wrap;
}

.footer {
  margin: 0 28px;
  margin-top: 10px;
  display: flex;
  /* justify-content: flex-end; */
}

.footer > button {
  border-radius: 4px;
  padding: 4px 16px;
  font-size: 11pt;
}
.footer > button.edit {
  margin-right: 8px;
  color: white;
  background-color: #4079ff;
}
.footer > button.delete {
  color: white;
  background-color: #f74242;
}

.hidden {
  display: none;
}
</style>
