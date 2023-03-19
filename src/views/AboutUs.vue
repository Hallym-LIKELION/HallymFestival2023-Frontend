<template>
  <main>
    <h1>About Us</h1>
    <div class="card" style="width: 15rem; background-color: beige">
      <img class="card-img-top" src="../assets/osohyun.png" />
      <div class="card-body">
        <h5 class="card-title">빅데이터학과 20 오소현</h5>
        <p class="card-text">프론트엔드 개발</p>
        <button @click="gogit()">Sohyun's Github!</button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  methods: {
    gogit: function () {
      window.open('https://github.com/osohyun0224');
    }
  }
};
</script>

<style scoped>
.img {
  box-align: center;
}
.button {
  position: absolute;
}
h1 {
  font-size: 20pt;
  text-align: center;
  margin: 0;
  padding: 20px 0;
}
h5 {
  font-size: 15pt;
  text-align: center;
  margin: 0;
  padding: 20px 0;
}
p {
  font-size: 10pt;
  text-align: center;
  margin: 0;
  padding: 36px 0;
}
</style>
