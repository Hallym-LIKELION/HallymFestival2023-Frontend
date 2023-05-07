<template>
  <main>
    <Header :image="HeaderImage" text="굿즈" content="" />

    <div class="content">
      <p>
        이번 축제를 맞이하여 <br />축제준비위원회에서 준비한 굿즈!<br />
        많은 관심 바랍니다! <br />
        더 자세한 부분은 '구매하러가기'를 참고해주세요
      </p>

      <template v-for="item in list">
        <div class="list" v-for="anotherItem in item">
          <div class="card" v-for="product in anotherItem">
            <Image :src="product.image" class="card-image"></Image>
            <div class="card-info">
              <p class="name">{{ product.name }}</p>
              <p class="desc" v-for="text in product.content">{{ text }}</p>
              <p class="small" v-if="product.small">{{ product.small }}</p>
            </div>
          </div>
        </div>
      </template>

      <button @click="openform" class="buy"><b>구매하러가기</b></button>
    </div>
  </main>
</template>

<script>
import HeaderImage from '@/assets/overlay/OGoods.png';
import Header from '../components/Header.vue';
import GoodsOne from '@/assets/goods/그립톡.png';
import GoodsTwo from '@/assets/goods/소주잔.png';
import GoodsThree from '@/assets/goods/맥주잔.png';
import GoodsFour from '@/assets/goods/스티커.png';
import GoodsFive from '@/assets/goods/떡메모지.png';
import GoodsSix from '@/assets/goods/부채.png';
import Image from '../components/Image.vue';

export default {
  components: { Image, Header },
  data() {
    return {
      HeaderImage,
      list: [
        {
          list: [
            {
              image: GoodsOne,
              name: '그립톡 (덕림톡)',
              content: ['학생회비 납부 : 4,000원', '학생회비 미납 : 5,000원']
            },
            {
              image: GoodsTwo,
              name: '취덕이 소주잔',
              content: ['학생회비 납부 : 3,000원', '학생회비 미납 : 4,000원'],
              small: '글라스 소주잔/2EA 세트판매'
            }
          ]
        },
        {
          list: [
            {
              image: GoodsThree,
              name: '고백 맥주잔',
              content: ['학생회비 납부 : 4,000원', '학생회비 미납 : 5,000원'],
              small: '글라스 맥주잔 380ml'
            },
            {
              image: GoodsFour,
              name: '스티커',
              content: ['학생회비 납부 : 3,000원', '학생회비 미납 : 4,000원']
            }
          ]
        },
        {
          list: [
            {
              image: GoodsFive,
              name: '떡메모지',
              content: ['1EA: 1,500원', 'SET: 4,000원']
            },
            {
              image: GoodsSix,
              name: '땀림이 손잡이 부채',
              content: ['무료'],
              small: '하루 당 330개 총 1000개'
            }
          ]
        }
      ]
    };
  },
  methods: {
    openform() {
      window.open(
        'https://docs.google.com/forms/d/e/1FAIpQLScVG8DCqrh_KajzWoqSAFRHG84VF4L5FDE5oMoJvqxG7OPhwQ/viewform',
        '_blank'
      );
    }
  }
};
</script>

<style scoped>
.content {
  margin: 0 -28px;
  padding: 0 12px;
  padding-top: 24px;
  background-color: #fbfbfbe6;
  border-radius: 72px 72px 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}

.content > p {
  margin: 24px 8px;
  font-size: 12pt;
  max-width: 600px;
  word-break: keep-all;
  line-height: 16pt;
}

.content > .list {
  width: 100%;
  margin-top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content > .list > .card:nth-child(1) {
  margin-right: 16px;
}
.content > .list > .card:nth-child(2) {
  margin-left: 16px;
}

.card {
  width: 200px;
  height: 240px;
  padding: 12px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
}

.card > .card-info > .name {
  margin-top: 8px;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 14pt;
}
.card > .card-info > .desc {
  font-size: 11pt;
}
.card > .card-info > .small {
  margin-top: 8px;
  font-style: italic;
  font-size: 8pt;
}

:deep(.card-image) {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.buy {
  margin: 24px 0;
  max-width: 400px;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 14pt;
  color: white;
  background-color: #ca434c;
}

@media screen and (max-width: 400px) {
  .content > p {
    font-size: 11pt;
  }
  .content > .list {
    margin: 0;
    flex-direction: column;
  }
  .card {
    margin-top: 16px;
  }

  .content > .list > .card:nth-child(1) {
    margin-right: 0;
  }
  .content > .list > .card:nth-child(2) {
    margin-left: 0;
  }
}
</style>
