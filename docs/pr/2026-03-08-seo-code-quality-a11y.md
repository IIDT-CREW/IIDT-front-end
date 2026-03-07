# PR 기록: SEO, 코드 품질, 접근성 개선
- 날짜: 2026-03-08
- 브랜치: westkite1201/iidt-front-end/explore-kicks
- 변경 파일 수: 27 (25 수정 + 2 신규)
- 요약:
  - 프로덕션 코드에 남아있던 console.log 11개 제거
  - SEOHead 컴포넌트 신규 생성으로 페이지별 동적 메타 태그(OG, Twitter) 지원
  - ErrorBoundary 추가로 런타임 에러 시 폴백 UI 제공
  - WCAG Level A 접근성 개선: lang 속성, ARIA 라벨, 시맨틱 HTML 태그
  - 빈 alt 속성 수정, 배열 인덱스 키 수정 등 코드 품질 향상

## 진행상황 (Done)
- console.log/console.error 11개 제거 (_app.tsx, WillCard, Menu, MenuWrapper, mutation hooks)
- ErrorBoundary 컴포넌트 생성 및 _app.tsx에 래핑
- SEOHead 컴포넌트 생성 (동적 og/twitter 메타 태그)
- Page.tsx의 PageMeta를 SEOHead로 교체 (og:title undefined 버그 수정)
- _app.tsx 빈 Twitter 메타 태그 제거
- 페이지별 SEOHead 추가 (index, about, onboarding, 404)
- meta.ts 보강 (SITE_NAME/URL, 홈 경로 추가, null 반환 제거)
- 빈 alt 속성 4개 수정
- lang="ko" 추가
- 모달 role="dialog", aria-modal 추가
- 메뉴 버튼 시맨틱화 (Box → button + aria-label/aria-expanded)
- Footer 시맨틱화 (footer 태그, a 링크)
- main 태그 추가
- ThemeToggleButton, PrivateToggle aria-label 추가
- WriteDeleteModal ConfirmButton div → button 변환
- Button 컴포넌트 focus-visible 포커스 인디케이터 추가
- DropdownMenu 배열 인덱스 키 수정
- onboarding 폼 label + role="alert" 추가

## 할 일 (Next)
- [ ] 로컬 빌드 검증 (node_modules 설치 후)
- [ ] Lighthouse 접근성 점수 비교 (개선 전/후)
- [ ] NEXT_PUBLIC_SITE_URL 환경변수 설정

## 우리가 검토한 것 / 결정 사항
- SEOHead를 별도 컴포넌트로 분리하여 재사용성 확보 (Page 래퍼 없는 페이지에서도 사용 가능)
- console.error도 제거: React Query의 onError + 토스트가 이미 에러를 처리하므로 중복
- ErrorBoundary는 providers 안, 콘텐츠 바깥에 배치하여 전체 앱 크래시 방어

## 참고 아티클 / 레퍼런스
- 제목: WCAG 2.1 Quick Reference
  - 링크: https://www.w3.org/WAI/WCAG21/quickref/
  - 한줄 요약: 접근성 기준 가이드라인
- 제목: Next.js Head Component
  - 링크: https://nextjs.org/docs/pages/api-reference/components/head
  - 한줄 요약: Pages Router에서 페이지별 메타 태그 관리

## research.md 업데이트
- 상태: NO
- 근거:
  - DB/마이그레이션/인증/비동기 흐름 변경 없음
  - 순수 프론트엔드 UI/SEO/접근성 개선
- 액션:
  - [x] 생략

## 변경 파일(참고)
- 신규: src/components/Common/ErrorBoundary/index.tsx, src/components/SEO/SEOHead.tsx
- 수정: src/pages/_app.tsx, src/pages/_document.tsx, src/pages/index.tsx, src/pages/about.tsx, src/pages/onboarding.tsx
- 수정: src/components/Layout/Page.tsx, src/components/Menu/index.tsx, src/components/Menu/DropdownMenu.tsx
- 수정: src/components/Footer.tsx, src/components/MenuWrapper.tsx, src/components/WillCard/index.tsx
- 수정: src/components/Common/Button/Button.tsx, src/components/Common/Button/ThemeToggleButton.tsx
- 수정: src/components/Common/Modal/ModalContext.tsx, src/components/PrivateToggle.tsx
- 수정: src/config/constants/meta.ts
- 수정: src/queries/will/mutations/use-create-will.ts, use-delete-will.ts, use-update-will.ts
- 수정: src/views/Home/index.tsx, src/views/NotFound.tsx
- 수정: src/views/Main/components/modal/ShareModal.tsx, WriteDeleteModal.tsx
- 수정: src/views/Memorials/components/modal/ShareModal.tsx, WriteDeleteModal.tsx
