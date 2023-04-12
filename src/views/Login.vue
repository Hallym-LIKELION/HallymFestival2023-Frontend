<template>
  <main>
    <div class="introment">
      <p>"우리의 모든 시간은 연결되어있어"</p>
    </div>
    <div class="logo">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div class="form">
      <form @submit.prevent="fnLogin">
        <div class="input id">
          <input name="uid" placeholder="아이디" v-model="id" />
        </div>
        <div class="input password">
          <input name="uid" placeholder="비밀번호" v-model="password" type="password" />
        </div>
        <div class="button">
          <button type="submit" class="w3-button w3-green w3-round">로그인</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import userImage from '@/assets/user.png';
import lockImage from '@/assets/lock.png';

export default {
  data() {
    return {
      userImage,
      lockImage,
      id: '',
      password: ''
    };
  },
  methods: {
    fnLogin() {
      if (this.id === '') {
        alert('지정 아이디를 입력하세요.');
        return;
      }

      if (this.password === '') {
        alert('비밀번호를 입력하세요.');
        return;
      }

      alert(`id: ${this.id}\npass: ${this.password}\n\n정상적으로 로그인 되었습니다.`);

      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
}
.introment {
  font-family: 'Nanum Gothic', sans-serif;
  font-style: normal;
  font-size: 15px;
  line-height: 13px;
  text-align: center;
  letter-spacing: 0.15em;
  margin: 0;
  padding: 36px 0;
  color: #ffffff;
}
h1 {
  font-size: 20pt;
  text-align: center;
  padding: 36px 0;
  color: white;
}

p {
  font-size: 10pt;
  text-align: center;
  padding: 36px 0;
}

.form {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  padding: 8px 12px;
  margin-top: 18px;
  border: 1px solid gray;
  border-radius: 46.25px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  width: 300px;
  opacity: 0.7;
}

.input > input {
  width: 100%;
  background: none;
  border: none;
  outline: none;
  font-family: 'Nanum Gothic', sans-serif;
  opacity: 0.7;
}

.button > button {
  width: 100%;
  margin-top: 18px;
  padding: 8px 0;
  font-size: 15pt;
  border-radius: 12px;
  color: white;
  background-color: #9c323e;
  transition: background-color 0.1s;
}

.button > button:hover {
  background-color: #9c323e;
}
</style>
