<template>
  <img :class="class" v-show="!loaded" :src="skeletonImage" alt="Loading..." />
  <img v-show="loaded" :class="class" :src="src" @load="onImageLoad" :alt="alt" />
</template>

<script>
import { CreateSkeletonImage } from '../library/skeleton-image';

export default {
  data() {
    return {
      loaded: false
    };
  },

  props: {
    src: {
      type: String,
      default: ''
    },
    class: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    alt: {
      type: String,
      default: ''
    },
    spinnerSize: {
      type: Number,
      default: 100
    }
  },

  computed: {
    skeletonImage() {
      return CreateSkeletonImage(this.width, this.height, this.spinnerSize);
    }
  },

  methods: {
    onImageLoad() {
      this.loaded = true;
    }
  }
};
</script>
<style scoped></style>
