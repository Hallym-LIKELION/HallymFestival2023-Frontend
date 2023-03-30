<template>
  <Modal :visible="visible" @dispose="close" width="400px">
    <div class="modal-header">
      방명록 작성하기
      <button class="close-button" @click="close">
        <img class="close-image" :src="CloseImage" alt="닫기" />
      </button>
    </div>
    <div class="modal-body">
      <textarea
        class="write-content"
        v-model="content"
        @keydown.enter.prevent="sendComment"
        placeholder="부스에 대한 감상평을 자유롭게 나눠보세요"
      ></textarea>
      <input
        class="write-password"
        v-model="password"
        type="password"
        placeholder="비밀번호를 입력..."
        maxlength="32"
        @keypress.enter="sendComment"
      />
    </div>
    <div class="modal-footer">
      <button class="modal-button back" @click="close">돌아가기</button>
      <button class="modal-button apply" @click="sendComment">게시하기</button>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue';
import CloseImage from '../assets/close.png';

const ERROR_MESSAGE = {};

export default {
  components: {
    Modal
  },
  data() {
    return {
      CloseImage,

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
    sendComment() {
      if (this.content.length == 0) {
        alert('내용은 0자 이상이어야 합니다.');
      }

      if (this.password.length <= 4) {
        alert('비밀번호는 4자리 이상이어야 합니다.');
      }
      this.$emit('complete', this.content, this.password);

      this.content = '';
      this.password = '';
    }
  },
  created() {}
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
