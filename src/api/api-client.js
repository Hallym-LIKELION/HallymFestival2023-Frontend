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
    name: '타코야키',
    image: 'https://placehold.co/500x400?text=test+1',
    summary: '맛있는 타코야키 팔아요',
    description: '타코야키 정말 맛있어요',
    menu: [
      { title: '타코야키', price: 3000 },
      { title: '타코야키 XL', price: 4000 }
    ],
    like: 123,
    day: [1, 2],
    tag: ['타코야키', '맛있어요', '푸드트럭']
  },
  {
    id: 2,
    name: '그냥 부스',
    image: 'https://placehold.co/700x400?text=test+2',
    summary: '아무것도 없는 그냥 부스',
    description: '안녕하새요',
    menu: [],
    like: 1,
    day: [2, 3],
    tag: ['안녕하세요']
  },
  {
    id: 3,
    name: '핫도그 부스',
    image: 'https://placehold.co/700x400?text=hotdog',
    summary: '핫도그 팝니다~',
    description: '맛있는 핫도그를 팔아요~',
    menu: [
      { title: '핫도그', price: 3000 },
      { title: '매운 핫도그', price: 4000 },
      { title: '치즈 핫도그', price: 5000 },
      { title: '크림 핫도그', price: 5000 },
      { title: '핫도그 핫도그', price: 5500 }
    ],
    like: 1200,
    day: [1, 3],
    tag: ['핫도그', 'MBTI', '아무거나']
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

const HOST = '';

// {
//   "regDate": "2023-03-21T19:25:11.515529",
//   "modDate": "2023-03-21T19:25:11.515529",
//   "bno": 1,
//   "booth_title": "부스 제목1",
//   "booth_content": "부스 내용1",
//   "writer": "작성자1",
//   "booth_type": "플리마켓",
//   "active": true,
//   "comments": [],
//   "_deleted": false
// }

export async function GetBoothList() {
  const res = await axios.get(HOST + '/booth/list');
  return res.data;
}

export async function GetBoothData(id) {
  const res = await axios.get(HOST + '/booth/' + id);
  return res.data;
}

export async function CreateBooth(title, content, writer, type) {
  const data = {
    booth_title: title,
    booth_content: content,
    writer,
    booth_type: type
  };
  const res = await axios.post(HOST + '/booth/register', data);
  return res.data;
}

export async function ModifyBooth(id, title, content, writer, type, active) {
  const data = {
    bno: id,
    booth_title: title,
    booth_content: content,
    writer,
    booth_type: type,
    active
  };
  const res = await axios.put(HOST + '/booth/modify/' + id, data);
  return res.data;
}

export async function DeleteBooth(id) {
  const res = await axios.delete(HOST + '/booth/' + id);
  return res.data;
}

export async function GetBoothComment(id) {
  const res = await axios.get(HOST + '/comment/' + id);
  return res.data;
}

export async function CreateBoothComment(id, content, password) {
  const data = {
    content,
    password
  };
  const res = await axios.post(HOST + '/comment/' + id, data);
  return res.data;
}

export async function DeleteBoothComment(id, password) {
  const data = {
    password
  };
  const res = await axios.delete(HOST + '/comment/' + id, data);
  return res.data;
}

export async function GetBoothLike(id) {
  const res = await axios.get(HOST + '/like/' + id);
  return res.data;
}

export async function LikeBooth(id) {
  // credentials을 설정하면 쿠키를 주고받을 수 있음
  const res = await axios.post(HOST + '/like/' + id, '', { credentials: true });
  console.log(document.cookie);
  return res;
}
export async function UnlikeBooth(id) {
  // credentials을 설정하면 쿠키를 주고받을 수 있음
  const res = await axios.get(HOST + '/like/' + id, '', { credentials: true });
  console.log(document.cookie);
  return res;
}

/* 공지사항 api  @백엔드-미진/@프론트-소현 */

/*게시물 게시*/
export async function PostNotice() {
  const res = await axios.post(HOST + '/notice');
  return res.data;
}
/*게시물 목록 조회*/
export async function GetNoticeList(id) {
  const res = await axios.get(HOST + '/notice/' + id);
  return res.data;
}
/*게시물 삭제*/
export async function DeleteNotice(id) {
  const res = await axios.delete(HOST + '/notice/' + id);
  return res.data;
}
/*게시물 검색*/
//게시물 검색 함수 수정
export async function GetNotice(keyword, id) {
  const data = {
    keyword
  };
  const res = await axios.get(HOST + '/notice/' + keyword ,id);
  return res.data;
 }

/*게시물 수정*/
export async function RemoveNotice(id) {
  const res = await axios.put(HOST + '/notice/' + id);
  return res.data;
}

/* 방명록 api  @백엔드-미진/@프론트-소현 */

/*방명록 생성 */
export async function PostVisitComment() {
  const res = await axios.post(HOST + '/visitComment/create');
  return res.data;
}

/*방명록 전체 게시물 조회*/
export async function GetVisitComment() {
  const res = await axios.get(HOST + '/visitComment/list');
  return res.data;
}
/*방명록 삭제*/
export async function DeleteVisitComment(id) {
  const res = await axios.delete(HOST + '/visitComment/list'+id);
  return res.data;
}

/* 부스 메뉴 api  @백엔드-미진/@프론트-경재 */

/* 메뉴 추가 */
export async function PostBoothMenu(id) {
  const res = await axios.post(HOST + '/menu/' + id);
  return res.data;
}

/* 메뉴 목록 조회 */
export async function GetBoothMenuList(id) {
  const res = await axios.get(HOST + '/menu/' + id);
  return res.data;
}

/* 메뉴 수정 */
export async function RemoveBoothMenu(id) {
  const res = await axios.put(HOST + '/menu/' + id);
  return res.data;
}

/* 메뉴 삭제 */
export async function DeleteBoothMenu(id) {
  const res = await axios.delete(HOST + '/menu/' + id);
  return res.data;
}