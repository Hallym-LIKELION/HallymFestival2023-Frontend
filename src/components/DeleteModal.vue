<template>
  <Modal class="modal" :visible="visible" @dispose="close" width="360px">
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
      <p ref="error" :class="['error', { hidden: !error }]">"삭제"라고 입력해주세요.</p>
    </div>
    <div class="modal-footer">
      <button class="modal-button back" @click="close">돌아가기</button>
      <button class="modal-button delete" @click="complete">삭제하기</button>
    </div>
  </Modal>
</template>

<script>
import { gsap, Elastic } from 'gsap';
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
    showError() {
      this.error = true;
      this.text = '';
      gsap.fromTo(
        this.$refs.error,
        {
          marginLeft: '24px'
        },
        {
          duration: 0.5,
          marginLeft: '0',
          ease: Elastic.easeOut.config(2, 0)
        }
      );
    },
    complete() {
      if (this.text !== '삭제') {
        this.showError();
        return;
      }

      this.text = '';
      this.error = false;
      this.$emit('complete');
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
  margin-bottom: 12px;
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
  border-radius: 10px;
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
  width: 90px;
  padding: 10px 0;
  border-radius: 24px;
}

.modal-button.back {
  color: black;
  background-color: #dfdfdf;
}

.modal-button.delete {
  margin-left: 10px;
  color: white;
  background-color: #ca434c;
}
</style>
