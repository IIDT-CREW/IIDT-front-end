# IIDT - Kolkata v1

디지털 유언장 서비스의 프론트엔드 애플리케이션입니다.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + Styled Components |
| State Management | Redux Toolkit, React Query |
| UI Components | shadcn/ui, Radix UI |
| Authentication | NextAuth (Auth.js v5) - Google, Kakao, Naver |
| Database | Supabase (PostgreSQL) - 직접 연결 |
| Deployment | AWS CodeDeploy |

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn

### Installation

```sh
yarn
```

### Development

```sh
yarn dev
# http://localhost:5194
```

### Production Build

```sh
yarn build
yarn start
# http://localhost:6060
```

## Scripts

| Command | Description |
|---|---|
| `yarn dev` | 개발 서버 실행 (port 5194) |
| `yarn build` | 프로덕션 빌드 |
| `yarn start` | 프로덕션 서버 실행 (port 6060) |
| `yarn lint` | ESLint 검사 |
| `yarn format:check` | Prettier 포맷 검사 |
| `yarn format:write` | Prettier 포맷 자동 수정 |
| `yarn analyze` | 번들 분석 |

## Project Structure

```
src/
├── app/api/           # API 라우트 (NextAuth, will CRUD)
├── api/               # 클라이언트 API 호출
├── components/
│   ├── Common/        # 공통 컴포넌트 (Box, Button, Card, Modal 등)
│   ├── Layout/        # 레이아웃 컴포넌트
│   ├── ui/            # shadcn/ui 컴포넌트
│   └── ...
├── config/            # 설정 및 상수
├── contexts/          # React Context
├── hooks/             # 커스텀 훅
├── lib/               # 유틸리티 라이브러리
├── pages/             # Next.js Pages Router
├── queries/           # React Query 설정
├── services/          # 서비스 레이어 (will)
├── store/             # Redux 스토어 (navi)
├── style/             # 글로벌 스타일
├── theme/             # 테마 설정 (light/dark)
├── types/             # TypeScript 타입 정의
├── utils/             # 유틸리티 함수
└── views/             # 페이지 뷰 컴포넌트
```

## Path Aliases

`tsconfig.json`에 정의된 경로 별칭:

| Alias | Path |
|---|---|
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@hooks/*` | `src/hooks/*` |
| `@utils/*` | `src/utils/*` |
| `@views/*` | `src/views/*` |
| `@types/*` | `src/types/*` |
| `@ui/*` | `src/components/ui/*` |
| `@api/*` | `src/api/*` |
| `@lib/*` | `src/lib/*` |
| `@public/*` | `public/*` |

## Architecture

- **Routing**: Pages Router(페이지) + App Router(API 전용) 하이브리드 구조
- **Authentication**: NextAuth (Auth.js v5) - 소셜 OAuth 로그인, JWT 세션 (httpOnly cookie)
- **Database**: Next.js API Route에서 `@supabase/supabase-js`로 Supabase 직접 쿼리
- **Theming**: CSS 커스텀 속성 기반 다크/라이트 모드 지원

## Environment Variables

`.env.local.example` 참고. 필수 환경변수:

- `NEXTAUTH_URL` / `NEXTAUTH_SECRET` - NextAuth 설정
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` - Google OAuth
- `AUTH_KAKAO_ID` / `AUTH_KAKAO_SECRET` - Kakao OAuth
- `AUTH_NAVER_ID` / `AUTH_NAVER_SECRET` - Naver OAuth
- `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` - Supabase 연결
