<template>
    <main>
    <h1 v-text="data.name || 'Loading...'"></h1>
    <div class="image">
      <img :src="data.image || 'https://via.placeholder.com/700x400/D9D9D9/aaaaaa'" />
    </div>

    <div class="edit">
      <h1>부스 소개</h1>
      <div class="example-modal-window">
        <button @click="openModal" type="Edbutton">
          <img src="@/assets/edit_button.png" alt="" />
        </button>

        <!-- 컴포넌트 MyModal -->
        <MyModal @close="closeModal" v-if="modal">
          <!-- default 슬롯 콘텐츠 -->
          <p>관리자 내용 수정 창</p>
          <div><input v-model="message" /></div>
          <!-- /default -->
          <!-- footer 슬롯 콘텐츠 -->
          <template slot="footer">
            <button @click="doSend">수정하기</button>
          </template>
          <!-- /footer -->
        </MyModal>
      </div>
    </div>

    <hr class="hr-solid" />
    <p v-text="data.mainDescription || 'Loading...'"></p>

    <div class="edit">
      <h1>메뉴 소개</h1>
      <button type="Edbutton"><img src="@/assets/edit_button.png" alt="" /></button>
    </div>
    <hr class="hr-solid" />
    <p v-text="data.menuDescription || 'Loading...'"></p>

    <h2>댓글</h2>
    <hr class="hr-solid" />
    <p v-text="data.menuDescription || 'Loading...'"></p>

    <div class="button">
      <button @click="() => $router.push('/boothmap')">뒤로 돌아가기</button>
    </div>
  </main>
  <div>
    <h1 v-text="data.name || 'Loading...'"></h1>
    <div class="image">
      <img :src="data.image || 'https://via.placeholder.com/700x400/D9D9D9/aaaaaa'" />
    </div>

    <div class="edit">
      <h1>부스 소개</h1>
      <button type="Edbutton"><img src="@/assets/edit_button.png" alt=""></button>
    </div>
    <hr class='hr-solid'/>
    <p v-text="data.mainDescription || 'Loading...'"></p>

    <div class="edit">
      <h1>메뉴 소개</h1>
      <button type="Edbutton"><img src="@/assets/edit_button.png" alt=""></button>
    </div>
    <hr class='hr-solid'/>
    <p v-text="data.menuDescription || 'Loading...'"></p>

    <h2>댓글 </h2>
    <hr class='hr-solid'/>
    <div class = "nickname">
    <p>닉네임: <input class="user-name"
        type="nickname" 
        @input="userId = $event.target.value"/></p>
    </div>
    <div class = "password">
    <p>비밀번호: <input class="user-pw"
        type="pw" maxlength='4'
        @input="userId = $event.target.value"/></p>
    </div>
    <div class ="login_button">
      <button type="Edbutton"><img src="@/assets/edit_button.png" alt=""></button>
    </div>


    <div class="button">
      <button @click="() => $router.push('/boothmap')">뒤로 돌아가기</button>
    </div>
  </div>
</template>


<script>
import { GetDemoBooth } from '../api/api-client';
import MyModal from '../components/MyModal.vue';

export default {
  components: { MyModal },
  data() {
    return {
      data: {},
      modal: false,
      message: ''
    }
  },
  methods: {
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    doSend() {
      if (this.message.length > 0) {
        alert(this.message);
        this.message = '';
        this.closeModal()
      } else {
        alert('내용을 수정해주세요.');
      }
    }
  },
  created() {
    // 데이터 가져오기
    GetDemoBooth(parseInt(this.$route.params.id))
      .then((data) => {
        console.log(data);
        this.data = data;
      })
      .catch((err) => {
        alert('Unexpected error has occured. Please try again later.');
        // console.log(err);
      });
  }
};
</script>

<style scoped>
.hr-solid {
  border: 0px;
  border-top: 3px solid #000000;
}
h1 {
  font-size: 20pt;
  text-align: left;
  margin: 0;
}
.edit {
  font-size: 20pt;
  text-align: left;
  margin: 0;
  display: flex;
  justify-content: space-between;
}
button {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: black;
  font-family: 'Noto Sans KR', sans-serif;
}

.image {
  max-width: 100%;
}

.image > img {
  width: 100%;
  max-height: 240px;
  object-fit: contain;
}

.button {
  display: flex;
  justify-content: center;
}
.button > button {
  width: 200px;
  margin-top: 18px;
  padding: 8px 0;
  font-size: 18pt;
  border-radius: 12px;
  color: white;
  background-color: #466efe;
  transition: background-color 0.1s;
}

.button > button:hover {
  background-color: #0f8bff;
}
</style>