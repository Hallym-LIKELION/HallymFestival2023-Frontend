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

      <template v-for="item in displayItems" :key="item.mno">
        <button class="item-remove" @click="() => deleteItem(item.mno)">
          <img class="close-image" :src="item._deleted ? Icon.undo : CloseImage" alt="닫기" />
        </button>
        <input class="item-name" :disabled="item._deleted" type="text" v-model="item.name" />
        <input
          class="item-price"
          :disabled="item._deleted"
          type="text"
          maxlength="6"
          @input="(evt) => checkNumber(evt, item)"
          v-model="item.price"
        />
        <div>
          <input
            class="item-soldout"
            type="checkbox"
            v-model="item.sell"
            :disabled="item._deleted"
            :id="'check_' + item.mno"
          />
          <label :for="'check_' + item.mno"></label>
        </div>

        <!-- v-model="item.isSoldout"  -->
      </template>
    </div>
    <div class="modal-footer">
      <div>
        <Pagination
          @change="changePage"
          :totalItems="items.length"
          :itemsPerPage="itemsPerPage"
          :currentPage="page"
        ></Pagination>
      </div>
      <p ref="error" :class="['error', { hidden: !error }]">{{ errorMsg }}</p>
      <div><button class="modal-button add" @click="addItem">항목 추가하기</button></div>
      <div>
        <button class="modal-button back" @click="close">돌아가기</button>
        <button class="modal-button apply" @click="applyMenu">적용하기</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import { Icon } from '../../library/icon';
import { gsap, Elastic } from 'gsap';
import Modal from '../Modal.vue';
import Pagination from '../Pagination.vue';
import CloseImage from '../../assets/close.png';
import {
  CreateBoothMenu,
  ModifyBoothMenu,
  DeleteBoothMenu,
  SoldBoothMenu
} from '../../api/api-client';

let id = -1;

