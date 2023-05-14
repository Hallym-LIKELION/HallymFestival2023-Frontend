<template>
  <main>
    <Header
      :image="HeaderImage"
      text="초청 연예인"
      content="이번 축제에 초청한 가수를 소개합니다!"
    />

    <div class="background"></div>

    <div class="content">
      <p>
        이번 축제를 맞이하여 <br />개발팀에서 준비한 연예인 필청리스트!<br />
        학생 여러분들의 많은 관심 바랍니다! <br />
        축제 때 와주시는 가수분들의 필청리스트를 복습하면서 공연을 더 즐겨볼까요?
      </p>

      <div class="list" v-for="anotherItem in cards">
        <div class="card" v-for="card in anotherItem" ref="card">
          <Image :src="card.image" class="card-image"></Image>
          <div class="card-text">
            <h2>{{ card.title }}</h2>
            <p>{{ card.description }}</p>
          </div>
          <div class="card-buton">
            <button @click="openMelon(card.melon)"><img :src="melon" alt="" /></button>
            <button @click="openYoutube(card.youtube)"><img :src="utube" alt="" /></button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Card from '../components/StarCard.vue';
import { gsap } from 'gsap';
import HeaderImage from '@/assets/overlay/Oplaylist.png';
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
      melon,
      utube,
      cards: [
        [
          {
            image: Yena,
            title: '최예나',
            description: 'Smiley😀\nSmartPhone📱',
            buttonText: '플리 바로가기',
            melon: 'EbbCsAjeQU',
            youtube: 'QSrVqCU3Tcs'
          },
          {
            image: HiKey,
            title: '하이키',
            description: '건물 사이에 피어난 장미🌹\n\n',
            buttonText: '플리 바로가기',
            melon: '7izOaxgCDy',
            youtube: 'utFiypgwHEk'
          }
        ],
        [
          {
            image: Loco,
            title: '로꼬',
            description: '시간이 들겠지⏳\n니가 모르게😔',
            buttonText: '플리 바로가기',
            melon: 'Qjw9d_IPzw',
            youtube: '_qh6HawM9DU'
          },
          {
            image: LeeHi,
            title: '이하이',
            description: 'Rose🌹\n한숨 😮‍💨',
            buttonText: '플리 바로가기',
            melon: 'TcGEn-K-52',
            youtube: 'ZbnhW3zFFbw'
          }
        ]
      ]
    };
  },
  methods: {
    openMelon(id) {
      window.open('http://kko.to/' + id, '_blank');
    },
    openYoutube(id) {
      window.open('https://www.youtube.com/watch?v=' + id, '_blank');
    }
  },
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
.background {
  position: absolute;
  z-index: 0;
  width: 824px;
  margin-top: 10px;
  margin-left: -28px;
  height: calc(100% - 56px - 200px);
  background-color: #fbfbfbe6;
  /* top: 10%; */
}

@media screen and (max-width: 824px) {
  .background {
    width: 100%;
  }
}

.content {
  position: relative;

  margin: 0 -28px;
  padding: 0 12px;
  padding-top: 24px;
  padding-bottom: 72px;
  border-radius: 72px 72px 0 0;

  z-index: 1;

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

.content > .list {
  width: 100%;
  margin-top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content > .list > .card:nth-child(1) {
  margin-right: 8px;
}
.content > .list > .card:nth-child(2) {
  margin-left: 8px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 200px;
  height: 280px;
  padding: 12px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  transition: box-shadow 0.25s, transform 0.25s;
}
.card:hover {
  box-shadow: 0px 0px 8px #00000022;
  transform: scale(1.05);
}

:deep(.card-image) {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.card-text {
  text-align: center;
}

.card-text h2 {
  margin-top: 8px;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 14pt;
}

.card-text p {
  font-size: 10pt;
  white-space: pre-wrap;
}

.card-buton {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-buton > button {
  width: 36px;
  height: 36px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  border-radius: 18px;
  font-size: 16px;
  cursor: pointer;
}

.card-buton > button:nth-child(1) {
  margin-right: 6px;
  background-color: #12d83a;
}
.card-buton > button:nth-child(2) {
  margin-left: 6px;
  background-color: #ff0000;
}

.card-buton > button > img {
  width: 24px;
}

@media screen and (max-width: 400px) {
  .content > p {
    font-size: 11pt;
  }
  .content > .list {
    margin: 0;
    flex-direction: column;
  }
  .card {
    margin-top: 16px;
  }

  .content > .list > .card:nth-child(1) {
    margin-right: 0;
  }
  .content > .list > .card:nth-child(2) {
    margin-left: 0;
  }
}
</style>
