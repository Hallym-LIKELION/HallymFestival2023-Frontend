<template>
  <div class="wrapper" :style="'background-color: ' + color">
    <div class="header">
      <img class="picture" :src="picture" v-if="picture !== ''" />
      <p class="name" v-text="name"></p>
      <button class="menu-button" @click="clickMenuButton">
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
      default: '#FFF4CE'
    }
  },
  methods: {
    clickMenuButton(evt) {
      this.$emit('clickMenu', evt, this.id);
      evt.stopPropagation();
    }
  }
};
</script>
<style scoped>
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

.picture {
  width: 24px;
  height: 24px;
  margin-right: 4px;
  border-radius: 12px;
}

.name {
  width: 100%;
  font-weight: 600;
}

.comment {
  width: 100%;
}
</style>
