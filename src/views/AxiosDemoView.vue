<script>
import SearchBar from '../components/SearchBar.vue'
import ListItem from '../components/ListItem.vue'
import { GetDemoPostList } from '../api/api-client'

export default {
  components: { SearchBar, ListItem },
  data() {
    return {
      items: []
    }
  },
  methods: {
    showArticle(id) {
      // TODO: 공지사항 내용을 띄우는 코드 작성하기
      alert(`post item ${id} clicked`)
    }
  },
  async mounted() {
    // 데이터 가져오기

    const data = await GetDemoPostList()

    // 더미 API에서는 데이터를 100개 보내지만, 테스트에서는 5개만 사용
    data.splice(5, 95)

    console.log(data)
    this.items = data
  }
}
</script>

<template>
  <main>
    <h1>API Demo Page</h1>
    <div class="search-bar"><SearchBar /></div>
    <div class="announcement-list">
      <template v-for="(item, index) in items">
        <ListItem
          @click="() => showArticle(item.id)"
          :title="item.title"
          :content="item.body"
          image="https://via.placeholder.com/60x60/4d4d4d/b8b8b8"
        />
      </template>
    </div>
  </main>
</template>

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
}

.announcement-list > * {
  max-width: 400px;
  margin: 10px 0;
}
</style>
