'use strict';

// name.json의 데이터는 임시로 ChatGPT를 통해 가져옴 -- 추후 기획에서 데이터 넘겨주면 그걸로 적용
import { noun, adjective } from './name.json';

/**
 * 특정한 시드를 이용하여 난수를 생성하는 함수를 만듭니다.
 * Source: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
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
function IpToInt(ip) {
  const list = ip.split('.');
  return list.reduce((result, item, index) => result + item * Math.pow(256, 3 - index), 0);
}

/**
 * 주어진 문자열을 시드로 사용하여 랜덤한 닉네임을 만듭니다.
 * @param {String} ip 닉네임을 만들 때 사용할 시드 ip 문자열입니다.
 * @returns {String} 랜덤하게 생성된 닉네임입니다.
 */
export function GetRandomNickName(ip) {
  const seed = IpToInt(ip);
  const GetRandom = GetRandomFunction(seed);
  const nounIndex = Math.floor(GetRandom() * noun.length);
  const adjIndex = Math.floor(GetRandom() * adjective.length);
  return `${adjective[adjIndex]} ${noun[nounIndex]}`;
}
