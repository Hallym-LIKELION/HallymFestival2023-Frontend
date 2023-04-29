<template>
  <Modal :visible="visible" @dispose="close" width="400px">
    <div class="modal-header">
      <div class="color-picker">
        <button class="yellow" @click="color = 'yellow'">
          <div class="color"></div>
          <p class="text">옐로</p>
        </button>
        <button class="pink" @click="color = 'pink'">
          <div class="color"></div>
          <p class="text">핑크</p>
        </button>
      </div>
      <button class="close-button" @click="close">
        <img class="close-image" :src="CloseImage" alt="닫기" />
      </button>
    </div>
    <div class="modal-body">
      <textarea
        :class="[
          'write-content',
          {
            yellow: color === 'yellow',
            pink: color === 'pink'
          }
        ]"
        v-model="content"
        @keydown.enter.prevent="send"
        placeholder="타인을 비방하거나, 모욕을 주는 방명록은 삭제될 수 있습니다."
      ></textarea>
    </div>
    <div class="modal-footer">
      <div class="writer">
        <div class="nickname">
          <p class="label">닉네임</p>
          <input type="text" :value="myIP ? GetRandomNickName(myIP) : ''" disabled />
        </div>
        <div class="password">
          <p class="label">비밀번호</p>
          <input
            class="write-password"
            v-model="password"
            type="password"
            maxlength="32"
            @keypress.enter="send"
          />
        </div>
      </div>
      <button class="modal-button apply" @click="send">등록</button>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue';
import CloseImage from '../assets/close.png';
import { GetRandomNickName } from '../library/name-generator';
import { GetMyIP, CreateVisitComment } from '../api/api-client';

const ERROR_MESSAGE = {};

export default {
  components: {
    Modal
  },
  data() {
    return {
      CloseImage,

      myIP: '',

      color: 'yellow',
      content: '',
      password: '',

      items: []
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      if (this.content !== '') {
        if (confirm('저장되지 않은 내용이 있습니다. 정말 닫으시겠어요?') === false) {
          // TODO: choose를 modal로 빼거나 다른 방법을 찾아볼 것
          // 아니면 기획팀과 협의 후 그냥 안 물어보고 끄도록 할 것
          return;
        }
      }

      this.content = '';
      this.password = '';

      this.$emit('close');
    },
    selectColor(color) {
      this.color = color;
    },
    async send() {
      if (this.content.length == 0) {
        alert('내용은 0자 이상이어야 합니다.');
        return;
      }

      if (this.password.length < 4) {
        alert('비밀번호는 4자리 이상이어야 합니다.');
        return;
      }

      let data;

      try {
        data = await CreateVisitComment(this.content, this.password);
      } catch (e) {
        alert('방명록 전송에 오류가 발생했습니다.\n' + e);
        return;
      }

      if (data.result !== 'create success') {
        alert('방명록 전송에 오류가 발생했습니다.\n' + data.result);
      }

      this.$emit('complete', {
        ip: this.myIP,
        content: this.content
      });

      this.content = '';
      this.password = '';
    },
    GetRandomNickName
  },
  async created() {
    const data = await GetMyIP();
    this.myIP = data;
  }
};
</script>

<style scoped>
.modal-header {
  margin-top: 12px;
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  font-size: 18pt;
}

.color-picker {
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-picker > button {
  margin-right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-picker .color {
  width: 18px;
  height: 18px;
  margin-right: 4px;
  border: 1px solid #c7c5c5;
  border-radius: 18px;
}

.color-picker > .yellow > .color {
  background-color: #fff4ce;
}
.color-picker > .pink > .color {
  background-color: #fce3f3;
}

.close-image {
  width: 18px;
  height: 18px;
  vertical-align: middle;
}

.modal-body {
  margin: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.write-content {
  width: 100%;
  height: 300px;
  padding: 16px;
  border-radius: 18px;
  box-sizing: border-box;
  font-size: 18pt;
  resize: none;
}

.write-content.yellow {
  background-color: #fff4ce;
}
.write-content.pink {
  background-color: #fce3f3;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.writer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.writer > div {
  width: 100%;
  padding: 8px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dddddd;
  box-sizing: border-box;
}

.writer > div > p {
  width: 100px;
  margin-left: 8px;
  font-size: 10pt;
}

.writer > div > input {
  width: 100%;
  border: none;
  background: none;
}

.writer > .password {
  margin-top: 10px;
}

.modal-button {
  width: 70px;
  height: 80px;
  margin-left: 10px;
  border-radius: 12px;
  box-sizing: border-box;
  background-color: #ca434c;
  color: white;
}
</style>
