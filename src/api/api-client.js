'use strict';
import axios from 'axios';

/**
 * (DEMO) 모든 게시글 목록을 API를 통해 GET 요청을 보내고 받아옵니다.
 * @returns {{userId: Number, id: Number, title: String, body: String}[]} 반환된 API 데이터입니다.
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
 * @param {Number} id 가져올 게시글의 userID
 * @returns {{userId: Number, id: Number, title: String, body: String}} id를 userID로 갖는 API 데이터입니다.
 */
export async function GetDemoPost(id) {
  // {
  //     userId: Number,
  //     id: Number,
  //     title: String,
  //     body: String
  // }
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (res.status >= 400) {
    throw new Error(`API 요청에 실패했습니다. HTTP Status: ${res.status}`);
  }
  return res.data;
}
