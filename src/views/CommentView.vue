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

    <CommentContextMenu
      :show="showContextMenu"
      :x="contextMenuX"
      :y="contextMenuY"
      @clickDelete="openPasswordModal"
      @clickReport="reportComment"
      @clickOutside="closeMenu"
    />


    <h1>방명록</h1>
    <div class="comment-list">
      <template v-for="item in list" :key="item.vno">
        <Comment
          :id="item.vno"
          :name="GetRandomNickName(item.ip)"
          :comment="item.content"
          @clickMenu="toggleMenu"
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
import CommentContextMenu from '../components/CommentContextMenu.vue';
import Comment from '../components/Comment.vue';
import { GetRandomNickName } from '../library/name-generator';
import { GetVisitComment, PostBadVisitComment } from '../api/api-client';


export default {
  name: 'CommentView',
  components: {
    SearchBar,
    Comment,
    CommentContextMenu,
    PasswordModal,
    CommentModal
  },
  data() {
    return {
      list: [],

      showContextMenu: false,
      contextMenuTargetID: -1,
      contextMenuX: 0,
      contextMenuY: 0,

      commentModal: false,
      commentStatus: false,

      passwordModal: false,
      passwordStatus: false
    };
  },
  methods: {
    closeCommentModal() {
      this.commentModal = false;
    },
    sendComment(data) {
      this.list.unshift(data);

      this.closeCommentModal();
    },
    closePasswordModal() {
      this.passwordStatus = true;
      this.passwordModal = false;
    },
    async deleteComment(password) {
      let data;
      try {
        data = await DeleteVisitComment(this.contextMenuTargetID, password);
        // data = { result: 'success' };
      } catch (e) {
        // 알 수 없는 오류

        this.passwordStatus = false;
        return;
      }

      if (data.result.includes('wrong password')) {
        // 비밀번호 오류
        this.passwordStatus = false;
        return;
      } else if (data.result.includes('null comment')) {
        // 댓글이 없음 (이미 삭제되었거나 ㅁㄴㅇㄹ)
        this.passwordStatus = false;
        return;
      }

      this.passwordModal = false;
      this.list = this.list.filter((item) => item.cno !== this.contextMenuTargetID);
    },
    //방명록 신고
    async postbadComment(comment_id){
      let data;
      try{ 
        data= await PostBadVisitComment(comment_id);
    } catch(err){
      return;
    }
    if (data.result.includes('already report')) {
        alert("이미 신고했습니다.");
      } else if (data.result.includes('null comment')) {
        alert("존재하지 않는 댓글입니다.");
      }
      },

    
    
    toggleMenu(evt, id) {
      if (this.showContextMenu) {
        this.contextMenuTargetID = -1;
        this.showContextMenu = false;
      } else {
        this.contextMenuX = evt.target.offsetLeft;
        this.contextMenuY = evt.target.offsetTop;
        this.contextMenuTargetID = id;
        this.showContextMenu = true;
      }
    },
    closeMenu() {
      this.contextMenuTargetID = -1;
      this.showContextMenu = false;
    },
    openPasswordModal() {
      this.showContextMenu = false;
      this.passwordModal = true;
    },
    reportComment(comment_id) {
      this.showContextMenu = false;
      /* 방명록 신고 */
      // PostBadVisitComment(comment_id)
      //   .then((data) => {
      //     this.postData = {
      //       result: data.result
      //     };
      //     if (data.result.includes('success')) {
      //       console.log('report success');
      //     } else {
      //       console.log('already reported');
      //     }
      //   })
      //   .catch((err) => {
      //     console.error('does not exist visit comment', err);
      //   });
    },
    GetRandomNickName
  },
  async created() {
    /* 방명록 전체 게시물 조회 */
    const data = await GetVisitComment();

    this.list = data.dtoList.filter((item) => !item.is_deleted);
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
  color: #FFFFFF;
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
