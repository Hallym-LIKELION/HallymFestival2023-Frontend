<template>
  <main>
    <h1>404 Not Found</h1>
    <p>지금 접속하신 페이지는 없는 페이지입니다.</p>
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
  margin: 0;
  padding: 36px 0;
}

p {
  text-align: center;
  font-size: 16pt;
}

div {
  width: 100%;
  display: flex;
  justify-content: center;
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
