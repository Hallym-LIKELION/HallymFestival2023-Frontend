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

const HOST = 'http://141.164.51.53';

export async function GetBoothList() {
  const res = await axios.get(HOST + '/booth/list');
  return res.data;
}

export async function GetBooth(booth_id) {
  const res = await axios.get(HOST + '/booth/' + booth_id);
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

export async function ModifyBooth(booth_id, title, content, writer, type, active) {
  const data = {
    bno: booth_id,
    booth_title: title,
    booth_content: content,
    writer,
    booth_type: type,
    active
  };
  const res = await axios.put(HOST + '/booth/modify/' + booth_id, data);
  return res.data;
}

export async function DeleteBooth(booth_id) {
  const res = await axios.delete(HOST + '/booth/' + booth_id);
  return res.data;
}

export async function GetBoothComment(booth_id) {
  const res = await axios.get(HOST + '/comment/' + booth_id);
  return res.data;
}

export async function CreateBoothComment(booth_id, content, password) {
  const data = {
    content,
    password
  };
  const res = await axios.post(HOST + '/comment/' + booth_id, data);
  return res.data;
}

export async function DeleteBoothComment(comment_id, password) {
  const data = {
    password
  };
  const res = await axios.delete(HOST + '/comment/' + comment_id, data);
  return res.data;
}

export async function GetBoothLike(booth_id) {
  const res = await axios.get(HOST + '/like/' + booth_id);
  return res.data;
}

export async function PostBoothLike(id) {
  // credentials을 설정하면 쿠키를 주고받을 수 있음
  const res = await axios.post(HOST + '/like/' + id, '', { withCredentials: true });
  console.log(document.cookie);
  return res;
}

export async function GetBoothMenu(booth_id) {
  const res = await axios.get(HOST + '/menu/' + booth_id);
  return res.data;
}

export async function CreateBoothMenu(booth_id, name, price) {
  const data = {
    name,
    price
  };
  const res = await axios.post(HOST + '/menu/' + booth_id, data);
  return res.data;
}

export async function ModifyBoothMenu(menu_id, name, price) {
  const data = {
    name,
    price
  };
  const res = await axios.put(HOST + '/menu/' + menu_id, data);
  return res.data;
}

export async function DeleteBoothMenu(menu_id) {
  const res = await axios.delete(HOST + '/menu/' + menu_id);
  return res.data;
}

/* 공지사항 api  @백엔드-미진/@프론트-소현 */

/*게시물 게시*/
export async function PostNotice(title, content) {
  const data = {title, content};
  const res = await axios.post(HOST + '/notice', data);
  return res.data;
}
/*게시물 목록 조회*/
export async function GetNoticeList() {
  const res = await axios.get(HOST + '/notice/');
  return res.data;
}

export async function GetFakeNoticeList() {
  await new Promise((resolve) => setTimeout(resolve, 300)); // 0.3초 기다리기

  return [
    {
      "id": 2,
      "title": "제목1",
      "content": "내용1",
      "active": true,
      "regDate": "2023-03-27T10:48:46.44316",
      "modDate": "2023-03-27T10:48:46.44316"
    },
    {
      "id": 3,
      "title": "제목2",
      "content": "내용2",
      "active": true,
      "regDate": "2023-03-27T10:48:47.45858",
      "modDate": "2023-03-27T10:48:47.45858"
    },
    {
      "id": 4,
      "title": "제목3",
      "content": "내용3",
      "active": true,
      "regDate": "2023-03-27T10:48:48.326315",
      "modDate": "2023-03-27T10:48:48.326315"
    },
    {
      "id": 5,
      "title": "제목1",
      "content": "내용1",
      "active": true,
      "regDate": "2023-03-27T10:48:49.394248",
      "modDate": "2023-03-27T10:48:49.394248"
    }
  ]
}

/*게시물 한개 조회*/
export async function GetNotice(id) {
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
export async function SearchNotice(keyword, id) {
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

/* 방명록 api  @백엔드-주영/@프론트-소현 */

/* 방명록 등록 POST -> writeArticle()*/
export async function PostVisitComment(content, password){
  const data = {
    content,
    password
  };
  const res = await axios.post(HOST +'/visitcomment',data);
  return res.data;
}
/* 방명록 삭제 DELETE */
export async function DeleteVisitComment(comment_id, password){
  const data ={
    password
  };
  const res = await axios.delete(HOST +'/visitcomment/' + comment_id, data);
  return res.data;
}

/*방명록 전체 게시물 조회*/
export async function GetVisitComment(comment_page = 0) {
  let url = HOST + '/visitComment/list';
  if (comment_page !== 0) {
    url += "?page=" + comment_page;
  }
  const res = await axios.get(url);
  return res.data;
}

/*방명록 신고*/
export async function PostBadVisitComment(comment_id) {
  const res = await axios.post(HOST + '/visitComment/' + comment_id);
  return res.data;
}

/* 부스 메뉴 api  @백엔드-미진/@프론트-경재 */

// /* 메뉴 추가 */
// export async function PostBoothMenu(id) {
//   const res = await axios.post(HOST + '/menu/' + id);
//   return res.data;
// }

// /* 메뉴 목록 조회 */
// export async function GetBoothMenuList(id) {
//   const res = await axios.get(HOST + '/menu/' + id);
//   return res.data;
// }

// /* 메뉴 수정 */
// export async function RemoveBoothMenu(id) {
//   const res = await axios.put(HOST + '/menu/' + id);
//   return res.data;
// }

// /* 메뉴 삭제 */
// export async function DeleteBoothMenu(id) {
//   const res = await axios.delete(HOST + '/menu/' + id);
//   return res.data;
// }