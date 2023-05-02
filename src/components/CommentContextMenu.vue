<template>
  <div
    :class="{ hidden: !show }"
    :style="{ left: x + 'px', top: y + 'px' }"
    v-click-outside="clickOutside"
  >
    <button class="delete-button" @click="clickDeleteButton">삭제하기</button>
    <button class="report-button" @click="clickReportButton">신고하기</button>
  </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3';

export default {
  data() {
    return {};
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  methods: {
    clickDeleteButton(evt) {
      this.$emit('clickDelete');
    },
    clickReportButton(evt) {
      this.$emit('clickReport');
    },
    clickOutside(evt) {
      if (this.show) {
        this.$emit('clickOutside');
      }
    }
  }
};
</script>
<style scoped>
div {
  width: 130px;

  margin-left: -110px;
  margin-top: 24px;
  position: absolute;
  z-index: 1;

  display: flex;
  flex-direction: column;

  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 0px 8px #00000033;
}

button {
  height: 36px;
  margin: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11pt;
  font-weight: 600;
  text-align: left;
  transition: background-color 0.25s;
}

button:hover {
  background-color: #ca434c20;
}

.hidden {
  display: none;
}
</style>
