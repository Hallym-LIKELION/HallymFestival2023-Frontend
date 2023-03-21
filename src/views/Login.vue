<template>
  <main>
    <h1>로그인</h1>
    <div class="form">
      <form @submit.prevent="fnLogin">
        <div class="input id">
          <img :src="userImage" alt="" />
          <input name="uid" placeholder="아이디" v-model="id" />
        </div>
        <div class="input password">
          <img :src="lockImage" alt="" />
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
    }
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
  font-size: 10pt;
  text-align: center;
  margin: 0;
  padding: 36px 0;
}

button {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: black;
  font-family: 'Noto Sans KR', sans-serif;
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
  border-radius: 18px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  width: 300px;
}

img {
  width: 18px;
  margin-right: 8px;
}

.input > input {
  width: 100%;
  background: none;
  border: none;
  outline: none;
  font-family: 'Noto Sans KR', sans-serif;
}

.button > button {
  width: 100%;
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
