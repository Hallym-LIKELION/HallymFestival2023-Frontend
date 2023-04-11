<template>
  <main>
    <BoothEditModal
      :visible="showCreateBoothModal"
      :data="{
        title: '',
        description: '',
        type: '부스',
        status: true
      }"
      :id="-1"
      @close="closeCreateModal"
      @complete="createBooth"
    />

    <h1>부스 배치도</h1>

    <div class="poster">
      <Image
        class="poster-image"
        :src="mapImage"
        alt="한림대학교 비봉축전"
        width="970"
        height="689"
        spinner-size="300"
      />
      <SwitchButton />
    </div>

    <div class="banner-group">
      <button @click="openCreateModal" class="create-booth-button">부스 만들기</button>
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
          :image="item.temp_image"
        />
      </template>
      <Pagination @change="changePage" :totalItems="totalItems" :itemsPerPage="itemsPerPage" />
    </div>
  </main>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import ListItem from '../components/ListItem.vue';
import BoothEditModal from '../components/booth/EditModal.vue';
import SwitchButton from '../components/SwitchButton.vue';
import Image from '../components/Image.vue';
import Pagination from '../components/Pagination.vue';
import { GetBoothList, CreateBooth } from '../api/api-client';
import mapImage from '../assets/map.jpg';

export default {
  components: {
    SearchBar,
    ListItem,
    Pagination,
    SwitchButton,
    Image,
    BoothEditModal
  },
  data() {
    return {
      mapImage,
      list: [],
      search: '',
      day: 0,

      showCreateBoothModal: false,

      totalItems: 1,
      itemsPerPage: 1
    };
  },
  computed: {
    filltered_list() {
      return this.list.filter((item) => {
        // 1. 요일에 따른 필터링
        const isChoosedDay = true || this.day === 0 || item.day.includes(this.day);

        // 2. 검색에 따른 필터링
        const isContainSearchString =
          this.search === '' ||
          item.booth_title.includes(this.search) ||
          item.booth_content.includes(this.search);

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
    openCreateModal() {
      this.showCreateBoothModal = true;
    },
    closeCreateModal() {
      this.showCreateBoothModal = false;
    },
    openBoothRecommendation() {
      alert('준비중');
    },
    async createBooth(data) {
      const res = await CreateBooth(data.title, data.description, '테스트', data.type);

      if (!res.result.includes('success')) {
        alert('부스를 생성하는데 실패했습니다.\n' + res.result);
        return;
      }

      const newData = await GetBoothList();
      this.list = newData.dtoList;

      alert('부스를 성공적으로 생성했습니다.');

      this.closeCreateModal();
    },

    async changePage(page) {
      console.log(`페이지를 ${page} 페이지로 이동`);
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
h1 {
  font-size: 20pt;
  text-align: center;
  margin: 0;
  padding: 24px 0;
  color: #ffffff;
}

.poster {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

:deep(.poster-image) {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  opacity: 1;
  transition: opacity 0.25s ease;
}

.poster > .switch-button {
  margin-left: -70px;
  margin-bottom: 6px;
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
  font-family: 'Noto Sans KR', sans-serif;
  transition: background-color 0.25s, color 0.25s;
}

.button-group > button.selected {
  background-color: #509bf8;
  color: white;
}

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
  margin: 5px 0;
  border-radius: 10px;
  background-color: #509bf8;
  color: white;
  font-size: 13pt;
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
