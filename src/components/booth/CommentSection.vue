<template>
  <div class="comment">
    <PasswordModal
      :visible="passwordModal"
      :status="passwordStatus"
      @close="closePasswordModal"
      @complete="deleteComment"
    />
    <div class="write-container">
      <CommentWrite :id="id" @send="addComment" />
    </div>
    <div class="comment-container">
      <template v-for="item in list" :key="item.id">
        <Comment
          :id="item.id"
          :name="GetRandomNickName(item.ip)"
          :comment="item.comment"
          :showMenu="item.showMenu"
          picture="https://placehold.co/60x60"
          @clickMenu="handleMenu"
          @clickDelete="handleDelete"
          @focusout="handleFocusOut"
          color="#f1f1f1"
        />
      </template>
    </div>
  </div>
</template>

<script>
import PasswordModal from '../PasswordModal.vue';
import CommentWrite from './CommentWrite.vue';
import Comment from '../Comment.vue';
import SendImage from '../../assets/send.png';
import { GetRandomNickName } from '../../library/name-generator';

export default {
  components: {
    PasswordModal,
    CommentWrite,
    Comment
  },
  data() {
    return {
      SendImage,
      list: [],

      context: -1,

      commentCount: 0,

      commentContent: '',
      commentPassword: '',

      passwordModal: false,
      passwordStatus: true
    };
  },
  props: {
    id: {
      type: Number,
      default: -1
    }
  },
  watch: {
    list: {
      deep: true,
      handler() {
        this.$emit('update', this.list.length);
      }
    }
  },
  methods: {
    addComment(data) {
      data.id = this.list[0].id + 1; // 임시로 여기서 처리, API 연결하면 API에서 받아올것
      data.showMenu = false;
      this.list.unshift(data);
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
      this.passwordModal = true;
    },
    GetRandomNickName
  },
  created() {
    // TODO: API로 가져오기
    this.list = [
      { id: 3, ip: '30.10.3.4', comment: '안녕하세요 ~~ ㅋㅋㅋ', showMenu: false },
      { id: 2, ip: '30.200.40.4', comment: '타코야키 맛있어요', showMenu: false },
      { id: 1, ip: '53.30.10.4', comment: '좋아요~~', showMenu: false }
    ];
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
</style>
