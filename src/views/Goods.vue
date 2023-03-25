<template>
  <main>
    <h1>굿즈 안내서</h1>
    <div class="floatt">
        <div class="dcard">
          <img src="@/assets/osohyun.png" alt="" />
          <div class="inform">
            <h2>덕림이 소주잔</h2>
            <p>5000원</p>
          </div>
        </div>
        <button>
                <div class="button">굿즈 구매하러 가기 ></div>
            </button>
      </div>
    
  </main>
</template>

<script></script>

<style scoped>
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
.inform {
  font-size: 20px;
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