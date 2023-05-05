<template>
  <Modal :visible="visible" @dispose="close" width="360px">
    <div class="modal-container">
      <div class="modal-header">
        부스 속성
        <button class="close-button" @click="close">
          <img :src="CloseImage" alt="닫기" />
        </button>
      </div>
      <div class="modal-body">
        <p class="label">부스명</p>
        <div class="input title">
          <input class="input-title" type="text" v-model="title" />
          <p ref="titleError" :class="['error', { hidden: !titleError }]">
            이름은 공란으로 둘 수 없습니다.
          </p>
        </div>

        <div>
          <p class="label">요일</p>
          <p class="label small">중복 선택 가능</p>
        </div>
        <div class="input day">
          <div class="flex-container">
            <template v-for="item of Object.keys(dayObject)" :key="item">
              <button class="button" :class="{ active: dayObject[item] }" @click="toggleDay(item)">
                {{ item }}
              </button>
            </template>
          </div>
          <p ref="dayError" :class="['error', { hidden: !dayError }]">
            요일을 하나 이상 선택하세요.
          </p>
        </div>

        <p class="label">유형</p>
        <div class="input type">
          <div class="flex-container">
            <template v-for="[item, image] in Object.entries(typeObject)" :key="item">
              <button class="button" :class="{ active: type === item }" @click="setType(item)">
                <img :src="image" :alt="item" />
              </button>
            </template>
          </div>
        </div>

        <p class="label"></p>
        <div class="footer">
          <button class="button" @click="close">취소</button>
          <button class="button" @click="apply">적용</button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { gsap, Elastic } from 'gsap';
import Modal from '../Modal.vue';
import CloseImage from '../../assets/close.png';
import { Icon } from '../../library/icon';

export default {
  components: {
    Modal
  },
  data() {
    return {
      CloseImage,

      typeObject: {
        주점: Icon.beer,
        부스: Icon.gamepad,
        플리마켓: Icon.basket,
        푸드트럭: Icon.food
      },

      titleError: false,
      dayError: false,

      // 사용자가 입력한 데이터들
      title: '',
      dayObject: { 화: false, 수: false, 목: false },
      type: '주점'
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
        return { title: '', day: [], type: '주점' };
      }
    }
  },
  methods: {
    updateData() {
      this.title = this.data.title;
      this.type = this.data.type;
    },
    toggleDay(day) {
      this.dayObject[day] = !this.dayObject[day];
      console.log(this.day);
    },
    setType(type) {
      this.type = type;
    },
    showTitleError() {
      this.titleError = true;
      gsap.fromTo(
        this.$refs.titleError,
        {
          marginLeft: '24px'
        },
        {
          duration: 0.5,
          marginLeft: '0',
          ease: Elastic.easeOut.config(1 + Math.random(), 0)
        }
      );
    },
    showDayError() {
      this.dayError = true;
      gsap.fromTo(
        this.$refs.dayError,
        {
          marginLeft: '24px'
        },
        {
          duration: 0.5,
          marginLeft: '0',
          ease: Elastic.easeOut.config(1 + Math.random(), 0)
        }
      );
    },
    close() {
      const flags = [
        this.title === this.data.title,
        this.day === this.data.day,
        this.type === this.data.type
      ];

      if (!flags.every((item) => item == true)) {
        if (confirm('저장되지 않은 내용이 있습니다. 정말 닫으시겠어요?') === false) {
          return;
        }
      }

      this.titleError = false;
      this.dayError = false;

      this.$emit('close');
    },
    apply() {
      this.titleError = false;
      this.dayError = false;

      if (this.title.trim().length === 0) {
        this.showTitleError();
      }
      if (this.day.length === 0) {
        this.showDayError();
      }

      if (this.titleError || this.dayError) {
        return;
      }

      this.$emit('complete', {
        title: this.title,
        day: this.day,
        type: this.type
      });
    }
    // showFileSelector() {
    //   this.$refs.upload.click();
    // },
    // uploadImage(event) {
    //   const file = this.$refs.upload.files[0];
    //   const ACCEPT_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp'];

    //   if (!ACCEPT_TYPES.includes(file.type)) {
    //     alert('지원하지 않는 파일');
    //     return;
    //   }

    //   if (file.size > 5242880) {
    //     alert('크기가 너무 큽니다');
    //     return;
    //   }

    //   const self = this;

    //   const reader = new FileReader();
    //   reader.onload = function () {
    //     self.image = reader.result;
    //   };
    //   reader.readAsDataURL(file);
    // }
  },
  computed: {
    day() {
      return Object.entries(this.dayObject)
        .filter(([key, value]) => value)
        .map(([key, value]) => key);
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
  padding-top: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid black;
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

.hidden {
  visibility: hidden;
}

.modal-body {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 72px 1fr;
  row-gap: 8px;
}

.modal-body .label {
  font-size: 14pt;
}
.modal-body .label.small {
  font-size: 8pt;
}

.input > .error {
  margin-top: 3px;
  color: #ff3333;
  font-size: 9pt;
}

.input.title > input {
  width: calc(100% - 20px);
  padding: 4px 10px;
  border-radius: 4px;
}

.input.title > input {
  font-size: 13pt;
  background-color: #ebebeb;
}

.flex-container {
  display: flex;
  justify-content: space-evenly;
}

.input .button {
  width: 48px;
  height: 48px;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5c859b;
  border-radius: 8px;
  box-shadow: inset 0px 0px 6px rgba(92, 133, 155, 0.35);
  font-size: 16pt;
  font-weight: 600;
}

.input .button > img {
  width: 24px;
  height: 24px;
}

.input .button.active {
  color: white;
  background-color: #5c859b;
  box-shadow: 0px 0px 4px rgba(92, 133, 155, 0.25);
}

.input .button.active > img {
  /* 이미지를 하얗게 만드는 마법의 주문(?) */
  filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(299deg)
    brightness(102%) contrast(102%);
}

.input.day .button:nth-child(1) {
  margin-left: 0;
}
.input.day .button:nth-child(3) {
  margin-right: 0;
}

.input.type .button:nth-child(1) {
  margin-left: 0;
}
.input.type .button:nth-child(4) {
  margin-right: 0;
}

.footer {
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;
}

.footer > .button {
  width: 90px;
  padding: 10px 0;
  border-radius: 24px;
  background-color: #5c859b;
  color: white;
}

.footer > .button:nth-child(1) {
  margin-right: 5px;
  background-color: #dfdfdf;
  color: black;
}
.footer > .button:nth-child(4) {
  margin-left: 5px;
}
</style>
