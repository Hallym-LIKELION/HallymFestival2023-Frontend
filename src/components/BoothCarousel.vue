<template>
  <div>
    <Carousel :items-to-show="1" :wrapAround="true" v-model="_slide">
      <Slide v-if="isAdmin" v-for="(item, index) in charts" :key="index">
        <Chart :options="item"></Chart>
      </Slide>
      <Slide v-if="!isAdmin" v-for="(item, index) in image" :key="index">
        <Image class="image" :src="item" width="500" height="400" spinner-size="300" />
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import Image from '../components/Image.vue';

function CreateChart(title, item) {
  let series = [];
  let sum = 800;
  for (let i = 0; i < 5; i++) {
    sum += Math.floor(Math.random() * 300);
    series.push(sum);
  }
  series.reverse();
  return JSON.parse(
    JSON.stringify({
      chart: {
        type: 'bar',
        backgroundColor: '#333333',
        style: { fontFamily: 'NanumGothic, Helvetica, Arial, sans-serif' },
        spacing: [20, 10, 20, 20]
      },
      title: {
        text: title,
        style: { color: '#ffffff' },
        align: 'left'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: ['항목이', '가장', '많은 부스', 'TOP 5', '아무거나 긴 부스명'],
        labels: {
          style: { color: '#ffffff' }
        }
      },
      yAxis: {
        visible: false,
        min: 0,
        title: {
          text: item,
          align: 'high'
        },
        labels: {
          style: { color: '#ffffff' },
          overflow: 'justify'
        },
        gridLineWidth: 0
      },
      plotOptions: {
        bar: {
          borderColor: 'none',
          borderRadius: 60,
          dataLabels: {
            enabled: true,
            align: 'right',
            x: -10,
            color: '#333333',
            style: {
              textOutline: 0
            }
          }
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      series: [
        {
          data: series
        }
      ]
    })
  );
}

export default {
  components: {
    Carousel,
    Slide,
    Navigation,
    Image,
    Chart
  },

  data() {
    return {
      _slide: 0,

      charts: [
        CreateChart('좋아요가 가장 많은 부스 TOP 5', '좋아요'),
        CreateChart('댓글이 가장 많은 부스 TOP 5', '댓글'),
        CreateChart('신고받은 댓글이 가장 많은 부스 TOP 5', '신고받은 댓글')
      ],

      image: [
        'https://placehold.co/500x400/aa2222/FFFFFF/png?text=Tuesday',
        'https://placehold.co/500x400/22AA22/FFFFFF/png?text=Wednesday',
        'https://placehold.co/500x400/3333AA/FFFFFF/png?text=Thursday',
        'https://placehold.co/500x400/222222/FFFFFF/png?text=Night+time'
      ]
    };
  },

  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    slide: {
      type: Number,
      default: 0
    }
  },

  computed: {
    chart() {}
  },

  watch: {
    slide(value) {
      this._slide = value;
    }
  },

  created() {}
};
</script>
<style scoped>
div {
  width: 100%;
  margin-left: -6px;
}
:deep(.carousel) {
  max-width: 420px;
  margin: auto;
}

:deep(.image) {
  width: 100%;
  object-fit: contain;
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  color: white;
}

:deep(.highcharts-container) {
  width: 100%;
  height: 300px;
}
</style>
