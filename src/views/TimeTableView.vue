<template>
  <main>
    <h1>타임 테이블</h1>

    <div class="button-group">
      <button @click="() => selectDay(1)" :class="{ selected: day === 1 }">화요일</button>
      <button @click="() => selectDay(2)" :class="{ selected: day === 2 }">수요일</button>
      <button @click="() => selectDay(3)" :class="{ selected: day === 3 }">목요일</button>
    </div>

    <div class="table">
      <template v-for="item in filltered_list">
        <div class="table-col-1">
          <div class="schedule-pin"></div>
          <div class="schedule-line" v-if="!item.hideLine"></div>
        </div>
        <div class="table-col-2">
          <div class="schedule-time" v-text="item.time"></div>
          <div class="schedule-text" v-text="item.content.join('\n')"></div>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          time: '09:00 ~ 10:00',
          content: ['테스트 11', '테스트 22'],
          day: [2, 3]
        },
        {
          time: '11:00 ~ 12:00',
          content: ['테스트 AAA', '테스트 B'],
          day: [1, 3]
        },
        {
          time: '13:00 ~ 14:00',
          content: ['테스트 CC', '테스트 DD'],
          day: [2]
        },
        {
          time: '14:00 ~ 15:00',
          content: ['테스트 33', '테스트 4'],
          day: [1, 2, 3]
        },
        {
          time: '16:00 ~ 17:00',
          content: ['테스트 EE', '테스트 FF', '테스트 GG', '테스트 HH'],
          day: [1, 3]
        }
      ],
      day: 0
    };
  },
  computed: {
    filltered_list() {
      // 요일에 따른 필터링
      let result = this.list.filter((item) => {
        return this.day === 0 || item.day.includes(this.day);
      });

      // 마지막 항목의 경우, 선을 표시하지 않음
      return result.map((item, index) => ({
        time: item.time,
        content: item.content,
        day: item.day,
        hideLine: index === result.length - 1
      }));
    }
  },
  methods: {
    selectDay(day) {
      if (this.day === day) {
        this.day = 0;
      } else {
        this.day = day;
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 20pt;
  text-align: center;
  padding: 36px 0;
}

.button-group {
  display: flex;
  justify-content: center;
}

.button-group > button {
  margin: 0 10px;
  padding: 5px 18px;
  border: none;
  border-radius: 16px;
  color: black;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  transition: background-color 0.25s, color 0.25s;
}

.button-group > button.selected {
  background-color: #509bf8;
  color: white;
}

.table {
  max-width: 500px;

  margin: 48px auto;

  display: grid;
  grid-template-columns: 48px 1fr;
}

.schedule-pin {
  width: 12px;
  height: 12px;

  position: absolute;

  margin-top: 22px;
  border-radius: 12px;

  background-color: #ffffff; /* 중심 흰색원 */
  border: 6px solid #4c97f1; /* 파란색 원 */
  outline: 8px solid #ffffff; /* 제일 바깥 흰색원 */
}

.schedule-line {
  width: 5px;
  height: calc(100% + 16px);

  margin-top: 16px;
  margin-bottom: -16px;

  background-color: #4c97f12b;
}

.table-col-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table-col-2 {
  margin: 12px 0;
  padding: 8px 8px;
  font-size: 14pt;

  border-radius: 4px;

  display: flex;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;

  color: #333333;
  background-color: #f8f9fd;
}

.schedule-text {
  margin-left: 12px;
}
</style>
