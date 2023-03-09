<template>
  <div class="component-wrapper">
    <img class="image-content" :src="image" :alt="imageAlt" />
    <div class="text-content">
      <h3 v-text="title" />
      <p v-text="`${type} - ${content}`" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return 'Untitled Announcement';
      }
    },
    content: {
      type: String,
      default() {
        return '내용입니다.';
      }
    },
    image: {
      type: String,
      default() {
        return 'https://via.placeholder.com/60x60/4d4d4d/b8b8b8';
      }
    },
    imageAlt: {
      type: String,
      default() {
        return '공지사항에 대한 이미지';
      }
    },
    type: {
      type: String,
      default() {
        return 'default';
      }
    }
  }
};
</script>
<style scoped>
.component-wrapper {
  width: 100%;
  padding: 6px 0;
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 4px;
  background-color: lightgray;
  height: 70px;
  overflow: hidden;
}

.text-content {
  margin-left: 10px;
  overflow: hidden;
}

.text-content > * {
  margin: 0;
  margin-right: 10px;

  /* 텍스트 오버플로우를 ... 으로 숨기기 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.image-content {
  width: 60px;
  height: 60px;
  margin-left: 10px;
  border-radius: 4px;
  object-fit: cover;
}

.hidden {
  display: none;
}
</style>
