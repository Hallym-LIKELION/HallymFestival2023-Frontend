<template>
  <main>
    <h1>타임 테이블</h1>
    <div class="buttonGroup">
      <button @click="() => changeDay(1)">화요일</button>
      <button @click="() => changeDay(2)">수요일</button>
      <button @click="() => changeDay(3)">목요일</button>
    </div>
    <div class="tableContainer">
      <div class="left table">
        <div class="schedule-group">
          <div class="schedule-header">
            <p class="schedule-time">11:00 ~ 17:00</p>
            <div class="schedule-pin"></div>
          </div>
          <div class="schedule-content">
            <div class="schedule-item">
              <p class="schedule-title">한림오락실</p>
              <p class="schedule-location">CLC 2층</p>
            </div>
            <div class="schedule-item">
              <p class="schedule-title">교내 부스</p>
              <p class="schedule-location">교내 전체</p>
            </div>
          </div>
        </div>
        <div class="schedule-group" style="margin-top: 150px">
          <div class="schedule-header">
            <p class="schedule-time">16:00 ~ 22:00</p>
            <div class="schedule-pin"></div>
          </div>
          <div class="schedule-content">
            <div class="schedule-item">
              <p class="schedule-title">연예인 공연</p>
              <p class="schedule-location">대운동장</p>
            </div>
            <div class="schedule-item">
              <p class="schedule-title">야시장 & 주점</p>
              <p class="schedule-location">교내 전체</p>
            </div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="right table">
        <div class="schedule-group" style="margin-top: 60px">
          <div class="schedule-header">
            <div class="schedule-pin"></div>
            <p class="schedule-time">11:30 ~ 16:30</p>
          </div>
          <div class="schedule-content">
            <div class="schedule-item">
              <p class="schedule-title">푸드 트럭</p>
              <p class="schedule-location">CLC 앞</p>
            </div>
          </div>
        </div>
        <div class="schedule-group" style="margin-top: 40px">
          <div class="schedule-header">
            <div class="schedule-pin"></div>
            <p class="schedule-time">13:30 ~ 15:30</p>
          </div>
          <div class="schedule-content">
            <div class="schedule-item">
              <p class="schedule-title">퍼포먼스 쇼</p>
              <p class="schedule-location">학교 어딘가..</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      day: 0
    };
  },
  methods: {
    changeDay(day) {
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
  margin: 0;
  padding: 36px 0;
}

.buttonGroup {
  display: flex;
  justify-content: center;
}

.buttonGroup > button {
  margin: 0 10px;
  padding: 5px 18px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
}

.tableContainer {
  margin-top: 48px;
  display: flex;
  justify-content: center;
}

.tableContainer > * {
  height: 600px;
}

.table {
  width: 300px;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.table.right > .schedule-group {
  margin-left: 36px;
}
.table.left > .schedule-group {
  margin-right: 36px;
}

.table.right .schedule-content {
  padding-right: 20px;
}
.table.left .schedule-content {
  padding-left: 20px;
}

.table.left {
  text-align: right;
  align-items: flex-end;
}

.divider {
  border-right: 2px solid transparent;
  border-image: linear-gradient(180deg, rgba(29, 181, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
  border-image-slice: 1;
}

p {
  margin: 0;
  color: black;
}

.schedule {
}

.schedule-header {
  display: flex;
}

.table.left .schedule-header {
  justify-content: flex-end;
}

.schedule-content {
  display: flex;
  flex-direction: column;
}

.schedule-time {
  font-size: 14pt;
  color: #333333;
}

.schedule-pin {
  width: 24px;
  height: 24px;

  background-color: #27c2a3;
  border-radius: 12px;
}

.table.left .schedule-pin {
  margin-right: -49px;
}
.table.right .schedule-pin {
  margin-left: -49px;
}

.table.left .schedule-time {
  margin-right: 24px;
}
.table.right .schedule-time {
  margin-left: 24px;
}

.schedule-item {
  margin: 6px 0;
}

.schedule-title {
  font-size: 18pt;
}

.schedule-location {
  font-size: 11pt;
  line-height: 11pt;
}
</style>
