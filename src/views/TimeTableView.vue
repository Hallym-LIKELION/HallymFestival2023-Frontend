<template>
  <main>
    <h1>타임 테이블</h1>

    <div class="button-group">
      <button @click="() => selectDay(1)" :class="{ selected: day === 1 }">화요일</button>
      <button @click="() => selectDay(2)" :class="{ selected: day === 2 }">수요일</button>
      <button @click="() => selectDay(3)" :class="{ selected: day === 3 }">목요일</button>
    </div>

    <div class="table-wrapper">
      <div class="divider"></div>
      <div class="table">
        <template v-for="(item, index) in filltered_list">
          <div class="schedule-group">
            <div class="schedule-pin"></div>
            <p class="schedule-time" v-text="`${item.time} ${item.title}`"></p>
          </div>
        </template>
      </div>
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
          title: '축제 아이템 1 (수, 목)',
          day: [2, 3]
        },
        {
          time: '10:00 ~ 11:00',
          title: '축제 아이템 2 (화, 목)',
          day: [1, 3]
        },
        {
          time: '11:00 ~ 12:00',
          title: '축제 아이템 3 (수, 목)',
          day: [2, 3]
        },
        {
          time: '14:00 ~ 16:00',
          title: '축제 아이템 4 (화, 수)',
          day: [1, 2]
        },
        {
          time: '16:00 ~ 18:00',
          title: '축제 아이템 5 (화, 수, 목)',
          day: [1, 2, 3]
        },
        {
          time: '18:00 ~ 22:00',
          title: '축제 아이템 6 (수)',
          day: [2]
        }
      ],
      day: 0
    };
  },
  computed: {
    filltered_list() {
      return this.list.filter((item) => {
        // 1. 요일에 따른 필터링
        return this.day === 0 || item.day.includes(this.day);
      });
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
p {
  margin: 0;
  color: black;
}

h1 {
  font-size: 20pt;
  text-align: center;
  margin: 0;
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

.table-wrapper {
  max-width: 500px;
  margin: auto;
  margin-top: 48px;

  padding: 0 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-wrapper > * {
  height: 900px;
}
.divider {
  border-right: 6px solid #4c97f12b;
  /* border-image: linear-gradient(180deg, rgba(29, 181, 255, 1) 0%, rgba(255, 255, 255, 0) 100%); */
  border-image-slice: 1;
}

.table {
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.schedule-group {
  display: flex;
  margin-top: -24px;
  margin-left: 24px;
  margin-bottom: 48px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f8f9fd;
}

.schedule-time {
  margin-left: 24px;
  font-size: 14pt;
  color: #333333;
}

.schedule-pin {
  width: 20px;
  height: 20px;

  border-radius: 20px;

  margin-left: -53px;

  background-color: #ffffff; /* 중심 흰색원 */
  border: 6px solid #4c97f1; /* 파란색 원 */
  outline: 8px solid #ffffff; /* 제일 바깥 흰색원 */
}
</style>
