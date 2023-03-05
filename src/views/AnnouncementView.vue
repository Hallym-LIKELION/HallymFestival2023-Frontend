<script setup>
import SearchBar from '../components/SearchBar.vue'
import AnnouncementItem from '../components/AnnouncementItem.vue'

function itemClick(id) {
  // TODO: 공지사항 내용을 띄우는 코드 작성하기
  console.log(`announcement item ${id} clicked`)
}
</script>

<template>
  <main>
    <h1>공지사항</h1>
    <div class="search-bar"><SearchBar /></div>
    <div class="announcement-list">
      <AnnouncementItem
        @click="() => itemClick(1)"
        title="축제 진행에 대한 공지"
        content="안녕하세요. 2023 한림대학교 비봉축전 준비 위원회 공지사항입니다. 감사합니다."
      />
      <AnnouncementItem
        @click="() => itemClick(2)"
        title="Lorem Ipsum"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      />
      <AnnouncementItem @click="() => itemClick(3)" title="멋쟁이사자처럼" content="123123123123" />
    </div>
  </main>
</template>

<style scoped>
h1 {
  font-size: 20pt;
  text-align: center;
  margin: 0;
  padding: 36px 0;
}

.search-bar {
  margin: 0 10px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.announcement-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
}

.announcement-list > * {
  max-width: 400px;
  margin: 10px 0;
}
</style>
