<template>
  <main>
    <div class="black-bg" v-if="openModal == true" @click="close($event)">
      <div class="white-bg">
        <img :src="festivalImage" class="detail_program" />
        <h4>{{ detail_program[0].title }}</h4>
        <p>{{ detail_program[0].content }}</p>
        <button class="close">창 닫기</button>
      </div>
    </div>
    <div class ="title-wrap">
      <div class="title-image">
        <img src="@/assets/overlay/Oprogram.png" alt=""/>
        </div>
        <div class="title-text">
          프로그램
        </div>
    </div>
    <div class="program-list" @click="openModal == true">
      <template v-for="item in list" :key="item.id">
        <ProgramCard
          :id="item.id"
          :image="item.image"
          :title="item.title"
          :description="item.description"
          @click="
            openModal = true;
            clickedProgram = i;
          "
        />
      </template>
    </div>
  </main>
</template>

<script>
import ProgramCard from '../components/ProgramCard.vue';
import P_dance from '@/assets/programlist/P_dance.jpg';
import P_mung from '@/assets/programlist/P_mung.jpg';
import P_ppung from '@/assets/programlist/P_ppung.jpg';
import P_sing from '@/assets/programlist/P_sing.jpg';

export default {
  name: 'ProgramListView',
  components: {
    ProgramCard
  },
  data() {
    return {
      openModal: false,
      list: [
        {
          id: 1,
          image: P_dance,
          title: '2023 대동제 댄스경연대회',
          description: '치열한 예선을 뚫고 본선에 진출한 학우들의 공연에 함께하세요:)'
        },
        {
          id: 2,
          image: P_mung,
          title: '2023 대동제 멍때리기 대회, 어멍!',
          description: '1시간 동안 앉은 자세로 멍을 때리는 학우분들의 멍때리는 솜씨를 확인해볼까요?'
        },
        {
          id: 3,
          image: P_ppung,
          title: '2023 대동제 천하제일 뻥쟁이대회 ',
          description: '하나의 주제로 거짓말을 하는 패널을 찾는 대회입니다!'
        },
        {
          id: 4,
          image: P_sing,
          title: '2023 대동제 가요제 ',
          description: '치열한 예선을 뚫고 본선에 진출한 학우들의 공연에 함께하세요:)'
        },
        {
          id: 5,
          image: P_sing,
          title: '제목제목제목 제목제목 제목',
          description: '프로그램 설명 설명 설명..'
        }
      ],
      detail_program: [
        {
          id: 1,
          title: '멍때리기 대회',
          content: '멍때리기 대회에서 우승할 사람은 누구?!'
        },
        {
          id: 2,
          title: '빨리먹기 대회',
          content: '빨리먹기 대회에서 우승할 사람은 누구?!'
        },
        {
          id: 3,
          title: '코딩하기 대회',
          content: '코딩하기 대회에서 우승할 사람은 누구?!'
        },
        {
          id: 4,
          title: '키크기 대회',
          content: '제일 키 큰 사람은 누구?!'
        },
        {
          id: 5,
          title: '키작기 대회',
          content: '제일 키 작은 사람은  누구?!'
        }
      ],
      search: ''
    };
  },
  methods: {
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
  width: 90%;
  margin: 80px auto;
  background: white;
  border-radius: 5px;
  padding: 20px 0;
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
  color: #ffffff;
}
.poster {
  padding: 36px 0;
  display: flex;
  justify-content: center;
}

.program-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  padding: 0 16px;
  color: #ffffff;
}

.program-list > * {
  max-width: 400px;
  margin-top: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #00000052;
  cursor: pointer;
  color: #ffffff;
}

.program-list > *:last-child {
  border-bottom: none;
}
</style>
