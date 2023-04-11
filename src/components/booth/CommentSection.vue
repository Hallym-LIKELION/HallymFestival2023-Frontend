<template>
  <div class="comment">
    <PasswordModal
      :visible="passwordModal"
      :status="passwordStatus"
      @close="closePasswordModal"
      @complete="deleteComment"
    />

    <CommentContextMenu
      :show="showContextMenu"
      :x="contextMenuX"
      :y="contextMenuY"
      @clickDelete="openPasswordModal"
      @clickReport="reportComment"
      @clickOutside="closeMenu"
    />

    <div class="write-container">
      <CommentWrite :id="id" @send="addComment" />
    </div>
    <div class="comment-container">
      <template v-for="item in list" :key="item.cno">
        <Comment
          :id="item.cno"
          :name="GetRandomNickName(item.ip)"
          :comment="item.content"
          picture="https://placehold.co/60x60"
          @clickMenu="toggleMenu"
          color="#f1f1f1"
        />
      </template>
      <Pagination @change="changePage" :totalItems="totalItems" :itemsPerPage="itemsPerPage" />
    </div>
  </div>
</template>

<script>
import PasswordModal from '../PasswordModal.vue';
import CommentWrite from './CommentWrite.vue';
import Comment from '../Comment.vue';
import CommentContextMenu from '../CommentContextMenu.vue';
import Pagination from '../Pagination.vue';
import SendImage from '../../assets/send.png';
import { GetRandomNickName } from '../../library/name-generator';
import { GetBoothComment, DeleteBoothComment } from '../../api/api-client';

export default {
  components: {
    PasswordModal,
    CommentWrite,
    Comment,
    CommentContextMenu,
    Pagination
  },
  data() {
    return {
      SendImage,
      list: [],

      myIP: '',

      showContextMenu: false,
      contextMenuTargetID: -1,
      contextMenuX: 0,
      contextMenuY: 0,

      commentCount: 0,

      commentContent: '',
      commentPassword: '',

      passwordModal: false,
      passwordStatus: true,

      totalItems: 1,
      itemsPerPage: 1
    };
  },
  props: {
    id: {
      type: Number,
      default: -1
    }
  },
  methods: {
    addComment(data) {
      this.list.unshift(data);
    },
    closePasswordModal() {
      this.passwordStatus = true;
      this.passwordModal = false;
    },
    async deleteComment(password) {
      let data;
      try {
        data = await DeleteBoothComment(this.contextMenuTargetID, password);
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
    closeMenu() {
      this.contextMenuTargetID = -1;
      this.showContextMenu = false;
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

    async changePage(page) {
      console.log(`페이지를 ${page} 페이지로 이동`);
      const data = await GetBoothComment(this.id, page);
      this.list = data.dtoList;
      this.totalItems = data.total;
      this.itemsPerPage = data.size;
      this.$emit('update', data.total);
    },

    GetRandomNickName
  },
  async created() {
    // TODO: API로 가져오기
    const data = await GetBoothComment(this.id);
    this.list = data.dtoList;
    this.totalItems = data.total;
    this.itemsPerPage = data.size;
    this.$emit('update', data.total);
  }
};
</script>
<style scoped>
.comment {
  display: flex;
  flex-direction: column;
}

.comment-container > * {
  margin-top: 12px;
}

.comment-list > *:last-child {
  width: auto;
}
</style>
