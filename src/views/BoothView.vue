<template>
  <main>
    <BoothEditModal
      :visible="editModal"
      :data="editData"
      :id="id"
      @close="closeEditModal"
      @complete="editBooth"
    />

    <BoothDescriptionEditModal
      :visible="editDescriptionModal"
      :data="this.boothData.booth_content"
      @close="closeEditDescriptionModal"
      @complete="editDescription"
    />

    <BoothMenuEditModal
      :visible="editMenuModal"
      :data="editMenuData"
      @close="closeEditMenuModal"
      @complete="editMenu"
    />

    <DeleteModal
      type="부스를"
      :visible="deleteModal"
      :name="boothData.booth_title"
      @close="closeDeleteModal"
      @complete="deleteBooth"
    />

    <div class="delete-container" v-if="admin">
      <button class="delete-button" @click="openDeleteModal">
        <img :src="Icon.trash" alt="" />
      </button>
    </div>

    <div class="header">
      <div class="header-title">
        <h1 class="header-name">
          {{ boothData.booth_title || 'Loading...' }}
          <button class="edit-button" v-if="admin" @click="openEditModal">
            <img :src="Icon.pen" alt="" />
          </button>
        </h1>
        <div class="header-like">
          <p class="header-like-count" v-text="like_display.toFixed(0)"></p>
          <button class="header-like-button" @click="likeHandler">
            <img :src="likeImage" alt="" />
          </button>
        </div>
      </div>

      <div class="header-content">
        <Image
          src="https://placehold.co/400x400"
          class="header-image"
          width="400"
          height="400"
          spinner-size="200"
          :alt="boothData.booth_title || ''"
        />
        <input
          ref="upload"
          type="file"
          accept=".png, .jpg, .jpeg, .gif, .webp, .svg"
          v-show="false"
          @change="uploadImage"
        />
        <button class="image-upload" v-if="admin" @click="showFileSelector">
          <p class="title">이미지 교체하기</p>
          <p class="subtitle">권장 크기: 400px x 400px / 3MB 이하 / jpg, png, gif</p>
        </button>
      </div>
    </div>

    <div class="content">
      <div class="section">
        <div class="section-header">
          <h1>부스 소개</h1>
          <div class="section-header-button-group">
            <button class="edit-button" v-if="admin" @click="openEditDescriptionModal">
              <img :src="Icon.pen" alt="" />
            </button>
          </div>
        </div>
        <hr />
        <p class="section-text" v-text="boothData.booth_content || 'Loading...'"></p>
      </div>

      <div class="section">
        <div class="section-header">
          <h1>부스 메뉴</h1>
          <button class="edit-button" v-if="admin" @click="openEditMenuModal">
            <img :src="Icon.pen" alt="" />
          </button>
        </div>
        <hr />
        <div class="booth-menu">
          <template v-for="(item, index) in menuData" :key="index">
            <div :class="['menu-group', { sold: item.sell }]">
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
        <BoothCommentSection
          :id="parseInt($route.params.id)"
          @update="loadCommentCount"
          @reload="reload"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { gsap } from 'gsap';
import { get, set } from 'idb-keyval';
import { Icon } from '../library/icon';
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
  DeleteBooth,
  GetAuthority
} from '../api/api-client';

import Image from '../components/Image.vue';
import BoothEditModal from '../components/booth/EditModal.vue';
import BoothMenuEditModal from '../components/booth/MenuEditModal.vue';
import BoothDescriptionEditModal from '../components/booth/DescriptionEditModal.vue';
import BoothCommentSection from '../components/booth/CommentSection.vue';
import DeleteModal from '../components/DeleteModal.vue';

import axios from 'axios';

window.axios = axios;

