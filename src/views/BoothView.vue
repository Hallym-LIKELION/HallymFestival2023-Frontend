<template>
  <main>
    <h1 v-text="data.name || 'Loading...'"></h1>
    <div class="image">
      <img :src="data.image || 'https://via.placeholder.com/700x400/D9D9D9/aaaaaa'" />
    </div>

    <h1>부스 소개</h1>
    <p v-text="data.mainDescription || 'Loading...'"></p>

    <h1>메뉴 소개</h1>
    <p v-text="data.menuDescription || 'Loading...'"></p>

    <div class="button">
      <button @click="() => $router.push('/boothmap')">뒤로 돌아가기</button>
    </div>
  </main>
</template>

<script>
import { GetDemoBooth } from '../api/api-client';

export default {
  components: {},
  data() {
    return {
      data: {}
    };
  },
  created() {
    // 데이터 가져오기
    GetDemoBooth(parseInt(this.$route.params.id))
      .then((data) => {
        console.log(data);
        this.data = data;
      })
      .catch((err) => {
        alert('Unexpected error has occured. Please try again later.');
        // console.log(err);
      });
  }
};
</script>

<style scoped>
h1 {
  font-size: 20pt;
  text-align: center;
  margin: 0;
  padding: 24px 0;
}

button {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: black;
  font-family: 'Noto Sans KR', sans-serif;
}

.image {
  max-width: 100%;
}

.image > img {
  width: 100%;
  max-height: 240px;
  object-fit: contain;
}

.button {
  display: flex;
  justify-content: center;
}
.button > button {
  width: 200px;
  margin-top: 18px;
  padding: 8px 0;
  font-size: 18pt;
  border-radius: 12px;
  color: white;
  background-color: #466efe;
  transition: background-color 0.1s;
}

.button > button:hover {
  background-color: #0f8bff;
}
</style>
