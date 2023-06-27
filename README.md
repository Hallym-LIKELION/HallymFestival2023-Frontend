# HallymFestival2023-Frontend


<div align="center">
<img alt="image" width="250"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/f0097766-90c7-4154-b640-814f928dd931"/>
<img alt="image" width="260"  src="https://osohyun.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc714f722-7378-43e3-a06f-8a4c8dd4b40e%2FUntitled.png?table=block&id=10ee5cb2-de16-434c-a281-9e6b842419f7&spaceId=9dc6b260-b69d-4ebf-847c-a40991873bb2&width=580&userId=&cache=v2"/>
<img alt="image" width="250"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/98c2403f-27c4-4f5f-bb17-e0f98286bef2"/>
</div>
    

## ~~https://www.hallymfestival.com/~~
주: 축제 웹사이트 서버가 2023년 5월 19일 12:00부로 운영이 종료되어 더 이상 접속할 수 없습니다.

## Front-End Team ✨

|                                      오소현                                      |                                      김경재                                      |
| :------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: |
| <img width="160px" src="https://avatars.githubusercontent.com/u/53892427?v=4" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/35104213?v=4" /> |
|                  [@osohyun0224](https://github.com/osohyun0224)                  |                   [@PortalCube](https://github.com/PortalCube)                   |
|                          한림대학교 빅데이터전공 20학번 3학년                       |                          한림대학교 빅데이터전공 20학번 2학년                      |

## Description
2023 한림대학교 비봉축전 웹페이지 프론트엔드입니다! 프레임워크는 Vue.js를 사용하였습니다! 백엔드 코드는 [여기](https://github.com/Hallym-LIKELION/HallymFestival2023-Backend-)에서 확인하실 수 있습니다!

## Support Devices
* Windows: 7 이상
* OS X: X El Capitan 이상
* Android: Android 7 이상
* iOS & iPadOS: 14 이상

### Packages
 * vue
 * axios
 * gsap
 * dayjs
 * idb-keyval
 * js-cookies
 * highcharts
 * vue-awesome-paginate
 * vue-toastification
 * vue3-carousel
 * click-outside-vue3

### Dev Packages
 * vite
 * prettier

## Stacks

### Environment

![Vite](https://img.shields.io/badge/vite-white?style=for-the-badge&logo=vite&logoColor=white&color=646CFF)

### Development

![Javascript](https://img.shields.io/badge/javascript-white?style=for-the-badge&logo=javascript&logoColor=black&color=F7DF1E)
![Vue.js](https://img.shields.io/badge/Vue.js-white?style=for-the-badge&logo=Vue.js&logoColor=green&color=222222)
![Naver Cloud Platform](https://img.shields.io/badge/Naver%20Cloud%20Platform-%2303C75A.svg?style=for-the-badge&logo=NAVER&logoColor=white)

### System Architecture
<div align="center">
<img alt="image" width="800"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/98c7687d-276e-4bbe-88b8-154f6e121132"/>
</div>


## 💡 프로젝트 기획 개요

- 매년 봄, 축제가 진행되면 축제 주요 공지사항 및 관련 정보는 여러 플랫폼에 분포되어 정보가 분산되고 있었습니다.
- 부스 정보는 실시간으로 보기가 어렵고, 원하는 부스의 정보를 사용자가 파악하기 어려웠습니다. 또한 부스가 마감이 되었음에도 대기를 하는 상황이 벌어져 혼잡도가 발생하였습니다.
- 저희는 이러한 불편함을 해소하고자 여러 정보를 한 번에, 한 눈에 볼 수 있는 축제 웹사이트를 제작하기로 기획하였습니다.

## 💡 기획단계: 유저 리서치 결과

- 프로젝트 초기, 축제 웹사이트를 직접 사용할 학우분들의 의견을 듣고 사용자의 니즈를 파악하고 기능을 기획하기 위해 유저 리서치를 위한 설문조사를 실시하였습니다.
- 인스타그램, 교내 커뮤니티 에브리타임에 글을 게시하여 총 80명의 학우분들의 답변을 받을 수 있었습니다.

<div align="center">
<img alt="image" width="250"  src="https://osohyun.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe7985c32-9618-4348-8cc0-b6846a4e4a50%2F657B651C-6338-4068-B295-2B5E9BF4E941.jpeg?table=block&id=45ec1386-abc1-4ae3-9a23-af9b1fde87b1&spaceId=9dc6b260-b69d-4ebf-847c-a40991873bb2&width=2000&userId=&cache=v2" />
<img alt="image" width="250"  src="https://osohyun.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F13658ec7-2059-412b-bb07-da82e660dcf7%2FF0CB5356-83D9-43D3-8883-065543DA49EA.jpeg?table=block&id=23249dd1-7517-4d16-a70e-8a4898e1e9d1&spaceId=9dc6b260-b69d-4ebf-847c-a40991873bb2&width=2000&userId=&cache=v2" />
</div>

### 📊 유저리서치 결과 분석

**(1) 2023 대동제 웹사이트가 필요한가?** 

- '있다면 사용함' 포함 **해당 웹사이트가 개발되기를 필요로 하는 학우분들이 거의 90%이상인 결과**를 보여주고 있기에, 학우분들이 필요로 한다는 것을 파악할 수 있었습니다.

<div align="center">
<img alt="image" width="400"  src="https://osohyun.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb61801a0-e57d-4ecc-acd9-53cafbaddc5d%2FB1FC781F-0D5F-497D-8086-E21118043E45.jpeg?table=block&id=2861646f-41ce-415e-b097-263d15680518&spaceId=9dc6b260-b69d-4ebf-847c-a40991873bb2&width=670&userId=&cache=v2"/>
</div>


**(2) 축제 웹사이트 프로토타입 기능들 중 서비스가 중요하게 여겨지는 순위는?**

- 응답 그래프를 확인한 결과,  **타임테이블과 부스배치도 정보**를 필요로하는 학우분들이 많다는 것을 파악할 수 있었습니다.

<div align="center">
<img alt="image" width="400"  src="https://osohyun.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffd163ab3-db24-4784-8a9e-1ceb2b5854ac%2F83ED63B6-DBC1-4156-B770-84A00C3F8865.jpeg?table=block&id=8150a716-e771-4826-bb33-78fade5d2e62&spaceId=9dc6b260-b69d-4ebf-847c-a40991873bb2&width=670&userId=&cache=v2"/>
</div>

**(3) 축제 웹사이트가 개발된다면, 어떤 정보를 받아 보고 싶은가?**  

- 해당 질문에 대한 답변 분석 결과입니다.
- 전체적으로 **공연 및 타임 테이블 정보, 실시간으로 변동사항이 생겼을 때 받아볼 수 있는 정보, 부스 관련 정보**를 알고 싶어하신다는 답변을 받았습니다.
<div align="center">
<img alt="image" width="220"  src="https://osohyun.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F19c3f9c1-9aff-4790-a3b4-d29051d7082c%2FUntitled.png?table=block&id=7419f02c-be7d-43d1-b5ee-63f86f49fde1&spaceId=9dc6b260-b69d-4ebf-847c-a40991873bb2&width=1270&userId=&cache=v2"/>
<img alt="image" width="210"  src="https://osohyun.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9cdf01b5-acfd-44b6-9c8b-8a068b210d0d%2FUntitled.png?table=block&id=e87077ad-4569-44e2-aa94-291571cabece&spaceId=9dc6b260-b69d-4ebf-847c-a40991873bb2&width=1370&userId=&cache=v2"/>
<img alt="image" width="230"  src="https://osohyun.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F16389446-3455-4296-94e0-4f5358347409%2FUntitled.png?table=block&id=ac10435b-178f-4225-82f0-0e4e432150d7&spaceId=9dc6b260-b69d-4ebf-847c-a40991873bb2&width=1440&userId=&cache=v2"/>
</div>


**(4) 축제 웹사이트에서 기대되거나 구현을 바라는 서비스가 있다면 무엇입니까?**

- 해당 질문에 대한 답변 분석 결과입니다.

✓ 축제 진행 행사인 귀신의 집 예약 티켓팅 시스템

✓ 축제 주점 테이블 예약 티켓팅 시스템

✓ 각 부스별 대기 시간 실시간 안내

✓ 축제를 참가하는 사람들의 실시간 반응 댓글을 볼 수 있는 커뮤니티

✓ 부스 위치를 파악할 수 있는 지도와 함께 부스 목록 조회 

- 답변의 내용을 반영하여 축제준비위원회와의 협의 후, 최종 기능을 기획하게 되었습니다.

<div align="center">
<img alt="image" width="200"  src="https://osohyun.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0012b878-b47b-40a0-b789-a8462227096e%2FUntitled.png?table=block&id=305d6b80-d3e3-430a-b1a0-813853e78df2&spaceId=9dc6b260-b69d-4ebf-847c-a40991873bb2&width=1500&userId=&cache=v2"/>
<img alt="image" width="200"  src="https://osohyun.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F38ab0d37-7c30-481c-93a1-3ca655a80549%2FUntitled.png?table=block&id=f3334a0e-253f-43c6-9fa0-c4f562ddfee2&spaceId=9dc6b260-b69d-4ebf-847c-a40991873bb2&width=1480&userId=&cache=v2"/>
</div>

## 💡 프로젝트 주요 기능 소개

> **메인 홈 화면**
> 
- 축제 웹사이트 슬로건, 로고 게시
- 주요 페이지로 바로 갈 수 있는 메뉴 바
- 개발팀 자체 제작 부스 유형 테스트 바로가기 링크
- 서버 후원 기업 스폰서 표시
  
<div align="center">
<img alt="image" width="240"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/da91d91e-3765-4c77-918f-80faeba21506"/>
<img alt="image" width="200"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/b07850c2-71a0-442e-b015-2ac0c186d6f3"/>
<img alt="image" width="160"  src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F02beee5d-fe9e-4f80-a8c7-9f64d1253e6b%2FUntitled.png?id=191a661f-6b5d-44b1-b277-3c20c9fb3d50&table=block&spaceId=9dc6b260-b69d-4ebf-847c-a40991873bb2&width=2000&userId=e061969c-c922-47ec-97f9-a8ce99619e46&cache=v2"/>
</div>

> **공지사항 페이지**
> 
- 일반 유저들은 공지사항 목록 리스트 확인 기능
- 로그인한 메인 관리자(축준위)의 공지사항 작성,수정,삭제 기능
- 제목, 내용 키워드로 검색 기능
- 페이지네이션 기능
  
<div align="center">
<img alt="image" width="200"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/c60d75a9-a3c1-496b-827e-b0622a0699bb"/>
<img alt="image" width="100"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/31469cbf-ecee-4a17-a406-5907a48bb341"/>
<img alt="image" width="200"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/ba7065f3-e0e0-4247-9666-165f989fcd57"/>
</div>

> **타임테이블 페이지**
> 
- 요일 별 공연, 주요 행사 일정표 안내
- 컴포넌트 별 애니메이션 적용

<div align="center">
<img alt="image" width="200"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/5aabed9d-dbb8-4349-968d-5c79bde014be"/>
<img alt="image" width="100"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/a5a1bbb0-7c07-4727-901e-97ca34a4f32b"/>
</div>


> **부스 정보 메인 페이지**
> 
- 축제 기간 운영되는 부스들의 위치를 확인 가능한 지도
- 낮부스 / 밤부스 구분하여 부스 목록 조회 기능
- 부스 이름 , 소개 글 정보 검색 기능
- 요일별 / 댓글 많은 순 / 좋아요 많은 순으로 부스 목록 조회 필터링 기능
- 부스 별 좋아요 기능
  
<div align="center">
<img alt="image" width="200"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/7ffd252a-a9a9-408e-988d-303b47a317ed"/>
<img alt="image" width="200"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/6e17ae07-e597-466b-bc7f-ff89b14889a7"/>
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/2fc6192e-9fbe-407d-a8d9-5c9945920d17"/>
</div>

> **부스 상세 정보 페이지**
> 
- 부스 별 상세한 정보 안내
- 부스 소개, 부스 메뉴, 부스 관련 이미지 확인 가능
- 부스에 대한 후기를 남길 수 있는 댓글 기능
- 일반 유저 본인 댓글 비밀번호 입력 후 삭제 기능
- 일반 유저 비방을 목적으로 한 댓글을 대상으로 신고 기능
- 댓글 랜덤 닉네임 구현
- 부스 관리자 로그인 후 본인 부스 상세페이지 글 수정, 삽입, 삭제 기능

<div align="center">
<img alt="image" width="240"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/d7ff1738-7454-41ee-b72d-370d5153c94a"/>
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/83b49b3a-3547-48b6-a95a-9133fd721144"/>
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/3b05494d-b61f-4ba7-95e3-508efc9a25b3"/>
</div>

> **프로그램 안내 페이지**
> 
- 축제준비위원회가 진행하는 주요 행사 목록 안내 기능
- 리스트 사진 클릭 시 해당 행사의 세부 정보 안내 기능
- 리스트, 세부 정보 모달 창 애니메이션 삽입

<div align="center">
<img alt="image" width="200"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/6b72dc29-a2b0-42fd-a34d-f2db0c76bd8b"/>
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/3dacb46d-83fe-43a6-84f2-90e3ce826590"/>
</div>


> **방명록 페이지**
> 
- 축제를 즐기는 사람들의 추억을 확인할 수 있는 방명록 기능
- 일반 유저들은 본인 방명록 작성, 삭제 기능
- 비방을 목적으로 한 방명록에 대한 신고 기능
- 메인 관리자(축준위) 각 방명록에 대한 작성 시간 , 신고 수 조회 가능
- 방명록 랜덤 닉네임 구현

<div align="center">
<img alt="image" width="200"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/00c56bbc-16fa-49e2-b710-4697fe48eaf9"/>
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/20b3a638-a2dc-43f9-8b37-4bf3df496ae8"/>
</div>


> **웹사이트 개발팀 , 축준위 명단 페이지**
> 
- 해당 웹사이트를 개발한 웹사이트 개발팀 인원 이름/학과/학번/깃허브 링크 확인 가
- 축제준비위원회 명단 확인 가능
<div align="center">
<img alt="image" width="240"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/bcdeb832-2ecf-4cb1-aef3-1a6ce3ceeb80"/>
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/ca9bab35-276d-4711-a44f-2cab726310fd"/>
</div>


> **굿즈 페이지**
> 
- 축제준비위원회의 요청사항을 반영한 기능 중 하나로, 축제 굿즈 목록을 확인할 수 있는 기능
- 구매 가능한 구글 폼 연결 기능

<div align="center">
<img alt="image" width="240"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/7d05d17b-2d72-4dd7-bbb6-212a43f82260"/>
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/60d999f5-e94c-4d50-a269-faf9462aa9df"/>

</div>


### 🔐 **관리자 백오피스 화면 구현**

> **로그인 화면**
> 
- 관리자 대상은 부스를 운영하는 운영진 , 축제준비위원회 위원/부위원/홍보팀장 대상
- 일정이 타이트하여, 미리 관리자들 명단을 수집 후, 계정 생성 후 아이디와 비밀번호 배포

<div align="center">
<img alt="image" width="160"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/c6c11f05-2618-435b-be10-1cb2a2c97b47"/>

</div>


> **백오피스 메인 화면**
> 
- 웹사이트 실시간 방문자 수 확인 기능
- 요일 별 누적 방문자 수 그래프 화면 기능
- 메인관리자 개입이 필요한 공지사항/부스목록/신고 댓글/신고 방명록 페이지 메뉴 바 기능

<div align="center">
<img alt="image" width="160"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/79aa9dc8-f4ae-4d65-9853-03618c353248"/>

</div>


> **백오피스 부스 목록 페이지**
> 
- 일반 유저 부스 목록 페이지와 디자인 유사
- 댓글 순 / 좋아요 순 / 신고 순으로 목록 필터링 시, 그래프 즉각 변경 확인 기능

<div align="center">
<img alt="image" width="200"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/1232f946-dc7b-4de4-bff5-4d3b745510c2"/>
</div>


> **신고 받은 부스 댓글 / 신고 받은 방명록 페이지**
> 
- 신고 받은 목록 조회 가능한 페이지
- 최신순 / 신고가 많은 순으로 필터링하여 목록 조회 가능
- 목록 검색이 가능한 검색 기능
- 목록 페이지네이션 삽입
- 메인 관리자 해당 댓글 직접 삭제 가능

<div align="center">
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/ffc8cd97-b427-471c-b728-1a4a56215b44"/>
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/b19e50c4-2ae5-491d-82dd-059e3c4fd3ad"/>

</div>


## ❤️ 웹사이트 배포 결과

### 📺 홍보 과정

1. 교내 커뮤니티 사이트 **에브리타임 게시물 게시**

<div align="center">
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/72be3b75-9bc7-478b-a923-0fc3c70eb19b"/>
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/b713243e-a57f-4137-ba37-438c0df25752"/>

</div>


2. **학과 공식 홈페이지 홍보 글 게시**
- 한림대학교 정보과학대학 소프트웨어학부 , 한림대학교 SW중심대학 사업단 사이트 게시

<div align="center">
<img alt="image" width="150"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/f6fe4d1b-f630-4dfb-ad59-33bb1ac3e50a"/>
<img alt="image" width="150"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/6fc3ea55-708a-421d-8067-f9e3f81d195f"/>
</div>



3. **한림대학교 전체 학과 공식 단톡방 학생회 배포**
- 한림대학교 모든 학과 공식 단톡방에 축제 홍보 게시

<div align="center">
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/4823abb4-293e-4777-9bc3-f975249d8bea"/>
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/dfadc046-070b-472d-95ce-577376d7861c"/>

</div>


4. **총학생회 공식 인스타그램 홍보글 게시**

<div align="center">
<img alt="image" width="240"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/6760f4d7-4226-449f-b0cd-f7dc4998129c"/>
<img alt="image" width="240"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/d23d1eec-d856-416d-8b44-8f377ab48c6f"/>
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/82ff1ecb-267c-4343-b16a-2d0d34fb99e1"/>

</div>


### 🫡 학우분들 대상 피드백 즉각 반영

> **연예인 라인 업 페이지 신설 구현**
> 
- 연예인 라인업 공개 후, 라인업 페이지 구현
- 각 가수별 멜론 플레이리스트 제작, 유튜브 플레이리스트 삽입

<div align="center">
<img alt="image" width="200"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/dc164258-fb53-4b00-b2b9-50e91e4b12f0"/>
<img alt="image" width="120"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/4ee5c53e-c119-46fa-9ddc-69796930b546"/>

</div>

> **학우분들 요청사항 즉각 반영하여 수정**
> 
- 에브리타임에 올라오는 웹사이트 관련 수정 요청사항을 즉각적으로 반응해 배포기간 중 총 3회 업데이트를 진행하였습니다.


### ❤️ 총 웹사이트 방문자 수 ❤️

- 배포기간 (2023 . 05. 09 - 2023. 05. 18 총 10일) 전체 웹사이트 **방문자수 2만 5천명**을 기록하였습니다 😊

<div align="center">
<img alt="image" width="200"  src="https://github.com/osohyun0224/HallymFestival2023-Frontend/assets/53892427/c3d7d7d6-13ad-42dd-9fed-0a026af69c77"/>
</div>

## 🫡 삽질기

### 🏃🏻 PWA 구현 노력기

- https://github.com/osohyun0224/Vue.js_PWA_Apply_hallymfestival
- 설명: 학교 전체 학생들을 대상으로 축제 웹사이트를 제작하고 있기 때문에, pwa의 offline, push message와 같은 기능을 넣고 싶어서 프로젝트에 pwa를 구현하게 되었습니다. 결과를 스포하자면 남은 일정에 비해 프론트 개발일정이 너무 빡세서 pwa를 해당 프로젝트에 구현하지는 않습니다만 그래도 해당 기능을 구현하는 사람들을 위해 제가 개발하면서 고민했던 과정을 기록했습니다.
