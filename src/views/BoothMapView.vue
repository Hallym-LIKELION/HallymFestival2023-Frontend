<template>
  <main>
    <div class ="title-wrap">
      <div class="title-image">
        <img src="@/assets/overlay/Obooth.png" alt=""/>
        </div>
        <div class="title-text">
          부스 배치도
        </div>
      </div>

    <div class="poster">
      <BoothCarousel :slide="slide" :isAdmin="admin" />
      <SwitchButton v-if="!admin" @change="switchDayNight" />
    </div>

    <div class="search-bar"><SearchBar v-model="search" /></div>

    <div class="button-group">
      <button @click="() => selectDay(1)" :class="{ selected: day === 1 }">화요일</button>
      <button @click="() => selectDay(2)" :class="{ selected: day === 2 }">수요일</button>
      <button @click="() => selectDay(3)" :class="{ selected: day === 3 }">목요일</button>
    </div>

    <div class="booth-list">
      <template v-for="item in filltered_list" :key="item.bno">
        <ListItem
          @click="() => showBooth(item.bno)"
          :title="item.booth_title"
          :content="item.booth_content"
          :type="item.booth_type"
          :writer="item.writer"
          :date="item.regDate"
          :like="randomNumber(10, 16000)"
          :comment="randomNumber(10, 16000)"
          :isAdmin="admin"
        />
      </template>
      <Pagination @change="changePage" :totalItems="totalItems" :itemsPerPage="itemsPerPage" />
    </div>
  </main>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import ListItem from '../components/ListItem.vue';
import BoothCarousel from '../components/BoothCarousel.vue';
import SwitchButton from '../components/SwitchButton.vue';
import Image from '../components/Image.vue';
import Pagination from '../components/Pagination.vue';
import { GetAuthority, GetBoothList, CreateBooth } from '../api/api-client';

export default {
  components: {
    SearchBar,
    ListItem,
    Pagination,
    SwitchButton,
    BoothCarousel,
    Image
  },
  data() {
    return {
      list: [],
      search: '',
      day: 0,

      admin: GetAuthority(),

      slide: 0,

      totalItems: 1,
      itemsPerPage: 1
    };
  },
  computed: {
    filltered_list() {
      return this.list.filter((item) => {
        // 1. 요일에 따른 필터링
        // const isChoosedDay = true || this.day === 0 || item.day.includes(this.day);

        // 2. 검색에 따른 필터링
        const isContainSearchString =
          this.search === '' ||
          item.booth_title.includes(this.search) ||
          item.booth_content.includes(this.search);

        return true && isContainSearchString;
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
        if (!this.admin) {
          this.slide = day - 1;
        }
        this.day = day;
      }
    },
    switchDayNight(isDay) {
      if (isDay) {
        this.slide = 0;
      } else {
        this.slide = 3;
      }
    },

    randomNumber(a, b) {
      return a + Math.floor(Math.random() * (b - a));
    },

    async changePage(page) {
      const data = await GetBoothList(page);
      this.list = data.dtoList;
      this.totalItems = data.total;
      this.itemsPerPage = data.size;
    }
  },

  async created() {
    // 데이터 가져오기
    const data = await GetBoothList();
    this.list = data.dtoList;
    this.totalItems = data.total;
    this.itemsPerPage = data.size;
  }
};
</script>

<style scoped>
.title-wrap{
  width:30%;
  margin:10px auto;
  position:relative;
}
.title-wrap img {
  width:100%;
  vertical-align: middle;
}
.title-text{
  position: absolute;
  top:40%;
  left:50%;
  width:50%;
  transform: translate(-50%,-50%);
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  font-style: normal;
  font-weight: 550;
  font-size: 20px;
  line-height: 13px;
  margin: 0;
  padding: 36px 0;
  color: #FFFFFF;
}
h1 {
  font-size: 20pt;
  text-align: center;
  margin: 0;
  padding: 24px 0;
  color: #ffffff;
}

.poster {
  max-width: 420px;
  margin: auto;
  /* overflow: hidden; */
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.poster > .switch-button {
  margin-left: -70px;
  margin-bottom: 6px;
  z-index: 9;
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
  color: #ffffff;
  font-size: 11pt;
  cursor: pointer;
  font-family: 'Nanum Gothic', sans-serif;
  transition: background-color 0.25s, color 0.25s;
}

.button-group > button.selected {
  background-color: #CA434C;
  color: white;
}

<<<<<<< HEAD
.banner-group {
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.banner-group > button {
  width: 100%;
  height: 40px;
  margin-top: 16px;
  border-radius: 10px;
  border: 1px solid #CA434C;
  color: #CA434C;
  font-size: 13pt;
}

=======
>>>>>>> ff2e30bab0b30ab8ab9e1e81154b24d4131af76d
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
