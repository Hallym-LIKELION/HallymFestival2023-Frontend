<template>
  <main>
    <div class ="title-wrap">
      <div class="title-image">
        <img src="@/assets/overlay/OGoods.png" alt=""/>
        </div>
        <div class="title-text">
          굿즈
        </div>
    </div>
    <br><br>
    <p>저희가 어떻게 어떻게 하기로 했습니다 </p>
    <br>
    <p>많은 관심 바랍니다.</p>
  
        <div class="dcard">
          <img src="@/assets/goodspicture.png" alt="" />
          <div class="inform">
            <h7>굿즈명</h7>
            <br>
            <h4>10000원</h4>
          </div>
        </div>

        <div class="dcard">
          <img src="@/assets/goodspicture.png" alt="" />
          <div class="inform">
            <h7>굿즈명</h7>
            <br>
            <h4>10000원</h4>
          </div>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        <div class="dcard">
          <img src="@/assets/goodspicture.png" alt="" />
          <div class="inform">
            <h7>굿즈명</h7>
            <br>
            <h4>10000원</h4>
          </div>
        </div>

        <div class="dcard">
          <img src="@/assets/goodspicture.png" alt="" />
          <div class="inform">
            <h7>굿즈명</h7>
            <br>
            <h4>10000원</h4>
          </div>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div class="dcard">
          <img src="@/assets/goodspicture.png" alt="" />
          <div class="inform">
            <h7>굿즈명</h7>
            <br>
            <h4>10000원</h4>
          </div>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div class="DownBtn">
          <img src="@/assets/goodsscroll.png" alt="" />
        </div>
        <br /><br />
        <button>
          <div class="button"><b>구매하러가기</b></div>
            </button>
    
    
  </main>
</template>

<script></script>

<style scoped>
.title-wrap{
  width:30%;
  margin:10px auto;
  position:relative;
}
.title-wrap img {
  width:100%;
  vertical-align: middle;
}
.title-text{
  position: absolute;
  top:40%;
  left:50%;
  width:50%;
  transform: translate(-50%,-50%);
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  font-style: normal;
  font-weight: 550;
  font-size: 20px;
  line-height: 13px;
  margin: 0;
  padding: 36px 0;
  color: #FFFFFF;
}
h1 {
  font-size: 30pt;
  text-align: center;
}
p {
  font-size: 15pt;
  text-align: center;
  color: white;
}
h7{
  color: black; 
}
h4{
  color: black;
}
.dcard {
  background: linear-gradient(180deg, rgba(208, 208, 208, 0.5) 0%, rgba(208, 208, 208, 0.24) 100%);
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
  color: #FFFFFF;
}
.button {
  width:328px;
  height: 30px;
  margin-top: 15px;
  padding: 6px 10px;
  border-radius: 18px;
  text-align: center;
  background-color: #CA434C;
  font-size: 17pt;
  color: white;
}
h1{
  color: #FFFFFF;
}

.DownBtn{
  padding: 10px;
  margin: 10px;
}
</style>