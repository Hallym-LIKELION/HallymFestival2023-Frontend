<template>
  <main>
    <Modal :show="modal" @close="closeModal">
      <template #header> 부스 소개문 수정 </template>
      <template #body>
        <textarea class="modal-input" v-model="message"></textarea>
      </template>
      <template #footer>
        <button class="modal-button" @click="doSend">수정하기</button>
      </template>
    </Modal>
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
        <p class="header-tag">
          <img class="header-image" :src="data.image || 'https://placehold.co/700x400'" />{{
            data.tag?.map((item) => '#' + item).join(' ') || 'Loading...'
          }}
        </p>
      </div>
    </div>

    <div class="content">
      <div class="section">
        <div class="section-header">
          <h1>부스 소개</h1>
          <button class="edit-button" @click="modal = !modal">
            <img :src="EditImage" alt="" />
          </button>
        </div>
        <hr />
        <p class="section-text" v-text="data.description || 'Loading...'"></p>
      </div>

      <div class="section">
        <div class="section-header">
          <h1>부스 메뉴</h1>
        </div>
        <hr />
        <p class="section-text">TODO: 부스 메뉴 넣기</p>
      </div>

      <div class="section">
        <div class="section-header">
          <h1>댓글 <span>21</span></h1>
        </div>
        <hr />

        <div class="comment">
          <div class="write-container">
            <div class="write-header">
              <img class="write-header-profile" src="https://placehold.co/48x48" alt="" />
              <p class="write-header-nickname">멋있는 사자</p>
            </div>
            <div class="write-content">
              <textarea
                class="write-content-text"
                placeholder="부스에 대한 감상평을 자유롭게 나눠보세요"
              ></textarea>
              <div class="write-footer">
                <input
                  class="write-footer-password"
                  type="password"
                  placeholder="비밀번호를 입력..."
                  maxlength="30"
                  @input="userId = $event.target.value"
                />
                <button class="write-footer-button">
                  <img :src="SendImage" alt="" srcset="" />
                </button>
              </div>
            </div>
          </div>
          <div class="comment-content">
            <Comment :id="3" :name="'아무 댓글'" :comment="'임시입니다'" />
            <Comment :id="4" :name="'댓글 222'" :comment="'123 123 123 33 '" />
          </div>
        </div>
      </div>
    </div>

    <!-- 임시로 만든 버튼 -- 기획에서 디자인 줘야됨 -->
    <div class="return-button">
      <button @click="() => $router.push('/boothmap')">뒤로 돌아가기</button>
    </div>
  </main>
</template>

<script>
import { gsap } from 'gsap';
import HeartImage from '../assets/heart.png';
import HeartActiveImage from '../assets/heart-active.png';
import EditImage from '../assets/edit_button.png';
import SendImage from '../assets/send.png';
import { GetDemoBooth } from '../api/api-client';
import Modal from '../components/MyModal.vue';
import Comment from '../components/Comment.vue';

export default {
  components: { Modal, Comment },
  data() {
    return {
      EditImage,
      SendImage,
      likeImage: HeartImage,
      data: {},
      like_display: 0,
      modal: false,
      message: ''
    };
  },
  methods: {
    openModal() {
      this.modal = true;
    },
    closeModal() {
      if (this.message !== this.data.description) {
        const choose = confirm('저장되지 않은 내용이 있습니다. 정말 닫으시겠어요?');
        if (choose) {
          this.message = this.data.description;
          this.modal = false;
        }
      } else {
        this.modal = false;
      }
    },
    doSend() {
      if (this.message.length > 0) {
        this.data.description = this.message;
        this.closeModal();
      } else {
        alert('내용은 0자 이상이어야 합니다.');
      }
    },
    likeHandler(evt) {
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
    'data.like'(n) {
      // 좋아요 수 애니메이션
      gsap.to(this, { duration: 2, like_display: Number(n) || 0, ease: 'Expo.easeOut' });
    }
  },
  created() {
    // 데이터 가져오기
    GetDemoBooth(parseInt(this.$route.params.id))
      .then((data) => {
        console.log(data);
        this.data = data;
        this.message = data.description;
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
  font-size: 20pt;
  text-align: left;
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
  font-size: 32pt;
}

.header-like {
  display: flex;
  align-items: center;
  line-height: 24pt;
}

.header-like-count {
  margin-right: 8px;
  font-size: 18pt;
  line-height: 18pt;
}

.header-like-button > img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
}

.header-content {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-tag {
  font-weight: 600;
}

.header-image {
  max-height: 240px;
  margin: auto;
  object-fit: contain;
  display: block;
}

.return-button {
  display: flex;
  justify-content: center;
}
.return-button > button {
  width: 200px;
  margin: 18px 0;
  padding: 8px 0;
  font-size: 18pt;
  border-radius: 12px;
  color: white;
  background-color: #466efe;
  transition: background-color 0.1s;
}

.return-button > button:hover {
  background-color: #0f8bff;
}

.edit-button > img {
  width: 32px;
  height: 32px;
}

hr {
  border: 0px;
  border-top: 3px solid #000000;
}

.modal-input {
  width: calc(100% - 20px);
  height: calc(100% - 40px);
  margin: 10px 0;
  padding: 10px;
  background-color: #dfdfdf;
  font-size: 16pt;
  resize: none;
}

.modal-button {
  padding: 10px;
  border-radius: 24px;
  background-color: #466efe;
  color: white;
}

.section {
  margin: 24px 0;
}
.section-header {
  font-size: 20pt;
  text-align: left;
  margin: 0;
  display: flex;
  justify-content: space-between;
}

.section-header > h1 > span {
  font-size: 12pt;
  font-weight: 500;
}

.section-text {
  min-height: 100px;
  font-size: 14pt;
  white-space: pre;
}

.comment {
  display: flex;
  flex-direction: column;
}

.write-header {
  display: flex;
  align-items: center;
}
.write-header-profile {
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border-radius: 100%;
}
.write-content {
  width: calc(100% - 20px);
  margin-top: 8px;
  padding: 10px;
  border-radius: 8px;
  background-color: #dddddd;
}

.write-content-text {
  width: 100%;
  height: 60px;
  background: none;
  overflow: hidden;
  outline: none;
  font-size: 16pt;
  resize: none;
}
.write-footer {
  height: 30px;
  display: flex;
  justify-content: flex-end;
}

/* .write-footer-hint {
  margin-right: 8px;
  font-size: 14pt;
} */

.write-footer-password {
  font-size: 14pt;
  margin-right: 12px;
}

.write-footer-button {
  margin-right: 8px;
}
.write-footer-button > img {
  width: 24px;
  height: 24px;
}

.comment-content > * {
  margin-top: 12px;
}
</style>
