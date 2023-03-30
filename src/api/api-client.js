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
    bno: 1,
    booth_title: '타코야키',
    booth_content: '맛있는 타코야키 팔아요',
    writer: '한림대학교',
    booth_type: '푸드트럭',
    active: 'OPEN',

    temp_image: 'https://placehold.co/400x400?text=food'
  },
  {
    bno: 1,
    booth_title: '당근마켓',
    booth_content: '우리는 판다 물건을',
    writer: '한림대학교',
    booth_type: '플리마켓',
    active: 'OPEN',

    temp_image: 'https://placehold.co/400x400?text=plea'
  },
  {
    bno: 3,
    booth_title: '한림포차',
    booth_content: '주점이에요',
    writer: '한림대학교',
    booth_type: '주점',
    active: 'OPEN',

    temp_image: 'https://placehold.co/400x400?text=drink'
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
  const result = JSON.parse(demoBoothData).filter((item) => item.bno === id);
  return result.length > 0 ? result[0] : null;
}

export async function GetDemoBoothMenu(id) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [
    { id: 5, name: '타코야키', price: 3000 },
    { id: 6, name: '타코야키 XL', price: 7000 },
    { id: 7, name: '타코야키 어니언치즈맛', price: 5000 },
    { id: 8, name: '타코야키 불닭맛', price: 5500 }
  ];
}

export async function GetDemoBoothLike(id) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return 300;
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
  const res = await axios.get(HOST + '/notice/' + keyword, id);
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
  const res = await axios.delete(HOST + '/visitComment/list' + id);
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
