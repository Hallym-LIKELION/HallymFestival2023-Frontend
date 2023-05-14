<template>
  <main>
    <ProgramModal
      :visible="modal"
      @close="closeModal"
      :image="modalData.image"
      :title="modalData.title"
      :content="modalData.content"
      :date="modalData.date"
      :dateAlter="modalData.dateAlter"
      :place="modalData.place"
    ></ProgramModal>

    <Header
      :image="HeaderImage"
      text="프로그램"
      content="이번 축제에서 진행하는 다양한 프로그램입니다!"
    />

    <div class="program-list">
      <template v-for="(item, index) in list" :key="index">
        <ProgramCard
          :id="index"
          :image="item.image"
          :title="item.title"
          :description="item.description"
          @click="openModal(index)"
        />
        <div class="line"></div>
      </template>
    </div>
  </main>
</template>

<script>
import HeaderImage from '@/assets/overlay/Oprogram.png';
import Header from '../components/Header.vue';

import ProgramCard from '../components/ProgramCard.vue';
import ProgramModal from '../components/ProgramModal.vue';

import ImageDance from '@/assets/programlist/P_dance.png';
import ImageMung from '@/assets/programlist/P_mung.png';
import ImagePPung from '@/assets/programlist/P_ppung.png';
import ImageSing from '@/assets/programlist/P_sing.png';
import ImageMack from '@/assets/programlist/P_mack.png';
import ImageMul from '@/assets/programlist/P_mul.png';
import ImageDong from '@/assets/programlist/P_dong.png';

export default {
  name: 'ProgramListView',
  components: {
    ProgramCard,
    ProgramModal,
    Header
  },
  data() {
    return {
      HeaderImage,
      modal: false,

      modalData: {
        image: ImageDong,
        title: '2023 대동제 동아리 공연',
        description: '한림대 중앙동아리 부원들의 주체적으로 꾸민 무대를 다같이 감상해보세요:)',
        content: [
          '댄스, 노래, 연극 등 다양한 분야의 공연들을 한 자리에!',
          '중앙동아리분들의 환상적인 공연을 함께하세요!'
        ],
        date: '2023-05-16T16:55:00+20:40',
        place: '한림대학교 대운동장'
      },

      list: [
        {
          image: ImageDong,
          title: '2023 대동제 동아리 공연',
          description: '한림대 중앙동아리 부원들의 주체적으로 꾸민 무대를 다같이 감상해보세요:)',
          content: [
            '댄스, 노래, 연극 등 다양한 분야의 공연들을 한 자리에!',
            '중앙동아리분들의 환상적인 공연을 함께하세요!'
          ],
          date: '2023-05-16T16:00:00+09:00',
          place: '한림대학교 대운동장'
        },
        {
          image: ImagePPung,
          title: '천하제일 뻥쟁이 대회',
          description: '하나의 주제로 거짓말을 하는 패널을 찾아라!',
          content: [
            '무대 밑 관객분들과 소통하며 진행되는 대회!',
            '패널들 중 거짓말을 하는 사람은 누구?? 얼른 검거하러 가요!.'
          ],
          date: '2023-05-17T15:30:00+09:00',
          place: '한림대학교 대운동장'
        },

        {
          image: ImageMung,
          title: '멍 때리기 대회, 어멍! ',
          description: '가장 오래오래 멍을 잘 때리는 학우는 누구?!',
          content: [
            '멍을 때리는 사람/ 멍을 방해하는 사람들의 치열한 노력들!',
            '마지막 라운드까지 멍 때림을 유지하는 사람들은 과연 누구?!'
          ],
          date: '2023-05-18T16:00:00+09:00',
          place: '한림대학교 대운동장'
        },
        {
          image: ImageSing,
          title: 'ㄴr는 ㄱr끔 노㉣łı를 부른⊂ト... "가요제" ',
          description: '자신의 노래를 뽐내고 싶은 한림대 학우분들의 무대를 감상해보세요:)',
          content: [
            '치열한 예선을 뚫고 본선에 진출한 학우들의 공연에 함께하세요!',
            '가요제 1등은 과연 누구?! 앵콜곡까지 함께하세요!'
          ],
          date: '2023-05-17T18:00:00+09:00',
          place: '한림대학교 대운동장'
        },
        {
          image: ImageDance,
          title: 'ㄴr는 슬플 ㄸĦㅁト⊂ト 춤을 추곤 ぁĦ... "댄스 경연 대회"',
          description: '자신의 춤 실력을 뽐내고 싶은 한림대 학우분들의 무대를 감상해보세요:)',
          content: [
            '치열한 예선을 뚫고 본선에 진출한 학우들의 공연에 함께하세요!',
            '상위 입상자에게는 다채로운 상품이 제공됩니다!'
          ],
          date: '2023-05-18T18:05:00+09:00',
          place: '한림대학교 대운동장'
        },
        {
          image: ImageMul,
          title: '나의 소녀시대 - 물풍선 타임',
          description: '더위를 피하고 싶은 낭만파 한림대 학우분들을 기다립니다!',
          content: [
            '시원한 여름, 물풍선과 함께 더위를 날려버리세요!',
            '여러 이벤트들과 함께해서 더욱 재미있는 축제!'
          ],
          date: '2023-05-16T12:00:00+09:00',
          place: '한림대학교 대운동장'
        },
        {
          image: ImageMack,
          title: '잔을 비어 밤, 맥주 빨리마시기 대회',
          description: '무더운 여름 밤, 맥주를 가장 빨리 마시는 학우는 누구?!',
          content: [
            '주점으로 뜨거운 축제의 밤! 맥주 빨리 마시기 대회에 참가세요!',
            '1~3등에게는 상품까지 준비되어있습니다 !!'
          ],
          dateAlter: '2023.05.16~18 23:00',
          place: '사경관 주점길'
        }
      ]
    };
  },
  methods: {
    openModal(id) {
      this.modalData = this.list[id];
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    close(event) {
      if (event.target.classList.contains('black-bg') || event.target.classList.contains('close')) {
        this.openModal = false;
      } else if (event.target.classList.contains('white-bg')) {
        this.openModal = true;
      }
    }
  }
};
</script>

<style scoped>
.program-list {
  font-family: 'Nanum Gothic', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 -28px;
  padding: 0 24px;
  color: black;
  background-color: rgb(255, 255, 255, 0.8);
}

.program-list > div:not(.line) {
  font-family: 'Nanum Gothic', sans-serif;
  max-width: 400px;
  margin: 24px 0;
  padding: 18px 24px;
  padding-bottom: 0;
  border-radius: 16px;

  cursor: pointer;
  color: #ffffff;
  /* background-color: #ffffff4f; */

  transition: background-color 0.25s, box-shadow 0.25s, transform 0.25s;
}
.program-list > div:not(.line):hover {
  background-color: #ffffff8f;
  box-shadow: 0px 0px 8px #00000022;
  transform: scale(1.05);
}

.program-list > .line {
  border-bottom: 2px solid #00000052;
  max-width: 400px;
  width: 100%;
}

.program-list > div:last-child {
  font-family: 'Nanum Gothic', sans-serif;
  border-bottom: none;
}
</style>
