<template>
  <main>
    <NoticeModal
      :visible="showNoticeModal"
      :title="noticeModalData.title"
      :content="noticeModalData.content"
      @complete="completeNoticeModal"
      @close="closeNoticeModal"
    />
    <h1 ref="title">공지사항</h1>
    <div class="search-bar" ref="searchBar"><SearchBar v-model="search" /></div>
    <div class="announcement-list" ref="announcementList">
      <div v-for="user in users">{{ user.id }}</div>
      <template v-for="item in displayList" :key="item.id">
        <FoldingArticle
          :id="item.id"
          :title="item.title"
          :content="item.content"
          :showContent="item.id === showingContent"
          @click="() => showAnnouncement(item.id)"
          @clickEdit="clickEdit"
          @clickDelete="clickDelete"
        />
        <!-- <button @click="() => deleteAnnouncement(item.id)">삭제</button>
        <button @click="() => removeAnnouncement(item.id)">수정</button> -->
      </template>
    </div>
    <div class="button-group" ref="buttonGroup">
      <button @click="clickCreate">글쓰기</button>
    </div>
  </main>
</template>

<script>
import { gsap } from 'gsap';
import SearchBar from '../components/SearchBar.vue';
import NoticeModal from '../components/NoticeModal.vue';
import FoldingArticle from '../components/FoldingArticle.vue';
import {
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
    NoticeModal
  },
  data() {
    return {
      list: [],
      search: '',
      showingContent: null,

      showNoticeModal: false,
      noticeModalID: -1,
      noticeModalData: {
        title: '',
        content: ''
      }
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
      const res = await CreateNotice(title, content);

      if (!res.result.includes('success')) {
        alert('공지사항을 게시하는데 오류가 발생했습니다.\n', res.result);
      }

      const data = await GetNoticeList();
      this.list = data.filter((item) => !item.is_deleted);

      this.closeNoticeModal();
    },

    async modifyNotice(title, content) {
      const res = await ModifyNotice(this.noticeModalID, title, content);

      if (!res.result.includes('success')) {
        alert('공지사항을 수정하는데 오류가 발생했습니다.\n', res.result);
      }

      const data = await GetNoticeList();
      this.list = data.filter((item) => !item.is_deleted);

      this.closeNoticeModal();
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
        alert('게시글이 삭제되었습니다.');
        this.list = this.list.filter((item) => item.id != id);
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
    }
  },
  mounted() {
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
    this.list = data.filter((item) => !item.is_deleted);

    // 오류 발생하는 코드 임시 주석 처리, 구현할때 주석 풀고 사용해주세요~

    // //공지사항 게시판 POST
    // PostNotice(parseInt(this.$route.params));
    // this.$axios
    //   .get('http://localhost:8080/notice')
    //   .then((data) => {
    //     data = data.filter((item) => item.active); //true 인것만 필터됨

    //     this.list = data.map((item) => ({
    //       id: item.id,
    //       title: item.title,
    //       content: item.content
    //     }));
    //   })
    //   .catch((error) => {
    //     alert('오류가 발생했습니다. ' + error.toString());
    //   });

    // return;

    // /* 일단, 230330 서버가 없어서 fake함수로 테스트 하는 중입니다. 추후에 아래로 수정 예정 */
    // GetNoticeList()
    //   .then((data) => {})
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // //공지사항 게시판 POST
    // PostNotice('제목', '내용')
    //   .then(() => {
    //     //data가 성공적으로 도달하였을 때 알람 삽입
    //     if (res.result.includes('success')) {
    //       alert('작성되었습니다.');
    //     } else {
    //       alert('글 작성을 실패하였습니다. 다시 시도해주세요.');
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // /* 공지사항 게시물 목록 DELETE */
    // // 상단 메소드에 구현됨

    // /* 공지사항 게시물 한개 조회 GET */
    // GetNotice(id)
    //   .then((data) => {
    //     this.postData = {
    //       id: data.id,
    //       title: data.title,
    //       content: data.content
    //     };
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // /* 공지사항 게시물 검색 GET */
    // SearchNotice(keyword)
    //   .then((data) => {
    //     //검색된 것 리스트 형식으로 보여줌
    //     this.list = data.map((item) => ({
    //       id: item.id,
    //       title: item.title,
    //       content: item.content
    //     }));
    //   })
    //   .catch((err) => {
    //     console.error('검색 실패', err);
    //   });

    // // 공지사항 게시물 검색 GET
    // GetNotice(parseInt(this.$route.params));
    // this.$axios
    //   .get('http://localhost:8080/notice/' + this.$axios.search + this.$axios.keyword)
    //   .then((res) => {
    //     console.log(data);
    //     this.data = res.data.id;
    //     this.data = res.data.title;
    //     this.data = res.data.content;
    //     this.data = res.data.active;
    //     this.data = res.data.regDate;
    //     this.data = res.data.modeDate;
    //   });

    // // 공지사항 게시물 수정 PUT
    // RemoveNotice(parseInt(this.$route.params));
    // this.$axios
    //   .put('http://localhost:8080/notice/' + this.$axios.id)
    //   .then((res) => {
    //     console.log(data);
    //     this.data = res.data.id;
    //     this.data = res.data.content;
    //     //data가 성공적으로 도달하였을 때 알람삽입 -> 걍 백엔드 테스트 때문에 넣어둠 나중에 기획팀에서 빼라하면 뺄게여
    //     if (res.data.sucess == true) {
    //       alert('수정되었습니다.');
    //     } else {
    //       alert('수정을 실패하였습니다. 다시 시도해주세요.');
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert('수정을 실패하였습니다. 다시 시도해주세요.');
    //   });
  }
};
</script>

<style scoped>
h1 {
  font-size: 20pt;
  text-align: center;
  padding: 36px 0;
}

.search-bar {
  margin: 0 10px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.announcement-list {
  display: flex;
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
  background-color: #509bf8;
  color: white;
  font-size: 10pt;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
