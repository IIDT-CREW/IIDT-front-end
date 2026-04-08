# IIDT

디지털 유언장 서비스의 프론트엔드 애플리케이션

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js_16-000000?logo=nextdotjs) ![License](https://img.shields.io/badge/License-GPL--3.0-blue)

## Quick Start

```bash
# 설치
yarn

# 개발 서버 실행
yarn dev
# → http://localhost:5194
```

> **참고:** `.env.local.example`을 참고하여 `.env.local` 파일을 생성해야 합니다.

## Features

- **디지털 유언장 작성** — 비회원도 유언장을 작성할 수 있는 접근성 높은 서비스
- **소셜 로그인 3종 지원** — Google, Kakao, Naver OAuth를 NextAuth v5로 통합
- **하이브리드 라우팅** — Pages Router(페이지)와 App Router(API)를 목적에 맞게 분리
- **다크/라이트 모드** — CSS 커스텀 속성 기반 테마 전환
- **SEO 최적화** — next-sitemap을 활용한 자동 사이트맵 생성

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | 개발 서버 실행 (port 5194) |
| `yarn build` | 프로덕션 빌드 |
| `yarn start` | 프로덕션 서버 실행 (port 6060) |
| `yarn lint` | ESLint 검사 |
| `yarn format:check` | Prettier 포맷 검사 |
| `yarn format:write` | Prettier 포맷 자동 수정 |
| `yarn analyze` | 번들 분석 |

## Architecture

- **Routing**: Pages Router(페이지) + App Router(API 전용) 하이브리드 구조
- **Authentication**: NextAuth (Auth.js v5) — 소셜 OAuth, JWT 세션 (httpOnly cookie)
- **Database**: Next.js API Route에서 `@supabase/supabase-js`로 Supabase 직접 쿼리
- **State**: Redux Toolkit (navi), React Query (서버 상태), Zustand
- **Styling**: Tailwind CSS 4 + shadcn/ui + Radix UI
- **Theming**: CSS 커스텀 속성 기반 다크/라이트 모드

```text
src/
├── app/api/           # API 라우트 (NextAuth, will CRUD)
├── api/               # 클라이언트 API 호출
├── components/
│   ├── Common/        # 공통 컴포넌트
│   ├── Layout/        # 레이아웃 컴포넌트
│   └── ui/            # shadcn/ui 컴포넌트
├── config/            # 설정 및 상수
├── contexts/          # React Context
├── hooks/             # 커스텀 훅
├── lib/               # 유틸리티 라이브러리
├── pages/             # Next.js Pages Router
├── queries/           # React Query 설정
├── services/          # 서비스 레이어 (will)
├── store/             # Redux 스토어 (navi)
├── style/             # 글로벌 스타일
├── types/             # TypeScript 타입 정의
├── utils/             # 유틸리티 함수
└── views/             # 페이지 뷰 컴포넌트
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| State Management | Redux Toolkit, React Query, Zustand |
| UI Components | shadcn/ui, Radix UI |
| Authentication | NextAuth (Auth.js v5) — Google, Kakao, Naver |
| Database | Supabase (PostgreSQL) |
| Deployment | AWS CodeDeploy |

## Environment Variables

`.env.local.example` 참고. 필수 환경변수:

- `NEXTAUTH_URL` / `NEXTAUTH_SECRET` — NextAuth 설정
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — Google OAuth
- `AUTH_KAKAO_ID` / `AUTH_KAKAO_SECRET` — Kakao OAuth
- `AUTH_NAVER_ID` / `AUTH_NAVER_SECRET` — Naver OAuth
- `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — Supabase 연결
- `NEXT_PUBLIC_SITE_URL` — 사이트 URL (OG 메타 태그용)

## Path Aliases

`tsconfig.json`에 정의된 경로 별칭:

| Alias | Path |
|-------|------|
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

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Reporting Issues

Found a bug or have a suggestion? [Open an issue](https://github.com/IIDT-CREW/IIDT-front-end/issues).

## License

This project is licensed under the GPL-3.0 License. See [LICENSE](./LICENSE) for details.

## PR 기록

| 날짜 | 주제 | 문서 |
|------|------|------|
| 2026-04-08 | README 생성 | [docs/pr/2026-04-08-readme-gen.md](docs/pr/2026-04-08-readme-gen.md) |
| 2026-03-09 | 비회원 글쓰기 기능 | [docs/pr/2026-03-09-guest-write.md](docs/pr/2026-03-09-guest-write.md) |
| 2026-03-08 | SEO, 코드 품질, 접근성 개선 | [docs/pr/2026-03-08-seo-code-quality-a11y.md](docs/pr/2026-03-08-seo-code-quality-a11y.md) |
