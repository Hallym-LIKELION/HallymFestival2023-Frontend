'use strict';

// name.json의 데이터는 임시로 ChatGPT를 통해 가져옴 -- 추후 기획에서 데이터 넘겨주면 그걸로 적용
import { noun, adjective, hexCode } from './name.json';

/**
 * 특정한 시드를 이용하여 난수를 생성하는 함수를 만듭니다.
 * Source: https://stackoverflow.com/a/72732727
 * @param {Number} seed
 * @returns {() => number} seed를 시드로 하는 난수 생성 함수
 */
function GetRandomFunction(seed) {
  const m_as_number = 2 ** 53 - 111;
  const m = 2n ** 53n - 111n;
  const a = 5667072534355537n;
  let s = BigInt(seed) % m;
  return function () {
    return Number((s = (s * a) % m)) / m_as_number;
  };
}

/**
 * IPv4 문자열을 10진수 정수로 변환합니다.
 * @param {String} ip "0.0.0.0", "255.255.255.255" 와 같은 형식을 지닌 IP 문자열
 * @returns {Number} IPv4 문자열을 정수로 변환한 값입니다.
 */
function Ipv4ToInt(ip) {
  const list = ip.split('.');
  return list.reduce((result, item, index) => result + item * 256 ** index, 0);
}

/**
 * IPv6 문자열을 10진수 정수로 변환합니다.
 * @param {String} ip "0:0:0:0:0:0:0:0", "2606:2800:0220:0001:0248:1893:25c8:1946" 와 같은 형식을 지닌 IP 문자열
 * @returns {Number} IPv6 문자열을 정수로 변환한 값입니다.
 */
function Ipv6ToInt(ip) {
  // 숫자가 너무 커서 BigInt를 사용
  const list = ip.split(':').map((item) => parseInt(item, 16));
  return list.reduce((result, item, index) => result + BigInt(item) * 65535n ** BigInt(index), 0n);
}

/**
 * 주어진 문자열을 시드로 사용하여 랜덤한 닉네임을 만듭니다.
 * @param {String} ip 닉네임을 만들 때 사용할 시드 ip 문자열입니다. (v4, v6 모두 지원)
 * @returns {String} 랜덤하게 생성된 닉네임입니다.
 */
export function GetRandomNickName(ip) {
  let seed = 0;
  const IPv4 = /\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}/g;
  const IPv6 =
    /[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}/g;

  if (IPv4.test(ip)) {
    seed = Ipv4ToInt(ip);
  } else if (IPv6.test(ip)) {
    seed = Ipv6ToInt(ip);
  }

  const GetRandom = GetRandomFunction(seed);
  const nounIndex = Math.floor(GetRandom() * noun.length);
  const adjIndex = Math.floor(GetRandom() * adjective.length);
  return `${adjective[adjIndex]} ${noun[nounIndex]}`;
}

/**
 * 주어진 문자열을 시드로 사용하여 랜덤한 이미지를 만듭니다.
 * @param {String} ip 랜덤 이미지를 만들 때 사용할 시드 ip 문자열입니다. (v4, v6 모두 지원)
 * @returns {{ image: Number, color: String }} 랜덤하게 생성된 이미지(index)와 hex color code입니다.
 */
export function GetRandomImage(ip) {
  let seed = 0;
  const IPv4 = /\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}/g;
  const IPv6 =
    /[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}/g;

  if (IPv4.test(ip)) {
    seed = Ipv4ToInt(ip);
  } else if (IPv6.test(ip)) {
    seed = Ipv6ToInt(ip);
  }

  const GetRandom = GetRandomFunction(seed);
  const imageIndex = Math.floor(GetRandom() * 6);
  const hexIndex = Math.floor(GetRandom() * hexCode.length);
  return {
    image: imageIndex,
    color: hexCode[hexIndex]
  };
}
