<template>
  <main>
    <h1>프로그램 목록</h1>
    <div class="program-list">
      <template v-for="(item) in list" :key="item.id">
        <ProgramCard
          :id="item.id"
          :title="item.title"
          :description="item.description"
          @click="() => showProgram(item.id)"
        />
      </template>
    </div>
  </main>
</template>

<script>
import ProgramCard from '../components/ProgramCard.vue';
export default {
  name: 'ProgramListView',
  components: {
    ProgramCard
  },
  data() {
    return {
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
      search: ''
    };
  },
  methods: {
    showProgram(id) {
      // TODO
      alert('You clicked program ' + id);
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

.program-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
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
