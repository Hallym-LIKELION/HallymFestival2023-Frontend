<template>
  <main>
    <div class="title">About US</div>
    <TitleContainer>
      <Logo className="introduce" text-align: center>
        <h3>🦁한림대학교 멋쟁이사자처럼 Builder Team🦁</h3>
        <h4>X</h4>
        <h3>🎆2023 한림대학교 축제준비위원회🎆</h3>
      </Logo>

      <div class="introment">
        <p>2023년도 한림대학교 대동제를 위하여</p>
        <p>한림대학교 축제준비위원회가 열정을 쏟아 축제를 준비하고,</p>
        <p>
          학우분들의 편의를 위하여 한림대 멋쟁이사자처럼 빌더팀이 축제 웹사이트를 개발하였습니다.
        </p>
        <p>
          이번 2023 한림대학교 대동제가 여느때보다 즐겁고 행복한 축제가 되시기를 진심으로
          소망합니다.
        </p>
        <p>❤️학우 여러분들의 예쁘고 찬란한 청춘을 응원합니다❤️</p>
      </div>

      <SubTitle className="group"><h2>Developer</h2></SubTitle>

      <!-- 프론트엔드 -->
      <TeamText className="team" text-align: center><h3>Front-End TEAM</h3></TeamText>
      <hr style="border: solid 1px black;">

      <div class="floatt">
        <div class="dcard">
          <img src="@/assets/osohyun.png" alt="" />
          <div class="inform">
            <h2>오소현</h2>
            <p>빅데이터학과 20</p>
            <div class="button">소현's Github > </div>
          </div>
        </div>
        <div class="dcard">
          <img src="@/assets/osohyun.png" alt="" />
          <div class="inform">
            <h2>김경재</h2>
            <p>빅데이터학과 20</p>
            <div class="button">경재's Github > </div>
          </div>
        </div>
      </div>
      
      <div class="next"></div>

      <!-- 백엔드 -->
      <TeamText className="team" text-align: center><h3>Back-End TEAM</h3></TeamText>
      <hr style="border: solid 1px black;">

      <div class="floatt">
        <div class="dcard">
          <img src="@/assets/osohyun.png" alt="" />
          <div class="inform">
            <h2>이동헌</h2>
            <p>빅데이터학과 15</p>
            <div class="button">동헌's Github > </div>
          </div>
        </div>

        <div class="dcard">
          <img src="@/assets/osohyun.png" alt="" />
          <div class="inform">
            <h2>박주영</h2>
            <p>콘텐츠IT학과 19</p>
            <div class="button">주영's Github > </div>
          </div>
        </div>
      </div>

      <div class="next"></div>

      <div class="floatt">
        <div class="dcard">
          <img src="@/assets/osohyun.png" alt="" />
          <div class="inform">
            <h2>이강훈</h2>
            <p>빅데이터학과 18</p>
            <div class="button">강훈's Github > </div>
          </div>
        </div>
        <div class="dcard">
          <img src="@/assets/osohyun.png" alt="" />
          <div class="inform">
            <h2>김미진</h2>
            <p>빅데이터학과 20</p>
            <div class="button">미진's Github > </div>
          </div>
        </div>
      </div>

      <div class="next"></div>

      <!-- 기획/디자인 -->
      <TeamText className="team" text-align: center><h3>PM / DESGIN TEAM</h3></TeamText>
      <hr style="border: solid 1px black;">

      <div class="floatt">
        <div class="dcard">
          <img src="@/assets/osohyun.png" alt="" />
          <div class="inform">
            <h2>최아리</h2>
            <p>경영학과 21</p>
          </div>
        </div>
        <div class="dcard">
          <img src="@/assets/osohyun.png" alt="" />
          <div class="inform">
            <h2>오유진</h2>
            <p>광고홍보학과 19</p>
          </div>
        </div>
      </div>
    </TitleContainer>
  </main>
</template>

<script></script>

<style scoped>
.title {
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  font-style: normal;
  font-weight: 550;
  font-size: 30px;
  line-height: 13px;
  margin: 0;
  padding: 36px 0;
}
.introment {
  font-family: 'Noto Sans KR', sans-serif;
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
  text-align: center;
  line-height: 13px;
  letter-spacing: 0.1em;
  width: 45%;
  margin: 0;
  padding: 36px 0;
  clear: both;
}
.dcard {
  background: linear-gradient(180deg, rgba(208, 208, 208, 0.5) 0%, rgba(208, 208, 208, 0.24) 100%);
  border-radius: 10px;
  width: 32%;
  padding: 10px;
  margin: 10px;
  text-decoration: none;
  text-align: center;
  color: black;
  float: left;
}
.next {
  clear: both;
}

.inform {
  font-size: 20px;
}

.TitleContainer {
  display: inline-block;
}
.image {
  width: 45px;
  height: 45px;
  position: absolute;
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
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
  letter-spacing: 0.1em;
}
.SubText {
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 9px;
  margin-bottom: 50px;
}
.button {
  margin-top: 15px;
  padding: 6px 10px;
  border-radius: 18px;
  background-color: #222324;
  font-size: 12pt;
  color: white;
}
</style>
