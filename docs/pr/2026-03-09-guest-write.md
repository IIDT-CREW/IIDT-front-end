# PR 기록: 비회원 글쓰기 기능

- 날짜: 2026-03-09
- 브랜치: westkite1201/IIDT-front-end/guest-write
- 변경 파일 수: 17 (신규 2 + 수정 15)
- 요약:
  - 비회원(비로그인) 사용자도 닉네임+비밀번호를 입력하여 글(유언장)을 작성할 수 있도록 변경
  - 비밀번호는 bcrypt 해싱 후 저장하며, 수정/삭제 시 비밀번호 검증으로 본인 확인
  - 공개/비공개 선택은 회원과 동일하게 제공
  - API에서 member 테이블과의 JOIN을 LEFT JOIN으로 변경하여 비회원 글도 리스트에 노출

## 진행상황 (Done)

- [x] 미들웨어에서 `/write` 보호 경로 제거
- [x] `InsertWillParams`, `Will` 타입에 비회원 필드 추가
- [x] API POST `/api/will` 비회원 분기 처리 (bcrypt 해싱)
- [x] API GET 리스트/상세 LEFT JOIN 변경
- [x] API PUT/DELETE 이중 인증 (세션 or 비밀번호)
- [x] 비밀번호 검증 전용 API (`/api/will/[id]/verify-password`) 신규 생성
- [x] `mapWillRow`에 `guest_nickname` 폴백 및 `IS_GUEST` 플래그 추가
- [x] 서비스 레이어에 `verifyGuestPassword`, `deleteWill` 비밀번호 파라미터 추가
- [x] Write 뷰에 비회원 닉네임/비밀번호 입력란 추가
- [x] WillCardHeader에 비회원 글 수정/삭제 시 비밀번호 확인 모달 연동
- [x] Main/Will 페이지 글쓰기 버튼에서 로그인 모달 제거, 바로 `/write`로 이동

## 할 일 (Next)

- [ ] Supabase `will` 테이블 스키마 변경 (guest_nickname, guest_password 컬럼 추가, mem_idx nullable)
- [ ] 비회원 글 닉네임 옆에 "(비회원)" 뱃지 표시 검토
- [ ] 비회원 글쓰기 스팸 방지 (IP 기반 rate limiting 등)

## 우리가 검토한 것 / 결정 사항

- 비밀번호 해싱: bcryptjs 사용 (pure JS, Node.js 호환)
- 비회원 글의 `mem_idx`는 null로 저장 → member 테이블과의 조인을 INNER에서 LEFT로 변경
- 비회원 수정/삭제: body에 `guest_password`를 포함시켜 서버에서 bcrypt.compare로 검증
- 닉네임은 고유성 검사 없음 (중복 허용)
- 비회원은 "내 기록" 페이지(`/memorials`) 접근 불가 (기존 유지)

## 참고 아티클 / 레퍼런스

- 제목: bcryptjs npm
  - 링크: https://www.npmjs.com/package/bcryptjs
  - 한줄 요약: Node.js용 순수 JS bcrypt 구현체

## research.md 업데이트

- 상태: MAYBE
- 근거:
  - 인증/인가 흐름 변경 (비회원 글쓰기 허용)
  - API 라우트 다수 변경 (will CRUD 전체)
  - DB 스키마 변경 필요 (will 테이블 컬럼 추가)
- 액션:
  - [ ] `/research auth` 또는 `/research will-api` 실행 후 research.md 업데이트 검토

## 변경 파일(참고)

### 수정
- `src/middleware.ts` — `/write` 보호 경로 제거
- `src/api/will/types.ts` — 비회원 필드 추가
- `src/lib/supabase/helpers.ts` — mapWillRow 비회원 대응
- `src/app/api/will/route.ts` — POST 비회원 분기, GET LEFT JOIN
- `src/app/api/will/[id]/route.ts` — GET/PUT/DELETE 비회원 대응
- `src/services/will.service.ts` — deleteWill, verifyGuestPassword 추가
- `src/queries/will/mutations/use-delete-will.ts` — 파라미터 변경
- `src/views/Write/index.tsx` — 비회원 입력 필드 추가
- `src/components/WillCard/WillCardHeader.tsx` — 비회원 메뉴/비밀번호 모달
- `src/views/Main/index.tsx` — 로그인 모달 제거
- `src/views/Will/index.tsx` — 로그인 모달 제거
- `src/views/Memorials/index.tsx` — delete 호출 시그니처 변경
- `package.json` / `package-lock.json` / `yarn.lock` — bcryptjs 추가

### 신규
- `src/app/api/will/[id]/verify-password/route.ts` — 비밀번호 검증 API
- `src/views/Write/components/modal/GuestPasswordModal.tsx` — 비밀번호 확인 모달
