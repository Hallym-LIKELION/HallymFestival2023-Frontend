<template>
  <div>
    <div class="title-wrap">
      <div class="title-image">
        <img src="@/assets/overlay/Oaboutus.png" alt="" />
      </div>
      <div class="title-text">만든이들</div>
    </div>
    <div class="wrapper">
      <div class="header">
        <p>한림대학교 멋쟁이사자처럼 Builder Team</p>
        <p class="collab">X</p>
        <p>2023 한림대학교 축제준비위원회</p>
      </div>
      <div class="phrase">
        <p v-for="item in phrase">{{ item }}</p>
      </div>
      <div class="dev">
        <p class="title">Developer</p>
        <template v-for="item in devTeam">
          <p class="team">{{ item.name }}</p>
          <div class="list" v-for="list in item.list">
            <template v-for="person in list">
              <div :class="['card', { hidden: person.empty }]">
                <Image
                  :src="person.image"
                  alt=""
                  class="card-image"
                  width="100"
                  height="100"
                  v-if="!person.empty"
                />
                <div class="card-info" v-if="!person.empty">
                  <p class="name">{{ person.name }}</p>
                  <p class="dept">{{ person.department }}</p>
                  <button
                    @click="openGithub(person.github)"
                    class="git-button"
                    v-if="person.github"
                  >
                    {{ person.name.slice(1, 3) }}'s Github
                  </button>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
      <div class="staff">
        <p class="title">2023 한림대학교 축제준비위원회</p>
        <template v-for="item in staffList">
          <div class="list" v-for="list in item">
            <template v-for="anotherItem in list">
              <div :class="['staff-card', { hidden: anotherItem === null }]">
                <p class="credit" v-for="text in anotherItem">{{ text }}</p>
              </div></template
            >
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Image from '../components/Image.vue';

import SoHyunImage from '@/assets/developer/osohyun.png';
import KyungJaeImage from '@/assets/developer/kimkyungjae.png';
import DongHeongImage from '@/assets/developer/leedongheon.png';
import JuYoungImage from '@/assets/developer/parkjuyoung.png';
import MiJinImage from '@/assets/developer/kimmijin.png';
import ARiImage from '@/assets/developer/choiari.png';
import YuJinImage from '@/assets/developer/oyujin.png';

export default {
  data() {
    return {
      phrase: [
        '2023년도 한림대학교 대동제를 위하여 한림대학교 축제준비위원회가 열정을 쏟아 축제를 준비하고 학우분들의 편의를 위하여 한림대 멋쟁이사자처럼 빌더팀이 축제 웹사이트를 개발하였습니다.',
        '이번 2023 한림대학교 대동제가 여느때보다 즐겁고 행복한 축제가 되시기를 진심으로 소망합니다. 학우 여러분들의 예쁘고 찬란한 청춘을 응원합니다!'
      ],
      devTeam: [
        {
          name: 'Frontend',
          list: [
            [
              {
                image: SoHyunImage,
                name: '오소현',
                department: '빅데이터학과 20',
                github: 'osohyun0224'
              },
              {
                image: KyungJaeImage,
                name: '김경재',
                department: '빅데이터학과 20',
                github: 'PortalCube'
              }
            ]
          ]
        },
        {
          name: 'Backend',
          list: [
            [
              {
                image: DongHeongImage,
                name: '이동헌',
                department: '빅데이터학과 15',
                github: 'Sirius506775'
              },
              {
                image: JuYoungImage,
                name: '박주영',
                department: '콘텐츠IT학과 19',
                github: 'mythpoy'
              }
            ],
            [
              {
                image: MiJinImage,
                name: '김미진',
                department: '빅데이터학과 20',
                github: 'mijin0721'
              },
              { empty: true }
            ]
          ]
        },
        {
          name: 'PM / Design',
          list: [
            [
              {
                image: ARiImage,
                name: '최아리',
                department: '경영학과 21'
              },
              {
                image: YuJinImage,
                name: '오유진',
                department: '광고홍보학과 19'
              }
            ]
          ]
        }
      ],
      staffList: [
        {
          list: [
            ['⭐회장단⭐', '위원장 윤토아', '부위원장 안영중'],
            [
              '⭐홍보팀⭐',
              '팀장 김강수',
              '부팀장 김채현',
              '안태현 조아현',
              '이윤정 성윤서',
              '이형민'
            ]
          ]
        },
        {
          list: [
            [
              '⭐무대팀⭐',
              '팀장 김수인',
              '부팀장 유진영',
              '유채연 윤혜원 서승권',
              '양경민 김주은 성보겸',
              '이주영 조건호 김규민'
            ],
            [
              '⭐행사팀⭐',
              '팀장 성예진',
              '부팀장 박시언',
              '홍여경 장현우 임현수 박시온',
              '전성은 권예원 장수진 김소연',
              '주경은 심혜련 이한성'
            ]
          ]
        },
        {
          list: [
            [
              '⭐밤부스팀⭐',
              '팀장 서채린',
              '부팀장 유정근 이수현',
              '강지은 송영재 정예빈 김시현',
              '경규원 박준하 김성주',
              '고윤주 이재원 이지은'
            ],
            [
              '⭐관리팀⭐',
              '팀장 박지훈',
              '부팀장 김규현 송수연',
              '유지원 임연오 윤준혁',
              '김린 정호윤'
            ]
          ]
        }
      ]
    };
  },
  components: { Image },
  methods: {
    openGithub(id) {
      window.open('https://github.com/' + id, '_blank');
    }
  }
};
</script>

<style scoped>
.title-image{
  width:50%;
  margin: 9px auto;
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
}

.header > p.collab {
  margin-top: 4px;
  font-size: 28pt;
  font-weight: 600;
}

.phrase {
  padding: 12px 0;
}

.phrase > p {
  margin: 24px auto;
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
  margin-top: 64px;
  font-size: 18pt;
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
}

.card > .card-info > .name {
  font-size: 14pt;
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
  font-size: 16pt;
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
  height: 200px;
  padding: 12px;
  font-size: 10pt;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
}

.staff-card > p {
  margin-top: 8px;
}

@media screen and (max-width: 400px) {
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
