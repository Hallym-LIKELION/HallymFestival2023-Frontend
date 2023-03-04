<script setup>
import SearchBar from '../components/SearchBar.vue'
import AnnouncementItem from '../components/AnnouncementItem.vue'
</script>

<template>
  <main>
    <h1>공지사항</h1>
    <div class="search-bar"><SearchBar /></div>
    <div class="announcement-list">
      <AnnouncementItem />
      <AnnouncementItem />
      <AnnouncementItem />
      <AnnouncementItem />
      <AnnouncementItem />
      <AnnouncementItem />
      <AnnouncementItem />
      <AnnouncementItem />
      <AnnouncementItem />
      <AnnouncementItem />
      <AnnouncementItem />
      <AnnouncementItem />
      <AnnouncementItem />
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
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.announcement-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.announcement-list > * {
  margin: 10px 0;
}
</style>
