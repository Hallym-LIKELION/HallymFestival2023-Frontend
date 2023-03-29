<template>
  <Modal :visible="visible" @dispose="close" width="400px">
    <div class="modal-header">
      부스 메뉴판 수정하기
      <button class="close-button" @click="close">
        <img class="close-image" :src="CloseImage" alt="닫기" />
      </button>
    </div>
    <div class="modal-body">
      <p class="item-label"></p>
      <p class="item-label">메뉴명</p>
      <p class="item-label">가격</p>
      <p class="item-label">품절</p>

      <template v-for="(item, index) in items" :key="index">
        <button class="item-remove" @click="() => deleteItem(index)">
          <img class="close-image" :src="CloseImage" alt="닫기" />
        </button>
        <input class="item-name" placeholder="메뉴명..." type="text" v-model="item.name" />
        <input
          class="item-price"
          placeholder="가격..."
          type="text"
          maxlength="6"
          @input="(evt) => checkNumber(evt, index)"
          v-model="item.price"
        />
        <input class="item-soldout" type="checkbox" v-model="item.isSoldout" />
      </template>
    </div>
    <div class="modal-footer">
      <div><button class="modal-button add" @click="addItem">항목 추가하기</button></div>
      <div>
        <button class="modal-button back" @click="close">돌아가기</button>
        <button class="modal-button apply" @click="applyMenu">적용하기</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '../Modal.vue';
import CloseImage from '../../assets/close.png';

const ERROR_MESSAGE = {
  empty_title: '메뉴명은 공란으로 둘 수 없습니다.',
  max_item: '항목은 최대 15개까지 만들 수 있습니다'
};

export default {
  components: {
    Modal
  },
  data() {
    return {
      CloseImage,

      items: []
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    updateData() {
      this.items = JSON.parse(JSON.stringify(this.data));
    },
    close() {
      if (JSON.stringify(this.data) !== JSON.stringify(this.items)) {
        if (confirm('저장되지 않은 내용이 있습니다. 정말 닫으시겠어요?') === false) {
          // TODO: choose를 modal로 빼거나 다른 방법을 찾아볼 것
          // 아니면 기획팀과 협의 후 그냥 안 물어보고 끄도록 할 것
          return;
        }
      }

      this.$emit('close');
    },
    checkNumber(event, index) {
      event.target.value = event.target.value.replaceAll(/[^0-9]/g, '');

      if (event.target.value.length === 0) {
        event.target.value = 0;
      }

      this.items[index].price = parseInt(event.target.value);
      this.$emit('update:modelValue', event.target.value);
    },
    addItem() {
      this.items.push({
        name: '',
        price: 1000,
        isSoldout: false
      });
    },
    deleteItem(id) {
      this.items = this.items.filter((item, index) => index !== id);
    },
    applyMenu() {
      const isEmptyMenu = this.items.some((item) => item.name === '');
      const isEmptyPrice = this.items.some((item) => item.price === '');

      if (isEmptyMenu) {
        alert(ERROR_MESSAGE.empty_title);
        return;
      }

      if (isEmptyPrice) {
        alert('가격은 비워둘 수 없습니다.');
        return;
      }

      // 가격을 number로 변환
      this.items.forEach((item) => (item.price = parseInt(item.price)));

      this.$emit('complete', this.items);
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

.close-image {
  width: 18px;
  height: 18px;
  vertical-align: middle;
}

.modal-body {
  margin: 10px 0;
  width: 100%;
  min-height: 500px;
  display: grid;
  grid-template-columns: 18px 3fr 1fr 24px;
  grid-auto-rows: max(24px);
  row-gap: 16px;
  column-gap: 10px;
}

.modal-footer {
  display: flex;
  flex-direction: column;
}

.modal-button {
  height: 24px;
  border-radius: 24px;
  background-color: #466efe;
  color: white;
}

.modal-button.add {
  width: 100%;
  height: 36px;
  border-radius: 8px;
  margin-bottom: 10px;
}
.modal-button.back {
  width: calc(50% - 5px);
  margin-right: 10px;
}
.modal-button.apply {
  width: calc(50% - 5px);
}

.item-label {
  font-size: 9pt;
}
.item-label:nth-child(1),
.item-label:nth-child(4) {
  text-align: center;
}

.item-label:nth-child(3) {
  text-align: right;
}

.item-remove {
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-remove > .close-image {
  width: 12px;
  height: 12px;
  vertical-align: middle;
}

.item-name {
  width: calc(100% - 20px);
  padding: 0 10px;
  border-radius: 4px;
  font-size: 13pt;
}
.item-price {
  width: calc(100% - 20px);
  padding: 0 10px;
  border-radius: 4px;
  font-size: 13pt;
  text-align: right;
}
.item-soldout {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
