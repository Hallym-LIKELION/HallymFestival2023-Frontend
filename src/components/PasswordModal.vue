<template>
  <Transition name="modal">
    <div class="modal" v-if="show">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-container">
        <div class="modal-header">
          댓글 삭제하기
          <button class="close-button" @click="closeModal">
            <img :src="CloseImage" alt="닫기" />
          </button>
        </div>
        <div class="modal-body">
          <p>댓글의 비밀번호를 입력해주세요.</p>
          <input type="password" v-model="password" />
        </div>
        <div class="modal-footer">
          <button class="modal-button" @click="deleteComment">삭제하기</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import CloseImage from '../assets/close.png';

export default {
  data() {
    return {
      CloseImage,
      password: ''
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      this.password = '';
      this.$emit('close');
    },
    deleteComment() {
      this.$emit('modalComplete', this.password);
      this.password = '';
    }
  },
  created() {}
};
</script>

<style scoped>
.modal {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0 28px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #00000099; */
  z-index: 9999;
  transition: opacity 0.3s ease;
}

.modal-background {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: #00000099;
}

.modal-container {
  width: 768px;
  height: 180px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  box-shadow: 0px 0px 6px #00000099;
  background-color: #ffffff;
  z-index: 9999;
  transition: all 0.3s ease;
}

.modal-container > div {
  margin-left: 24px;
  margin-right: 24px;
}

.close-button {
  line-height: 24pt;
}
.close-button > img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.modal-header {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 24pt;
  line-height: 24pt;
}

.modal-body {
  height: 100%;
}

input {
  width: 100%;
  margin-top: 10px;
  padding: 0;
  border: 0;
  outline: 1px solid black;
  font-size: 24pt;
}

.modal-footer {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.modal-button {
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 24px;
  color: white;
  background-color: #ff3333;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
