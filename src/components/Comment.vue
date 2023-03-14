<template>
  <div class="wrapper" :style="'background-color: ' + color">
    <div :class="['context-menu', { hidden: !showMenu }]">
      <button class="delete-button">삭제하기</button>
      <button class="report-button">신고하기</button>
    </div>
    <div class="header">
      <p class="name" v-text="name"></p>
      <button class="menu-button" @click="showContextMenu">
        <img :src="arrowImage" alt="" srcset="" />
      </button>
    </div>
    <p class="comment" v-text="comment"></p>
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
    name: {
      type: String,
      default() {
        return '사용자';
      }
    },
    comment: {
      type: String,
      default() {
        return '내용입니다.';
      }
    },
    color: {
      type: String,
      default() {
        return '#FFF4CE';
      }
    },
    showMenu: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    showContextMenu(evt) {
      this.$emit('showContextMenu', this.id);
    }
  }
};
</script>
<style scoped>
p {
  margin: 0;
}

button {
  padding: 0;
  line-height: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: black;
  font-family: 'Noto Sans KR', sans-serif;
}

.wrapper {
  padding: 10px;
  padding-bottom: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.header {
  width: 100%;
  display: flex;
}

.menu-button {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  transition: background-color 0.25s;
}

.menu-button:hover {
  background-color: white;
}

.menu-button > img {
  width: 16px;
  height: 16px;
}
.name {
  width: 100%;
  font-weight: 600;
}

.comment {
  width: 100%;

  /* 텍스트 오버플로우를 ... 으로 숨기기 */
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
}

.context-menu {
  width: 130px;
  margin-top: 30px;
  position: absolute;

  display: flex;
  flex-direction: column;

  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 0px 8px #00000033;
}

.context-menu > button {
  height: 42px;
  margin: 4px 12px;
  font-size: 12pt;
  text-align: left;
  transition: background-color 0.25s;
}

.context-menu > button:hover {
  background-color: #00000033;
}

.hidden {
  display: none;
}
</style>
