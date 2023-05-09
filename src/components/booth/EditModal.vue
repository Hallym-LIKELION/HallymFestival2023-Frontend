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
          <input class="input-title" type="text" v-model="title" maxlength="30" />
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

        <p class="label">아이콘</p>
        <div class="input type">
          <div class="flex-container">
            <template v-for="[item, image] in Object.entries(typeObject)" :key="item">
              <div class="item">
                <button class="button" :class="{ active: type === item }" @click="setType(item)">
                  <img :src="image" :alt="item" />
                </button>
                <p>{{ typeReplace[item] }}</p>
              </div>
            </template>
          </div>
        </div>

        <p class="label">낮/밤</p>
        <div class="input daynight">
          <div class="flex-container">
            <button class="button" :class="{ active: !isNight }" @click="setNight(false)">
              낮부스
            </button>
            <button class="button" :class="{ active: isNight }" @click="setNight(true)">
              밤부스
            </button>
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
        플리마켓: Icon.basket,
        푸드트럭: Icon.food,
        주점: Icon.interest,
        부스: Icon.store
      },

      typeReplace: {
        플리마켓: '플리마켓',
        푸드트럭: '먹거리',
        주점: '오락',
        부스: '기타'
      },

      titleError: false,
      dayError: false,

      // 사용자가 입력한 데이터들
      title: '',
      dayObject: { 화: false, 수: false, 목: false },
      isNight: false,
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
        return { title: '', date: '[]', type: '주점', dayNight: 'DAY' };
      }
    }
  },
  methods: {
    updateData() {
      this.title = this.data.title;
      this.type = this.data.type;
      this.isNight = this.data.dayNight === 'NIGHT';

      const dayData = JSON.parse(this.data.date);

      this.dayObject['화'] = dayData.includes(1);
      this.dayObject['수'] = dayData.includes(2);
      this.dayObject['목'] = dayData.includes(3);
    },
    toggleDay(day) {
      this.dayObject[day] = !this.dayObject[day];
    },
    setType(type) {
      this.type = type;
    },
    setNight(value) {
      this.isNight = value;
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
        this.day === this.data.date,
        this.type === this.data.type,
        this.isNight === (this.data.dayNight === 'NIGHT')
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
      if (this.day.length === 2) {
        this.showDayError();
      }

      if (this.titleError || this.dayError) {
        return;
      }

      this.$emit('complete', {
        title: this.title,
        day: this.day,
        type: this.type,
        isNight: this.isNight ? 'NIGHT' : 'DAY'
      });
    }
  },
  computed: {
    day() {
      const list = [null, '화', '수', '목'];
      return JSON.stringify(
        Object.entries(this.dayObject)
          .filter(([key, value]) => value)
          .map(([key, value]) => list.indexOf(key))
      );
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
  font-size: 13pt;
  background-color: #ebebeb;
}

.flex-container {
  display: flex;
  justify-content: space-evenly;
}
.input.type {
  margin-bottom: 18px;
}

.input.type .item {
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.input.type .item > p {
  margin-top: 6px;
  font-size: 9pt;
  text-align: center;
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

.input.daynight button {
  width: 80px;
  font-size: 12pt;
  letter-spacing: 1px;
}

.input .button > img {
  width: 28px;
  height: 28px;
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

@media screen and (max-width: 375px) {
  .modal-body {
    grid-template-columns: 1fr;
  }

  .input.title + div {
    display: flex;
    align-items: flex-end;
  }

  .modal-body .label {
    font-size: 13pt;
  }
  .modal-body .label.small {
    margin-left: 4px;
    font-size: 9pt;
  }

  .input.title > input {
    width: calc(100% - 20px);
    font-size: 11pt;
  }

  .input.type .item > p {
    font-size: 8pt;
  }
  .input .button {
    width: 42px;
    height: 42px;
    font-size: 12pt;
  }

  .input.daynight button {
    width: 70px;
    font-size: 10pt;
  }

  .input .button > img {
    width: 18px;
    height: 18px;
  }

  .footer > .button {
    width: 70px;
    padding: 6px 0;
    font-size: 9pt;
  }
}
</style>
