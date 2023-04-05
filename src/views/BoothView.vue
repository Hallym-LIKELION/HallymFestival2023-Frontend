<template>
  <main>
    <BoothEditModal
      :visible="editModal"
      :data="editData"
      :id="id"
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
        <h1 class="header-name" v-text="boothData.booth_title || 'Loading...'"></h1>
        <div class="header-like">
          <p class="header-like-count" v-text="like_display.toFixed(0)"></p>
          <button class="header-like-button" @click="likeHandler">
            <img :src="likeImage" alt="" />
          </button>
        </div>
      </div>

      <div class="header-content">
        <img class="header-image" :src="boothData.temp_image || 'https://placehold.co/700x400'" />
      </div>
    </div>

    <div class="content">
      <div class="section">
        <div class="section-header">
          <h1>부스 소개</h1>
          <div class="section-header-button-group">
            <button class="delete-button" @click="deleteBooth">
              <img :src="CloseImage" alt="" />
            </button>
            <button class="edit-button" @click="editModal = !editModal">
              <img :src="EditImage" alt="" />
            </button>
          </div>
        </div>
        <hr />
        <p class="section-text" v-text="boothData.booth_content || 'Loading...'"></p>
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
          <template v-for="(item, index) in menuData" :key="index">
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
import { get, set } from 'idb-keyval';
import HeartImage from '../assets/heart.png';
import HeartActiveImage from '../assets/heart-active.png';
import EditImage from '../assets/edit_button.png';
import CloseImage from '../assets/close.png';
import {
  GetBooth,
  GetBoothMenu,
  GetBoothLike,
  PostBoothLike,
  ModifyBooth,
  DeleteBooth
} from '../api/api-client';

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
      CloseImage,

      id: -1,

      boothData: {},
      menuData: [],
      likeValueData: 0,
      isLikedData: false,

      like_display: 0,

      isLikeDelayed: false,

      editModal: false,
      editData: {
        title: '',
        description: '',
        type: '부스',
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
    async editBoothData(data) {
      const res = await ModifyBooth(
        this.id,
        data.title,
        data.description,
        '테스1트',
        data.type,
        data.status
      );

      if (!res.result.includes('success')) {
        alert('부스를 수정하는데 실패했습니다.\n' + res.result);
        return;
      }

      this.boothData.booth_title = data.title;
      this.boothData.booth_content = data.description;
      this.boothData.booth_type = data.type;
      this.boothData.booth_active = data.status;
      this.closeEditModal();
    },
    closeEditMenuModal() {
      this.editMenuModal = false;
    },
    async editBoothMenuData() {
      let data = await GetBoothMenu(this.id);
      data.forEach((item) => (item.booth = item.booth.bno));
      this.menuData = data.filter((item) => !item._deleted);

      this.closeEditMenuModal();
    },
    loadCommentCount(count) {
      this.commentCount = count;
    },
    async likeHandler(evt) {
      // 딜레이 중이면 종료
      if (this.isLikeDelayed) {
        return;
      }

      // 딜레이 ON
      this.isLikeDelayed = true;

      // 서버에 좋아요 보내고 결과 받기
      const data = await PostBoothLike(this.id);

      if (data.result === 'like create success') {
        this.isLikedData = true;
      } else if (data.result === 'like delete success') {
        this.isLikedData = false;
      } else {
        alert('좋아요을 전송하는데 오류가 발생했습니다.\n' + data.result);
        console.error(data);
        this.isLikeDelayed = false;
        return;
      }

      // 표면적인 값 바꾸기
      if (this.isLikedData === true) {
        this.likeValueData++;
      } else {
        this.likeValueData--;
      }

      // 좋아요 눌렀는지를 idb에 저장
      const idb = await get('like-data');
      if (idb === undefined) {
        await set('like-data', [this.id]);
      } else {
        if (!this.isLikedData) {
          await set(
            'like-data',
            idb.filter((item) => item !== this.id)
          );
        } else {
          idb.push(this.id);
          await set('like-data', idb);
        }
      }

      // 좋아요 버튼 애니메이션
      gsap.to(evt.target, {
        keyframes: [
          { duration: 0.1, transform: 'scale(1.6)' },
          { duration: 0.3, transform: 'scale(1)' }
        ],
        ease: 'Expo.easeOut'
      });

      // 0.3초 기다리기
      await new Promise((r) => setTimeout(r, 50));
      this.isLikeDelayed = false;
    },
    async deleteBooth() {
      let answer = prompt(
        `${this.boothData.booth_title} 부스를 삭제하려 합니다. 삭제를 진행하려면 "삭제"라고 입력해주세요.`,
        ''
      );
      if (answer) {
        const res = await DeleteBooth(this.boothData.bno);
        if (res.result.includes('success')) {
          alert('부스가 삭제되었습니다.');
          this.$router.push('/boothmap');
        } else {
          alert('부스를 삭제하는데 오류가 발생했습니다.\n' + res.result);
        }
      }
    }
  },
  computed: {
    likeImage() {
      return this.isLikedData ? HeartActiveImage : HeartImage;
    }
  },
  watch: {
    boothData: {
      deep: true,
      handler(data) {
        this.editData = {
          title: data.booth_title,
          description: data.booth_content,
          type: data.booth_type,
          status: data.booth_active
        };
      }
    },
    menuData: {
      deep: true,
      handler(data) {
        this.editMenuData = data;
      }
    },
    likeValueData(n) {
      // 좋아요 수 애니메이션
      gsap.to(this, { duration: 2, like_display: Number(n) || '0', ease: 'Expo.easeOut' });
    },
    commentCount(n) {
      gsap.to(this, {
        duration: 3,
        commentDisplayCount: Number(n) || 0,
        ease: 'Expo.easeOut'
      });
    }
  },
  async created() {
    this.id = parseInt(this.$route.params.id);
    try {
      let data;

      data = await GetBooth(this.id);
      data.booth_active = data.booth_active === 'OPEN' ? true : false;
      this.boothData = data;

      data = await GetBoothMenu(this.id);
      data.forEach((item) => (item.booth = item.booth.bno));
      this.menuData = data.filter((item) => !item._deleted);

      console.log(this.menuData);

      data = await GetBoothLike(this.id);
      this.likeValueData = data.result;

      data = await get('like-data');
      if (data === undefined) {
        await set('like-data', []);
        data = [];
      }
      this.isLikedData = data.includes(this.id);
    } catch (e) {
      alert('알 수 없는 오류가 발생했습니다.');
      console.error(e);
    }
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
.section-header-button-group {
  display: flex;
  align-items: center;
}

.edit-button > img {
  width: 28px;
  height: 28px;
  vertical-align: middle;
}

.delete-button {
  width: 28px;
  height: 28px;
  margin-right: 8px;
  border-radius: 28px;
  background-color: #d9d9d9;
}
.delete-button > img {
  width: 12px;
  height: 12px;
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
