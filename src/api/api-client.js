'use strict'
import axios from 'axios'

export async function GetDemoPostList() {
  // [{
  //     userId: Number,
  //     id: Number,
  //     title: String,
  //     body: String
  // }, ...]
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
  if (res.status >= 400) {
    throw new Error(`API 요청에 실패했습니다. HTTP Status: ${res.status}`)
  }
  return res.data
}
export async function GetDemoPost(id) {
  // {
  //     userId: Number,
  //     id: Number,
  //     title: String,
  //     body: String
  // }
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if (res.status >= 400) {
    throw new Error(`API 요청에 실패했습니다. HTTP Status: ${res.status}`)
  }
  return res.data
}
