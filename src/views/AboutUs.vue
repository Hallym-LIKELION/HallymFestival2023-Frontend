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
          학우분들의 편의를 위하여 한림대 멋쟁이사자처럼 프로젝트 빌더팀이 축제 웹사이트를
          개발하였습니다.
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
      <hr style="border: solid 1px black" />

      <div class="grid">
        <div class="card">
          <img src="@/assets/osohyun.png" alt="" class="card-img-top" />
          <div class="card-body">
            <h2 class="card-title">오소현</h2>
            <h5 class="card-text">빅데이터학과 20</h5>
            <button>
              <a href="https://github.com/osohyun0224"><div class="button">소현's Github ></div></a>
            </button>
          </div>
        </div>

        <div class="card">
          <img src="@/assets/osohyun.png" alt="" class="card-img-top" />
          <div class="card-body">
            <h2 class="card-title">김경재</h2>
            <h5 class="card-text">빅데이터학과 20</h5>
            <button>
              <a href="https://github.com/PortalCube"><div class="button">경재's Github ></div></a>
            </button>
          </div>
        </div>
      </div>

      <!-- 백엔드 -->
      <TeamText className="team" text-align: center><h3>Back-End TEAM</h3></TeamText>
      <hr style="border: solid 1px black" />

      <div class="grid">
        <div class="card">
          <img src="@/assets/osohyun.png" alt="" class="card-img-top" />
          <div class="card-body">
            <h2 class="card-title">이동헌</h2>
            <h5 class="card-text">빅데이터학과 15</h5>
            <button>
              <a href="https://github.com/Sirius506775"
                ><div class="button">동헌's Github ></div></a
              >
            </button>
          </div>
        </div>

        <div class="card">
          <img src="@/assets/osohyun.png" alt="" class="card-img-top" />
          <div class="card-body">
            <h2 class="card-title">박주영</h2>
            <h5 class="card-text">빅데이터학과 19</h5>
            <button>
              <a href="https://github.com/mythpoy"><div class="button">주영's Github ></div></a>
            </button>
          </div>
        </div>

        <div class="card">
          <img src="@/assets/osohyun.png" alt="" class="card-img-top" />
          <div class="card-body">
            <h2 class="card-title">김미진</h2>
            <h5 class="card-text">빅데이터학과 19</h5>
            <button>
              <a href="https://github.com/mijin0721"><div class="button">미진's Github ></div></a>
            </button>
          </div>
        </div>
      </div>

      <!-- 기획/디자인 -->
      <TeamText className="team" text-align: center><h3>PM / DESGIN TEAM</h3></TeamText>
      <hr style="border: solid 1px black" />

      <div class="grid">
        <div class="card">
          <img src="@/assets/osohyun.png" alt="" class="card-img-top" />
          <div class="card-body">
            <h2 class="card-title">최아리</h2>
            <h5 class="card-text">경영학과 19</h5>
          </div>
        </div>

        <div class="card">
          <img src="@/assets/osohyun.png" alt="" class="card-img-top" />
          <div class="card-body">
            <h2 class="card-title">오유진</h2>
            <h5 class="card-text">광고홍보학과 19</h5>
          </div>
        </div>
      </div>
    </TitleContainer>
  </main>
</template>

<script></script>

<style scoped>
h1,
h2,
h3 {
  margin: 12px 0;
  font-size: 2vw;
  text-size-adjust: auto;
}
h4 {
  margin: 20px 0;
  font-size: 2vw;
}
h5,
h6 {
  margin: 16px 0;
}
p {
  margin: 12px 0;
  word-wrap: break-word;
  text-size-adjust: auto;
  font-size: 1vw;
}

.grid {
  width: 80%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.card {
  background: linear-gradient(180deg, rgba(208, 208, 208, 0.5) 0%, rgba(208, 208, 208, 0.24) 100%);
  border-radius: 10px;
  width: 80%;
  padding: 10px;
  margin: 10px auto;
  text-decoration: none;
  text-align: center;
  color: black;
}
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
.button {
  margin-top: 15px;
  padding: 6px 10px;
  border-radius: 18px;
  background-color: #222324;
  font-size: 12pt;
  color: white;
}
</style>
