<template>
  <main>
    <Header
      :image="HeaderImage"
      text="부스 목록"
      content="이번 축제의 다양한 부스들을 둘러보세요!"
    />

    <div class="poster">
      <BoothCarousel :slide="slide" :isAdmin="admin === 2" />
      <SwitchButton v-show="admin !== 2 && day < 4" :status="day" @change="switchDayNight" />
    </div>

    <div class="search-bar" v-show="admin !== 2 && day < 4">
      <SearchBar v-model="search" @change="changePage(1)" />
    </div>

    <div class="button-group">
      <Carousel :items-to-show="1" :wrapAround="true" v-model="buttonSlide">
        <Slide :key="0" v-if="admin !== 2">
          <div>
            <button @click="() => selectType(1)" :class="['select', { selected: day === 1 }]">
              화요일
            </button>
            <button @click="() => selectType(2)" :class="['select', { selected: day === 2 }]">
              수요일
            </button>
            <button @click="() => selectType(3)" :class="['select', { selected: day === 3 }]">
              목요일
            </button>
          </div>
        </Slide>
        <Slide :key="1">
          <div>
            <button @click="() => selectType(4)" :class="['select', { selected: day === 4 }]">
              댓글순
            </button>
            <button @click="() => selectType(5)" :class="['select', { selected: day === 5 }]">
              좋아요순
            </button>
            <button
              @click="() => selectType(6)"
              :class="['select', { selected: day === 6 }]"
              v-if="admin === 2"
            >
              신고순
            </button>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>

    <div class="booth-list" ref="list">
      <template v-for="item in list" :key="item.bno">
        <ListItem
          @click="() => showBooth(item.bno)"
          :title="item.booth_title"
          :content="item.booth_content"
          :type="day > 3 ? item.boothType : item.booth_type"
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
        :scrollToElement="listElement"
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
import { Carousel, Slide, Navigation } from 'vue3-carousel';
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
    Header,
    Carousel,
    Slide,
    Navigation
  },
  data() {
    return {
      HeaderImage,
      list: [],
      search: '',
      day: GetAuthority() === 2 ? 4 : 1,

      listElement: null,

      dayNight: true,

      admin: GetAuthority(),

      slide: 0,
      buttonSlide: 0,

      totalItems: 1,
      itemsPerPage: 1,
      currentPage: 1
    };
  },
  methods: {
    showBooth(id) {
      this.$router.push('/booth/' + id);
    },

    updateQueryString() {
      this.$router.push({
        path: '/boothmap',
        query: {
          page: this.currentPage,
          type: this.day,
          search: this.search
        }
      });
    },

    selectType(value) {
      this.day = value;

      this.changePage(1);

      if (this.admin === 2) {
        this.slide = value - 4;
      } else if (value < 4 && this.dayNight) {
        this.slide = value - 1;
      }
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

      this.updateQueryString();

      if (this.day < 4) {
        this.applyData(await SearchBoothList(this.search, this.day, this.dayNight, page));
      } else if (this.day === 5) {
        this.applyData(await GetBoothListWithLike(page));
      } else if (this.day === 6) {
        this.applyData(await GetBoothListWithReport(page));
      } else {
        this.applyData(await GetBoothListWithComment(page));
      }
    },

    applyData(data) {
      this.list = data.dtoList;
      this.totalItems = data.total;
      this.itemsPerPage = data.size || 1;
    }
  },

  async created() {
    this.currentPage = parseInt(this.$route.query.page ?? this.currentPage);
    this.day = parseInt(this.$route.query.type ?? this.day);
    this.search = this.$route.query.search ?? this.search;

    await this.changePage(this.currentPage);

    setTimeout(() => {
      window.scrollTo(this.$route.meta.position);
    }, 400);
  },

  mounted() {
    this.listElement = this.$refs.list;
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
  border-radius: 16px;
  margin: auto;
  overflow: hidden;
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
  max-width: 400px;
  margin: 0 auto;
  margin-top: 16px;
}

.button-group div {
  display: flex;
  justify-content: center;
}

.button-group div > button {
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

.button-group div > button.selected {
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

:deep(.button-group .carousel__prev),
:deep(.button-group .carousel__next) {
  color: white;
}

:deep(.button-group .carousel__prev) {
  margin-left: -8px;
}

:deep(.button-group .carousel__next) {
  margin-right: -8px;
}

@media screen and (max-width: 400px) {
  .button-group div > button {
    margin: 8px;
    padding: 4px 8px;
    font-size: 10pt;
  }
}
</style>
