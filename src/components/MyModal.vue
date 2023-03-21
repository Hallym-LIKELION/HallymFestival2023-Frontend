<template>
  <Transition name="modal">
    <div class="modal" v-if="show">
      <div class="modal-background" @click="$emit('close')"></div>
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">이름 없는 헤더</slot>
          <button class="close-button" @click="$emit('close')">
            <img :src="CloseImage" alt="닫기" />
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"> </slot>
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
      CloseImage
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {},
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
  height: 300px;

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

.modal-footer {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
