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
      <h1>신고받은 방명록</h1>
    </div>

    <!-- <div class="search-bar" ref="searchBar"><SearchBar v-model="search" /></div> -->

    <!-- <div class="button-group">
      <button @click="() => selectFilter(1)" :class="{ selected: sort === 1 }">최신순</button>
      <button @click="() => selectFilter(2)" :class="{ selected: sort === 2 }">신고순</button>
    </div> -->

    <div class="comment-list">
      <template v-for="(item, index) in list">
        <Comment
          :id="item.vno"
          :name="GetRandomNickName(item.ip)"
          :comment="item.content"
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
// import SearchBar from '../components/SearchBar.vue';
import Comment from '../components/Comment.vue';
import CommentContextMenu from '../components/CommentContextMenu.vue';
import Pagination from '../components/Pagination.vue';
import { GetVisitCommentListWithReport, DeleteVisitCommentWithAdmin } from '../api/api-client';
import { GetRandomNickName } from '../library/name-generator';

export default {
  components: {
    // SearchBar,
    Comment,
    CommentContextMenu,
    Pagination
  },
  data() {
    return {
      list: [],

      // sort: 1,

      showContextMenu: false,
      contextMenuTargetID: -1,
      contextMenuX: 0,
      contextMenuY: 0,

      totalItems: 1,
      itemsPerPage: 1
    };
  },
  methods: {
    // selectFilter(value) {
    //   this.sort = value;
    // },
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
      let data;

      try {
        data = await DeleteVisitCommentWithAdmin(this.contextMenuTargetID);
      } catch (e) {
        return;
      }

      if (data.result.includes('null comment')) {
        return;
      }

      setTimeout(() => this.$emit('reload'), 100);
    },

    async changePage(page) {
      console.log(`페이지를 ${page} 페이지로 이동`);
      const data = await GetVisitCommentListWithReport(page);

      this.list = data.dtoList;
      this.totalItems = data.total;
      this.itemsPerPage = data.size || 1;
    },
    GetRandomNickName
  },
  async created() {
    const data = await GetVisitCommentListWithReport();

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
