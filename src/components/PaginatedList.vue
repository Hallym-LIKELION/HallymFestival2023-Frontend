<template>
  <section class="paging">
      <a class="pagingFirst" 
      @click = "prevPage()"
      :disabled = "page.page == 1">First</a>
          <ul class="pagingList">
              <li 
              v-for = "item in countInPages" 
              :key = "item"
              :class = "(startPage-1)+item == page.page ? 'active' : null"
              @click = "selectPage( (startPage-1)+item )"
              > {{(startPage-1) + item}} </li>
          </ul>
      <a class="pagingLast" @click = "nextPage()">End</a>
  </section>
</template>
<script>
export default {
  name: 'PagingView',
  props: {
      page: {
          type: Object,
          default () {
              return {
                  total: 354,
                  page: 32,
                  count: 10 
              }
          }
      },
      defaultPages: {
          type: Number,
          default: 10
      }
  },
  computed: {
    //startPage : 시작 페이지 정보를 계산하여 세팅한다.
      startPage: function () {
          let value = (Math.floor((this.page.page-1) / this.defaultPages) * this.defaultPages) + 1
          return value
      },
    //totalPage : 전체 페이지 정보를 계산하여 세팅한다.
      totalPage: function () {
          var count = this.page.count ? this.page.count : 10
          return Math.floor(this.page.total / count) + ((this.page.total % count) == 0 ? 0 : 1)
      },
      //countInPages : 시작 페이지와 전체 페이지 정보를 가지고 계산하여 현재 페이지의 리스트 목록을 세팅한다.
      countInPages: function () {
          let currPages = this.totalPage - (this.startPage-1)
          if (currPages < this.defaultPages) {
              return currPages
          } else {
              return this.defaultPages
          }
      }
  },
  methods: {
    //selectPage : 현재 선택된 페이지 정보를 $emit을 통해 적용하는 페이지로 정보를 전달한다.
      selectPage: function (page) {
          this.$emit("onPage", page)
      },
      //prevPage : 이전 페이지 정보를 계산하여 세팅한다.
      prevPage: function () {
          if (this.page.page == 1) {
              return
          }
          
          this.selectPage(this.page.page - 1)
      },
      //nextPage : 다음 페이지 정보를 계산하여 세팅한다.
      nextPage: function () {
          if (this.page.page == this.totalPage) {
              return
          }
          
          this.selectPage(this.page.page + 1)
      }
  }
}
</script>