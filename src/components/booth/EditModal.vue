<template>
  <Modal :visible="visible" @dispose="close" width="500px">
    <div class="modal-container">
      <div class="modal-header">
        부스 페이지 수정하기
        <button class="close-button" @click="close">
          <img :src="CloseImage" alt="닫기" />
        </button>
      </div>
      <div class="modal-body">
        <p class="label">이름</p>
        <div class="input name">
          <input type="text" v-model="title" />
          <p class="error">이름은 공란으로 둘 수 없습니다.</p>
        </div>

        <p class="label">사진</p>
        <div class="input image">
          <img :src="image" alt="" />
          <p class="error">파일이 이미지가 아닙니다. 다른 파일로 다시 시도하세요.</p>
          <input ref="upload" type="file" accept="image/*" v-show="false" @change="uploadImage" />
          <button class="button" @click="showFileSelector">
            <p class="title">이미지 업로드</p>
            <p class="subtitle">권장 크기: 000px x 000px, 0MB 이하의 jpg, png, gif만 가능</p>
          </button>
        </div>

        <p class="label">설명</p>
        <div class="input description">
          <textarea class="" v-model="description"></textarea>
          <p class="error">설명은 공란으로 둘 수 없습니다.</p>
        </div>

        <p class="label">타입</p>
        <div class="input type">
          <button
            class="button"
            :class="{ active: type === '주점' }"
            @click="() => (type = '주점')"
          >
            <img :src="BeerImage" alt="주점" />
          </button>
          <button
            class="button"
            :class="{ active: type === '부스' }"
            @click="() => (type = '부스')"
          >
            <img :src="BoothImage" alt="부스" />
          </button>
          <button
            class="button"
            :class="{ active: type === '플리마켓' }"
            @click="() => (type = '플리마켓')"
          >
            <img :src="FleaMarketImage" alt="플리마켓" />
          </button>
          <button
            class="button"
            :class="{ active: type === '푸드트럭' }"
            @click="() => (type = '푸드트럭')"
          >
            <img :src="FoodTruckImage" alt="푸드트럭" />
          </button>
        </div>

        <!-- <p class="label">메뉴판</p>
      <div class="input menu">
        <button class="button" @click="">메뉴판 수정하기</button>
      </div> -->

        <p class="label">상태</p>
        <div class="input status">
          <button :class="['open', { active: status }]" @click="() => (status = true)">OPEN</button>
          <button :class="['close', { active: !status }]" @click="() => (status = false)">
            CLOSE
          </button>
        </div>

        <p class="label"></p>
        <div class="footer">
          <button class="modal-button" @click="close">취소</button>
          <button class="modal-button" @click="editNotice">적용</button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '../Modal.vue';
import CloseImage from '../../assets/close.png';

import BeerImage from '../../assets/beer.png';
import BoothImage from '../../assets/photo-booth.png';
import FleaMarketImage from '../../assets/flea-market.png';
import FoodTruckImage from '../../assets/food-truck.png';

const ERROR_MESSAGE = {
  empty_title: '이름은 공란으로 둘 수 없습니다.',
  empty_description: '설명은 공란으로 둘 수 없습니다.',
  not_an_image: '업로드한 파일이 이미지가 아닙니다. 다시 시도하세요.',
  image_processing_error: '이미지를 처리하는데 실패했습니다. 다른 이미지로 시도하세요.'
};

export default {
  components: {
    Modal
  },
  data() {
    return {
      CloseImage,

      BeerImage,
      BoothImage,
      FleaMarketImage,
      FoodTruckImage,

      // 사용자가 입력한 데이터들
      title: '',
      description: '',
      type: '주점',
      image: 'https://placehold.co/300x300', // TODO: 서버에 등록된 이미지로 불러올 것
      imageUploaded: false,
      status: true
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return { title: '', description: '', type: '주점', status: true };
      }
    }
  },
  methods: {
    updateData() {
      this.title = this.data.title;
      this.description = this.data.description;
      this.type = this.data.type;
      this.status = this.data.status;
      this.imageUploaded = false;
    },
    close() {
      const flags = [
        this.title === this.data.title,
        this.description === this.data.description,
        this.type === this.data.type,
        this.status === this.data.status,
        !this.imageUploaded
      ];

      if (!flags.every((item) => item == true)) {
        if (confirm('저장되지 않은 내용이 있습니다. 정말 닫으시겠어요?') === false) {
          // TODO: choose를 modal로 빼거나 다른 방법을 찾아볼 것
          // 아니면 기획팀과 협의 후 그냥 안 물어보고 끄도록 할 것
          return;
        }
      }

      this.$emit('close');
    },
    editNotice() {
      this.$emit('complete', {
        title: this.title,
        description: this.description,
        type: this.type,
        status: this.status,
        image: this.$refs.upload.files[0]
      });
    },
    showFileSelector() {
      this.$refs.upload.click();
    },
    uploadImage(event) {
      const file = this.$refs.upload.files[0];
      const ACCEPT_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp'];

      if (!ACCEPT_TYPES.includes(file.type)) {
        alert('지원하지 않는 파일');
        return;
      }

      if (file.size > 5242880) {
        alert('크기가 너무 큽니다');
        return;
      }

      const self = this;

      const reader = new FileReader();
      reader.onload = function () {
        self.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  },
  watch: {
    visible(value) {
      if (value === true) {
        this.updateData();
      }
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
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
}

.input.image > button {
  margin-top: 10px;
}
.input.image > button > .title {
  font-size: 12pt;
}
.input.image > button > .subtitle {
  font-size: 7pt;
}

.input.description > textarea {
  height: 120px;
  background-color: #dfdfdf;
  font-size: 12pt;
  resize: none;
}

.input.type {
  display: flex;
}

.input.type > .button {
  margin: 0 5px;
  background-color: #dfdfdf;
}

.input.type > .button.active {
  background-color: #466efe;
}

.input.type > .button:nth-child(1) {
  margin-left: 0;
}
.input.type > .button:nth-child(4) {
  margin-right: 0;
}

.input.type > .button > img {
  width: 24px;
  height: 24px;
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

.input.status > button.active {
  color: white;
  background-color: #466efe;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.modal-button {
  width: calc(50% - 5px);
  padding: 10px 0;
  border-radius: 24px;
  background-color: #466efe;
  color: white;
}

.footer > .modal-button:nth-child(1) {
  margin-right: 5px;
  background-color: #dfdfdf;
  color: black;
}
.footer > .modal-button:nth-child(2) {
  margin-left: 5px;
}

.button {
  width: 100%;
  padding: 6px 0;
  border-radius: 4px;
  background-color: #466efe;
  color: white;
}
</style>
