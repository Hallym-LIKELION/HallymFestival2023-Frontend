<template>
  <main>
    <ProgramModal
      :visible="modal"
      @close="closeModal"
      :image="modalData.image"
      :title="modalData.title"
      :content="modalData.content"
      :date="modalData.date"
      :place="modalData.place"
    ></ProgramModal>
    <div class="title-wrap">
      <div class="title-image">
        <img src="@/assets/overlay/Oprogram.png" alt="" width="70" height="40" />
      </div>
      <div class="title-text">프로그램</div>
    </div>
    <div class="program-list">
      <template v-for="(item, index) in list" :key="index">
        <ProgramCard
          :id="index"
          :image="item.image"
          :title="item.title"
          :description="item.description"
          @click="openModal(index)"
        />
      </template>
    </div>
  </main>
</template>

<script>
import ProgramCard from '../components/ProgramCard.vue';
import ProgramModal from '../components/ProgramModal.vue';

import ImageDance from '@/assets/programlist/P_dance.jpg';
import ImageMung from '@/assets/programlist/P_mung.jpg';
import ImagePPung from '@/assets/programlist/P_ppung.jpg';
import ImageSing from '@/assets/programlist/P_sing.jpg';

export default {
  name: 'ProgramListView',
  components: {
    ProgramCard,
    ProgramModal
  },
  data() {
    return {
      modal: false,

      modalData: {
        image: ImageDance,
        title: '2023 대동제 댄스경연대회',
        description: '치열한 예선을 뚫고 본선에 진출한 학우들의 공연에 함께하세요:)',
        content: [
          '한림대 학우들과 치열한 댄스 배틀을 벌이자!!',
          '많은 환호를 받은 참가자는 호화로운 상품이 제공됩니다.'
        ],
        date: '2023-05-17T15:00:00+09:00',
        place: '한림대학교 운동장'
      },

      list: [
        {
          image: ImageDance,
          title: '2023 대동제 댄스경연대회',
          description: '치열한 예선을 뚫고 본선에 진출한 학우들의 공연에 함께하세요:)',
          content: [
            '한림대 학우들과 치열한 댄스 배틀을 벌이자!!',
            '많은 환호를 받은 참가자는 호화로운 상품이 제공됩니다.'
          ],
          date: '2023-05-17T15:00:00+09:00',
          place: '한림대학교 운동장'
        },
        {
          image: ImageMung,
          title: '2023 대동제 멍때리기 대회, 어멍!',
          description:
            '1시간 동안 앉은 자세로 멍을 때리는 학우분들의 멍때리는 솜씨를 확인해볼까요?',
          content: ['프로그램 상세 설명 11', '상위 입상자에게는 다채로운 상품이 제공됩니다!'],
          date: '2023-05-17T15:00:00+09:00',
          place: '한림대학교 운동장'
        },
        {
          image: ImagePPung,
          title: '2023 대동제 천하제일 뻥쟁이대회 ',
          description: '하나의 주제로 거짓말을 하는 패널을 찾는 대회입니다!',
          content: ['프로그램 상세 설명 11', '상위 입상자에게는 다채로운 상품이 제공됩니다!'],
          date: '2023-05-17T15:00:00+09:00',
          place: '한림대학교 운동장'
        },
        {
          image: ImageSing,
          title: '2023 대동제 가요제 ',
          description: '치열한 예선을 뚫고 본선에 진출한 학우들의 공연에 함께하세요:)',
          content: ['프로그램 상세 설명 11', '상위 입상자에게는 다채로운 상품이 제공됩니다!'],
          date: '2023-05-17T15:00:00+09:00',
          place: '한림대학교 운동장'
        },
        {
          image: ImageSing,
          title: '제목제목제목 제목제목 제목',
          description: '프로그램 설명 설명 설명..',
          content: ['프로그램 상세 설명 11', '상위 입상자에게는 다채로운 상품이 제공됩니다!'],
          date: '2023-05-17T15:00:00+09:00',
          place: '한림대학교 운동장'
        }
      ]
    };
  },
  methods: {
    openModal(id) {
      this.data = this.list[id];
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
.line {
  color: #ffffff;
  opacity: 0.5;
}
.title-wrap {
  width: 30%;
  margin: 10px auto;
  position: relative;
}
.title-wrap img {
  width: 100%;
  vertical-align: middle;
}
.title-text {
  position: absolute;
  font-family: 'Nanum Gothic';
  top: 40%;
  left: 50%;
  width: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-style: normal;
  font-weight: 550;
  font-size: 20px;
  line-height: 13px;
  margin: 0;
  padding: 36px 0;
  color: #ffffff;
}
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
}
.white-bg {
  text-align: center;
  width: 90%;
  margin: 80px auto;
  background: #ffffff;
  border-radius: 5px;
  padding: 20px 0;
}
.space {
  border: none;
  width: 81px;
  height: 32px;
  background: #5c859b;
  opacity: 0.88;
  color: white;
  font-weight: bold;
  border-radius: 26.25px;
  padding: 5px 15px;
}
.date {
  border: none;
  width: 81px;
  height: 32px;
  background: #5c859b;
  opacity: 0.88;
  color: white;
  font-weight: bold;
  border-radius: 26.25px;
  padding: 5px 15px;
}
.close {
  cursor: pointer;
  border: none;
  background: black;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  padding: 5px 15px;
}
.close:hover {
  color: white;
  font-weight: bold;
  transform: scale(1.1);
  transition: all 0.5s;
}

h1 {
  font-size: 20pt;
  text-align: center;
  padding: 36px 0;
  color: black;
}

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

.program-list > * {
  font-family: 'Nanum Gothic', sans-serif;
  max-width: 400px;
  margin-top: 12px;
  padding: 12px 0;
  border-bottom: 2px solid #00000052;
  cursor: pointer;
  color: #ffffff;
}

.program-list > *:last-child {
  font-family: 'Nanum Gothic', sans-serif;
  border-bottom: none;
}
</style>
