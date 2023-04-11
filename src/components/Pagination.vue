<template>
  <div class="paginate">
    <vue-awesome-paginate
      :total-items="32"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="page"
      :on-click="onClickHandler"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1
    };
  },

  methods: {
    onClickHandler(page) {
      this.$emit('change', page);
    }
  }
};
</script>
<style scoped>
:deep(.pagination-container) {
  display: flex;
  column-gap: 10px;
}
:deep(.paginate-buttons) {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
:deep(.paginate-buttons:hover) {
  background-color: #d8d8d8;
}
:deep(.active-page) {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
:deep(.active-page:hover) {
  background-color: #2988c8;
}
</style>
