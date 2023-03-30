<template>
  <main>
    <BoothEditModal
      :visible="editModal"
      :data="editData"
      @close="closeEditModal"
      @complete="editBoothData"
    />

    <BoothEditMenuModal
      :visible="editMenuModal"
      :data="editMenuData"
      @close="closeEditMenuModal"
      @complete="editBoothMenuData"
    />

    <div class="header">
      <div class="header-title">
        <h1 class="header-name" v-text="data.name || 'Loading...'"></h1>
        <div class="header-like">
          <p class="header-like-count" v-text="like_display.toFixed(0)"></p>
          <button class="header-like-button" @click="likeHandler">
            <img :src="likeImage" alt="" />
          </button>
        </div>
      </div>

      <div class="header-content">
        <img class="header-image" :src="data.image || 'https://placehold.co/700x400'" />
      </div>
    </div>

    <div class="content">
      <div class="section">
        <div class="section-header">
          <h1>부스 소개</h1>
          <button class="edit-button" @click="editModal = !editModal">
            <img :src="EditImage" alt="" />
          </button>
        </div>
        <hr />
        <p class="section-text" v-text="data.description || 'Loading...'"></p>
      </div>

      <div class="section">
        <div class="section-header">
          <h1>부스 메뉴</h1>
          <button class="edit-button" @click="editMenuModal = !editMenuModal">
            <img :src="EditImage" alt="" />
          </button>
        </div>
        <hr />
        <div class="booth-menu">
          <template v-for="(item, index) in data.menu" :key="index">
            <div class="menu-group">
              <p class="menu-title" v-text="item.name"></p>
              <p class="menu-price" v-text="item.price.toLocaleString() + '원'"></p>
            </div>
          </template>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <h1>댓글 <span v-text="commentDisplayCount.toFixed(0)"></span></h1>
        </div>
        <hr />
        <BoothCommentSection :id="parseInt($route.params.id)" @update="loadCommentCount" />
      </div>
    </div>
  </main>
</template>

<script>
import { gsap } from 'gsap';
import HeartImage from '../assets/heart.png';
import HeartActiveImage from '../assets/heart-active.png';
import EditImage from '../assets/edit_button.png';
import { GetDemoBooth } from '../api/api-client';

import BoothEditModal from '../components/booth/EditModal.vue';
import BoothEditMenuModal from '../components/booth/MenuEditModal.vue';
import BoothCommentSection from '../components/booth/CommentSection.vue';

import axios from 'axios';

window.axios = axios;

export default {
  components: { BoothEditModal, BoothEditMenuModal, BoothCommentSection },
  data() {
    return {
      EditImage,
      likeImage: HeartImage,
      data: {},

      like_display: 0,

      editModal: false,
      editData: {
        title: '',
        description: '',
        type: '플리마켓',
        status: true
      },

      editMenuModal: false,
      editMenuData: [],

      commentCount: 0,
      commentDisplayCount: 0
    };
  },
  methods: {
    closeEditModal() {
      this.editModal = false;
    },
    editBoothData(data) {
      // this.data = data;
      this.data.name = data.title;
      this.data.description = data.description;
      this.closeEditModal();
    },
    closeEditMenuModal() {
      this.editMenuModal = false;
    },
    editBoothMenuData(data) {
      this.data.menu = data;
      this.closeEditMenuModal();
    },
    loadCommentCount(count) {
      this.commentCount = count;
    },
    likeHandler(evt) {
      // TODO: 좋아요 사이에 딜레이 넣을 것 (0.3초)
      if (this.data.liked === true) {
        this.likeImage = HeartImage;
        this.data.like--;
      } else {
        this.likeImage = HeartActiveImage;
        this.data.like++;
      }

      this.data.liked = !this.data.liked;

      // 좋아요 버튼 애니메이션
      gsap.to(evt.target, {
        keyframes: [
          { duration: 0.1, transform: 'scale(1.6)' },
          { duration: 0.3, transform: 'scale(1)' }
        ],
        ease: 'Expo.easeOut'
      });

      // API :: 부스 좋아요 등록/철회 요청 보내기
    }
  },
  watch: {
    data: {
      deep: true,
      handler(data) {
        this.editData = {
          title: data.name,
          description: data.description,
          type: '플리마켓',
          status: true
        };
        this.editMenuData = this.data.menu;
      }
    },
    'data.like'(n) {
      // 좋아요 수 애니메이션
      gsap.to(this, { duration: 2, like_display: Number(n) || 0, ease: 'Expo.easeOut' });
    },
    commentCount(n) {
      gsap.to(this, {
        duration: 3,
        commentDisplayCount: Number(n) || 0,
        ease: 'Expo.easeOut'
      });
    }
  },
  created() {
    // 데이터 가져오기
    GetDemoBooth(parseInt(this.$route.params.id))
      .then((data) => {
        this.data = data;
      })
      .catch((err) => {
        alert('Unexpected error has occured. Please try again later.');
        // console.log(err);
      });
  }
};
</script>

<style scoped>
h1 {
  font-size: 18pt;
  text-align: left;
}

.header,
.content,
.section {
  max-width: 400px;
  margin: auto;
}

.header {
  margin-top: 24px;
}

.header-title {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}

.header-name {
  width: 100%;
  font-size: 24pt;
}

.header-like {
  display: flex;
  align-items: center;
}

.header-like-count {
  margin-right: 8px;
  font-size: 16pt;
}

.header-like-button > img {
  width: 28px;
  height: 28px;
  vertical-align: middle;
}

.header-content {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-image {
  max-height: 200px;
  margin: auto;
  object-fit: contain;
  display: block;
}

.edit-button > img {
  width: 28px;
  height: 28px;
}

hr {
  border: 0px;
  border-top: 2px solid #333333;
}

.section {
  margin: 16px 0;
}
.section-header {
  display: flex;
  justify-content: space-between;
}

.section-header > h1 > span {
  font-size: 11pt;
  font-weight: 500;
}

.section-text {
  width: 100%;
  min-height: 100px;
  max-height: 200px;

  overflow: hidden;
  font-size: 13pt;
  white-space: pre-wrap;
  word-break: break-all;
}

.booth-menu {
  min-height: 80px;
}
.menu-group {
  display: flex;
  justify-content: space-between;
}

.menu-title {
  text-align: left;
  font-size: 13pt;
}

.menu-price {
  text-align: right;
  font-size: 13pt;
}
</style>
