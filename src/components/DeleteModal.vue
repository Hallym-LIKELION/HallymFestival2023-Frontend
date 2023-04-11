<template>
  <Modal class="modal" :visible="visible" @dispose="close" width="500px">
    <div class="modal-header">
      <p class="normal">{{ type }} 삭제하시겠습니까?</p>
      <button class="close-button" @click="close">
        <img :src="CloseImage" alt="닫기" />
      </button>
    </div>
    <div class="modal-body">
      <p>"{{ name }}" {{ type }} 삭제하려고 합니다.</p>
      <p>계속하려면 "삭제"라고 입력하세요.</p>
      <input type="text" v-model="text" @keydown.enter="complete" />
      <p :class="['error', { hidden: !error }]">"삭제"라고 입력해주세요</p>
    </div>
    <div class="modal-footer">
      <button class="modal-button back" @click="close">돌아가기</button>
      <button class="modal-button delete" @click="complete">삭제하기</button>
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
      error: false,
      text: ''
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: '항목을'
    },
    name: {
      type: String,
      default: 'Untitled'
    }
  },
  methods: {
    close() {
      this.text = '';
      this.error = false;
      this.$emit('close');
    },
    complete() {
      if (this.text === '삭제') {
        this.text = '';
        this.error = false;
        this.$emit('complete');
      } else {
        this.error = true;
      }
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
  width: 18px;
  height: 18px;
  vertical-align: middle;
}

.modal-header {
  margin-top: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header > p {
  font-size: 15pt;
  text-align: center;
}

.modal-body > p {
  font-size: 12pt;
  text-align: center;
}

.modal-body > p.error {
  margin-top: 2px;
  color: #ff3333;
  font-size: 10pt;
}

.hidden {
  visibility: hidden;
}

.modal-body {
  height: 100%;
  margin: 8px;
}

input {
  width: 100%;
  margin-top: 18px;
  padding: 0;
  border: 0;
  background-color: #efefef;
  /* outline: 1px solid black; */
  font-size: 18pt;
  text-align: center;
}

.modal-footer {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.modal-button {
  width: 100px;
  margin: 0 4px;
  padding: 6px;
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
</style>
