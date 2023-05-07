<template>
  <main>
    <br /><br /><br /><br />
    <div class="title-wrap">
      <div class="title-image">
        <img src="@/assets/overlay/OGoods.png" alt="" width="70" height="40" />
      </div>
      <div class="title-text">굿즈</div>
    </div>
    <br /><br />

    <div class="goods-text">
      <br /><br />
      <p>2023 대동제 축제 굿즈입니다! </p>
      <br />
      <p>원활한 부스 진행을 위해 굿즈 사전 예약 판매를 진행하오니 </p>
      <br />
      <p>구매를 희망하시는 학우분들은 아래의 버튼으로 접속해주세요:)</p>

      <div class="first">
        <div class="dcard">
          <img src="@/assets/goods/그립톡.png" alt="" width="100" height="100" />
          <div class="inform">
            <h7>그립톡(덕림톡)</h7>
            <br />
            <h4>학생회비 납부 : 4,000원<br/> 학생회비 미납 : 5,000원</h4>
          </div>
        </div>

        <div class="dcard">
          <img src="@/assets/goods/소주잔.png" alt="" width="100" height="80" />
          <div class="inform">
            <h7>취덕이 소주잔</h7>
            <br />
            <h4>학생회비 납부 : 3,000원<br/> 학생회비 미납 :  4,000원</h4>
            <p>글라스 소주잔/2EA 세트판매</p>
          </div>
        </div>
      </div>

      <div class="first">
      <div class="dcard">
        <img src="@/assets/goods/맥주잔.png" alt="" width="100" height="80" />
        <div class="inform">
          <h7>고백 맥주잔</h7>
          <br />
          <h4>학생회비 납부 : 5,000원<br/> 학생회비 미납 :  6,000원</h4>
          <p>글라스 맥주잔 380ml</p>
        </div>
      </div>

      <div class="dcard">
        <img src="@/assets/goods/스티커.png" alt="" width="100" height="100" />
        <div class="inform">
          <h7>스티커</h7>
          <br />
          <h4>학생회비 납부 : 2,000원<br/> 학생회비 미납 : 3,000원</h4>
        </div>
      </div>
    </div>

    <div class="first">
      <div class="dcard">
        <img src="@/assets/goods/떡메모지.png" alt="" width="100" height="100" />
        <div class="inform">
          <h7>떡메모지</h7>
          <br />
          <h4>1EA: 1,500원 <br/>SET: 4,000원</h4>
        </div>
      </div>

      <div class="dcard">
        <img src="@/assets/goods/부채.png" alt="" width="100" height="100" />
        <div class="inform">
          <h7>땀림이 손잡이 부채</h7>
          <br />
          <h4>무료</h4>
          <p>하루 당 330개 총 1000개</p>
        </div>
      </div>
    </div>
      <button>
        <button @click="openform" class="button"><b>구매하러가기</b></button>
      </button>
    </div>
  </main>
</template>

<script>
export default {
  methods: {
    openform() {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLScVG8DCqrh_KajzWoqSAFRHG84VF4L5FDE5oMoJvqxG7OPhwQ/viewform', '_blank');
    }
  }
};
</script>

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
  font-size: 10pt;
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
  font-size: 16px;
  color: #ffffff;
}
.inform h7{
  font-size: 18px;
  margin: 10px auto;
}
.inform h4{
  font-size: 12px;
  margin: 6px auto;
}
.inform p{
  font-size: 10px;
}
.button {
  margin: 0 10px;
  margin-bottom: 24px;
  width: 328px;
  height: 40px;
  margin-top: 15px;
  padding: 6px 10px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: #ca434c;
  font-size: 17pt;
  color: white; 
  top: 50%;
  left: 50%;
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
