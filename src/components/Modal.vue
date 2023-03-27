<template>
  <Transition name="modal">
    <div class="modal" v-if="visible">
      <div class="modal-background" @click="$emit('dispose')"></div>
      <div class="modal-container" :style="{ width: width }">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: 'auto'
    }
  }
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
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
  box-shadow: 0px 0px 6px #00000099;
  background-color: #ffffff;
  z-index: 9999;
  transition: all 0.3s ease;
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
