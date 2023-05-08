<template>
  <div class="footer">
    <p class="title">한림대학교 멋쟁이사자처럼 Builder Team</p>
    <p class="sponser" @click="openNcp">
      본 사이트는 Naver Cloud Platform의 <br />
      지원을 받아 사용하고 있습니다.
    </p>
    <p class="subtitle">Hallym Likelion</p>
  </div>
</template>

<script>
export default {
  methods: {
    openNcp() {
      window.open('https://www.ncloud.com/', '_blank');
    }
  }
};
</script>

<style scoped>
.footer {
  padding: 10px;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: #363636;
  width: 100%;
  min-height: 70px; /* footer의 높이 */
}

.footer > p.title {
  font-size: 11pt;
  color: #ffffff;
}
.footer > p.sponser {
  margin-top: 2px;
  font-size: 8pt;
  color: #ffffff;
  cursor: pointer;
}
.footer > p.subtitle {
  margin-top: 8px;
  font-size: 9pt;
  color: #ffffff;
  opacity: 0.6;
}
br {
  display: none;
}
@media screen and (max-width: 400px) {
  .footer > p.sponser {
    font-size: 9pt;
  }
  .footer > p.subtitle {
    font-size: 6pt;
  }

  br {
    display: inline;
  }
}
</style>
