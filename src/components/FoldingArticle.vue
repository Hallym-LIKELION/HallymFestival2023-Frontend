<template>
  <div class="wrapper">
    <div class="header">
      <p class="id" v-text="id"></p>
      <p class="title" v-text="title"></p>
      <div class="icon">
        <img :src="arrowImage" />
      </div>
    </div>
    <div class="article" :class="{ hidden: !showContent }">
      <p class="content" v-text="content"></p>
    </div>
  </div>
</template>

<script>
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
      default() {
        return 0;
      }
    },
    title: {
      type: String,
      default() {
        return 'Untitled Announcement';
      }
    },
    content: {
      type: String,
      default() {
        return '내용입니다.';
      }
    },
    showContent: {
      type: Boolean,
      default() {
        return false;
      }
    }
  }
};
</script>
<style scoped>
p {
  margin: 0;
}
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
