<template>
  <Modal :visible="visible" @dispose="close" width="400px">
    <div class="modal-header">
      공지사항 수정하기
      <button class="close-button" @click="close">
        <img class="close-image" :src="CloseImage" alt="닫기" />
      </button>
    </div>
    <div class="modal-body">
      <input class="write-title" v-model="data_title" type="text" placeholder="제목..." />
      <textarea
        class="write-content"
        v-model="data_content"
        placeholder="내용을 입력하세요"
      ></textarea>
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

const ERROR_MESSAGE = {};

export default {
  components: {
    Modal
  },
  data() {
    return {
      CloseImage,

      data_title: '',
      data_content: ''
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  methods: {
    close() {
      if (this.data_title + this.data_content !== '') {
        if (confirm('저장되지 않은 내용이 있습니다. 정말 닫으시겠어요?') === false) {
          // TODO: choose를 modal로 빼거나 다른 방법을 찾아볼 것
          // 아니면 기획팀과 협의 후 그냥 안 물어보고 끄도록 할 것
          return;
        }
      }
      this.$emit('close');
    },
    async send() {
      if (this.data_title.length == 0) {
        alert('제목은 공란으로 둘 수 없습니다.');
        return;
      }

      if (this.data_content.length == 0) {
        alert('내용은 공란으로 둘 수 없습니다.');
        return;
      }

      this.$emit('complete', this.data_title, this.data_content);
    }
  },
  watch: {
    visible(value) {
      if (value === true) {
        this.data_title = this.title;
        this.data_content = this.content;
      }
    },
    title(value) {
      this.data_title = value;
    },
    content(value) {
      this.data_content = value;
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
  display: flex;
  flex-direction: column;
}

.write-title {
  padding: 4px 10px;
  background-color: #d3d3d3;
}
.write-content {
  width: calc(100% - 20px);
  height: 200px;
  margin-top: 10px;
  padding: 4px 10px;
  background-color: #d3d3d3;
  resize: none;
}

.modal-footer {
  display: flex;
}

.modal-button {
  height: 24px;
  border-radius: 24px;
  background-color: #CA434C;
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
