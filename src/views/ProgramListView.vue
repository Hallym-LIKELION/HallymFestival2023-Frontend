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
    <h1>프로그램 목록</h1>
    <div class="program-list" @click="openModal == true">
      <template v-for="item in list" :key="item.id">
        <ProgramCard
          :id="item.id"
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
import festivalImage from '@/assets/poster.jpg';

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
          title: '프로그램 1',
          description: '대충 아무 프로그램 설명...'
        },
        {
          id: 2,
          title: 'Lorem Ipsum',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
          id: 3,
          title: '제목제목제목 제목제목 제목',
          description: '프로그램 설명 설명 설명..'
        },
        {
          id: 4,
          title: '제목제목제목 제목제목 제목',
          description: '프로그램 설명 설명 설명..'
        },
        {
          id: 5,
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
}

.program-list > * {
  max-width: 400px;
  margin-top: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #00000052;
  cursor: pointer;
}

.program-list > *:last-child {
  border-bottom: none;
}
</style>
