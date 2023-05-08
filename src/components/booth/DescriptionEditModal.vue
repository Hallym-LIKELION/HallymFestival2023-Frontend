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
        class="content"
        v-model="content"
        @keydown.enter.prevent="send"
        placeholder="부스 설명을 입력하세요"
        maxlength="500"
      ></textarea>
      <p ref="error" :class="['error', { hidden: !error }]">부스 소개는 공란으로 둘 수 없습니다.</p>
    </div>
    <div class="modal-footer">
      <button class="modal-button back" @click="close">돌아가기</button>
      <button class="modal-button apply" @click="complete">게시하기</button>
    </div>
  </Modal>
</template>

<script>
import { gsap, Elastic } from 'gsap';
import CloseImage from '../../assets/close.png';
import Modal from '../Modal.vue';

const ERROR_MESSAGE = {};

export default {
  components: {
    Modal
  },
  data() {
    return {
      CloseImage,
      content: '',
      error: false
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: String,
      default: ''
    }
  },
  watch: {
    visible(value) {
      if (value === true) {
        this.content = this.data;
      }
    }
  },
  methods: {
    close() {
      if (this.content !== this.data) {
        if (confirm('저장되지 않은 내용이 있습니다. 정말 닫으시겠어요?') === false) {
          return;
        }
      }

      this.error = false;
      this.$emit('close');
    },
    showError() {
      this.error = true;
      gsap.fromTo(
        this.$refs.error,
        {
          marginLeft: '-24px'
        },
        {
          duration: 0.5,
          marginLeft: '0',
          ease: Elastic.easeOut.config(2, 0)
        }
      );
    },
    complete() {
      if (this.content.trim() === '') {
        this.showError();
        return;
      }

      this.error = false;

      if (this.content === this.data) {
        this.$emit('close');
      } else {
        this.$emit('complete', this.content);
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.modal-header {
  margin-top: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid black;
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
  display: flex;
  flex-direction: column;
}

.content {
  width: calc(100% - 20px);
  height: 140px;
  padding: 10px;
  border-radius: 10px;
  font-size: 11pt;
  background-color: #ebebeb;
  resize: none;
}

.error {
  margin-top: 3px;
  font-size: 9pt;
  color: #ff3333;
}

.hidden {
  visibility: hidden;
}

.modal-footer {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}

.modal-button {
  padding: 10px 18px;
  border-radius: 24px;
  background-color: #ca434c;
  color: white;
}

.modal-button.back {
  color: black;
  background-color: #dfdfdf;
  margin-right: 10px;
}
</style>
