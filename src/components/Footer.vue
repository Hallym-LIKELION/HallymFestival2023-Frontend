<template>
  <div class="footer">
    <p class="title">한림대학교 멋쟁이사자처럼 Builder Team<br></p>
    <p class ="sponser">본 사이트는 Naver Cloud Platform 서버 지원으로 운영되고 있습니다.</p>
    <br>
    <p class="subtitle">Hallym Likelion</p>
  </div>
</template>
<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: #363636;
  width: 100%;
  min-height: 70px; /* footer의 높이 */
}

.footer > p.title {
  font-size: 10pt;
  color: #FFFFFF;
}
.footer > p.sponser {
  font-size: 10pt;
  color: #FFFFFF;
}
.footer > p.subtitle {
  font-size: 9pt;
  color: #FFFFFF;
  opacity: 0.6;
}
</style>
