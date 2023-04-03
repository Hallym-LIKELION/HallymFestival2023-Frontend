'use strict';
import axios from 'axios';

// const HOST = 'http://127.0.0.1:8080';
const HOST = 'https://dev-api.prisism.io';

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
    active: active === 'OPEN'
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
  const res = await axios.post(HOST + '/like/' + id, '', { withCredentials: true });
  return res.data;
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

export async function PostNotice(title, content) {
  const data = { title, content };
  const res = await axios.post(HOST + '/notice', data);
  return res.data;
}

export async function GetNoticeList() {
  const res = await axios.get(HOST + '/notice/');
  return res.data;
}

export async function GetNotice(id) {
  const res = await axios.get(HOST + '/notice/' + id);
  return res.data;
}

export async function DeleteNotice(id) {
  const res = await axios.delete(HOST + '/notice/' + id);
  return res.data;
}

export async function SearchNotice(keyword) {
  const res = await axios.get(HOST + '/notice/search?keyword=' + keyword);
  return res.data;
}

export async function RemoveNotice(id) {
  const res = await axios.delete(HOST + '/notice/' + id);
  return res.data;
}

export async function PostVisitComment(content, password) {
  const data = {
    content,
    password
  };
  const res = await axios.post(HOST + '/visitcomment', data);
  return res.data;
}

export async function DeleteVisitComment(comment_id, password) {
  const data = {
    password
  };
  const res = await axios.delete(HOST + '/visitcomment/' + comment_id, data);
  return res.data;
}

export async function GetVisitComment(comment_page = 0) {
  let url = HOST + '/visitcomment/list';
  if (comment_page !== 0) {
    url += '?page=' + comment_page;
  }
  const res = await axios.get(url);
  return res.data;
}

export async function PostBadVisitComment(comment_id) {
  const res = await axios.post(HOST + '/report/visitcomment/' + comment_id, null, {
    // withCredentials: true
  });
  return res.data;
}

export async function UploadImage(formData) {
  const res = await axios.post(HOST + '/upload', formData, {
    'Content-Type': `multipart/form-data`
  });
  return res.data;
}

export async function GetImage(name) {
  const res = await axios.get(HOST + '/view/' + name);
  return res.data;
}

export async function DeleteImage(name) {
  const res = await axios.delete(HOST + '/remove/' + name);
  return res.data;
}
