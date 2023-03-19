<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <slot/>
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button @click="$emit('close')">닫기</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style scoped>

.modal-footer {
  background: #ccc;
  padding: 10px;
  text-align: right;
}
.modal-content {
  padding: 10px 20px;
}

.modal-window {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.modal.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-enter-active, .modal-leave-active {
  /* 오버레이 트랜지션 */
  transition: opacity 0.4s;

 

}

.modal-window {
  transition: opacity 0.4s, transform 0.4s;
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;


}

.modal-window {
  opacity: 0;
  transform: translateY(-20px);
}
</style>