export default {
  components: {
    BoothEditModal,
    BoothMenuEditModal,
    BoothDescriptionEditModal,
    BoothCommentSection,
    Image,
    DeleteModal
  },
  data() {
    return {
      EditImage,
      CloseImage,

      Icon,
      id: -1,

      admin: GetAuthority(),

      boothData: {},
      menuData: [],
      likeValueData: 0,
      isLikedData: false,

      like_display: 0,

      isLikeDelayed: false,

      editModal: false,
      editData: {
        title: '',
        type: '부스'
      },

      editDescriptionModal: false,
      editDescriptionData: '',

      editMenuModal: false,
      editMenuData: [],

      deleteModal: false,

      commentCount: 0,
      commentDisplayCount: 0
    };
  },
  methods: {
    reload() {
      this.$emit('reload');
    },
    openEditModal() {
      this.editModal = true;
    },
    closeEditModal() {
      this.editModal = false;
    },
    openDeleteModal() {
      this.deleteModal = true;
    },
    closeDeleteModal() {
      this.deleteModal = false;
    },
    async editBooth(data) {
      const res = await ModifyBooth(
        this.id,
        data.title,
        this.boothData.booth_content,
        '테스1트',
        data.type,
        true // unused
      );

      // data.day

      if (!res.result.includes('success')) {
        alert('부스를 수정하는데 실패했습니다.\n' + res.result);
        return;
      }

      // 페이지 새로고침
      this.$router.go();
    },
    openEditDescriptionModal() {
      this.editDescriptionModal = true;
    },
    closeEditDescriptionModal() {
      this.editDescriptionModal = false;
    },
    async editDescription(description) {
      const res = await ModifyBooth(
        this.id,
        this.boothData.booth_title,
        description,
        this.boothData.writer,
        this.boothData.booth_type,
        true // unused
      );

      if (!res.result.includes('success')) {
        alert('부스를 수정하는데 실패했습니다.\n' + res.result);
        return;
      }

      // 페이지 새로고침
      this.$router.go();
    },
    openEditMenuModal() {
      this.editMenuModal = true;
    },
    closeEditMenuModal() {
      this.editMenuModal = false;
    },
    async editMenu() {
      this.closeEditMenuModal();

      // 페이지 새로고침
      this.$router.go();
    },
    loadCommentCount(count) {
      this.commentCount = count;
    },
    showFileSelector() {
      this.$refs.upload.click();
    },
    async uploadImage(event) {
      const file = this.$refs.upload.files[0];
      const ACCEPT_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp'];

      if (!ACCEPT_TYPES.includes(file.type)) {
        alert('지원하지 않는 파일');
        return;
      }

      if (file.size > 5242880) {
        // 5242880 = 5MB
        alert('크기가 너무 큽니다.');
        return;
      }

      let image;

      const reader = new FileReader();
      reader.onload = function () {
        image = reader.result;
      };
      reader.readAsDataURL(file);

      const form = new FormData();
      form.append('image', image);

      // await UploadImage(form);
      // this.$emit("reload");
    },
    async likeHandler(evt) {
      // 딜레이 중이면 종료
      if (this.isLikeDelayed) {
        return;
      }

      // 딜레이 ON
      this.isLikeDelayed = true;

      let data;

      // 서버에 좋아요 보내고 결과 받기
      try {
        data = await PostBoothLike(this.id);
      } catch (e) {
        alert('좋아요을 전송하는데 오류가 발생했습니다.\n' + e);
        this.isLikeDelayed = false;
        return;
      }

      this.isLikedData = !this.isLikedData;

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
        if (idb.includes(this.id)) {
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
      await new Promise((r) => setTimeout(r, 300));
      this.isLikeDelayed = false;
    },
    async deleteBooth() {
      this.closeDeleteModal();
      const res = await DeleteBooth(this.boothData.bno);
      this.$router.push('/boothmap');
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
      data.forEach((item) => {
        item.sell = item.menuSell === 'SOLD';
      });
      this.menuData = data;

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

.delete-container {
  top: 0px;
  right: 50%;
  margin-right: -400px;
  height: 56px;
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 824px) {
  .delete-container {
    margin-right: 0;
    right: 12px;
  }
}

.delete-button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-button > img {
  width: 24px;
  height: 24px;
}

.header,
.content,
.section {
  max-width: 400px;
  margin: auto;
  color: white;
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
  font-size: 18pt;
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

:deep(.header-image) {
  width: 100%;
  max-height: 300px;
  margin: auto;
  object-fit: contain;
}

.image-upload {
  margin-top: 12px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #5c859b;
  color: white;
}

.section-header-button-group {
  display: flex;
  align-items: center;
}

.edit-button {
  vertical-align: middle;
}

.edit-button > img {
  width: 28px;
  height: 28px;
  vertical-align: middle;
}

hr {
  border: 0px;
  border-top: 2px solid #7f7f7f;
}

.section {
  margin: 16px 0;
}
.section-header {
  display: flex;
  justify-content: space-between;
}

.section-header > h1 {
  padding: 5px 20px;
  font-size: 14pt;
  border-radius: 36px;
  background-color: #5c859b;
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

.menu-group.sold {
  color: #ca434c;
  font-style: italic;
  text-decoration: line-through;
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