export default {
  components: {
    Modal,
    Pagination
  },
  data() {
    return {
      CloseImage,
      page: 1,

      Icon,

      error: false,
      errorMsg: '.',

      itemsPerPage: 10,

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
          return;
        }
      }

      this.error = false;
      this.page = 1;
      this.$emit('close');
    },
    changePage(page) {
      this.page = page;
    },
    checkNumber(event, item) {
      event.target.value = event.target.value.replaceAll(/[^0-9]/g, '');

      if (event.target.value.length === 0) {
        event.target.value = 0;
      }

      item.price = parseInt(event.target.value);
      this.$emit('update:modelValue', event.target.value);
    },
    addItem() {
      if (this.items.length >= 30) {
        this.showError('메뉴는 최대 30개까지 생성 가능합니다.');
        return;
      }
      this.items.push({
        mno: id--,
        name: '',
        price: 1000,
        _created: true
      });
      this.page = parseInt((this.items.length - 1) / this.itemsPerPage) + 1;
    },
    deleteItem(id) {
      const item = this.items.filter((item) => item.mno === id)[0];
      if (item._created) {
        this.items = this.items.filter((item) => item.mno !== id);
      } else {
        item._deleted = !item._deleted;
      }

      const maxPage = parseInt((this.items.length - 1) / this.itemsPerPage) + 1;
      if (this.page > maxPage) {
        this.page = maxPage;
      }
    },
    showError(msg) {
      this.error = true;
      this.errorMsg = msg;
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
    async applyMenu() {
      const boothId = parseInt(this.$route.params.id);
      const isEmptyMenu = this.items.some((item) => !item._deleted && item.name.trim() === '');
      const isEmptyPrice = this.items.some((item) => !item._deleted && item.price === '');

      if (isEmptyMenu) {
        this.showError('메뉴명은 공란으로 둘 수 없습니다.');
        return;
      }

      if (isEmptyPrice) {
        this.showError('가격은 비워둘 수 없습니다.');
        return;
      }

      const promiseList = [];

      // Create Operation
      const createdList = this.items.filter((item) => item._deleted !== true && item._created);

      // 생성할때는 순차적으로 생성하기 (promiseList 사용하면 순서가 꼬임)
      for (const item of createdList) {
        try {
          await CreateBoothMenu(boothId, item.name, item.price);
        } catch (e) {
          alert('메뉴를 수정하는데 오류가 발생했습니다.\n' + e);
          return;
        }
      }

      // Modify Operation
      const modifiedList = this.items.filter((item) => {
        if (item._created || item._deleted) {
          return false;
        }
        const original = this.data.filter((oItem) => item.mno === oItem.mno)[0];

        if (!original) {
          return false;
        }

        return original.name !== item.name || original.price !== item.price;
      });

      for (const item of modifiedList) {
        promiseList.push(ModifyBoothMenu(item.mno, item.name, item.price));
      }

      // Modify -- Soldout Operation
      const modifiedSoldoutList = this.items.filter((item) => {
        if (item._created || item._deleted) {
          return false;
        }

        const original = this.data.filter((oItem) => item.mno === oItem.mno)[0];

        if (!original) {
          return false;
        }

        return original.sell !== item.sell;
      });

      for (const item of modifiedSoldoutList) {
        promiseList.push(SoldBoothMenu(item.mno));
      }

      // Delete Operation
      const deletedList = this.items.filter((item) => item.mno && item._deleted);

      for (const item of deletedList) {
        promiseList.push(DeleteBoothMenu(item.mno));
      }

      try {
        await Promise.all(promiseList);
      } catch (e) {
        alert('메뉴를 수정하는데 오류가 발생했습니다.\n' + e);
        return;
      }

      this.error = false;
      this.$emit('complete');
    }
  },
  watch: {
    visible(value) {
      if (value === true) {
        this.updateData();
      }
    }
  },
  computed: {
    displayItems() {
      return this.items.slice(this.itemsPerPage * (this.page - 1), this.itemsPerPage * this.page);
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
  margin-top: 10px;
  width: 100%;
  min-height: 240px;
  display: grid;
  grid-template-columns: 18px 5fr 3fr 42px;
  grid-auto-rows: max(24px);
  row-gap: 12px;
  column-gap: 9px;
}

.modal-footer {
  display: flex;
  flex-direction: column;
}

.modal-button {
  height: 24px;
  border-radius: 24px;
  color: white;
}

.modal-button.add {
  width: 100%;
  height: 36px;
  border-radius: 8px;
  margin-bottom: 10px;
  color: black;
  background-color: #dddddd;
}
.modal-button.back {
  width: calc(50% - 5px);
  margin-right: 10px;
  color: black;
  background-color: #dddddd;
}
.modal-button.apply {
  width: calc(50% - 5px);
  background-color: #ca434c;
}

.item-label {
  margin-top: 4px;
  font-size: 13pt;
}
.item-label:nth-child(1),
.item-label:nth-child(4) {
  text-align: center;
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
  font-size: 11pt;
}
.item-price {
  width: calc(100% - 20px);
  padding: 0 10px;
  border-radius: 4px;
  font-size: 11pt;
}
.item-soldout {
  display: none;
  margin: 0;
}

.item-soldout + label:before {
  content: '';
  display: block;
  width: 24px;
  height: 24px;
  margin: auto;
  background-color: #dddddd;
  border-radius: 4px;
}

.item-soldout:checked + label:before {
  content: '';
  background-color: #f47c7c;
  border-color: #f47c7c;
  background-image: url('@/assets/icon/check.svg');
  background-repeat: no-repeat;
  background-position: 50%;
}

input:disabled {
  background-color: #ffb6b4;
  color: #c04846;
  text-decoration: line-through;
}

:deep(.paginate-buttons) {
  color: black;
}

:deep(.paginate-buttons > span > img) {
  filter: invert(1);
}

:deep(.paginate-buttons:hover) {
  background-color: #0000001f;
}
:deep(.active-page) {
  background-color: #5c859b;
  color: white;
}
:deep(.active-page:hover) {
  background-color: #2f434e;
}

.error {
  margin-bottom: 12px;
  text-align: center;
  font-size: 9pt;
  color: red;
}

.hidden {
  visibility: hidden;
}

@media screen and (max-width: 400px) {
  .modal-header {
    font-size: 12pt;
  }

  .close-image {
    width: 12px;
    height: 12px;
  }

  .item-label {
    font-size: 11pt;
  }

  .item-name {
    font-size: 9pt;
  }
  .item-price {
    font-size: 9pt;
  }

  .item-soldout + label:before {
    width: 24px;
    height: 24px;
  }
}
</style>
