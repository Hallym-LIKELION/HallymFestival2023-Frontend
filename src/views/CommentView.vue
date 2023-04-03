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
      <template v-for="(item, index) in list" :key="item.id">
        <Comment
          :id="item.id"
          :name="GetRandomNickName(item.ip)"
          :comment="item.comment"
          :showMenu="item.showMenu"
          @clickMenu="handleMenu"
          @clickDelete="handleDelete"
          @focusout="handleFocusOut"
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
import {
  GetVisitComment,
  PostBadVisitComment
} from '../api/api-client';

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
      list: [
        {
          id: 5,
          ip: '1.2.3.4',
          comment:
            '여기는 학생 여러분들께서 마음껏 작성할 수 있는 방명록입니다~ 자유롭게 사용해주세요!',
          showMenu: false
        },
        {
          id: 4,
          ip: '1.2.3.255',
          comment: '한림대학교 화이팅~~',
          showMenu: false
        },
        {
          id: 3,
          ip: '1.2.255.4',
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          showMenu: false
        },
        {
          id: 2,
          ip: '1.200.3.4',
          comment: '아무댓글 아무댓글 아무댓글 아무댓글 아무댓글 아무댓글 아무댓글 아무댓글',
          showMenu: false
        },
        {
          id: 1,
          ip: '100.2.3.4',
          comment:
            '수 보내는 사람은 그러므로 싶이 작고 가장 사라지지 돋고, 것이다. 얼마나 예가 꽃이 미묘한 수 따뜻한 칼이다. 찬미를.',
          showMenu: false
        }
      ],

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
      const failed = password !== '1111';

      this.passwordStatus = !failed;

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
      PostVisitComment(content, password).
      then((data) => {
        this.postData = {
          content: data.content,
          password: data.password
        };
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
    GetRandomNickName
  },
  created() {
    /* 방명록 전체 게시물 조회 */
    GetVisitComment(page)
      .then((data) => {
        this.list = data.map((item) => ({
          page: item.page,
          size: item.size,
          total: item.total,
          start: item.start,
          end: item.end,
          prev: item.prev,
          next: item.next,
          //dtoList
          dtoList: item.dtoList
        }));
      })
      .catch((err) => {
        console.error('조회 실패', err);
      });

    /* 방명록 신고 */
    PostBadVisitComment(id)
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
