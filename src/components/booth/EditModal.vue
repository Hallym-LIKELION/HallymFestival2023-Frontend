<template>
  <Modal :visible="visible" @dispose="close" width="500px">
    <div class="modal-header">
      부스 페이지 수정하기
      <button class="close-button" @click="close">
        <img :src="CloseImage" alt="닫기" />
      </button>
    </div>
    <div class="modal-body">
      <p class="label">이름</p>
      <div class="input name">
        <input type="text" />
        <p class="error">이름은 공란으로 둘 수 없습니다.</p>
      </div>

      <p class="label">사진</p>
      <div class="input image">
        <img src="https://placehold.co/400x400" alt="" />
        <p class="error">파일이 이미지가 아닙니다. 다른 파일로 다시 시도하세요.</p>
        <button class="button" @click="">이미지 업로드</button>
      </div>

      <p class="label">설명</p>
      <div class="input description">
        <textarea
          class=""
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        ></textarea>
        <p class="error">설명은 공란으로 둘 수 없습니다.</p>
      </div>

      <p class="label">메뉴판</p>
      <div class="input menu">
        <button class="button" @click="">메뉴판 수정하기</button>
      </div>

      <p class="label">상태</p>
      <div class="input status">
        <button class="open select">OPEN</button>
        <button class="close">CLOSE</button>
      </div>

      <p class="label"></p>
      <button class="modal-button" @click="editNotice">수정 완료</button>
    </div>
  </Modal>
</template>

<script>
import Modal from '../Modal.vue';
import CloseImage from '../../assets/close.png';

export default {
  components: {
    Modal
  },
  data() {
    return {
      CloseImage
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
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    editNotice() {
      this.$emit('complete');
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

.close-button {
  line-height: 15pt;
}
.close-button > img {
  width: 18px;
  height: 18px;
  vertical-align: middle;
}

.modal-body {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 80px 1fr;
  row-gap: 16px;
}

.modal-body > .label {
  font-size: 14pt;
}

.input > input[type='text'],
.input.description > textarea {
  width: calc(100% - 20px);
  padding: 4px 10px;
  border-radius: 4px;
}

.input > .error {
  color: #ff3333;
  font-size: 10pt;
}

.input.name > input {
  font-size: 13pt;
}

.input.image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input.image > img {
  max-width: min(100%, 240px);
  /* object-fit: contain; */
}

.input.image > button {
  margin-top: 10px;
}

.input.description > textarea {
  height: 120px;
  background-color: #dfdfdf;
  font-size: 12pt;
  resize: none;
}

.input.status > button {
  width: calc(50% - 5px);
  height: 30px;
  border-radius: 4px;
  font-size: 11pt;
  background-color: #dfdfdf;
}

.input.status > button.open {
  margin-right: 5px;
}
.input.status > button.close {
  margin-left: 5px;
}

.input.status > button.select {
  color: white;
  background-color: #466efe;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.modal-button {
  width: 100%;
  padding: 10px 0;
  border-radius: 24px;
  background-color: #466efe;
  color: white;
}
.button {
  width: 100%;
  height: 28px;
  border-radius: 4px;
  background-color: #466efe;
  color: white;
}
</style>
