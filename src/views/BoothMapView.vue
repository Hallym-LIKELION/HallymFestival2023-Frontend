<template>
  <main>
    <Header :image="HeaderImage" text="부스 목록" content="" />

    <div class="poster">
      <BoothCarousel :slide="slide" :isAdmin="admin === 2" />
      <SwitchButton v-if="admin !== 2" :status="day" @change="switchDayNight" />
    </div>

    <div class="search-bar" v-if="admin !== 2">
      <SearchBar v-model="search" @change="changePage(1)" />
    </div>

    <div class="button-group">
      <button @click="() => selectType(1)" :class="{ selected: day === 1 }">
        {{ admin === 2 ? '댓글순' : '화요일' }}
      </button>
      <button @click="() => selectType(2)" :class="{ selected: day === 2 }">
        {{ admin === 2 ? '좋아요순' : '수요일' }}
      </button>
      <button @click="() => selectType(3)" :class="{ selected: day === 3 }">
        {{ admin === 2 ? '신고순' : '목요일' }}
      </button>
    </div>

    <div class="booth-list">
      <template v-for="item in list" :key="item.bno">
        <ListItem
          @click="() => showBooth(item.bno)"
          :title="item.booth_title"
          :content="item.booth_content"
          :type="admin === 2 ? item.boothType : item.booth_type"
          :writer="item.writer"
          :date="item.regDate"
          :like="item.like_cnt"
          :comment="item.comment_cnt"
          :report="item.report_cnt"
          :mode="day"
          :isAdmin="admin === 2"
        />
      </template>
      <Pagination
        @change="changePage"
        :totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
        :currentPage="currentPage"
      />
    </div>
  </main>
</template>

<script>
import HeaderImage from '@/assets/overlay/Obooth.png';
import Header from '../components/Header.vue';
import SearchBar from '../components/SearchBar.vue';
import ListItem from '../components/ListItem.vue';
import BoothCarousel from '../components/BoothCarousel.vue';
import SwitchButton from '../components/SwitchButton.vue';
import Image from '../components/Image.vue';
import Pagination from '../components/Pagination.vue';
import {
  GetAuthority,
  GetBoothList,
  GetBoothListWithComment,
  GetBoothListWithLike,
  GetBoothListWithReport,
  SearchBoothList
} from '../api/api-client';

export default {
  components: {
    SearchBar,
    ListItem,
    Pagination,
    SwitchButton,
    BoothCarousel,
    Image,
    Header
  },
  data() {
    return {
      HeaderImage,
      list: [],
      search: '',
      day: 1,

      dayNight: true,

      admin: GetAuthority(),

      slide: 0,

      totalItems: 1,
      itemsPerPage: 1,
      currentPage: 1
    };
  },
  computed: {},
  methods: {
    showBooth(id) {
      this.$router.push('/booth/' + id);
    },
    selectType(value) {
      if (this.admin === 2) {
        this.day = value;
        this.changePage(1);
      } else {
        this.selectDay(value);
      }
      this.slide = value - 1;
    },
    selectDay(day) {
      this.day = day;
      this.changePage(1);
    },
    switchDayNight(isDay) {
      this.dayNight = isDay;
      if (isDay) {
        this.slide = 0;
      } else {
        this.slide = 3;
      }
      this.changePage(1);
    },

    randomNumber(a, b) {
      return a + Math.floor(Math.random() * (b - a));
    },

    async changePage(page) {
      this.currentPage = page;
      if (this.admin === 2) {
        if (this.day == 2) {
          this.applyData(await GetBoothListWithLike(page));
        } else if (this.day == 3) {
          this.applyData(await GetBoothListWithReport(page));
        } else {
          this.applyData(await GetBoothListWithComment(page));
        }
      } else {
        this.applyData(await SearchBoothList(this.search, this.day, this.dayNight, page));
      }
    },

    applyData(data) {
      this.list = data.dtoList;
      this.totalItems = data.total;
      this.itemsPerPage = data.size || 1;
    }
  },

  async created() {
    this.changePage(1);
  }
};
</script>

<style scoped>
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
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.button-group {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.button-group > button {
  margin: 8px 10px;
  padding: 6px 16px;
  border: none;
  border-radius: 24px;
  color: #ffffff66;
  background-color: #ffffff1e;
  font-size: 11pt;
  cursor: pointer;
  font-family: 'Nanum Gothic', sans-serif;
  transition: background-color 0.25s, color 0.25s;
}

.button-group > button.selected {
  background-color: #ca434c;
  color: white;
}

.booth-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.booth-list > * {
  max-width: 420px;
  margin: 10px 0px;
  cursor: pointer;
}
@media screen and (max-width: 400px) {
  .button-group > button {
    margin: 8px;
    padding: 4px 8px;
    font-size: 10pt;
  }
}
</style>
