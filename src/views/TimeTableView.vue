<template>
  <main>
    <h1>타임 테이블</h1>

    <div class="button-group">
      <button @click="() => selectDay(1)" :class="{ selected: day === 1 }">화요일</button>
      <button @click="() => selectDay(2)" :class="{ selected: day === 2 }">수요일</button>
      <button @click="() => selectDay(3)" :class="{ selected: day === 3 }">목요일</button>
    </div>

    <div class="table">
      <template v-for="item in filltered_list" :key="item.id">
        <div class="schedule-group">
          <div class="schedule-pin"></div>
          <p class="schedule-content" v-text="`${item.time} ${item.title}`"></p>
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

.table {
  max-width: 500px;

  margin: 48px auto;

  display: flex;
  flex-direction: column;

  /* 왼쪽에 옅은 파란선 그리기 */
  border-left: 6px solid #4c97f12b;
  border-image-slice: 1;
}

.schedule-group {
  display: flex;

  margin-top: -24px; /* top -> pin을 좌측 선의 맨 윗부분에 두기 위해서 지정 */
  margin-left: 24px; /* left -> 좌측 선에서 좀 때어두기 위해서 지정 */
  margin-bottom: 48px; /* bottom -> top 때문에 간격이 너무 줄어서 간격을 다시 늘리기 위해 지정 */

  padding: 10px;
  border-radius: 10px;
  background-color: #f8f9fd;
}

.schedule-group:last-child {
  margin-bottom: 0px; /* bottom -> top 때문에 간격이 너무 줄어서 간격을 다시 늘리기 위해 지정 */
}

.schedule-pin {
  width: 12px;
  height: 12px;

  /* 절대적인 위치를 갖도록하여 content와의 간섭을 줄이고, margin으로 왼쪽 선에 갖다두기 */
  position: absolute;
  margin-left: -49px;

  border-radius: 12px;

  background-color: #ffffff; /* 중심 흰색원 */
  border: 6px solid #4c97f1; /* 파란색 원 */
  outline: 8px solid #ffffff; /* 제일 바깥 흰색원 */
}

.schedule-content {
  font-size: 14pt;
  color: #333333;
}
</style>
