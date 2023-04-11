<template>
  <button :class="['switch-button', { active }]" @click="onClickHandler">
    <div class="button">
      <img :src="active ? Icon.sun : Icon.moon" />
    </div>
  </button>
</template>

<script>
import { Icon } from '../library/icon';

export default {
  data() {
    return {
      Icon,
      active: true
    };
  },

  methods: {
    onClickHandler(evt) {
      this.active = !this.active;
      this.$emit('change', this.active);
    }
  }
};
</script>
<style scoped>
.switch-button {
  background-color: #1d3552;
  width: 64px;
  height: 36px;
  border-radius: 36px;
  transition: background-color 0.1s;
}

.switch-button.active {
  background-color: #ca434c;
}

.button {
  width: 30px;
  height: 30px;
  margin: 3px;
  margin-left: 30px;
  border-radius: 30px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: margin 0.1s;
}

.switch-button.active > .button {
  margin-left: 3px;
}

.button > img {
  width: 24px;
  height: 24px;
}
</style>
