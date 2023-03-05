<script setup>
import SearchBar from '../components/SearchBar.vue'
import ListItem from '../components/ListItem.vue'
import festivalImage from '@/assets/poster.jpg'

function SelectDay(day) {
  // day:  1 -> 화요일, 2 -> 수요일, 3 -> 목요일 같은 방식?

  // TODO: 특정 요일에 해당하는 부스 목록을 표시하도록 기능 구현
  console.log(`you selected day ${day}!`)
}

function ShowBooth(id) {
  // TODO: 부스 상세 페이지를 띄우는 코드 작성하기
  console.log(`booth item ${id} clicked`)
}
</script>

<template>
  <main>
    <h1>부스 배치도</h1>
    <div class="search-bar"><SearchBar /></div>
    <button @click="() => SelectDay(1)">화요일</button>
    <button @click="() => SelectDay(2)">수요일</button>
    <button @click="() => SelectDay(3)">목요일</button>

    <div class="poster">
      <img :src="festivalImage" alt="한림대학교 비봉축전" />
    </div>

    <div class="booth-list">
      <ListItem
        @click="() => ShowBooth(1)"
        title="쿠키스"
        content="수제 쿠키 판매"
        image="https://images.unsplash.com/photo-1585608726082-19c119c55c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
        imageAlt="쿠키 사진"
      />
      <ListItem
        @click="() => ShowBooth(2)"
        title="더 사이언스"
        content="과학 퀴즈 및 체험"
        image="https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=834&q=80"
        imageAlt="과학에 관한 사진"
      />
      <ListItem @click="() => ShowBooth(3)" title="대충 아무 부스" content="대충 아무 부스 내용" />
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
  display: flex;
  justify-content: center;
}

.poster {
  display: flex;
  justify-content: center;
}

.poster > img {
  width: 100%;
  max-width: 200px;
  height: auto;
  object-fit: cover;
}

.booth-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
}

.booth-list > * {
  max-width: 400px;
  margin: 10px 0;
}
</style>
