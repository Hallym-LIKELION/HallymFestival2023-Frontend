<template>
  <main>
    <PasswordModal
      :visible="passwordModal"
      :status="passwordStatus"
      @close="closePasswordModal"
      @complete="deleteComment"
    />

    <CommentModal
      :visible="commentModal"
      :status="commentStatus"
      @close="closeCommentModal"
      @complete="sendComment"
    />

    <h1>방명록</h1>
    <div class="comment-list">
      <template v-for="item in list" :key="item.vno">
        <Comment
          :id="item.vno"
          :name="GetRandomNickName(item.ip)"
          :comment="item.content"
          :showMenu="item.showMenu"
          @clickMenu="handleMenu"
          @clickDelete="handleDelete"
          @focusout="handleFocusOut"
          @clickReport="reportComment"
        />
      </template>
    </div>
    <div class="button-group">
      <button @click="commentModal = !commentModal">글쓰기</button>
    </div>
  </main>
</template>

<script>
import CommentModal from '../components/CommentModal.vue';
import PasswordModal from '../components/PasswordModal.vue';
import SearchBar from '../components/SearchBar.vue';
import Comment from '../components/Comment.vue';
import { GetRandomNickName } from '../library/name-generator';
import { GetVisitComment, PostBadVisitComment, GetMyIP } from '../api/api-client';

export default {
  name: 'CommentView',
  components: {
    SearchBar,
    Comment,
    PasswordModal,
    CommentModal
  },
  data() {
    return {
      list: [],

      myIP: '',

      commentModal: false,
      commentStatus: false,

      passwordModal: false,
      passwordStatus: false,

      context: -1
    };
  },
  methods: {
    closeCommentModal() {
      this.commentModal = false;
    },
    sendComment(content, password) {
      // TEMP: 랜덤 아이피
      let ip = [];
      for (let i = 0; i < 4; i++) {
        ip.push(Math.floor(Math.random() * 256));
      }
      // ----------------

      const data = {
        id: (this.list[0]?.id || 0) + 1,
        ip: ip.join('.'),
        comment: content,
        password,
        showMenu: false
      };

      this.list.unshift(data);

      this.closeCommentModal();
    },
    closePasswordModal() {
      this.passwordStatus = true;
      this.passwordModal = false;
    },
    deleteComment(password) {
      //const failed = password !== '1111';
      //this.passwordStatus = !failed;
      PostBadVisitComment(comment_id, password)
        .then((data) => {
          if (data === 'delete success') {
          }
        })
        .catch((err) => {
          console.error('방명록 등록 실패', err);
        });

      // TODO: id로 delete 요청 보낼 것
      // 결과를 failed에 담을 것
      if (failed) {
        return;
      }

      this.passwordModal = false;
      this.list = this.list.filter((item) => item.id !== this.context);
    },

    writeArticle() {
      /* 방명록 등록하기 POST */
      PostVisitComment(content, password)
        .then((data) => {
          if (data === 'create success') {
            // content와  this.list에 넣어주기(원래 가지고 있는것을 넣어주기)
          }
        })
        .catch((err) => {
          console.error('방명록 등록 실패', err);
        });
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
    handleDelete() {
      console.log('test');
      this.passwordModal = true;
    },
    handleFocusOut() {
      // this.handleMenu(this.context);
    },
    reportComment(comment_id) {
      /* 방명록 신고 */
      PostBadVisitComment(comment_id)
        .then((data) => {
          this.postData = {
            result: data.result
          };
          if (data.result.includes('success')) {
            console.log('report success');
          } else {
            console.log('already reported');
          }
        })
        .catch((err) => {
          console.error('does not exist visit comment', err);
        });
    },
    GetRandomNickName
  },
  async created() {
    /* 방명록 전체 게시물 조회 */
    const data = await GetVisitComment();

    this.myIP = await GetMyIP();

    this.list = data.dtoList
      .filter((item) => !item.is_deleted)
      .map((item) => ({
        ...item, // spread 문법 - item에 showMenu만 덧붙이기
        showMenu: false
      }));
  }
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
