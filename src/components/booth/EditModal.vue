<template>
  <Modal :visible="visible" @dispose="close" width="420px">
    <div class="modal-header">
      부스 소개 편집하기
      <button class="close-button" @click="close">
        <img :src="CloseImage" alt="닫기" />
      </button>
    </div>
    <div class="modal-body">
      <p class="error" v-if="!status">내용은 0자 이상이어야 합니다.</p>
      <textarea
        class="modal-input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>
    <div class="modal-footer">
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
  font-size: 15pt;
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
}

.modal-body > .error {
  font-size: 10pt;
  color: #ff3333;
}

.modal-input {
  width: calc(100% - 20px);
  height: 120px;
  margin: 10px 0;
  padding: 10px;
  background-color: #dfdfdf;
  font-size: 12pt;
  resize: none;
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
</style>
