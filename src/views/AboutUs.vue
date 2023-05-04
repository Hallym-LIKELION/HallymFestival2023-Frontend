<template>
  <main>
    <div class="title-wrap">
      <div class="title-image">
        <img src="@/assets/overlay/Oaboutus.png" alt="" />
      </div>
      <div class="title-text">만든이들</div>
    </div>
    <div class="about-text">
      <TitleContainer>
        <Logo className="introduce" text-align: center>
          <h3>
            <br /><br />
            한림대학교 멋쟁이사자처럼 <br />
            Builder Team
          </h3>

          <h4><b>X</b></h4>
          <h3>
            2023 한림대학교 <br />
            축제준비위원회
          </h3>
        </Logo>
        <br /><br />
        <hr style="border: solid 2px" class="line" />

        <div class="introment">
          <p>2023년도 한림대학교 대동제를 위하여</p>
          <p>한림대학교 축제준비위원회가 열정을 쏟아 축제를 준비하고</p>
          <p>
            학우분들의 편의를 위하여 한림대 멋쟁이사자처럼 프로젝트 빌더팀이
            <br /><br />축제 웹사이트를 개발하였습니다.
          </p>
          <br /><br />
          <p>
            이번 2023 한림대학교 대동제가 <br /><br />
            여느때보다 즐겁고 행복한 축제가 되시기를 진심으로 소망합니다.
          </p>
          <p>학우 여러분들의 예쁘고 찬란한 청춘을 응원합니다!</p>
        </div>
        <hr style="border: solid 2px" class="line" />

        <SubTitle className="group"
          ><h2><b>Developer</b></h2></SubTitle
        >

        <!-- 프론트엔드 -->
        <TeamText className="team" text-size:15px text-align: center
          ><h3><img src="@/assets/vuelogo.png" alt="" width:30px/>Front-End TEAM</h3></TeamText
        >

        <div class="grid">

          <div class="dcard">
            <img src="@/assets/developer/osohyun.png" alt="" class="card-img-top" />
            <div class="inform">
              <h7><b>오소현</b></h7>
              <br />
              <h4>빅데이터학과 20</h4>
              <button @click="opengithubsohyun" class="git-button">소현's Github</button>
            </div>
          </div>

          <div class="dcard">
            <img src="@/assets/developer/kimkyungjae.png" alt="" class="card-img-top" />
            <div class="inform">
              <h7><b>김경재</b></h7>
              <br />
              <h4>빅데이터학과 20</h4>
              <button @click="opengithubkungjae" class="git-button">경재's Github</button>
            </div>
          </div>

        </div>

        <!-- 백엔드 -->
        <TeamText className="team" text-size:15px text-align: center
          ><h3><img src="@/assets/springbootlogo.png" alt=""/>Back-End TEAM</h3></TeamText
        >

        <div class="grid">
          <div class="dcard">
            <img src="@/assets/developer/leedongheon.png" alt="" class="card-img-top" />
            <div class="inform">
              <h7><b>이동헌</b></h7>
              <br />
              <h4>빅데이터학과 15</h4>
              <button @click="opengithubdongheon" class="git-button">동헌's Github</button>
            </div>
          </div>

          <div class="dcard">
            <img src="@/assets/developer/parkjuyoung.png" alt="" class="card-img-top" />
            <div class="inform">
              <h7><b>박주영</b></h7>
              <br />
              <h4>콘텐츠IT학과 19</h4>
              <button @click="opengithubjuyoung" class="git-button">주영's Github</button>
            </div>
          </div>

          <div class="dcard">
            <img src="@/assets/developer/kimmijin.png" alt="" class="card-img-top" />
            <div class="inform">
              <h7><b>김미진</b></h7>
              <br />
              <h4>빅데이터학과 20</h4>
              <button @click="opengithubmijin" class="git-button">미진's Github</button>
            </div>
          </div>

        </div>

        <!-- 기획/디자인 -->
        <TeamText className="team" text-size:15px text-align: center
          ><h3>PM / DESGIN TEAM</h3></TeamText
        >

        <div class="grid">
          <div class="dcard">
            <img src="@/assets/developer/choiari.png" alt="" class="card-img-top" />
            <div class="inform">
              <h7><b>최아리</b></h7>
              <br />
              <h4>경영학과 21</h4>
            </div>
          </div>

          <div class="dcard">
            <img src="@/assets/developer/oyujin.png" alt="" class="card-img-top" />
            <div class="inform">
              <h7><b>오유진</b></h7>
              <br />
              <h4>광고홍보학과 19</h4>
            </div>
          </div>
        </div>
      </TitleContainer>
    </div>
  </main>
