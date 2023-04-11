<template>
  <main>
  <div class="introment">
    <p>"우리의 모든 시간은 연결되어있어"</p>
  </div>
  <div class="logo">
      <img src="@/assets/logo.png" alt="" />
  </div>
  <div class ="totalvisitor">
    <h3>Today</h3>
    <h1>123123</h1>
    <img src="@/assets/emptybox.png" alt="" />
  </div>  
  <div class="ownermenu" ref="ownermenu">
      <RouterLink to="/announcement">공지사항</RouterLink>
      <RouterLink to="/boothmap">부스 현황 분석</RouterLink>
      <RouterLink to="/ownerbcomment">신고 댓글 분석</RouterLink>
      <RouterLink to="/announcement">신고 방명록 분석</RouterLink>
    </div>
 </main>
</template>

<script>
export default {
  }
</script>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
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
  color: #FFFFFF;
}
.totalvisitor{
  text-align: center;
  margin: 0;
  padding: 10px 0;
  color: #FFFFFF;
}
.ownermenu {
  font-family: 'Noto Sans KR', sans-serif;
  max-width: 322.29px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 24px;
}
.ownermenu > * {
  width: 100%;
  margin: 4px;
  padding: 10px 0;
  border-radius: 46.25px;
  font-size: 13pt;
  text-align: center;
  text-decoration: none;
  color: black;
  background-color: lightgray;
}
</style>