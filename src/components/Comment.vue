<template>
  <div :class="['wrapper', { pink: color === 'PINK', yellow: color === 'YELLOW' }]">
    <div class="header">
      <img class="picture" :src="picture" v-if="picture !== ''" />

      <p class="name">
        <span>{{ name }}</span> {{ booth }}
      </p>

      <button class="menu-button" @click="clickMenuButton">
        <img :src="arrowImage" alt="" srcset="" />
      </button>
    </div>
    <p
      v-text="comment"
      :class="['comment', { expand, eclipse }]"
      ref="comment"
      @click="viewMore"
    ></p>
    <div class="read-more" v-if="eclipse && !expand" @click="viewMore">펼치기</div>
    <div class="footer" v-if="role == 2">
      <p class="warn">신고 {{ warn }}회</p>
      <p class="time">{{ timeDisplay }}</p>
    </div>
  </div>
</template>

<script>
import { GetAuthority } from '../api/api-client';
import arrowImage from '@/assets/menu.png';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      arrowImage,
      eclipse: false,
      expand: false,
      role: GetAuthority()
    };
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    picture: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: '사용자'
    },
    comment: {
      type: String,
      default: '내용입니다.'
    },
    color: {
      type: String,
      default: 'gray'
    },
    booth: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: '2023-01-01T00:00:00+09:00'
    },
    warn: {
      type: String,
      default: '-'
    }
  },
  methods: {
    clickMenuButton(evt) {
      this.$emit('clickMenu', evt, this.id);
      evt.stopPropagation();
    },
    viewMore() {
      if (this.eclipse) {
        this.expand = !this.expand;
      }
    },
    calculateHeight() {
      const comment = this.$refs.comment;

      this.eclipse = false;
      this.expand = false;

      if (comment.offsetHeight !== comment.scrollHeight) {
        this.eclipse = true;
      }
    }
  },
  computed: {
    timeDisplay() {
      return dayjs(this.time).format('YYYY년 M월 D일 HH:mm:ss');
    }
  },
  watch: {
    comment() {
      this.calculateHeight();
    }
  },
  mounted() {
    this.calculateHeight();
  }
};
</script>
<style scoped>
.wrapper {
  padding: 10px;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f4f4f4;
  box-shadow: 0px 0px 8px #00000033;
}

.wrapper.yellow {
  background-color: #fff4ce;
  box-shadow: none;
}
.wrapper.pink {
  background-color: #fce3f3;
  box-shadow: none;
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

.picture {
  width: 24px;
  height: 24px;
  margin-right: 4px;
  border-radius: 12px;
}

.name {
  width: 100%;
  font-size: 11pt;
  color: black;
}

.name > span {
  font-size: 12pt;
  font-weight: 600;
}

.comment {
  width: 100%;
  height: 60px;
  word-break: break-all;
  overflow: hidden;
}

.comment.eclipse {
  -webkit-mask-image: linear-gradient(0deg, transparent 25%, black 60%);
  mask-image: linear-gradient(0deg, transparent 25%, black 60%);
  cursor: pointer;
}

.comment.expand {
  min-height: 40px;
  height: auto;
  max-height: 170px;
  -webkit-mask-image: none;
  mask-image: none;
}

.read-more {
  margin-top: -10px;
  margin-bottom: 8px;
  color: #ca434c;
  font-size: 10pt;
  cursor: pointer;
}

.footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 9pt;
}

@media screen and (max-width: 400px) {
  .name {
    font-size: 8pt;
  }

  .name > span {
    font-size: 10pt;
  }

  .comment {
    font-size: 9pt;
  }

  .footer {
    font-size: 7pt;
  }
}
</style>
