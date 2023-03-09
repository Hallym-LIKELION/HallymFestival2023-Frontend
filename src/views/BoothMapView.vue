<template>
  <main>
    <h1>부스 배치도</h1>
    <div class="search-bar"><SearchBar v-model="search" /></div>
    <button @click="() => selectDay(1)">화요일</button>
    <button @click="() => selectDay(2)">수요일</button>
    <button @click="() => selectDay(3)">목요일</button>

    <div class="poster">
      <img :src="festivalImage" alt="한림대학교 비봉축전" />
    </div>

    <div class="booth-list">
      <template v-for="(item, index) in filltered_list">
        <ListItem
          @click="() => showBooth(item.id)"
          :title="item.title"
          :content="item.content"
          :image="item.image"
          :type="item.type"
          imageAlt="이미지"
        />
      </template>
    </div>
  </main>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import ListItem from '../components/ListItem.vue';
import festivalImage from '@/assets/poster.jpg';

export default {
  components: {
    SearchBar,
    ListItem
  },
  data() {
    return {
      festivalImage,
      list: [
        {
          id: 1,
          title: '쿠키스 (화)',
          content: '수제 쿠키 판매',
          image:
            'https://images.unsplash.com/photo-1585608726082-19c119c55c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80',
          type: '1'
        },
        {
          id: 2,
          title: '더 사이언스 (수)',
          content: '과학 퀴즈 및 체험',
          image:
            'https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=834&q=80',
          type: '2'
        },
        {
          id: 3,
          title: '대충 아무 부스 (목)',
          content: '대충 아무 내용',
          type: '3'
        },
        {
          id: 3,
          title: '대충 아무 부스 (화)',
          content: '대충 아무 내용',
          type: '1'
        }
      ],
      search: '',
      selectedDay: 0
    };
  },
  computed: {
    filltered_list() {
      return this.list.filter((item) => {
        // 1. 요일에 따른 필터링
        const isChoosedDay = this.selectedDay === 0 || item.type === this.selectedDay.toString();

        // 2. 검색에 따른 필터링
        const isContainSearchString =
          this.search === '' || item.title.includes(search) || item.content.includes(search);

        return isChoosedDay && isContainSearchString;
      });
    }
  },
  methods: {
    showBooth(id) {
      // TODO: 부스 상세 페이지를 띄우는 코드 작성하기
      alert(`booth item ${id} clicked`);
    },
    selectDay(day) {
      if (this.selectedDay === day) {
        this.selectedDay = 0;
      } else {
        this.selectedDay = day;
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
  display: flex;
  justify-content: center;
}

.poster {
  display: flex;
  justify-content: center;
}

.poster > img {
  width: 100%;
  max-width: 200px;
  height: auto;
  object-fit: cover;
}

.booth-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
}

.booth-list > * {
  max-width: 400px;
  margin: 10px 0;
}
</style>
