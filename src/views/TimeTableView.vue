<template>
  <main>
    <div class="background"></div>

    <Header :image="HeaderImage" text="타임 테이블" content="이번 축제의 운영 스케줄입니다!" />

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
          <div class="club_lineup" v-text="item.club"></div>

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
import HeaderImage from '@/assets/overlay/Otimetable.png';
import Header from '../components/Header.vue';
import { Icon } from '../library/icon';
import { gsap } from 'gsap';

let animationList = [];

export default {
  components: {
    Header
  },
  data() {
    return {
      HeaderImage,
      list: [
        {
          time: '12:00 ~ 12:40 ',
          content: ['물풍선 "나의 소녀시대"'],
          space: '한림대 대운동장',
          day: [1]
        },
        {
          time: '13:00 ~ 17:00 ',
          content: ['축제준비위원회 운영 부스'],
          space: 'CLC희망터',
          club: 'BOOTHS! :*한림 공방-나만의 Y2K템 만들기 *한림 공방-슈링클스 명찰 만들기 *한림시그널-매칭 부스 *한림고등학교 *도전 한림 100곡!-길거리 노래방',
          day: [1]
        },
        {
          time: '16:55 ~ 18:10 ',
          content: ['동아리 공연 1부'],
          club: 'LINE UP: CODA, 수레바퀴, 엑스레이',
          space: '한림대 대운동장',
          day: [1]
        },
        {
          time: '18:10 ~ 18:30',
          content: ['선포식'],
          space: '한림대 대운동장',
          day: [1]
        },
        {
          time: '18:30 ~ 20:40',
          content: ['동아리 공연 2부'],
          club: 'LINE UP: 유니콘, 두레박, 춤바람, 한림극회, 어셈블, 힙합PD',
          space: '한림대 대운동장',
          day: [1]
        },
        {
          time: '23:00 ~ 23:30',
          content: ['맥주 빨리 마시기 대회'],
          space: '사경관 앞 주점 길',
          day: [1]
        },
        {
          time: '13:00 ~ 17:00 ',
          content: ['축제준비위원회 운영 부스'],
          space: 'CLC희망터',
          club: 'BOOTHS! :*한림 공방-나만의 Y2K템 만들기 *한림 공방-슈링클스 명찰 만들기 *한림시그널-매칭 부스 *한림고등학교 *도전 한림 100곡!-길거리 노래방',
          day: [2]
        },
        {
          time: '15:30 ~ 17:45',
          content: ['천하제일 뻥쟁이 대회'],
          space: '한림대 대운동장',
          day: [2]
        },
        {
          time: '18:00 ~ 20:00 ',
          content: ['가요제'],
          space: '한림대 대운동장',
          day: [2]
        },
        {
          time: '20:00 ~ ',
          content: ['연예인 공연 2일차'],
          space: '한림대 대운동장',
          day: [2]
        },
        {
          time: '23:00 ~ 23:30',
          content: ['맥주 빨리 마시기 대회'],
          space: '사경관 앞 주점 길',
          day: [2]
        },
        {
          time: '13:00 ~ 17:00 ',
          content: ['축제준비위원회 운영 부스'],
          space: 'CLC희망터',
          club: 'BOOTHS! :*한림 공방-나만의 Y2K템 만들기 *한림 공방-슈링클스 명찰 만들기 *한림시그널-매칭 부스 *한림고등학교 *도전 한림 100곡!-길거리 노래방',
          day: [3]
        },
        {
          time: '16:00 ~ 18:00',
          content: ['멍때리기 대회'],
          space: '한림대 대운동장',
          day: [3]
        },
        {
          time: '18:05 ~ 19:25',
          content: ['댄스 경연대회'],
          space: '한림대 대운동장',
          day: [3]
        },
        {
          time: '19:25 ~ 20:00 ',
          content: ['폐회식'],
          space: '한림대 대운동장',
          day: [3]
        },
        {
          time: '20:00 ~ ',
          content: ['연예인 공연 3일차'],
          space: '한림대 대운동장',
          day: [3]
        },
        {
          time: '23:00 ~ 23:30',
          content: ['맥주 빨리 마시기 대회'],
          space: '사경관 앞 주점 길',
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
        club: item.club,
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

.background {
  position: absolute;
  z-index: 0;
  width: 824px;
  margin-top: 150px;
  margin-left: -28px;
  height: calc(100% - 56px - 250px);
  background-color: #fbfbfbe3;
  /* top: 10%; */
}

@media screen and (max-width: 824px) {
  .background {
    width: 100%;
  }
}

.button-group {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.button-group > button {
  border: none;
  color: white;
  cursor: pointer;
}

.button-group > button > div {
  margin: 4px 10px;
  padding: 6px 24px;
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

  position: relative;
  z-index: 1;

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
.club_lineup{
  min-height: 36px;
  margin-top: 4px;
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 9pt;
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

@media screen and (max-width: 400px) {
  .background {
    margin-top: 130px;
    height: calc(100% - 56px - 230px);
  }

  .button-group {
    margin: 0 -28px;
  }

  .button-group > button > div {
    margin: 4px 6px;
    padding: 6px 16px;
    font-size: 9pt;
  }

  .button-group > button > p {
    font-size: 9pt;
  }

  .table {
    margin: 0 -24px;
    margin-top: 16px;
  }

  .schedule-time {
    font-size: 10pt;
  }

  .schedule-text {
    font-size: 9pt;
  }
  .schedule-space {
    font-size: 8pt;
  }
}
</style>
