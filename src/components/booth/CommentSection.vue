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
          :ip="item.ip"
          :comment="item.content"
          :time="item.regDate"
          :warn="item.report_cnt"
          @clickMenu="toggleMenu"
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
import { useToast } from 'vue-toastification';
import { GetRandomNickName } from '../../library/name-generator';
import {
  GetBoothComment,
  DeleteBoothComment,
  ReportBoothComment,
  DeleteBoothCommentWithAdmin,
  GetAuthority
} from '../../api/api-client';

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

      admin: GetAuthority(),

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
    },
    writer: {
      type: String,
      default: ''
    }
  },
  methods: {
    addComment(data) {
      this.$emit('reload');
    },
    closePasswordModal() {
      this.passwordStatus = true;
      this.passwordModal = false;
    },
    async deleteComment(password) {
      let data;
      try {
        data = await DeleteBoothComment(this.contextMenuTargetID, password);
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
      this.$emit('reload');
    },
    async deleteCommentAdmin() {
      let data;

      try {
        data = await DeleteBoothCommentWithAdmin(this.contextMenuTargetID, this.writer);
      } catch (e) {
        return;
      }

      if (data.result.includes('null comment')) {
        return;
      }

      this.$emit('reload');
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
      if (this.admin > 0) {
        this.deleteCommentAdmin();
      } else {
        this.passwordModal = true;
      }
    },
    async reportComment() {
      const res = await ReportBoothComment(this.contextMenuTargetID);
      this.showContextMenu = false;
      const toast = useToast();

      if (res.result === 'already reported') {
        toast('이미 신고가 완료되었습니다.');
        return;
      } else if (res.result === 'does not exist comment') {
        toast('해당 항목이 더 이상 존재하지 않습니다.');
        return;
      }

      toast('신고가 완료되었습니다.');

      this.$emit('reload');
    },

    async changePage(page) {
      console.log(`페이지를 ${page} 페이지로 이동`);
      const data = await GetBoothComment(this.id, page);
      this.list = data.dtoList;
      this.totalItems = data.total;
      this.itemsPerPage = data.size || 1;
      this.$emit('update', data.total);
    },

    GetRandomNickName
  },
  async created() {
    const data = await GetBoothComment(this.id);
    this.list = data.dtoList || [];
    this.totalItems = data.total;
    this.itemsPerPage = data.size || 1;
    this.$emit('update', data.total);
  }
};
</script>
<style scoped>
.comment {
  display: flex;
  flex-direction: column;
  color: black;
}

.comment-container > * {
  margin-top: 12px;
}

.comment-list > *:last-child {
  width: auto;
}

:deep(.paginate-buttons) {
  color: #444444;
}

:deep(.paginate-buttons.active-page) {
  color: white;
}
</style>
