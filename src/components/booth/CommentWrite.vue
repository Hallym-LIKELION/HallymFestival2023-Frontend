<template>
  <div class="container">
    <div class="header">
      <img class="profile" :src="image" :style="{ backgroundColor: '#' + imageColor }" />
      <p class="nickname">
        {{ GetRandomNickName(myIP) }}
      </p>
    </div>
    <div class="body">
      <textarea
        class="body-input"
        v-model="commentContent"
        @keydown.enter.prevent="send"
        placeholder="타인을 비방하거나, 모욕을 주는 방명록은 삭제될 수 있습니다."
      ></textarea>
      <div class="footer">
        <input
          class="footer-password"
          v-model="commentPassword"
          type="password"
          placeholder="비밀번호..."
          maxlength="32"
          @keypress.enter="send"
          @input="userId = $event.target.value"
        />
        <button class="footer-button" @click="send">
          <img :src="SendImage" alt="" srcset="" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SendImage from '../../assets/send.png';
import { GetRandomNickName, GetRandomImage } from '../../library/name-generator';
import { GetMyIP, CreateBoothComment } from '../../api/api-client';

import ProfileImage1 from '@/assets/profile/1.png';
import ProfileImage2 from '@/assets/profile/2.png';
import ProfileImage3 from '@/assets/profile/3.png';
import ProfileImage4 from '@/assets/profile/4.png';
import ProfileImage5 from '@/assets/profile/5.png';
import ProfileImage6 from '@/assets/profile/6.png';

const images = [
  ProfileImage1,
  ProfileImage2,
  ProfileImage3,
  ProfileImage4,
  ProfileImage5,
  ProfileImage6
];

export default {
  data() {
    return {
      SendImage,

      myIP: '',

      image: '',
      imageColor: 'ffffff',

      commentContent: '',
      commentPassword: ''
    };
  },
  props: {
    id: {
      type: Number,
      default: -1
    }
  },
  methods: {
    async send() {
      if (this.commentContent.length === 0) {
        alert('댓글 내용을 입력하세요.');
        return;
      }
      if (this.commentPassword.length < 4) {
        alert('4자리 이상의 비밀번호를 입력하세요.');
        return;
      }

      const data = await CreateBoothComment(this.id, this.commentContent, this.commentPassword);
      if (data.result !== 'create success') {
        alert('댓글 전송에서 에러가 발생했습니다.\n' + data.result);
      }

      this.$emit('send', {
        // id: data.id,
        ip: this.myIP,
        content: this.commentContent
      });

      this.commentContent = '';
      this.commentPassword = '';
    },
    GetRandomNickName
  },
  async created() {
    this.myIP = await GetMyIP();
    let data = GetRandomImage(this.myIP);
    this.image = images[data.image];
    this.imageColor = data.color;
  }
};
</script>
<style scoped>
.container {
  margin-bottom: 16px;
}

.header {
  display: flex;
  align-items: center;
}
.profile {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 100%;
}
.nickname {
  color: #363636;
  font-weight: 600;
}
.body {
  width: calc(100% - 20px);
  margin-top: 8px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f4f4f4;
  box-shadow: 0px 0px 8px #00000033;
}

.body-input {
  width: 100%;
  height: 48px;
  background: none;
  overflow: hidden;
  outline: none;
  font-size: 12pt;
  resize: none;
}
.footer {
  height: 24px;
  display: flex;
  justify-content: flex-end;
}
.footer-password {
  font-size: 11pt;
  padding: 2px 8px;
  margin-right: 12px;
  width: 100%;
  border: none;
  background-color: #d3d3d3;
  font-family: 'NanumGothic', Arial, Helvetica, sans-serif;
}

.footer-button {
  margin-right: 8px;
}
.footer-button > img {
  width: 18px;
  height: 18px;
}

@media screen and (max-width: 400px) {
  .nickname {
    font-size: 10pt;
  }

  .body-input {
    font-size: 10pt;
  }
}
</style>
