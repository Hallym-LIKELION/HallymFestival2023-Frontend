<template>
  <Modal class="modal" :visible="visible" @dispose="close" width="500px">
    <div class="modal-header">
      <p class="normal">댓글을 삭제하려면 비밀번호를 입력하세요</p>
      <p class="error" v-if="!status">비밀번호가 일치하지 않습니다. 다시 입력하세요.</p>
      <!-- <button class="close-button" @click="close">
        <img :src="CloseImage" alt="닫기" />
      </button> -->
    </div>
    <div class="modal-body">
      <input type="password" v-model="password" @keydown.enter="deleteComment" />
    </div>
    <div class="modal-footer">
      <button class="modal-button back" @click="close">돌아가기</button>
      <button class="modal-button delete" @click="deleteComment">삭제하기</button>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue';
import CloseImage from '../assets/close.png';

export default {
  components: {
    Modal
  },
  data() {
    return {
      CloseImage,
      password: ''
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close() {
      this.password = '';
      this.$emit('close');
    },
    deleteComment() {
      this.$emit('complete', this.password);
      this.password = '';
    }
  },
  created() {}
};
</script>

<style scoped>
.close-button {
  line-height: 24pt;
}
.close-button > img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.modal-header {
  margin-top: 8px;
}

.modal-header > p {
  font-size: 15pt;
  text-align: center;
  word-break: keep-all;
}

.modal-header > p.error {
  color: #ff3333;
  font-size: 10pt;
}

.modal-body {
  height: 100%;
  margin: 8px;
}

input {
  width: 100%;
  margin-top: 6px;
  padding: 0;
  border: 0;
  background-color: #efefef;
  /* outline: 1px solid black; */
  font-size: 18pt;
  text-align: center;
  font-family: Verdana;
  letter-spacing: 0.125em;
}

.modal-footer {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-button {
  width: 160px;
  margin: 0 8px;
  margin-top: 10px;
  padding: 8px;
  border-radius: 24px;
  font-size: 11pt;
  color: white;
}

.modal-button.delete {
  background-color: #ff3333;
}
.modal-button.back {
  background-color: #434343;
}

@media screen and (max-width: 400px) {
  .modal-header > p {
    font-size: 9pt;
  }

  input {
    font-size: 14pt;
  }

  .modal-button {
    width: 80px;
    margin: 0 8px;
    margin-top: 8px;
    padding: 4px;
    border-radius: 24px;
    font-size: 10pt;
    color: white;
  }
}
</style>
