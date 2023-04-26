<template>
  <div>
    <Carousel :items-to-show="1" :wrapAround="true" v-model="_slide">
      <Slide :key="1">
        <Image
          class="image"
          src="https://placehold.co/500x400/aa2222/FFFFFF/png?text=Tuesday"
          width="500"
          height="400"
          spinner-size="300"
        />
      </Slide>
      <Slide :key="2">
        <Image
          class="image"
          src="https://placehold.co/500x400/22AA22/FFFFFF/png?text=Wednesday"
          width="500"
          height="400"
          spinner-size="300"
        />
      </Slide>
      <Slide :key="3">
        <Image
          class="image"
          src="https://placehold.co/500x400/3333AA/FFFFFF/png?text=Thursday"
          width="500"
          height="400"
          spinner-size="300"
        />
      </Slide>
      <Slide :key="4">
        <Image
          class="image"
          src="https://placehold.co/500x400/222222/FFFFFF/png?text=Night+time"
          width="500"
          height="400"
          spinner-size="300"
        />
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import Image from '../components/Image.vue';

export default {
  components: {
    Carousel,
    Slide,
    Navigation,
    Image
  },

  data() {
    return {
      _slide: 0
    };
  },

  props: {
    slide: {
      type: Number,
      default: 0
    }
  },

  watch: {
    slide(value) {
      this._slide = value;
    }
  }
};
</script>
<style scoped>
div {
  width: 100%;
  margin-left: -6px;
}

:deep(.carousel) {
  max-width: 420px;
  margin: auto;
}

:deep(.image) {
  width: 100%;
  object-fit: contain;
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  color: white;
}
</style>
