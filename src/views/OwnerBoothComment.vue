<template>
  <main>
    <CommentContextMenu
      :show="showContextMenu"
      :x="contextMenuX"
      :y="contextMenuY"
      @clickDelete="deleteComment"
      @clickReport="reportComment"
      @clickOutside="closeMenu"
    />

    <div class="intro">
      <h1>신고받은 댓글</h1>
    </div>

    <div class="comment-list">
      <template v-for="(item, index) in list">
        <Comment
          :id="item.bno + '_' + item.cno"
          :name="GetRandomNickName(item.ip)"
          :comment="item.content"
          :booth="item.booth_title"
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
import Comment from '../components/Comment.vue';
import CommentContextMenu from '../components/CommentContextMenu.vue';
import Pagination from '../components/Pagination.vue';
import { GetCommentListWithReport, DeleteBoothCommentWithAdmin } from '../api/api-client';
import { GetRandomNickName } from '../library/name-generator';

export default {
  components: {
    Comment,
    CommentContextMenu,
    Pagination
  },
  data() {
    return {
      list: [],

      showContextMenu: false,
      contextMenuTargetID: -1,
      contextMenuX: 0,
      contextMenuY: 0,

      totalItems: 1,
      itemsPerPage: 1
    };
  },
  methods: {
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

    async deleteComment() {
      this.$router.push('/booth/' + this.contextMenuTargetID.split('_')[0]);
    },

    async changePage(page) {
      const data = await GetCommentListWithReport(page);

      this.list = data.dtoList;
      this.totalItems = data.total;
      this.itemsPerPage = data.size || 1;
    },
    GetRandomNickName
  },

  async created() {
    const data = await GetCommentListWithReport();

    this.list = data.dtoList;
    this.totalItems = data.total;
    this.itemsPerPage = data.size || 1;
  }
};
</script>
<style scoped>
.search-bar {
  margin: 0 10px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.intro {
  font-family: 'Nanum Gothic', sans-serif;
  font-style: normal;
  font-size: 15px;
  line-height: 13px;
  text-align: center;
  letter-spacing: 0.15em;
  margin: 0;
  padding: 36px 0;
  color: #ffffff;
}

.button-group {
  display: flex;
  justify-content: center;
}

.button-group > button {
  margin: 8px 10px;
  padding: 6px 16px;
  border: none;
  border-radius: 24px;
  font-size: 13pt;
  color: #f8f9fd;
  font-family: 'Nanum Gothic', sans-serif;
  transition: background-color 0.25s, color 0.25s;
}

.button-group > button.selected {
  background-color: #ca434c;
}

.comment {
  display: flex;
  flex-direction: column;
}

.comment-container > * {
  margin-top: 12px;
}
.comment-list > * {
  max-width: 400px;
  margin: 10px auto;
}
</style>
