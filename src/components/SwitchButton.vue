<template>
  <button :class="['switch-button', { active }]" @click="onClickHandler">
    <div class="button">
      <img :src="active ? Icon.sun : Icon.moon" ref="image" />
    </div>
  </button>
</template>

<script>
import { gsap } from 'gsap';
import { Icon } from '../library/icon';

export default {
  data() {
    return {
      Icon,
      active: true
    };
  },

  props: {
    status: {
      type: Number,
      default: 0
    }
  },

  watch: {
    status(value) {
      if (value === 0) {
        this.active = false;
      }
    }
  },

  methods: {
    onClickHandler(evt) {
      this.active = !this.active;

      gsap.fromTo(
        this.$refs.image,
        {
          opacity: 0
        },
        {
          duration: 0.1,
          opacity: 1
        }
      );

      this.$emit('change', this.active);
    }
  }
};
</script>
<style scoped>
.switch-button {
  background-color: #24528a;
  width: 50px;
  height: 28px;
  margin: 0 8px;
  border-radius: 28px;
  transition: background-color 0.1s;
}

.switch-button.active {
  background-color: #ca434c;
}

.button {
  width: 24px;
  height: 24px;
  margin: 2px;
  margin-left: 24px;
  border-radius: 24px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: margin 0.1s;
}

.switch-button.active > .button {
  margin-left: 2px;
}

.button > img {
  width: 18px;
  height: 18px;
}
</style>
