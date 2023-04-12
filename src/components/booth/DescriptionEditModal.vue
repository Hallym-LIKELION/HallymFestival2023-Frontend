<template>
  <Modal :visible="visible" @dispose="close" width="400px">
    <div class="modal-header">
      부스 소개
      <button class="close-button" @click="close">
        <img class="close-image" :src="CloseImage" alt="닫기" />
      </button>
    </div>
    <div class="modal-body">
      <textarea
        class="write-content"
        v-model="content"
        @keydown.enter.prevent="send"
        placeholder="부스에 대한 감상평을 자유롭게 나눠보세요"
      ></textarea>
      <p :class="['error', { hidden: !error }]">부스 소개는 공란으로 둘 수 없습니다.</p>
    </div>
    <div class="modal-footer">
      <button class="modal-button back" @click="close">돌아가기</button>
      <button class="modal-button apply" @click="send">게시하기</button>
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
  display: flex;
  justify-content: space-between;
  font-size: 18pt;
}

.close-image {
  width: 18px;
  height: 18px;
  vertical-align: middle;
}

.modal-body {
  margin: 10px 0;
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.write-content {
  width: 100%;
  height: 100px;
}

.modal-footer {
  display: flex;
}

.modal-button {
  height: 24px;
  border-radius: 24px;
  background-color: #466efe;
  color: white;
}

.modal-button.back {
  width: calc(50% - 5px);
  margin-right: 10px;
}
.modal-button.apply {
  width: calc(50% - 5px);
}
</style>
