<template>
  <main>
    <h1>관리자 로그인 화면</h1>
    <p>
      일반 학우분들에게는 로그인 권한이 없습니다. 축준위 및 각 동아리 부스 관리자만 로그인이
      가능합니다.
    </p>
    <div id="loginForm">
      <form @submit.prevent="fnLogin">
        <p><input class="w3-input" name="uid" placeholder="Input Your ID" v-model="id" /><br /></p>
        <p>
          <input
            name="password"
            class="w3-input"
            placeholder="Input Your PW"
            v-model="password"
            type="password"
          />
        </p>
        <p>
          <button type="submit" class="w3-button w3-green w3-round">Login</button>
        </p>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
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

      alert('정상적으로 로그인 되었습니다.');
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

#loginForm {
  margin: auto;
}
</style>
