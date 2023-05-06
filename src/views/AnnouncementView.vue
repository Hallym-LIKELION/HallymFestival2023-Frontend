<template>
  <main>
    <NoticeModal
      :visible="showNoticeModal"
      :title="noticeModalData.title"
      :content="noticeModalData.content"
      @complete="completeNoticeModal"
      @close="closeNoticeModal"
    />
    <div class="title-wrap">
      <div class="title-image">
        <img src="@/assets/overlay/Onotice.png" alt="" />
      </div>
      <div class="title-text">공지사항</div>
    </div>
    <div class="search-bar" ref="searchBar"><SearchBar v-model="search" /></div>
    <div class="announcement-list" ref="announcementList">
      <br /><br />
      <div class="button-group" ref="buttonGroup" v-if="role == 2">
        <button @click="clickCreate">글쓰기</button>
      </div>
      <template v-for="item in displayList" :key="item.nno">
        <FoldingArticle
          :id="item.nno"
          :title="item.title"
          :content="item.content"
          :showContent="item.nno === showingContent"
          @click="() => showAnnouncement(item.nno)"
          @clickEdit="clickEdit"
          @clickDelete="clickDelete"
        />
      </template>
      <Pagination @change="changePage" :totalItems="totalItems" :itemsPerPage="itemsPerPage" />
    </div>
  </main>
</template>

<script>
import { gsap } from 'gsap';
import SearchBar from '../components/SearchBar.vue';
import NoticeModal from '../components/NoticeModal.vue';
import Pagination from '../components/Pagination.vue';
import FoldingArticle from '../components/FoldingArticle.vue';

import {
  GetAuthority,
  GetNoticeList,
  CreateNotice,
  ModifyNotice,
  DeleteNotice,
  RemoveNotice,
  SearchNotice
} from '../api/api-client';

export default {
  name: 'AnnouncementView',
  components: {
    SearchBar,
    FoldingArticle,
    Pagination,
    NoticeModal
  },
  data() {
    return {
      list: [],
      search: '',
      showingContent: null,

      role: GetAuthority(),

      showNoticeModal: false,
      noticeModalID: -1,
      noticeModalData: {
        title: '',
        content: ''
      },

      total: 0,

      totalItems: 1,
      itemsPerPage: 1
    };
  },
  computed: {
    displayList() {
      const search = this.search;
      return this.list.filter(
        (item) => search === '' || item.title.includes(search) || item.content.includes(search)
      );
    }
  },
  methods: {
    showAnnouncement(id) {
      if (id === this.showingContent) {
        this.showingContent = null;
      } else {
        this.showingContent = id;
      }
    },

    completeNoticeModal(title, content) {
      if (this.noticeModalID === -1) {
        this.sendNotice(title, content);
      } else {
        this.modifyNotice(title, content);
      }
    },

    async sendNotice(title, content) {
      try {
        const res = await CreateNotice(title, content);
      } catch (e) {
        alert('공지사항을 게시하는데 오류가 발생했습니다.');
        return;
      }

      this.closeNoticeModal();
      this.$emit('reload');
    },

    async modifyNotice(title, content) {
      try {
        const res = await ModifyNotice(this.noticeModalID, title, content);
      } catch (e) {
        alert('공지사항을 수정하는데 오류가 발생했습니다.');
      }

      this.closeNoticeModal();
      this.$emit('reload');
    },

    clickEdit(id, title, content) {
      this.noticeModalData = {
        title,
        content
      };
      this.noticeModalID = id;
      this.openNoticeModal();
    },

    async clickDelete(id, title) {
      const answer = prompt(
        `"${title}" 게시글을 삭제하려고 합니다. 계속하려면 "삭제"를 입력하세요.`
      );
      if (answer != '삭제') {
        return;
      }

      const res = await RemoveNotice(id);
      if (res.result.includes('success')) {
        this.$emit('reload');
      } else {
        alert('게시글을 삭제하는데 오류가 발생했습니다.\n' + res.result);
      }
    },

    clickCreate() {
      this.noticeModalData = {
        title: '',
        content: ''
      };
      this.openNoticeModal();
      this.noticeModalID = -1;
    },

    openNoticeModal() {
      this.showNoticeModal = true;
    },

    closeNoticeModal() {
      this.showNoticeModal = false;
    },

    async changePage(page) {
      console.log(`페이지를 ${page} 페이지로 이동`);
      const data = await GetNoticeList(page);
      this.list = data.dtoList || [];
      this.totalItems = data.total;
      this.itemsPerPage = data.size || 1;
    }
  },
  mounted() {
    // this.pagingMethod(this.page);
    // 타이틀 애니메이션
    gsap.fromTo(
      this.$refs.title,
      {
        opacity: 0,
        transform: 'translateY(-10%)'
      },
      {
        delay: 0,
        duration: 0.5,
        opacity: 1,
        transform: 'none'
      }
    );

    // 검색창 애니메이션
    gsap.fromTo(
      this.$refs.searchBar,
      {
        transform: 'translateX(-3%)',
        opacity: 0,
        pointerEvents: 'none'
      },
      {
        delay: 0.5,
        duration: 0.5,
        transform: 'none',
        opacity: 1,
        pointerEvents: 'auto'
      }
    );

    // 글 목록 애니메이션
    gsap.fromTo(
      this.$refs.announcementList,
      {
        transform: 'translateX(-10%)',
        opacity: 0,
        pointerEvents: 'none'
      },
      {
        delay: 0.75,
        duration: 0.5,
        transform: 'none',
        opacity: 1,
        pointerEvents: 'auto'
      }
    );

    // 글쓰기 버튼 애니메이션
    gsap.fromTo(
      this.$refs.buttonGroup,
      {
        transform: 'translateX(2%)',
        opacity: 0,
        pointerEvents: 'none'
      },
      {
        delay: 1,
        duration: 0.5,
        transform: 'none',
        opacity: 1,
        pointerEvents: 'auto'
      }
    );
  },
  async created() {
    // 공지사항 불러와서 data에 넣어주기.
    const data = await GetNoticeList();
    this.list = data.dtoList || [];
    this.totalItems = data.total;
    this.itemsPerPage = data.size || 1;
  }
};
</script>

<style scoped>
.title-wrap {
  width: 30%;
  margin: 10px auto;
  position: relative;
}
.title-wrap img {
  width: 100%;
  vertical-align: middle;
}
.title-text {
  position: absolute;
  top: 40%;
  left: 50%;
  width: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  font-style: normal;
  font-weight: 550;
  font-size: 20px;
  line-height: 13px;
  margin: 0;
  padding: 36px 0;
  color: #ffffff;
}
h1 {
  font-size: 20pt;
  text-align: center;
  padding: 36px 0;
  color: #ffffff;
}

.search-bar {
  margin: 0 10px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.announcement-list {
  font-family: 'Nanum Gothic', sans-serif;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
}

.announcement-list > * {
  max-width: 540px;
  border-top: 1px solid #00000052;
  cursor: pointer;
}

.announcement-list > *:last-child {
  border-bottom: 1px solid #00000052;
}

.button-group {
  max-width: 560px;
  margin: auto;
  display: flex;
  justify-content: flex-end;
}

.button-group > button {
  margin: 8px 0;
  padding: 8px 24px;
  border: none;
  border-radius: 24px;
  background-color: #ca434c;
  color: white;
  font-size: 10pt;
  cursor: pointer;
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
