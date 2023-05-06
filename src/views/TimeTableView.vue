<template>
  <main>
    <div class="title-wrap">
      <div class="title-image">
        <img src="@/assets/overlay/Otimetable.png" alt="" />
      </div>
      <div class="title-text">타임 테이블</div>
    </div>

    <div class="button-group">
      <button @click="() => selectDay(1)" :class="{ selected: day === 1 }">화요일</button>
      <button @click="() => selectDay(2)" :class="{ selected: day === 2 }">수요일</button>
      <button @click="() => selectDay(3)" :class="{ selected: day === 3 }">목요일</button>
    </div>
    <hr style="border: solid 2px white" class="line" />

    <div class="table">
      <template v-for="item in filltered_list">
        <div class="table-col-1">
          <div class="schedule-pin"><img src="@/assets/ttletter.png" alt="" /></div>
          <div class="schedule-line"></div>
        </div>
        <div class="table-col-2">
          <div class="schedule-time" v-text="item.time"></div>

          <div class="schedule-text" v-text="item.content.join('\n')"></div>

          <div class="schedule-space">
            <img :src="Icon.space" alt="" />
            {{ item.space }}
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import { Icon } from '../library/icon';
export default {
  data() {
    return {
      list: [
        {
          time: '09:00 ~ 10:00',
          content: ['축제 스타트!'],
          space: '한림대 어딘가',
          day: [1]
        },
        {
          time: '10:00 ~ 10:30',
          content: ['축제 이벤트 2'],
          space: '한림대 공학관',
          day: [1]
        },
        {
          time: '10:00 ~ 10:30',
          content: ['축제 이벤트 3'],
          space: '한림대학교',
          day: [1]
        },
        {
          time: '10:00 ~ 10:30',
          content: ['2일차 시작!!'],
          space: '한림대 공학관',
          day: [2]
        },
        {
          time: '14:00 ~ 17:00',
          content: ['동아리 공연!'],
          space: '한림대학교',
          day: [2]
        },
        {
          time: '10:00 ~ 10:30',
          content: ['아무거나 내용~~'],
          space: '자연과학관 3층',
          day: [3]
        },
        {
          time: '14:00 ~ 17:00',
          content: ['뭔진 모르겠지만 일단 활동!'],
          space: 'CLC 2층',
          day: [3]
        }
      ],
      day: 1,
      Icon
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
      this.day = day;
    }
  }
};
</script>

<style scoped>
main {
  min-height: calc(100vh - 136px);
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

.line {
  opacity: 0.3;
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
  width: 70px;
  height: 28px;
  margin: 0 10px;
  padding: 5px 18px;
  border: none;
  border-radius: 16px;
  color: #ffffff;
  cursor: pointer;
  font-size: 9pt;
  transition: background-color 0.25s, color 0.25s;
}

.button-group > button.selected {
  background-color: #ca434c;
  color: white;
}

.table {
  max-width: 500px;
  height: 100%;
  border: none;
  border-radius: 16px;

  margin: 48px auto;

  display: grid;
  grid-template-columns: 48px 1fr;
}

.schedule-pin {
  position: absolute;

  margin-top: 25px;
}

.schedule-line {
  width: 3px;
  height: calc(100% - 36px);
  margin-top: 54px;
  margin-bottom: -10px;

  background-color: #aaaaaa;
}

.table > *:nth-last-child(2) > .schedule-line {
  height: calc(100% - 72px);
}

.table-col-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table-col-2 {
  margin: 12px 0;
  padding: 12px 16px;
  font-size: 10pt;
  width: 260px 100%;
  height: auto;
  border-radius: 18px;

  display: flex;

  flex-direction: column;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;

  color: #333333;
  background-color: rgba(255, 255, 255, 0.6);
}
.schedule-time {
  font-weight: 600;
  font-size: 13pt;
  word-break: break-all;
}

.schedule-text {
  min-height: 36px;
  margin-top: 4px;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 12pt;
  word-break: break-all;
}
.schedule-space {
  font-size: 10pt;

  display: flex;
  align-items: center;
}

.schedule-space > img {
  width: 14px;
}
</style>
