<template>
  <main>
    <h1>방명록</h1>
    <div class="comment-list">
      <template v-for="(item, index) in list">
        <Comment
          :id="item.id"
          :name="item.name"
          :comment="item.comment"
          :showMenu="item.showMenu"
          @showContextMenu="handleContextMenu"
        />
      </template>
    </div>
    <div class="button-group">
      <button @click="() => writeArticle()">글쓰기</button>
    </div>
  </main>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import Comment from '../components/Comment.vue';

export default {
  name: 'CommentView',
  components: {
    SearchBar,
    Comment
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: '축제운영진',
          comment:
            '여기는 학생 여러분들께서 마음껏 작성할 수 있는 방명록입니다~ 자유롭게 사용해주세요!',
          showMenu: false
        },
        {
          id: 5,
          name: '사용자',
          comment: '한림대학교 화이팅~~',
          showMenu: false
        },
        {
          id: 2,
          name: 'Lorem Ipsum',
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          showMenu: false
        },
        {
          id: 3,
          name: '1234',
          comment: '아무댓글 아무댓글 아무댓글 아무댓글 아무댓글 아무댓글 아무댓글 아무댓글',
          showMenu: false
        },
        {
          id: 4,
          name: '한글입숨',
          comment:
            '수 보내는 사람은 그러므로 싶이 작고 가장 사라지지 돋고, 것이다. 얼마나 예가 꽃이 미묘한 수 따뜻한 칼이다. 찬미를.',
          showMenu: false
        }
      ],
      context: -1
    };
  },
  methods: {
    writeArticle() {
      // 글쓰기 기능 구현
      alert('TODO');
    },
    handleContextMenu(id) {
      if (id === this.context) {
        this.context = -1;
      } else {
        this.context = id;
      }
      for (const item of this.list) {
        item.showMenu = item.id === this.context;
      }
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

.comment-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
}

.comment-list > * {
  width: 100%;
  margin: 10px 0;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  padding: 0 8px;
}

.button-group > button {
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
