<template>
  <div class="title-header">
    <div class="title-header-image">
      <img :src="image" alt="" />
    </div>
    <div class="title-header-text">{{ text }}</div>
    <div class="title-header-content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    image: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
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
.title-header {
  margin-top: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.title-header-image {
  margin-bottom: -56px;
}
.title-header-image > img {
  height: 32px;
}

.title-header-text {
  font-size: 24pt;
}

.title-header-content {
  margin: 28px 0;
  font-size: 11pt;
  white-space: pre-line;
  word-break: keep-all;
  text-align: center;
}
</style>
