<template>
  <main>
    <div class="example-modal-window">
      <MyModal @close="closeModal" v-if="modal" class="modal">
        <template v-slot:header> 부스 소개문 수정 </template>
        <template v-slot:content>
          <textarea class="modal-input" v-model="message"></textarea>
        </template>
        <template v-slot:footer>
          <button class="modal-button" @click="doSend">수정하기</button>
        </template>
      </MyModal>
    </div>
    <div class="header">
      <div class="header-title">
        <h1 class="header-name" v-text="data.name || 'Loading...'"></h1>
        <div class="header-like">
          <p class="header-like-count" v-text="data.like || 0"></p>
          <button class="header-like-button"><img :src="HeartImage" alt="" /></button>
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

    <div class="description">
      <h1>부스 소개</h1>
      <button class="edit-button" @click="modal = !modal"><img :src="EditImage" alt="" /></button>
    </div>

    <hr />
    <p class="description-text" v-text="data.description || 'Loading...'"></p>

    <div class="menu-list">
      <h1>메뉴 소개</h1>
    </div>

    <hr />
    <p v-text="'대충 소개'"></p>

    <div class="menu-list">
      <h1>댓글</h1>
    </div>

    <hr />
    <div class="nickname">
      <p>
        닉네임: <input class="user-name" type="nickname" @input="userId = $event.target.value" />
      </p>
    </div>
    <div class="password">
      <p>
        비밀번호:
        <input class="user-pw" type="pw" maxlength="4" @input="userId = $event.target.value" />
      </p>
    </div>

    <div class="login_button">
      <button class="edit-button"><img :src="EditImage" alt="" /></button>
    </div>

    <!-- 임시로 만든 버튼 -- 기획에서 디자인 줘야됨 -->
    <div class="return-button">
      <button @click="() => $router.push('/boothmap')">뒤로 돌아가기</button>
    </div>
  </main>
</template>

<script>
import HeartImage from '../assets/heart.png';
import EditImage from '../assets/edit_button.png';
import { GetDemoBooth } from '../api/api-client';
import MyModal from '../components/MyModal.vue';

export default {
  components: { MyModal },
  data() {
    return {
      HeartImage,
      EditImage,
      data: {},
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
p {
  margin: 0;
}

h1 {
  font-size: 20pt;
  text-align: left;
  margin: 0;
}

textarea {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: 'Noto Sans KR', sans-serif;
}

button {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: black;
  font-family: 'Noto Sans KR', sans-serif;
}

.header {
  margin: 24px 0;
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
  margin-top: 18px;
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

.description {
  font-size: 20pt;
  text-align: left;
  margin: 0;
  display: flex;
  justify-content: space-between;
}

.description-text {
  white-space: pre;
}
</style>
