'use strict';
import axios from 'axios';
import Cookies from 'js-cookie';
let mode = import.meta.env.MODE;

const HOST =
  mode === 'production'
    ? 'https://www.hallymfestival.com/api'
    : 'https://www.hallymfestival.com/api';

// =========================
// 임시: JWT Login API
// =========================

// HttpOnly cookie 또는 메모리 방법이 가장 안전함.
// accessToken을 Set-Cookie로 전달하지 않는다고하면 이 방법으로 토큰을 저장
let token = Cookies.get('access_token') || null;
let role = parseInt(Cookies.get('role')) ?? 0;
let id = Cookies.get('id') || null;

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
  id = null;
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  Cookies.remove('role');
  Cookies.remove('id');
}

export async function GetAccessToken(id, password) {
  const data = {
    mid: id,
    password: password
  };

  let res;

  try {
    res = await axios.post(
      mode === 'production'
        ? 'https://www.hallymfestival.com/login'
        : 'https://www.hallymfestival.com/login',
      data
    );
  } catch (e) {
    return false;
  }

  const success = res.status >= 200 && res.status < 400;

  if (!success) {
    return false;
  }

  Cookies.set('access_token', res.data.accessToken, { expires: 0.5 });
  Cookies.set('refresh_token', res.data.refreshToken, { expires: 10 });

  let resData = JSON.parse(atob(res.data.accessToken.split('.')[1]));

  token = res.data.accessToken;
  if (resData.role === 'ROLE_ADMIN') {
    role = 2;
  } else if (resData.role === 'ROLE_USER') {
    role = 1;
  }

  id = resData.mid;
  Cookies.set('id', id, { expires: 0.5 });
  Cookies.set('role', role, { expires: 0.5 });

  return { id, role };
}

export async function GetAccessTokenUser() {
  let res;

  try {
    res = await axios.post(
      mode === 'production'
        ? 'https://www.hallymfestival.com/refreshToken'
        : 'https://www.hallymfestival.com/refreshToken',
      {
        accessToken: Cookies.get('access_token', token),
        refreshToken: Cookies.get('refresh_token')
      }
    );
  } catch (e) {
    return false;
  }

  const success = res.status >= 200 && res.status < 400;

  if (!success) {
    return false;
  }

  Cookies.set('access_token', res.data.accessToken, { expires: 0.5 });
  Cookies.set('refresh_token', res.data.refreshToken, { expires: 10 });

  let resData = JSON.parse(atob(res.data.accessToken.split('.')[1]));

  token = res.data.accessToken;
  if (resData.role === 'ROLE_ADMIN') {
    role = 2;
  } else if (resData.role === 'ROLE_USER') {
    role = 1;
  }

  id = resData.mid;
  Cookies.set('id', id, { expires: 0.5 });
  Cookies.set('role', role, { expires: 0.5 });

  return { id, role };
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

export async function GetMyBooth() {
  const res = await axios.post(
    HOST + '/booth/auth/mybooth',
    {
      writer: id || Cookies.get('id')
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
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

export async function SearchBoothList(search, day, isDay, page = 0) {
  let url = `${HOST}/booth/list?type=tod&keyword=${search},${day},${isDay ? 'd' : 'n'}`;
  if (page !== 0) {
    url += '&page=' + page;
  }
  const res = await axios.get(url);
  return res.data;
}

export async function CreateBooth(title, content, writer, type) {
  const data = {
    booth_title: title,
    booth_content: content,
    writer,
    dayNight: 'DAY',
    openDay: '[1,2,3]',
    booth_type: type,
    fileNames: []
  };
  const res = await axios.post(HOST + '/booth/register', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

export async function ModifyBooth(
  booth_id,
  title,
  content,
  writer,
  type,
  dayNight,
  openDay,
  fileNames
) {
  const data = {
    booth_title: title,
    booth_content: content,
    writer,
    booth_type: type,
    dayNight,
    openDay,
    fileNames
  };
  const res = await axios.put(HOST + '/booth/auth/modify/' + booth_id, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

export async function DeleteBooth(booth_id, writer) {
  const res = await axios.post(
    HOST + '/booth/auth/' + booth_id,
    {
      writer
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
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

export async function DeleteBoothCommentWithAdmin(comment_id, writer) {
  const res = await axios.delete(HOST + '/comment/auth/force/' + comment_id, {
    data: {
      writer
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
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

export async function CreateBoothMenu(booth_id, name, price, writer) {
  const data = {
    name,
    price,
    writer
  };
  const res = await axios.post(HOST + '/menu/auth/' + booth_id, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

export async function ModifyBoothMenu(menu_id, name, price, writer) {
  const data = {
    name,
    price,
    writer
  };
  const res = await axios.put(HOST + '/menu/auth/' + menu_id, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

export async function SoldBoothMenu(menu_id, writer) {
  const res = await axios.put(
    HOST + '/menu/auth/sell/' + menu_id,
    {
      writer
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res.data;
}

export async function DeleteBoothMenu(menu_id, writer) {
  const res = await axios.delete(HOST + '/menu/auth/' + menu_id, {
    data: {
      writer
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

// =========================
// 공지사항 API
// =========================

export async function CreateNotice(title, content) {
  const data = { title, content };
  const res = await axios.post(HOST + '/notice/auth/create', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

export async function ModifyNotice(id, title, content) {
  const data = { title, content };
  const res = await axios.put(HOST + '/notice/auth/' + id, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
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

export async function RemoveNotice(id) {
  const res = await axios.delete(HOST + '/notice/auth/' + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

export async function SearchNotice(keyword, page = 0) {
  let url = '/notice/search?keyword=' + keyword;
  if (page !== 0) {
    url += '&page=' + page;
  }
  const res = await axios.get(HOST + url);
  return res.data;
}

// =========================
// 방명록 API
// =========================

export async function CreateVisitComment(content, password, color) {
  const data = {
    content,
    password,
    color
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

export async function DeleteVisitCommentWithAdmin(comment_id) {
  const res = await axios.delete(HOST + '/visitcomment/auth/force/' + comment_id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
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
  const res = await axios.get(HOST + '/auth/visit-list', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

export async function GetBoothListWithLike(page = 0) {
  let url = '/like/auth/top-count-list';
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(HOST + url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

export async function GetBoothListWithComment(page = 0) {
  let url = '/comment/auth/top-count-list';
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(HOST + url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

// export async function GetBoothListWithLike(page = 0) {
//   let url = '/like/top-count-list';
//   if (page !== 0) {
//     url += '?page=' + page;
//   }
//   const res = await axios.get(HOST + url);
//   return res.data;
// }

// export async function GetBoothListWithComment(page = 0) {
//   let url = '/comment/top-count-list';
//   if (page !== 0) {
//     url += '?page=' + page;
//   }
//   const res = await axios.get(HOST + url);
//   return res.data;
// }

export async function GetBoothListWithReport(page = 0) {
  let url = '/comment/auth/report-top-count-list';
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(HOST + url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

export async function GetCommentListWithReport(page = 0) {
  let url = '/comment/auth/reported';
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(HOST + url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

export async function GetVisitCommentListWithReport(page = 0) {
  let url = '/visitcomment/auth/reported';
  if (page !== 0) {
    url += '?page=' + page;
  }
  const res = await axios.get(HOST + url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
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
