<template>
  <main>
    <h1>부스 배치도</h1>

    <div class="poster">
      <div class="poster-placeholder" v-if="!isImageLoaded"></div>
      <img
        :class="{ hidden: !isImageLoaded }"
        :src="mapImage"
        @load="onImageLoad"
        alt="한림대학교 비봉축전"
      />
    </div>

    <div class="search-bar"><SearchBar v-model="search" /></div>

    <div class="button-group">
      <button @click="() => selectDay(1)" :class="{ selected: day === 1 }">화요일</button>
      <button @click="() => selectDay(2)" :class="{ selected: day === 2 }">수요일</button>
      <button @click="() => selectDay(3)" :class="{ selected: day === 3 }">목요일</button>
    </div>

    <div class="booth-list">
      <template v-for="item in filltered_list" :key="item.id">
        <ListItem
          @click="() => showBooth(item.id)"
          :title="item.name"
          :content="item.summary"
          :image="item.image"
        />
      </template>
    </div>
  </main>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import ListItem from '../components/ListItem.vue';
import { GetDemoBoothList } from '../api/api-client';
import mapImage from '@/assets/map.jpg';

export default {
  components: {
    SearchBar,
    ListItem
  },
  data() {
    return {
      mapImage,
      list: [],
      search: '',
      day: 0,
      isImageLoaded: false
    };
  },
  computed: {
    filltered_list() {
      return this.list.filter((item) => {
        // 1. 요일에 따른 필터링
        const isChoosedDay = this.day === 0 || item.day.includes(this.day);

        // 2. 검색에 따른 필터링
        const isContainSearchString =
          this.search === '' ||
          item.title.includes(this.search) ||
          item.content.includes(this.search);

        return isChoosedDay && isContainSearchString;
      });
    }
  },
  methods: {
    showBooth(id) {
      this.$router.push('/booth/' + id);
    },
    selectDay(day) {
      if (this.day === day) {
        this.day = 0;
      } else {
        this.day = day;
      }
    },
    onImageLoad() {
      this.isImageLoaded = true;
    }
  },
  created() {
    // 데이터 가져오기
    GetDemoBoothList()
      .then((data) => {
        console.log(data);
        this.list = data;
      })
      .catch((err) => {
        alert('Unexpected error has occured. Please try again later.');
        console.log(err);
      });
  }
};
</script>

<style scoped>
h1 {
  font-size: 20pt;
  text-align: center;
  margin: 0;
  padding: 24px 0;
}

.poster {
  max-width: 100%;
}

.poster-placeholder {
  max-width: 970px;
  max-height: 420px;
  margin: 0 auto;
  background-color: #00000055;
  aspect-ratio: 970 / 689;
}

.poster > img {
  width: 100%;
  max-height: 420px;
  object-fit: contain;
  opacity: 1;
  transition: opacity 0.25s ease;
}

.hidden {
  display: none;
  opacity: 0;
}

.search-bar {
  margin: 8px 0;
  margin-top: 16px;
  display: flex;
  justify-content: center;
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
  color: black;
  font-size: 11pt;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  transition: background-color 0.25s, color 0.25s;
}

.button-group > button.selected {
  background-color: #509bf8;
  color: white;
}

.booth-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.booth-list > * {
  max-width: 420px;
  margin: 10px 0;
  cursor: pointer;
}
</style>
