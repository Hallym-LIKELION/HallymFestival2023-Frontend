<template>
  <div class="card">
    <img :src="image" :alt="name" />
    <h2>{{ name }}</h2>
    <p>{{ description }}</p>
    <button @click="onClick">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  methods: {
  onClick() {
    window.open(this.buttonLink, "_blank");
  },
},
props: {
  image: String,
  name: String,
  description: String,
  buttonText: String,
  buttonLink: String,
},
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

img {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1rem;
  margin-bottom: 1rem;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>