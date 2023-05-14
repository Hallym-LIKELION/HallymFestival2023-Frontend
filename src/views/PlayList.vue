<template>
  <main>
    <Header
      :image="HeaderImage"
      text="연예인 플리"
      content="이번 축제에 한림대에 와주시는 가수분들을 소개합니다!"
    />

    <div class="content">
      <p>
        이번 축제를 맞이하여 <br />개발팀에서 준비한 연예인 필청리스트!<br />
        많은 관심 바랍니다! <br />
        축제 때 와주시는 가수분들의 필청리스트를 복습하면서 공연을 기다리자구요!
      </p>
    </div>

  <div>
    <card
      image='@/assets/star/ChoiYena.png'
      name="John Doe"
      description="This is a card"
      buttonText="Click Me"
    />
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
      list: [
        {
          list: [
            {
              image: Yena,
              name: '최예나',
              content: ['대표곡: Smiley😀, SmartPhone📱'],
              mplaylist: '524507412'
            },
            {
              image: HiKey,
              name: '하이키',
              content: ['대표곡: 건물 사이에 피어난 장미🌹'],
              mplaylist: '524507378'
            }
          ]
        },
        {
          list: [
            {
              image: Loco,
              name: '로꼬',
              content: ['대표곡: 시간이 들겠지⏳, 니가 모르게😔'],
              mplaylist: '524507357'
            },
            {
              image: LeeHi,
              name: '이하이',
              content: ['대표곡: Rose🌹 , 한숨 😮‍💨'],
              mplaylist: '524507310'
            }
          ]
        }
      ]
    };
  },

  methods: {
    openMelon() {
      window.open('https://www.melon.com/mymusic/playlist/mymusicplaylistview_inform.htm?plylstSeq='+ id +'&ref={W20300}', '_blank');
       //하이키
       'https://www.melon.com/mymusic/playlist/mymusicplaylistview_inform.htm?plylstSeq=524507378&ref={W20300}',
        //로꼬
        'https://www.melon.com/mymusic/playlist/mymusicplaylistview_inform.htm?plylstSeq=524507357&ref={W20300}',
        //이하이
        'https://www.melon.com/mymusic/playlist/mymusicplaylistview_inform.htm?plylstSeq=524507310&ref={W20300}',

        '_blank'
    
    },
    openMelon() {}
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

.content > .list {
  width: 100%;
  margin-top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content > .list > .card:nth-child(1) {
  margin-right: 16px;
}
.content > .list > .card:nth-child(2) {
  margin-left: 16px;
}

.card {
  width: 200px;
  height: 240px;
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

.card > .card-info > .name {
  margin-top: 8px;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 14pt;
}
.card > .card-info > .desc {
  font-size: 11pt;
}
.card > .card-info > .small {
  margin-top: 8px;
  font-style: italic;
  font-size: 8pt;
}

:deep(.card-image) {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.buy {
  margin: 24px 0;
  max-width: 400px;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 14pt;
  color: white;
  background-color: #ca434c;
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
.hidden {
  visibility: hidden;
}

.wrapper {
  margin: 0 -28px;
  padding: 12px;
  background-color: #fbfbfbe6;
  border-radius: 72px 72px 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}

.wrapper > div {
  width: 100%;
  border-top: 3px solid #1d355224;
}

.wrapper > div:nth-child(1) {
  border-top: none;
}

.header {
  padding: 24px 0;
}

.header > p {
  font-size: 12pt;
  font-weight: 600;
}

.header > p.collab {
  margin-top: 16px;
  margin-bottom: 12px;
  font-size: 28pt;
}

.phrase {
  padding: 5px 0;
}

.phrase > p {
  margin: 5px auto;
  max-width: 540px;
  word-break: keep-all;
  line-height: 16pt;
}

.dev {
  padding: 24px 0;
}
.dev > .title {
  font-size: 22pt;
}

.dev > .team {
  font-weight: bolder;
  margin-top: 64px;
  font-size: 17pt;
  color: #20556c;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.team-image) {
  margin-right: 8px;
}

.dev > .team:nth-of-type(2) {
  margin-top: 12px;
}
.dev > .list {
  width: 100%;
  margin-top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dev > .list > .card:nth-child(1) {
  margin-right: 16px;
}
.dev > .list > .card:nth-child(2) {
  margin-left: 16px;
}

.card {
  width: 200px;
  padding: 12px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  transition: box-shadow 0.25s, transform 0.25s;
}

.card:hover {
  box-shadow: 0px 0px 8px #00000022;
  transform: scale(1.1);
}

.card > .card-info > .name {
  font-size: 14pt;
  font-weight: bolder;
}
.card > .card-info > .dept {
  margin-top: 4px;
  font-size: 10pt;
}

.card > .card-info > .git-button {
  margin-top: 16px;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: #5c859b;
  color: white;
}

:deep(.card-image) {
  max-width: 120px;
}

.staff {
  padding: 12px 0;
}

.staff > .title {
  margin-top: 12px;
  font-size: 12pt;
}

.staff > .list {
  width: 100%;
  margin-top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.staff > .list > .staff-card:nth-child(1) {
  margin-right: 16px;
}
.staff > .list > .staff-card:nth-child(2) {
  margin-left: 16px;
}

.staff-card {
  width: 200px;
  height: 180px;
  padding: 12px;
  font-size: 10pt;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  transition: box-shadow 0.25s, transform 0.25s;
}

.staff-card:hover {
  box-shadow: 0px 0px 8px #00000022;
  transform: scale(1.1);
}

.staff-card > p {
  margin-top: 8px;
}

.staff-card > p:nth-child(1) {
  font-weight: 600;
}

@media screen and (max-width: 400px) {
  .phrase > p {
    margin: 5px auto;
    max-width: 540px;
    word-break: keep-all;
    font-size: 10pt;
    line-height: 12pt;
  }

  .dev > .title {
    font-size: 16pt;
  }
  .dev > .team {
    font-size: 12pt;
  }

  :deep(.team-image) {
    width: 16px;
  }

  .dev > .list {
    margin: 0;
    flex-direction: column;
  }
  .card {
    margin-top: 16px;
  }

  .dev > .list > .card:nth-child(1) {
    margin-right: 0;
  }
  .dev > .list > .card:nth-child(2) {
    margin-left: 0;
  }

  .staff > .title {
    font-size: 12pt;
  }
  .staff > .list {
    margin: 0;
    flex-direction: column;
  }

  .staff-card {
    margin-top: 16px;
  }

  .staff > .list > .staff-card:nth-child(1) {
    margin-right: 0;
  }
  .staff > .list > .staff-card:nth-child(2) {
    margin-left: 0;
  }
}
</style>

