<template>
  <main>
    <h1>공지사항</h1>
    <div class="search-bar"><SearchBar v-model="search" /></div>
    <div class="announcement-list">
      <template v-for="(item, index) in filltered_list">
        <FoldingArticle
          @click="() => showAnnouncement(item.id)"
          :id="item.id"
          :title="item.title"
          :content="item.content"
          :showContent="item.id === showingContent"
        />
      </template>
    </div>
    <div class="buttonGroup">
      <button @click="() => writeArticle()">글쓰기</button>
    </div>
  </main>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import FoldingArticle from '../components/FoldingArticle.vue';

export default {
  name: 'AnnouncementView',
  components: {
    SearchBar,
    FoldingArticle
  },
  data() {
    return {
      list: [
        {
          id: 1,
          title: '축제 진행에 대한 공지',
          content: '안녕하세요. 2023 한림대학교 비봉축전 준비 위원회 공지사항입니다. 감사합니다.'
        },
        {
          id: 2,
          title: 'Lorem Ipsum',
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          id: 3,
          title: '축제 관리자 회원가입에 대한 안내',
          content:
            '안녕하세요. 축제준비위원회입니다. 지금부터 2023 한림대학교 비봉축전 웹사이트의 관리자 가입이 시작되었습니다. 가입은 다음주 일요일 23:59까지 가능하며 모든 위원회 관계자 분 및 부스 관리자 인원들은 반드시 이 기간에 가입을 완료해주시기 바랍니다. 가입에 문제가 있는 경우 010-0000-0000으로 문의바랍니다. 감사합니다.'
        },
        {
          id: 4,
          title: '한글입숨',
          content:
            '수 보내는 사람은 그러므로 싶이 작고 가장 사라지지 돋고, 것이다. 얼마나 예가 꽃이 미묘한 수 따뜻한 칼이다. 찬미를 청춘이 힘차게 행복스럽고 끓는다. 하였으며, 품었기 관현악이며, 불러 봄바람이다. 긴지라 피어나기 뼈 피다. 거친 심장의 황금시대의 피다. 커다란 유소년에게서 그들의 만물은 없으면 끓는 가는 이상은 있는가? 끝까지 무엇을 장식하는 이것이야말로 보배를 능히 싹이 그리하였는가? 방황하여도, 설산에서 이상의 천하를 것이다. 꽃이 실현에 그들에게 끝까지 크고 소리다.이것은 힘차게 칼이다. 꾸며 피고, 할지라도 청춘 천자만홍이 그들을 끝까지 그들은 것이다.'
        }
      ],
      search: '',
      showingContent: null
    };
  },
  computed: {
    filltered_list() {
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
    writeArticle() {
      // 글쓰기 기능 구현
      alert('TODO');
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 20pt;
  text-align: center;
  margin: 0;
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
  padding: 0 16px;
}

.announcement-list > * {
  width: 100%;
  margin: 0;
  border-top: 1px solid #00000052;
  cursor: pointer;
}

.announcement-list > *:last-child {
  border-bottom: 1px solid #00000052;
}

.buttonGroup {
  display: flex;
  justify-content: flex-end;
  padding: 0 8px;
}

.buttonGroup > button {
  margin: 8px 10px;
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
