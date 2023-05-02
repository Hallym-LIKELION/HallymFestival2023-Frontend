<template>
  <main>
    <div class="introment">
      <p>"우리의 모든 시간은 연결되어있어"</p>
    </div>
    <div class="logo">
      <img src="@/assets/logo.png" />
    </div>
    <div class="totalvisitor">
      <h3>Today</h3>
      <h1>86,972</h1>
      <div class="chart">
        <Chart :options="chart"></Chart>
      </div>
    </div>
    <div class="ownermenu" ref="ownermenu">
      <RouterLink to="/announcement">공지사항</RouterLink>
      <RouterLink to="/boothmap">부스 현황 분석</RouterLink>
      <RouterLink to="/admin/comment">신고 댓글 분석</RouterLink>
      <RouterLink to="/admin/boothcomment">신고 방명록 분석</RouterLink>
    </div>
  </main>
</template>

<script>
import { Chart } from 'highcharts-vue';

export default {
  components: {
    Chart
  },

  data() {
    return {
      chart: {
        chart: {
          backgroundColor: '#333333',
          style: { fontFamily: 'NanumGothic, Helvetica, Arial, sans-serif' },
          spacing: [0, 20, 20, 20],
          height: 300
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: Array.from(Array(11)).map((e, i) => i + 8),
          labels: {
            style: { fontSize: '9pt', color: '#ffffff' }
          }
        },
        yAxis: {
          visible: false
        },
        legend: {
          enabled: false
        },
        series: [
          {
            name: '방문자',
            data: [15, 14, 13, 12, 17, 16, 20, 28, 35, 36, 32]
          }
        ]
      }
    };
  },

  props: {},

  created() {}
};
</script>

<style scoped>
main {
  margin-bottom: 80px;
}

.logo {
  display: flex;
  justify-content: center;
}
.introment {
  font-family: 'Nanum Gothic', sans-serif;
  font-style: normal;
  font-size: 15px;
  line-height: 13px;
  text-align: center;
  letter-spacing: 0.15em;
  margin: 0;
  padding: 36px 0;
  color: #ffffff;
}
.totalvisitor {
  text-align: center;
  margin: 0;
  padding: 10px 0;
  color: #ffffff;
}

.chart {
  margin: auto;
  margin-top: 16px;
  max-width: 400px;
  height: 300px;
  overflow: hidden;
}
.ownermenu {
  font-family: 'Nanum Gothic', sans-serif;
  max-width: 322.29px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 24px;
}
.ownermenu > * {
  width: 100%;
  margin: 4px;
  padding: 10px 0;
  border-radius: 46.25px;
  font-size: 13pt;
  text-align: center;
  text-decoration: none;
  color: black;
  background-color: lightgray;
}
</style>
