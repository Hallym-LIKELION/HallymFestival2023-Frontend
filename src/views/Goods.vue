<template>
  <main>
    <br /><br /><br /><br />
    <div class="title-wrap">
      <div class="title-image">
        <img src="@/assets/overlay/OGoods.png" alt="" />
      </div>
      <div class="title-text">굿즈</div>
    </div>
    <br /><br />

    <div class="goods-text">
      <br /><br />
      <p>저희가 어떻게 어떻게 하기로 했습니다</p>
      <br />
      <p>많은 관심 바랍니다.</p>

      <div class="first">
        <div class="dcard">
          <img src="@/assets/goods/그립톡.png" alt="" width="100" height="100" />
          <div class="inform">
            <h7>그립톡</h7>
            <br />
            <h4>10000원</h4>
          </div>
        </div>

        <div class="dcard">
          <img src="@/assets/goods/소주잔.png" alt="" width="100" height="100" />
          <div class="inform">
            <h7>소주잔</h7>
            <br />
            <h4>10000원</h4>
          </div>
        </div>
      </div>

      <div class="first">
      <div class="dcard">
        <img src="@/assets/goods/맥주잔.png" alt="" width="100" height="100" />
        <div class="inform">
          <h7>맥주잔</h7>
          <br />
          <h4>10000원</h4>
        </div>
      </div>

      <div class="dcard">
        <img src="@/assets/goods/스티커.png" alt="" width="100" height="100" />
        <div class="inform">
          <h7>스티커</h7>
          <br />
          <h4>10000원</h4>
        </div>
      </div>
    </div>
    <div class="first">
      <div class="dcard">
        <img src="@/assets/goods/떡메모지.png" alt="" width="100" height="100" />
        <div class="inform">
          <h7>떡메모지</h7>
          <br />
          <h4>10000원</h4>
        </div>
      </div>
    </div>
      <button>
        <div class="button"><b>구매하러가기</b></div>
      </button>
    </div>
  </main>
</template>

<script></script>

<style scoped>
.first {
  width: 60%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
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
h1 {
  font-size: 30pt;
  text-align: center;
}
p {
  font-size: 15pt;
  text-align: center;
  color: black;
}
h7 {
  color: black;
}
h4 {
  color: black;
}
.dcard {
  background: linear-gradient(180deg, rgba(255, 255, 255, 100) 0%, rgba(255, 255, 255, 100) 100%);
  border-radius: 16px;
  width: 151px;
  height: 160px;
  padding: 10px;
  margin: 10px;
  text-decoration: none;
  text-align: center;
  color: black;
  float: left;
  position: center;
  top: 50%;
  left: 50%;
}
.inform {
  font-size: 20px;
  color: #ffffff;
}
.button {
  width: 328px;
  height: 30px;
  margin-top: 15px;
  padding: 6px 10px;
  border-radius: 18px;
  position: center;
  float: left;
  text-align: center;
  background-color: #ca434c;
  font-size: 17pt;
  color: white;
  
}
h1 {
  color: #ffffff;
}
.goods-text {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 100px 100px 0px 0px;
  font-size: 1rem;
}
</style>
