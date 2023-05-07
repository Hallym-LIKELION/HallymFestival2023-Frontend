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

    <FloatButton @click="openCommentModal" />

    <Header :image="HeaderImage" text="방명록" content="하고 싶은 말을 자유롭게 남겨주세요!" />

    <div class="comment-list">
      <template v-for="item in list" :key="item.vno">
        <Comment
          :id="item.vno"
          :ip="item.ip"
          :comment="item.content"
          :color="item.color ?? 'YELLOW'"
          :time="item.regDate"
          :warn="item.report_cnt"
          @clickMenu="toggleMenu"
        />
      </template>
      <Pagination @change="changePage" :totalItems="totalItems" :itemsPerPage="itemsPerPage" />
    </div>
  </main>
</template>

<script>
import HeaderImage from '@/assets/overlay/Oletter.png';
import Header from '../components/Header.vue';

import CommentModal from '../components/CommentModal.vue';
import PasswordModal from '../components/PasswordModal.vue';
import SearchBar from '../components/SearchBar.vue';
import CommentContextMenu from '../components/CommentContextMenu.vue';
import Comment from '../components/Comment.vue';
import FloatButton from '../components/FloatButton.vue';
import Pagination from '../components/Pagination.vue';
import { useToast } from 'vue-toastification';
import { GetRandomNickName } from '../library/name-generator';
import { GetVisitComment, DeleteVisitComment, ReportVisitComment } from '../api/api-client';

export default {
  name: 'CommentView',
  components: {
    SearchBar,
    Comment,
    CommentContextMenu,
    PasswordModal,
    CommentModal,
    FloatButton,
    Pagination,
    Header
  },
  data() {
    return {
      HeaderImage,
      list: [],

      showContextMenu: false,
      contextMenuTargetID: -1,
      contextMenuX: 0,
      contextMenuY: 0,

      commentModal: false,
      commentStatus: false,

      passwordModal: false,
      passwordStatus: true,

      totalItems: 1,
      itemsPerPage: 1
    };
  },
  methods: {
    openCommentModal() {
      this.commentModal = true;
    },
    closeCommentModal() {
      this.commentModal = false;
    },
    sendComment(data) {
      this.closeCommentModal();
      setTimeout(() => this.$emit('reload'), 100);
    },
    closePasswordModal() {
      this.passwordStatus = true;
      this.passwordModal = false;
    },
    async deleteComment(password) {
      let data;
      try {
        data = await DeleteVisitComment(this.contextMenuTargetID, password);
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

      this.closePasswordModal();
      setTimeout(() => this.$emit('reload'), 100);
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
    async reportComment() {
      const res = await ReportVisitComment(this.contextMenuTargetID);
      this.showContextMenu = false;

      const toast = useToast();

      if (res.result === 'already reported') {
        toast('이미 신고가 완료되었습니다.');
      } else if (res.result === 'does not exist comment') {
        toast('해당 항목이 더 이상 존재하지 않습니다.');
      }

      toast('신고가 완료되었습니다.');

      this.$emit('reload');
    },

    async changePage(page) {
      console.log(`페이지를 ${page} 페이지로 이동`);
      const data = await GetVisitComment(page);
      this.list = data.dtoList;
      this.totalItems = data.total;
      this.itemsPerPage = data.size;
    },

    GetRandomNickName
  },
  async created() {
    /* 방명록 전체 게시물 조회 */
    const data = await GetVisitComment();

    this.list = data.dtoList;
    this.totalItems = data.total;
    this.itemsPerPage = data.size;
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
  color: #ffffff;
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
  font-family: 'Nanum Gothic', sans-serif;
}

.comment-list > * {
  width: 100%;
  margin: 10px 0;
}

.comment-list > *:last-child {
  width: auto;
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
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
