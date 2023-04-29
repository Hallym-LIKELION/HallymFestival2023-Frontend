<template>
  <main>
    <div class ="title-wrap">
      <div class="title-image">
        <img src="@/assets/overlay/Otimetable.png" alt=""/>
        </div>
        <div class="title-text">
          타임 테이블
        </div>
    </div>

    <div class="button-group">
      <button @click="() => selectDay(1)" :class="{ selected: day === 1 }">화요일</button>
      <button @click="() => selectDay(2)" :class="{ selected: day === 2 }">수요일</button>
      <button @click="() => selectDay(3)" :class="{ selected: day === 3 }">목요일</button>
    </div>
    <hr style="border: solid 2px white " class ="line" />
    <div class="table">
      <template v-for="item in filltered_list">
        <div class="table-col-1">
          <div class="schedule-pin"></div>
          <div class="schedule-line" v-if="!item.hideLine"></div>
        </div>
        <div class="table-col-2">
          <div class="schedule-time" v-text="item.time"></div>
          <div class="schedule-text" v-text="item.content.join('\n')"></div>
          <div class="schedule-space" v-text="item.space"></div>
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
          space: '한림대 운동장',
          day: [2, 3]
        },
        {
          time: '11:00 ~ 12:00',
          content: ['테스트 AAA', '테스트 B'],
          space: '한림대 운동장',
          day: [1, 3]
        },
        {
          time: '13:00 ~ 14:00',
          content: ['테스트 CC', '테스트 DD'],
          space: '한림대 운동장',
          day: [2]
        },
        {
          time: '14:00 ~ 15:00',
          content: ['테스트 33', '테스트 4'],
          space: '한림대 운동장',
          day: [1, 2, 3]
        },
        {
          time: '16:00 ~ 17:00',
          content: ['테스트 EE', '테스트 FF', '테스트 GG', '테스트 HH'],
          space: '한림대 운동장',
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
        space: item.space,
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
.line{
  opacity : 0.3;
}
h1 {
  font-size: 20pt;
  text-align: center;
  padding: 36px 0;
  color: #ffffff;
}

.button-group {
  display: flex;
  justify-content: center;
}

.button-group > button {
  width:70px;
  height: 28px;
  margin: 0 10px;
  padding: 5px 18px;
  border: none;
  border-radius: 16px;
  color: #ffffff;
  cursor: pointer;
  font-size: 9pt;
  font-family: 'Nanum Gothic', sans-serif;
  transition: background-color 0.25s, color 0.25s;
}

.button-group > button.selected {
  background-color: #CA434C;
  color: white;
}

.table {
  max-width: 500px;
  background-color: white;
  opacity: 0.3;
  border: none;
  border-radius: 16px;

  margin: 48px auto;

  display: grid;
  grid-template-columns: 48px 1fr;
}

.schedule-pin {
  width: 12px;
  height: 12px;

  position: absolute;

  margin-top: 20px;
  border-radius: 12px;

  background-color: #CA434C; /* 중심 흰색원 */
  border: 6px solid #CA434C; /* 파란색 원 */
}

.schedule-line {
  width: 3px;
  height: calc(100% + 16px);
  opacity: 0.3;
  margin-top: 16px;
  margin-bottom: -16px;

  background-color: #FFFFFF;
}

.table-col-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table-col-2 {
  margin: 12px 0;
  padding: 8px 8px;
  font-size: 11pt;

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