</template>

<script>
import Image from '../components/Image.vue';
export default {
  components: { Image },
  methods: {
    opengithubsohyun() {
      window.open('https://github.com/osohyun0224', '_blank');
    },
    opengithubkungjae() {
      window.open('https://github.com/PortalCube', '_blank');
    },
    opengithubdongheon() {
      window.open('https://github.com/Sirius506775', '_blank');
    },
    opengithubjuyoung() {
      window.open('https://github.com/mythpoy', '_blank');
    },
    opengithubmijin() {
      window.open('https://github.com/mijin0721', '_blank');
    }
  }
};
</script>

<style scoped>
.team h3{
  font-size: 18px
}
.team img{
  width:20px;
  height:20px
}
.line {
  color: #1d3552;
  opacity: 0.14;
}
.about-text {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 100px 100px 0px 0px;
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
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  font-style: normal;
  font-weight: 550;
  font-size: 20px;
  line-height: 13px;
  margin: 0;
  padding: 36px 0;
  color: #ffffff;
}
h1,
h2 {
  font-family: 'NanumGothic', sans-serif;
  font-size: 16px;
}
h3 {
  font-family: 'NanumGothic', sans-serif;
  margin: 8px 0;
  font-size: 12px;
  text-size-adjust: auto;
}
h4 {
  font-family: 'Noto Sans KR', sans-serif;
  margin: 20px 0;
  font-size: 33px;
}
h5 {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 10px;
}
h6 {
  margin: 16px 0;
}
p {
  margin: 12px 0;
  word-wrap: break-word;
  text-size-adjust: auto;
  font-size: 1vw;
}
.git-button {
  font-family: 'Noto Sans KR', sans-serif;
  margin-top: 20px;
  padding: 2px 10px;
  border-radius: 5px;
  background-color: #5c859b;
  font-size: 14px;
  color: white;
  width: 75px 100%;
  margin: auto;
  height: auto;
}
.git-button > button {
  margin-top: 10px;
  padding: 6px 10px;
  border-radius: 5px;
  background-color: #5c859b;
  width: 75px 100%;
  margin: auto;
  font-size: 12px;
  color: white;
}
.grid {
  width: 80%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
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
}
.group {
  text-align: center;
  font-style: normal;
  font-weight: 550;
  line-height: 13px;
  letter-spacing: 0.2em;
  float: center;
  width: 45%;
  margin: 100px;
  padding: 50px 0;
}
.team {
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 16px;
  text-align: center;
  line-height: 17px;
  letter-spacing: 0.1em;
  width: 45%;
  margin: 0;
  padding: 36px 0;
  color: #20556c;
}

.inform {
  font-size: 20px;
}

.TitleContainer {
  display: inline-block;
}
.image {
  width: 100%;
  height: auto;
  bottom: 10px;
  left: 87px;
}
.introduce {
  text-align: center;
  font-style: normal;
  font-weight: 550;
  font-size: 20px;
  line-height: 13px;
  letter-spacing: 0.2em;
  float: center;
  width: 45%;
}
.IntroText {
  font-style: normal;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
  letter-spacing: 0.1em;
}
.SubText {
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 9px;
  margin-bottom: 50px;
}
.dcard {
  font-family: 'Noto Sans KR', sans-serif;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.24) 100%);
  border-radius: 16px;
  width: 151px 100%;
  height: 200px auto;
  padding: 10px;
  margin: 10px;
  text-decoration: none;
  text-align: center;
  color: black;
  float: left;
  position: center;
  top: 50%;
  left: 50%;
  right:70%;
  box-shadow: 0px 0px 5px 5px rgba(77, 74, 74, 0.5);
}
.dcard h7 {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 20px;
}
.dcard h4 {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
}
</style>
