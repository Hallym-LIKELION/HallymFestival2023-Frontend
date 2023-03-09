<template>
  <main>
    <h1>공지사항</h1>
    <div class="search-bar"><SearchBar v-model="search" /></div>
    <div class="announcement-list">
      <template v-for="(item, index) in filltered_list">
        <ListItem
          @click="() => showAnnouncement(item.id)"
          :title="item.title"
          :content="item.content"
          :image="item.image"
        />
      </template>
    </div>
  </main>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import ListItem from '../components/ListItem.vue';

export default {
  name: 'AnnouncementView',
  components: {
    SearchBar,
    ListItem
  },
  data() {
    return {
      list: [
        {
          id: 1,
          title: '축제 진행에 대한 공지',
          content: '안녕하세요. 2023 한림대학교 비봉축전 준비 위원회 공지사항입니다. 감사합니다.',
          image: 'https://via.placeholder.com/60x60/4d4d4d/b8b8b8'
        },
        {
          id: 2,
          title: 'Lorem Ipsum',
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          id: 3,
          title: '멋쟁이사자처럼',
          content: '123123123123',
          image:
            'https://avatars.githubusercontent.com/u/122857055?s=400&u=386f18f709e3269a0f8fa4078f62f53320576dfd&v=4'
        }
      ],
      search: ''
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
      // TODO: 공지사항 내용을 띄우는 코드 작성하기
      alert(`announcement item ${id} clicked`);
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
}

.announcement-list > * {
  max-width: 400px;
  margin: 10px 0;
}
</style>
