<template>
  <main>
    <div class="intro">
      <h1>신고 받은 방명록</h1>
      <br /><br />
      <p>지금까지 신고된 들어온 방명록 목록</p>
    </div>

    <div class="search-bar" ref="searchBar"><SearchBar v-model="search" /></div>

    <div class="button-group">
      <button @click="() => selectFilter(1)" :class="{ selected: fil === 1 }">최신순</button>
      <button @click="() => selectFilter(2)" :class="{ selected: fil === 2 }">신고순</button>
    </div>

    <div class="comment-list">
      <template v-for="(item, index) in list">
        <Comment
          :id="item.id"
          :name="item.name"
          :comment="item.comment"
          :time="item.time"
          :warn="item.warn"
        />
      </template>
    </div>
  </main>
</template>
<script>
import SearchBar from '../components/SearchBar.vue';
import Comment from '../components/Comment.vue';
export default {
  components: {
    SearchBar,
    Comment
  },
  data() {
  return{
    list: [
        {
          id: 1,
          name: '집가고싶은 사자',
          comment:
            '그냥 집에 가고 싶어요...',
          time:
          '2023-04-08 18:20',
          warn:
          '신고 3회'
        },
        {
          id: 2,
          name: '밥먹는 사자',
          comment:
            '그냥 밥먹고 싶은데요...',
          time:
          '2023-04-08 18:20',
          warn:
          '신고 3회'

        }
    ],
    context: -1
    };
  },
  methods: {
    selectFilter(fil) {
      if (this.fil === fil) {
        this.fil = 0;
      } else {
        this.fil = fil;
      }
    }
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
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-size: 15px;
  line-height: 13px;
  text-align: center;
  letter-spacing: 0.15em;
  margin: 0;
  padding: 36px 0;
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
  background-color: #ca434c;
  font-size: 13pt;
  color: #f8f9fd;
  font-family: 'Noto Sans KR', sans-serif;
  transition: background-color 0.25s, color 0.25s;
}

.comment {
  display: flex;
  flex-direction: column;
}

.comment-container > * {
  margin-top: 12px;

}
.comment-list > * {
  width: 100%;
  margin: 10px 0;

}
</style>
