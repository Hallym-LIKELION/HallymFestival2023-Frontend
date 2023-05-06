<template>
  <main>
    <br/><br/><br/><br/>
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
    <br/><br/>
    <hr style="border: solid 2px white " class ="line" />
    
    <div class="table">
      <template v-for="item in filltered_list">
        <div class="table-col-1">
          <div class="schedule-pin"><img src="@/assets/ttletter.png" alt=""/> </div>
          <div class="schedule-line" v-if="!item.hideLine"></div>
        </div>
        <div class="table-col-2">
          <div class="schedule-time" v-text="item.time"></div>

          <div class="schedule-text" v-text="item.content.join('\n')" ></div>
     
          <div class="schedule-space" v-text="item.space">  </div>
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
          time: '13:10 ~ 16:40',
          content: ['동아리 공연 리허설'],
          space: '🚩 한림대 운동장',
          day: [1]
        },
        {
          time: '16:55 ~ 20:55',
          content: ['동아리 공연'],
          space: '🚩 한림대 운동장',
          day: [1]
        },
        {
          time: '21:00 ~ 21:30',
          content: ['선포식'],
          space: '🚩 한림대 운동장',
          day: [1]
        },
        {
          time: '15:00 ~ 16:30',
          content: ['가요제 리허설'],
          space: '🚩 한림대 운동장',
          day: [2]
        },
        {
          time: '16:30 ~ 18:00',
          content: ['천하제일 뻥쟁이 대회'],
          space: '🚩 한림대 운동장',
          day: [2]
        },
        {
          time: '18:00 ~ 20:00',
          content: ['가요제'],
          space: '🚩 한림대 운동장',
          day: [2]
        },
        {
          time: '20:00 ~ ',
          content: ['연예인 공연'],
          space: '🚩 한림대 운동장',
          day: [2]
        },
        {
          time: '15:00 ~ 17:00',
          content: ['댄스 경연대회 리허설'],
          space: '🚩 한림대 운동장',
          day: [3]
        },
        {
          time: '17:00 ~ 19:00',
          content: ['멍 때리기 대회'],
          space: '🚩 한림대 운동장',
          day: [3]
        },
        {
          time: '19:00 ~ 20:50',
          content: ['댄스 경연 대회'],
          space: '🚩 한림대 운동장',
          day: [3]
        },
        {
          time: '21:00 ~ ',
          content: ['연예인 공연'],
          space: '🚩 한림대 운동장',
          day: [3]
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
  font-family: 'NanumGothicOTF';
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
  background-color:rgba(255, 255, 255, 0.7);
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

}

.schedule-line {
  width: 3px;
  height: calc(100% + 16px);
  margin-top: 23px;
  margin-bottom: -18px;

  background-color: #AAAAAA;
}

.table-col-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table-col-2 {
  margin: 12px 0;
  padding: 8px 8px;
  font-size: 10pt;
  width: 260px 100%;
  height: auto;
  border-radius: 4px;

  display: flex;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;

  color: #333333;
  background-color:rgba(255, 255, 255, 0.6);
}
.schedule-time{
  font-family:  'Nanum Gothic';
  font-weight: bold;
  font-size: 1.0rem;
  word-break:break-all;

}

.schedule-text {
  font-family:  'Nanum Gothic';
  font-weight: bold;
  font-size: 0.9rem;
  margin-left: 12px;
  word-break:break-all;
}
.schedule-space{
  font-family: 'Nanum Gothic';
  font-weight: bold;
  font-size: 0.8rem;
  margin-left: 12px;
}
</style>
