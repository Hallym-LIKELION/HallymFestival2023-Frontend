'use strict';
import axios from 'axios';

/**
 * (DEMO) 모든 게시글 목록을 API를 통해 GET 요청을 보내고 받아옵니다.
 * (가짜 데이터를 전달합니다)
 * @returns {{userId: Number, id: Number, title: String, body: String}[]}
 */
export async function GetDemoPostList() {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  if (res.status >= 400) {
    throw new Error(`API 요청에 실패했습니다. HTTP Status: ${res.status}`);
  }
  return res.data;
}

/**
 * (DEMO) 특정 userID를 갖는 게시글 데이터를 API를 통해 GET 요청을 보내고 받아옵니다.
 * (가짜 데이터를 전달합니다)
 * @param {Number} id 가져올 게시글의 userID
 * @returns {{userId: Number, id: Number, title: String, body: String}}
 */
export async function GetDemoPost(id) {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (res.status >= 400) {
    throw new Error(`API 요청에 실패했습니다. HTTP Status: ${res.status}`);
  }
  return res.data;
}

const demoBoothData = JSON.stringify([
  {
    id: 1,
    name: '네이버',
    image: 'https://via.placeholder.com/700x400/fcaccf/117788?text=NAVER',
    shortDescription: '네이버, 라인, 웹툰, 등등..',
    mainDescription:
      '네이버는 수많은 SME와 창작자, 파트너들이 미래 기술을 활용해 글로벌 시장에서 더 큰 성장을 이룰 수 있도록 지원하는 글로벌 테크 플랫폼입니다.',
    menuDescription:
      '주요서비스: 온라인 검색포털, 모바일 메신저 플랫폼\n 주요사업: 온라인 광고 및 콘텐츠 사업\n 해외 계열 법인: 일본, 미국, 프랑스, 중국, 베트남, 대만, 태국, 인도네시아 외',
    day: [1, 2]
  },
  {
    id: 2,
    name: '구글',
    image: 'https://via.placeholder.com/700x400/ccffcc/115533?text=Google',
    shortDescription: '구글, 안드로이드, 클라우드 서비스, 등등...',
    mainDescription:
      'Google의 목표는 전 세계의 정보를 체계화하여 모두가 편리 하게 이용할 수 있도록 하는 것입니다.',
    menuDescription: '주요서비스: 모든것\n 주요사업: 모든 온라인 사업\n 해외 계열 법인: 전세계',
    day: [2, 3]
  },
  {
    id: 3,
    name: '카카오',
    image: 'https://via.placeholder.com/700x400/aacccc/336644?text=KAKAO',
    shortDescription: '이것저것..',
    mainDescription:
      'Kakao의 목표는 전 세계의 정보를 체계화하여 모두가 편리 하게 이용할 수 있도록 하는 것입니다.',
    menuDescription:
      '주요서비스: 12312312312\n 주요사업: 1231231231212312312312\n 해외 계열 법인: 12312312312',
    day: [1, 2, 3]
  },
  {
    id: 4,
    name: '아무거나 예시 1',
    image: 'https://via.placeholder.com/700x400/ccccff/afafaf?text=SAMPLE1',
    shortDescription: '아무거나..',
    mainDescription: '아무거나 설명',
    menuDescription: '아무거나 메뉴',
    day: [1, 3]
  },
  {
    id: 5,
    name: '아무거나 예시 2',
    image: 'https://via.placeholder.com/700x400/aaccff/aaaaaa?text=SAMPLE2',
    shortDescription: '아무거나...',
    mainDescription: '아무거나 설명',
    menuDescription: '아무거나 메뉴',
    day: [1]
  },
  {
    id: 6,
    name: '아무거나 예시 3',
    image: 'https://via.placeholder.com/700x400/aaffee/dddddd?text=SAMPLE3',
    shortDescription: '아무거나....',
    mainDescription: '아무거나 설명',
    menuDescription: '아무거나 메뉴',
    day: [3]
  },
  {
    id: 7,
    name: '아무거나 예시 4',
    image: 'https://via.placeholder.com/700x400/eeffaa/cccccc?text=SAMPLE4',
    shortDescription: '아무거나.....',
    mainDescription: '아무거나 설명',
    menuDescription: '아무거나 메뉴',
    day: [1, 3]
  }
]);

/**
 * (DEMO) 모든 부스 목록을 API를 통해 GET 요청을 보내고 받아옵니다.
 * (가짜 데이터를 전달합니다)
 * @returns {{
 * id: Number,
 * name: String,
 * image: String,
 * shortDescription: String,
 * mainDescription: String,
 * menuDescription: String,
 * day: Number[]
 * }[]}
 */
export async function GetDemoBoothList() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return JSON.parse(demoBoothData);
}

/**
 * (DEMO) 특정 id를 갖는 부스 데이터를 API를 통해 GET 요청을 보내고 받아옵니다.
 * (가짜 데이터를 전달합니다)
 * @param {Number} id 가져올 게시글의 userID
 * @returns {{
 * id: Number,
 * name: String,
 * image: String,
 * shortDescription: String,
 * mainDescription: String,
 * menuDescription: String,
 * day: Number[]
 * }}
 */
export async function GetDemoBooth(id) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const result = JSON.parse(demoBoothData).filter((item) => item.id === id);
  return result.length > 0 ? result[0] : null;
}
