<template>
  <div class="float-button">
    <button class="button" @click="onClickHandler">
      <img :src="Icon.plus" />
    </button>
  </div>
</template>

<script>
import { Icon } from '../library/icon';

export default {
  data() {
    return {
      Icon
    };
  },

  methods: {
    onClickHandler(evt) {
      this.$emit('click', evt);
    }
  }
};
</script>
<style scoped>
.float-button {
  position: fixed;
  right: 20px;
  bottom: 20px;

  z-index: 1;
}

.button {
  width: 36px;
  height: 36px;
  border-radius: 36px;

  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);

  background-color: #ca434c;
}

/* 스크린이 824px (inner container의 width)보다 크면 컨테이너 외부 만큼 right 더하기 */
@media screen and (min-width: 824px) {
  .float-button {
    right: calc((100vw - 824px) / 2 + 20px);
  }
}
</style>
