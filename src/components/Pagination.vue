<template>
  <div class="paginate">
    <vue-awesome-paginate
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      :max-pages-shown="6"
      :show-breakpoint-buttons="false"
      v-model="page"
      :on-click="onClickHandler"
    >
      <template #prev-button>
        <span>
          <img :src="Icon.leftArrow" alt="" srcset="" />
        </span>
      </template>

      <template #next-button>
        <span>
          <img :src="Icon.rightArrow" alt="" srcset="" />
        </span>
      </template>
    </vue-awesome-paginate>
  </div>
</template>

<script>
import { Icon } from '../library/icon';

export default {
  data() {
    return {
      page: 1,
      Icon
    };
  },

  props: {
    totalItems: {
      type: Number,
      default: 0
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    scrollToElement: {
      type: Object,
      default: {}
    }
  },

  methods: {
    onClickHandler(page) {
      if (this.scrollToElement) {
        setTimeout(() => {
          const dim = this.scrollToElement.getBoundingClientRect();
          window.scrollTo({ top: dim.top - 200 + window.scrollY, behavior: 'smooth' });
        }, 50);
      }

      this.$emit('change', page);
    }
  },

  watch: {
    currentPage(value) {
      this.page = value;
    }
  },

  mounted() {
    this.page = this.currentPage;
  }
};
</script>
<style scoped>
.paginate {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.pagination-container) {
  display: flex;
  column-gap: 5px;
}
:deep(.paginate-buttons) {
  height: 24px;
  width: 24px;
  box-sizing: content-box;
  padding: 4px;
  border-radius: 24px;
  cursor: pointer;
  color: white;

  font-size: 12pt;
}

:deep(.paginate-buttons > span > img) {
  width: 12px;
  vertical-align: middle;
}
:deep(.paginate-buttons:hover) {
  background-color: #ffffff1f;
}
:deep(.active-page) {
  background-color: #5c859b;
  color: white;
}
:deep(.active-page:hover) {
  background-color: #5c859b55;
}
</style>
