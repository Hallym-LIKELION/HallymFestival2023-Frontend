<template>
  <main>
    <Header
      :image="HeaderImage"
      text="가수분들의 PLAYLIST"
      content="이번 축제에 한림대에 와주시는 가수분들을 소개합니다!"
    />

    <div class="content">
      <p>
        이번 축제를 맞이하여 <br />개발팀에서 준비한 연예인 필청리스트!<br />
        학생 여러분들의 많은 관심 바랍니다! <br />
        축제 때 와주시는 가수분들의 필청리스트를 복습하면서 공연을 더 즐겨볼까요?
      </p>
    </div>

    <div class="card-container">
    <div class="card" v-for="(card, index) in cards" :key="index">
      <img :src="card.image" alt="" class="card-image">
      <div class="card-text">
        <h2>{{ card.title }}</h2>
        <p>{{ card.description }}</p>
        <button>{{ card.buttonText }}</button>
      </div>
    </div>
  </div>
  </main>
</template>

<script>
import Card from "../components/StarCard.vue";
import { gsap } from 'gsap';
import HeaderImage from '@/assets/overlay/OGoods.png';
import Header from '../components/Header.vue';
import Yena from '@/assets/star/ChoiYena.png';
import HiKey from '@/assets/star/HiKey.png';
import LeeHi from '@/assets/star/LeeHi.png';
import Loco from '@/assets/star/LoCo.png';
import melon from '@/assets/star/melon.png';
import utube from '@/assets/star/youtube.png';
import Image from '../components/Image.vue';

export default {
  components: { Card, Image, Header },
  data() {
    return {
      HeaderImage,
      cards: [
        {
          image: Yena,
          title: '최예나',
          description: '대표곡: Smiley😀, SmartPhone📱',
          buttonText: '플리 바로가기'
        },
        {
          image: HiKey,
          title: '하이키',
          description: '대표곡: 건물 사이에 피어난 장미🌹',
          buttonText:'플리 바로가기'
        },
        {
          image: Loco,
          title: '로꼬',
          description: '대표곡: 시간이 들겠지⏳, 니가 모르게😔',
          buttonText:'플리 바로가기'
        },
        {
          image:  LeeHi,
          title: '이하이',
          description: '대표곡: Rose🌹 , 한숨 😮‍💨',
          buttonText: '플리 바로가기'
        }
      ]
    };
  },
/*
  methods: {
    1. 멜론 플레이리스트 링크
    openMelon() {
      window.open('https://www.melon.com/mymusic/playlist/mymusicplaylistview_inform.htm?plylstSeq='+ id +'&ref={W20300}', '_blank');
      //최예나
      https://www.melon.com/mymusic/playlist/mymusicplaylistview_inform.htm?plylstSeq=524507412&ref={W20300}
       //하이키
       'https://www.melon.com/mymusic/playlist/mymusicplaylistview_inform.htm?plylstSeq=524507378&ref={W20300}',
        //로꼬
        'https://www.melon.com/mymusic/playlist/mymusicplaylistview_inform.htm?plylstSeq=524507357&ref={W20300}',
        //이하이
        'https://www.melon.com/mymusic/playlist/mymusicplaylistview_inform.htm?plylstSeq=524507310&ref={W20300}',

        '_blank'
    2.  유튜브 플레이리스트 링크
    //최예나
    https://www.youtube.com/watch?v=QSrVqCU3Tcs
    //하이키
    https://www.youtube.com/watch?v=utFiypgwHEk
    // 로꼬
    https://www.youtube.com/watch?v=_qh6HawM9DU
    // 이하이
    https://www.youtube.com/watch?v=ZbnhW3zFFbw
    },
    openMelon() {}
  },
*/
  mounted() {
    const list = this.$refs.card;

    list.forEach((item, i) =>
      gsap.fromTo(
        item,
        {
          opacity: 0,
          transform: 'translateY(10%)'
        },
        {
          delay: 0.5 + i * 0.1,
          duration: 0.5,
          opacity: 1,
          transform: 'none',
          onComplete: function () {
            gsap.set(this.targets(), { clearProps: 'all' });
          }
        }
      )
    );
  }
};
</script>

<style scoped>
.content {
  margin: 0 -28px;
  padding: 0 12px;
  padding-top: 24px;
  background-color: #fbfbfbe6;
  border-radius: 72px 72px 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}

.content > p {
  margin: 24px 8px;
  font-size: 12pt;
  max-width: 600px;
  word-break: keep-all;
  line-height: 16pt;
}

.content > .card {
  width: 100%;
  margin-top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 300px;
  margin: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 5px 5px 0px 0px;
}

.card-text {
  padding: 20px;
  text-align: center;
}

.card-text h2 {
  margin: 0;
  font-size: 24px;
}

.card-text p {
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.5;
}

button {
  margin-top: 20px;
  background-color: #ca434c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color:#ca434c;
}

</style>

