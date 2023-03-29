<template>
  <main>
    <h1>방명록</h1>
    <div class="comment-list">
      <Modal :show="modal" @close="closeModal">
        <template #header> 방명록 작성하기 </template>
        <template #body>
          <textarea class="modal-input" v-model="message"></textarea>
        </template>
        <template #footer>
          <button class="modal-button" @click="doSend">입력하기</button>
        </template>
      </Modal>

      <template v-for="(item, index) in list">
        <Comment
          :id="item.id"
          :name="GetRandomNickName(item.ip)"
          :comment="item.comment"
          :showMenu="item.showMenu"
          @clickMenu="handleMenu"
          @focusout="handleFocusOut"
        />
      </template>
    </div>
    <div class="button-group">
      <button @click="modal = !modal">글쓰기</button>
    </div>
  </main>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import Comment from '../components/Comment.vue';
import { GetRandomNickName } from '../library/name-generator';
import Modal from '../components/MyModal.vue';

export default {
  name: 'CommentView',
  components: {
    Modal,
    SearchBar,
    Comment
  },
  data() {
    return {
      list: [
        {
          id: 1,
          ip: '1.2.3.4',
          comment:
            '여기는 학생 여러분들께서 마음껏 작성할 수 있는 방명록입니다~ 자유롭게 사용해주세요!',
          showMenu: false
        },
        {
          id: 5,
          ip: '1.2.3.255',
          comment: '한림대학교 화이팅~~',
          showMenu: false
        },
        {
          id: 2,
          ip: '1.2.255.4',
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          showMenu: false
        },
        {
          id: 3,
          ip: '1.200.3.4',
          comment: '아무댓글 아무댓글 아무댓글 아무댓글 아무댓글 아무댓글 아무댓글 아무댓글',
          showMenu: false
        },
        {
          id: 4,
          ip: '100.2.3.4',
          comment:
            '수 보내는 사람은 그러므로 싶이 작고 가장 사라지지 돋고, 것이다. 얼마나 예가 꽃이 미묘한 수 따뜻한 칼이다. 찬미를.',
          showMenu: false
        }
      ],
      modal: false,
      message: '',
      context: -1
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
    writeArticle() {
      // 글쓰기 기능 구현
      alert('TODO');
    },
    handleMenu(id) {
      if (id === this.context) {
        this.context = -1;
      } else {
        this.context = id;
      }
      for (const item of this.list) {
        item.showMenu = item.id === this.context;
      }
    },
    handleFocusOut() {
      this.handleMenu(this.context);
    },
    GetRandomNickName
  },
  created() {}
};
</script>

<style scoped>
.header {
  margin-top: 24px;
}

h1 {
  font-size: 20pt;
  text-align: center;
  padding: 36px 0;
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

.search-bar {
  margin: 0 10px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.comment-list {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}

.comment-list > * {
  width: 100%;
  margin: 10px 0;
}

.button-group {
  max-width: 416px;
  margin: auto;
  display: flex;
  justify-content: flex-end;
}

.button-group > button {
  margin: 8px 0;
  padding: 8px 24px;
  border: none;
  border-radius: 24px;
  background-color: #509bf8;
  color: white;
  font-size: 12pt;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
