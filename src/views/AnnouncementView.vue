<template>
  <main>
    <NoticeModal
      :visible="showNoticeModal"
      :title="noticeModalData.title"
      :content="noticeModalData.content"
      @complete="completeNoticeModal"
      @close="closeNoticeModal"
    />
    <Header :image="HeaderImage" text="공지사항" content="이번 축제의 안내사항입니다." />

    <div class="search-bar">
      <ASearchBar v-model="search" @change="searchNotice" />
    </div>
    <div class="content">
      <div class="button-group" v-if="role == 2">
        <button @click="clickCreate"><b>글쓰기</b></button>
      </div>
      <div class="announcement-list">
        <template v-for="item in list" :key="item.nno">
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
      </div>

      <Pagination @change="changePage" :totalItems="totalItems" :itemsPerPage="itemsPerPage" />
    </div>
  </main>
</template>

<script>
import HeaderImage from '@/assets/overlay/Onotice.png';
import Header from '../components/Header.vue';
import ASearchBar from '../components/ASearchBar.vue';
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
    ASearchBar,
    FoldingArticle,
    Pagination,
    NoticeModal,
    Header
  },
  data() {
    return {
      HeaderImage,
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

    async searchNotice() {
      const data = await SearchNotice(this.search);

      this.list = data.dtoList || [];
      this.totalItems = data.total;
      this.itemsPerPage = data.size || 1;
    },

    openNoticeModal() {
      this.showNoticeModal = true;
    },

    closeNoticeModal() {
      this.showNoticeModal = false;
    },

    async changePage(page) {
      let data;

      if (this.search !== '') {
        data = await SearchNotice(this.search, page);
      } else {
        data = await GetNoticeList(page);
      }

      this.list = data.dtoList || [];
      this.totalItems = data.total;
      this.itemsPerPage = data.size || 1;
    }
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
.title-image {
  width: 50%;
  margin: 10px auto;
}

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

.content {
  margin: 0 -28px;
  padding: 36px 24px;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: #fbfbfbe6;
}

.announcement-list {
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
}

.announcement-list > * {
  max-width: 540px;
  border-top: 1px solid #00000052;
  cursor: pointer;
}

.announcement-list > *:last-child {
  border-bottom: 1px solid #00000052;
}

:deep(.paginate-buttons) {
  color: #444444;
}

:deep(.paginate-buttons.active-page) {
  color: white;
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

  color: #5c859b;
  font-size: 10pt;
  cursor: pointer;
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
