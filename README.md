<img src="https://raw.githubusercontent.com/FESI9-4/FE/main/public/icons/navDesktop.svg" width="200" />

**좋아하는 것을 함께 즐기고 공유하는 팬 커뮤니티 플랫폼**

<br>

## <img src="https://raw.githubusercontent.com/FESI9-4/FE/main/public/icons/navMobile.svg" width="20" />  프로젝트 개요

**FanPal**은 팬들이 자신의 관심사를 공유하고,  
오프라인 만남을 모집하거나 참여할 수 있는 **플랫폼**입니다.  
함께 하고 싶은 활동을 **게시글**로 등록하고, 참여자들과 **소통**하며 팬덤 문화를 즐길 수 있습니다.

<br>

## <img src="https://raw.githubusercontent.com/FESI9-4/FE/main/public/icons/navMobile.svg" width="20" /> 주요 기능

- 팬 활동 공유 게시글 작성 / 모집
- 위치 기반 Google Maps 연동
- 프로필 이미지 업로드 (AWS S3 Presigned URL 방식)
- 공공 API을 이용한 공연 게시물 제공
- 좋아요(찜) 기능
- 마감일 기준 자동 마감 태그 표시
  
<br>

## <img src="https://raw.githubusercontent.com/FESI9-4/FE/main/public/icons/navMobile.svg" width="20" /> 기술 스택 및 도입 이유

| 기술 | 설명 |
|------|------|
| **Next.js 15 (App Router)** | SSR/CSR 하이브리드 렌더링으로 초기 로딩 속도 개선 및 SEO 최적화 |
| **TypeScript** | 타입 안정성을 통해 코드 신뢰도 및 유지보수성 향상 |
| **TailwindCSS + CVA** | 유틸리티 기반 스타일링 + 컴포넌트 변형 관리로 디자인 시스템 통일 |
| **React Query** | 서버 상태 캐싱 및 동기화로 UX 향상 및 서버 부하 감소 |
| **React Hook Form** | 폼 상태의 효율적 관리 및 렌더링 최소화 |
| **Zustand** | 간결하고 직관적인 글로벌 상태 관리 (인증 상태, 찜 목록 등) |
| **Google Maps API** | 정확하고 직관적인 위치 기반 모집 기능 제공 |
| **MSW (Mock Service Worker)** | 백엔드 없이도 API 시뮬레이션 가능 → 개발 생산성 향상 |

<br>

## <img src="https://raw.githubusercontent.com/FESI9-4/FE/main/public/icons/navMobile.svg" width="20" /> 인증 로직


| 항목           | 설명                                                           |
| ------------ | ------------------------------------------------------------ |
| **토큰 저장 방식** | `AccessToken`과 `RefreshToken`을 `httpOnly` 쿠키에 저장하여 XSS 공격 방지 |
| **SSR 인증**   | 서버에서 쿠키를 통해 직접 인증 처리 (보안성 향상)                                |
| **CSR 인증**   | 쿠키의 토큰을 `zustand` store에 저장하여 클라이언트에서 관리                     |
| **토큰 만료 대응** | `RefreshToken`을 이용한 `AccessToken` 자동 재발급                     |
| **미들웨어 처리**  | 인증이 필요한 페이지 접근 시 자동 리다이렉트 등 제어                               |



<br>

## <img src="https://raw.githubusercontent.com/FESI9-4/FE/main/public/icons/navMobile.svg" width="20" /> 팀 구성 및 역할

| 이름 | 역할 |
|------|------|
| 양진수 | 프론트엔드 개발 <br/>- **팀장** 마이페이지, 공연 목록 페이지, 공연 상세페이지, 공용 컴포넌트 |
| 오애란 | 프론트엔드 개발 <br/>- 팀원 로그인/회원가입 인증 로직 담당, 스토리북, 공용 컴포넌트 |
| 정재형 | 프론트엔드 개발 <br/>- 팀원 팬팔 리스트 페이지, 팬팔 상세페이지, 찜한 팬팔 페이지, 공용 컴포넌트 |



<br>

## <img src="https://raw.githubusercontent.com/FESI9-4/FE/main/public/icons/navMobile.svg" width="20" /> 배포 링크

-  **배포 URL**: 🔗 [https://www.fanfal.com/](https://www.fanfal.com/)


<br>

## <img src="https://raw.githubusercontent.com/FESI9-4/FE/main/public/icons/navMobile.svg" width="20" /> 노션 
-  **노션 URL**: 🔗https://www.notion.so/acceptagreed/FanFal-1ec629a65faf805cb175d7993d43bae6
-  해당 노션 링크에는 **백엔드 팀**과 **디자이너 팀**과의 기획부터 배포까지 전 과정이 담겨있습니다. 


<br>

## <img src="https://raw.githubusercontent.com/FESI9-4/FE/main/public/icons/navMobile.svg" width="20" /> 트러블 슈팅 

| 항목             | 설명                                                                                    |
| -------------- | ------------------------------------------------------------------------------------- |
| **XML 파싱 문제**  | 공공 API에서 XML 형식으로 응답을 제공하여 JavaScript 객체로 변환이 필요함. `fast-xml-parser`를 사용해 안정적으로 파싱 처리 |
| **CORS 문제 해결** | 브라우저에서 직접 API 호출 시 발생하는 CORS 오류를 방지하기 위해 **Next.js API 라우트**를 프록시 서버로 활용하여 우회         |
| **응답 데이터 활용**  | 공연명, 기간, 장소, 포스터 이미지, 장르 등 공연 관련 정보를 XML로 받아와 객체로 변환 후 내부 컴포넌트에 활용                    |
