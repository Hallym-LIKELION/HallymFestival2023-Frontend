<template>
  <Modal :visible="visible" @dispose="close" width="400px">
    <div class="modal-header">
      <button class="close-button" @click="close">
        <img class="close-image" :src="CloseImage" alt="닫기" />
      </button>
    </div>
    <div class="modal-body">
      <Image :src="image" class="image" width="300" height="210" spinner-size="200" :alt="title" />
      <h4 class="title">{{ title }}</h4>
      <ul class="content">
        <li v-for="item in content">{{ item }}</li>
      </ul>

      <div class="date">
        <div>날짜</div>
        <p>{{ dateFormat(date) }}</p>
      </div>
      <div class="place">
        <div>장소</div>
        <p>{{ place }}</p>
      </div>
    </div>
    <div class="modal-footer"></div>
  </Modal>
</template>

<script>
import Image from './Image.vue';
import Modal from './Modal.vue';
import CloseImage from '../assets/close.png';
import dayjs from 'dayjs';

export default {
  components: {
    Modal,
    Image
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
      type: Array,
      default: []
    },
    image: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    place: {
      type: String,
      default: ''
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    dateFormat(date) {
      return dayjs(date).format('YYYY년 MM월 DD일 HH시 mm분');
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
  padding: 8px 0;
  display: flex;
  justify-content: flex-end;
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

:deep(.image) {
  width: 100%;
  border-radius: 8px;
  object-fit: contain;
}

.content {
  min-height: 120px;
  padding-left: 16px;
}

.content > li {
  margin-top: 4px;
}

.title {
  margin-top: 16px;
  font-family: 'Nanum Gothic';
  font-size: 20pt;
  font-weight: 600;

  display: flex;
  flex-direction: column;

  color: black;
}

.date,
.place {
  margin-top: 8px;
  display: flex;
  align-items: center;
}

.date > div,
.place > div {
  width: 70px;

  padding: 8px 4px;
  border-radius: 24px;
  background-color: #6f93a6;
  color: white;

  display: flex;
  justify-content: center;
}

.date > p,
.place > p {
  margin-left: 8px;
}

.modal-footer {
  display: flex;
}

.modal-button {
  height: 24px;
  border-radius: 24px;
  background-color: #ca434c;
  color: white;
}
</style>
