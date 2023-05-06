'use strict';
import axios from 'axios';
import Cookies from 'js-cookie';

const HOST = 'https://www.hallymfestival.com/api';

// =========================
// 임시: JWT Login API
// =========================

// HttpOnly cookie 또는 메모리 방법이 가장 안전함.
// accessToken을 Set-Cookie로 전달하지 않는다고하면 이 방법으로 토큰을 저장
let token = Cookies.get('access_token') || null;
let role = parseInt(Cookies.get('role')) ?? 0;

const period = new Date(Date.now() + 10000);

export function GetAuthority() {
  // 0: 권한 없음
  // 1: 일반
  // 2: 어드민

  if (token) {
    return role;
  } else {
    return 0;
  }
}

export function DeleteToken() {
  token = null;
  role = 0;
  Cookies.remove('access_token');
  Cookies.remove('role');
}

export async function GetAccessToken(id, password, r = 1) {
  const HOST = 'https://api.escuelajs.co'; // Fake API URL
  const data = {
    email: id,
    password: password
  };

  let res;

  try {
    res = await axios.post(HOST + '/api/v1/auth/login', data);
  } catch (e) {
    return false;
  }

  const success = res.status >= 200 && res.status < 400;

  if (success) {
    Cookies.set('access_token', res.data.access_token);
    Cookies.set('role', r);
    token = res.data.access_token;
    role = r;
  }

  // 나중에 백엔드 구현되면 res에서 받아오도록 수정
  role = r;

  return success;
}

export async function GetAccessTokenUser() {
  const HOST = 'https://api.escuelajs.co'; // Fake API URL
  const res = await axios.get(HOST + '/api/v1/auth/profile', {
    headers: { Authorization: 'Bearer ' + Cookies.get('access_token') }
  });
  return res.data;
}

// =========================
// IP API
// =========================

// 접속자수 통계 전용
export async function GetAPI() {
  const res = await axios.get(HOST);
  const data = res.data;
  return data;
}

export async function GetMyIP() {
  const res = await axios.get(HOST + '/ip');
  const data = res.data;
  return data;
}

// =========================
// 부스 API
// =========================

export async function GetBoothList(page = 0) {
  let url = HOST + '/booth/list';
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(url);
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

// =========================
// 부스 댓글 API
// =========================

export async function GetBoothComment(booth_id, page = 0) {
  let url = HOST + '/comment/' + booth_id;
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(url);
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
  const res = await axios.delete(HOST + '/comment/' + comment_id, { data });
  return res.data;
}

export async function ReportBoothComment(comment_id) {
  const res = await axios.post(HOST + '/report/comment/' + comment_id, null, {
    withCredentials: true
  });
  return res.data;
}

// =========================
// 부스 좋아요 API
// =========================

export async function GetBoothLike(booth_id) {
  const res = await axios.get(HOST + '/like/' + booth_id);
  return res.data;
}

export async function PostBoothLike(id) {
  const res = await axios.post(HOST + '/like/' + id, '', { withCredentials: true });
  return res.data;
}

// =========================
// 부스 메뉴 API
// =========================

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

export async function SoldBoothMenu(menu_id) {
  const res = await axios.put(HOST + '/menu/sell/' + menu_id);
  return res.data;
}

export async function DeleteBoothMenu(menu_id) {
  const res = await axios.delete(HOST + '/menu/' + menu_id);
  return res.data;
}

// =========================
// 공지사항 API
// =========================

export async function CreateNotice(title, content) {
  const data = { title, content };
  const res = await axios.post(HOST + '/notice', data);
  return res.data;
}

export async function ModifyNotice(id, title, content) {
  const data = { title, content };
  const res = await axios.put(HOST + '/notice/' + id, data);
  return res.data;
}

export async function GetNoticeList(page = 0) {
  let url = HOST + '/notice/list';
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(url);
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

// =========================
// 방명록 API
// =========================

export async function CreateVisitComment(content, password) {
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
  const res = await axios.delete(HOST + '/visitcomment/' + comment_id, { data });
  return res.data;
}

export async function GetVisitComment(page = 0) {
  let url = HOST + '/visitcomment/list';
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(url);
  return res.data;
}

export async function ReportVisitComment(comment_id) {
  const res = await axios.post(HOST + '/report/visitcomment/' + comment_id, null, {
    withCredentials: true
  });
  return res.data;
}

// =========================
// 로그인 API
// =========================

// =========================
// 백오피스 API
// =========================

export async function GetVisitorCount() {
  const res = await axios.get(HOST + '/visit-list', {
    withCredentials: true
  });
  return res.data;
}

export async function GetBoothListWithLike(page = 0) {
  let url = '/like/top-count-list';
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(HOST + url, {
    withCredentials: true
  });
  return res.data;
}

export async function GetBoothListWithComment(page = 0) {
  let url = '/comment/top-count-list';
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(HOST + url, {
    withCredentials: true
  });
  return res.data;
}

export async function GetBoothListWithReport(page = 0) {
  let url = '/comment/report-top-count-list';
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(HOST + url, {
    withCredentials: true
  });
  return res.data;
}

export async function GetCommentListWithReport(page = 0) {
  let url = '/comment/reported';
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(HOST + url, {
    withCredentials: true
  });
  return res.data;
}

export async function GetVisitCommentListWithReport(page = 0) {
  let url = '/visitcomment/reported';
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(HOST + url, {
    withCredentials: true
  });
  return res.data;
}

// =========================
// 이미지 업로드 API
// =========================

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
