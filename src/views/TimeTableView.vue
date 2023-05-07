<template>
  <main>
    <div class="background"></div>

    <div class="title-wrap">
      <div class="title-image">
        <img src="@/assets/overlay/Otimetable.png" alt="" />
      </div>
      <br />
      <div class="title-text">타임 테이블</div>
    </div>

    <div class="button-group">
      <button @click="() => selectDay(1)" :class="{ selected: day === 1 }">
        <p>16일</p>
        <div>화요일</div>
      </button>
      <button @click="() => selectDay(2)" :class="{ selected: day === 2 }">
        <p>17일</p>
        <div>수요일</div>
      </button>
      <button @click="() => selectDay(3)" :class="{ selected: day === 3 }">
        <p>18일</p>
        <div>목요일</div>
      </button>
    </div>

    <div ref="table" :class="['table', { hidden: tableHidden }]">
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
import { gsap } from 'gsap';

let animationList = [];

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
      tableHidden: true,
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
      if (this.day !== day) {
        this.day = day;

        this.tableHidden = true;

        setTimeout(this.animation, 100);
      }
    },
    animation() {
      // pin이랑 table-col-2 띄우고
      // line 띄우고
      // pin이랑 table-col-2 띄우고
      // line 띄우고
      // ....

      animationList.forEach((item) => item.pause());
      animationList = [];

      this.tableHidden = false;

      for (let i = 0; i < this.filltered_list.length; i++) {
        const pin = this.$refs.table.children[i * 2].querySelector('.schedule-pin');
        const content = this.$refs.table.children[i * 2 + 1];
        const line = this.$refs.table.children[i * 2].querySelector('.schedule-line');

        console.log(i);

        animationList.push(
          gsap.fromTo(
            pin,
            {
              transform: 'translateY(-40%)',
              opacity: 0
            },
            {
              delay: 0.1 + i * 0.6,
              duration: 0.5,
              transform: 'none',
              opacity: 1
            }
          ),
          gsap.fromTo(
            content,
            {
              transform: 'translateY(-10%)',
              opacity: 0
            },
            {
              delay: 0.1 + i * 0.6,
              duration: 0.5,
              transform: 'none',
              opacity: 1
            }
          ),
          gsap.fromTo(
            line,
            {
              transform: 'translateY(-4%)',
              maxHeight: '0%'
            },
            {
              delay: 0.3 + i * 0.6,
              duration: 1,
              maxHeight: 'calc(100% - 36px)',
              transform: 'none',
              ease: 'Expo.easeOut'
            }
          )
        );
      }
    }
  },
  mounted() {
    this.animation();
  }
};
</script>

<style scoped>
.title-image {
  width: 50%;
  margin: 10px auto;
}
main {
  overflow: hidden;
  min-height: calc(100vh - 136px);
}

.background {
  position: absolute;
  z-index: -1;
  width: 824px;
  margin-top: 160px;
  margin-left: -28px;
  height: calc(100% - 56px - 160px);
  background-color: #fbfbfbe3;
  /* top: 10%; */
}

@media screen and (max-width: 824px) {
  .background {
    width: 100%;
  }
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
  border: none;
  color: white;
  cursor: pointer;
}

.button-group > button > div {
  width: 70px;
  height: 28px;
  margin: 4px 10px;
  padding: 2px 8px;
  border-radius: 28px;

  font-size: 12pt;
  font-weight: 600;

  color: #ffffff66;
  background-color: #ffffff1e;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.25s, color 0.25s;
}
.button-group > button.selected > div {
  color: #ffffff;
  background-color: #ca434c;
}

.button-group > button > p {
  color: #ffffff66;
  font-size: 12pt;
  transition: background-color 0.25s, color 0.25s;
}

.button-group > button.selected > p {
  color: #ffffff;
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
  width: 2px;
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
  margin-right: 16px;
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
  box-shadow: 0px 0px 19px rgba(135, 134, 134, 0.25);
}

.hidden {
  visibility: hidden;
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
