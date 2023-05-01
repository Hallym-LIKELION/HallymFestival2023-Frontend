<template>
  <main>
    <h1>401 Unauthorized</h1>
    <p>해당 페이지에 접속하려면 최고 관리자 권한이 필요합니다.</p>
    <div><RouterLink class="button" to="/">HOME으로 돌아가기</RouterLink></div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
  components: {
    RouterLink
  }
};
</script>

<style scoped>
h1 {
  font-size: 20pt;
  text-align: center;
  padding: 36px 0;
  color: white;
}

p {
  text-align: center;
  font-size: 16pt;
  color: white;
}

div {
  width: 100%;
  display: flex;
  justify-content: center;
  color: white;
}

.button {
  margin-top: 36px;
  padding: 8px 16px;
  border-radius: 24px;
  background-color: #509bf8;
  font-size: 16pt;
  text-decoration: none;
  color: white;
}
</style>
