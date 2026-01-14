# KB 헬스케어 프론트엔드 과제

할 일(Task)을 관리하는 대시보드 기반 웹 애플리케이션으로,
로그인 인증을 통해 할 일 목록 조회, 상세 조회, 삭제 기능을 제공합니다.

## 📌 프로젝트 실행 방법

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

실행 후 브라우저에서
http://localhost:3000 에 접속하면 확인할 수 있습니다.

## 📁 폴더 구조

```
.
├─ app/                     # Next.js App Router
│ ├─ layout.tsx             # 공통 레이아웃 (GNB/LNB, Providers 설정)
│ ├─ globals.css            # 전역 스타일 (Tailwind base, theme)
│ ├─ page.tsx               # 대시보드 페이지
│ │
│ ├─ sign-in/
│ │ └─ page.tsx             # 로그인 페이지
│ │
│ ├─ task/
│ │ ├─ page.tsx             # 할 일 목록 페이지
│ │ └─ [id]/
│ │    └─ page.tsx          # 할 일 상세 페이지
│ │
│ ├─ user/
│ │ └─ page.tsx             # 회원정보 페이지
│ └─ not-found.tsx          # 404 페이지
│
├─ entities/                            # 도메인 모델 및 서버 데이터
│ ├─ dashboard/
│ │ └─ api/
│ │   └─ useDashboardQuery.ts           # 대시보드 API (query)
│ │
│ ├─ task/
│ │ ├─ api/
│ │ │ ├─ useTaskInfiniteQuery.ts        # 할 일 목록 API
│ │ │ ├─ useTaskDetailQuery.ts          # 할 일 상세 API
│ │ │ └─ useDeleteTaskMutation.ts       # 할 일 삭제 API
│ │ └─ model/
│ │   └─ types.ts                       # 할 일 타입 정의
│ │
│ ├─ user/
│ │ └─ api/
│ │   └─ useUserQuery.ts # 회원정보 API
│ │
├─ features/                          # 유스케이스 단위 기능
│  ├─ auth/
│  │  └─ sign-in/                     # 로그인 기능
│  │     ├─ api/
│  │     │  ├─ signIn.ts              # 로그인 API 요청
│  │     │  └─ useSignInMutation.ts   # 로그인 mutation
│  │     ├─ model/
│  │     │  └─ signInSchema.ts        # 로그인 폼 validation schema
│  │     └─ ui/
│  │        └─ SignInForm.tsx         # 로그인 폼 UI
│  │
│  └─ task/
│     └─ task-list/
│        └─ ui/
│           └─ TaskList.tsx       # 할 일 목록 UI (가상 스크롤)
│
├─ widgets/                       # 페이지 단위 UI 블록
│ ├─ dashboard/
│ │  └─ DashboardSummary.tsx      # 대시보드 요약 Card
│ ├─ gnb/
│ │  └─ GNB.tsx                   # Global Navigation Bar
│ ├─ lnb/
│ │  └─ LNB.tsx                   # Local Navigation Bar
│ └─ layout/
│    └─ AppLayout.tsx             # 공통 레이아웃
│
├─ shared/              # 전역 공통 영역
│  ├─ api/
│  │  ├─ axios.ts       # axios 인스턴스 설정
│  │  └─ queryClient.ts # React Query QueryClient 설정
│  │
│  ├─ lib/
│  │  └─ token.ts       # 인증 토큰(localStorage) 관리 유틸
│  │
│  └─ ui/
│     └─ Modal.tsx      # 공통 모달 컴포넌트
│
├─ mocks/               # MSW API mocking
│ ├─ handlers/          # API 엔드포인트별 핸들러 정의
│ │ ├─ auths.ts         # 로그인 / 인증 관련 API
│ │ ├─ dashboard.ts     # 대시보드 API
│ │ ├─ index.ts         # 모든 handler를 병합하여 export
│ │ ├─ task.ts          # 할 일 목록 / 상세 / 삭제 API
│ │ └─ user.ts          # 회원정보 API
│ └─ browser.ts         # MSW Service Worker 설정
```

### 구조 설계 의도

- Feature-Sliced Design(FSD)을 참고하여 도메인, 기능, UI 레이어 분리
- entities는 서버 데이터와 비즈니스 모델 중심으로 구성
- features는 사용자 인터랙션 단위의 기능 구현
- widgets는 페이지를 구성하는 큰 UI 블록 담당
- 서버 상태(React Query)와 클라이언트 상태를 명확히 분리

## ✨ 구현한 주요 기능

### 1. 인증 (로그인 / 로그아웃)

- 이메일 / 비밀번호 기반 로그인
- 토큰 기반 인증 처리
- 로그인 상태에 따라 GNB 버튼 분기
- 로그아웃 시 토큰 제거 및 인증 상태 초기화
- 200 아닐 경우 errorMessage를 모달 알림
- form의 input에 대한 label 표기 및 유효성 검증 미통과 시 각 form에 표기

### 2. 대시보드

- 전체 할 일 수
- 해야 할 일 수
- 완료한 일 수 표시
- 인증되지 않은 경우 로그인 페이지로 이동

### 3. 할 일 목록

- [GET] /api/task
- 카드 형태의 할 일 목록 렌더링
- 가상 스크롤(@tanstack/react-virtual) 적용
- 무한 스크롤(React Query Infinite Query) 적용
- 스크롤 하단 도달 시 다음 페이지 자동 로드

### 4. 할 일 상세

- [GET] /api/task/:id
- 할 일 제목, 메모, 등록일 표시
- 404 → not-found 페이지 렌더링
- 401 → 로그인 페이지로 이동 (redirect 유지)

#### 삭제 기능

- 삭제 버튼 클릭 시 확인 모달 표시
- id를 직접 입력해야 삭제 가능
- 삭제 완료 후 목록 페이지로 이동

### 5. 회원정보 페이지

- [GET] /api/user
- 이름 / 메모 정보 표시
- 인증되지 않은 경우 로그인 페이지로 이동

## 🛠 사용 기술

- **Next.js (App Router)** + **Typescript**
- **React 19**
- **Tailwind CSS**
- **@tanstack/react-query** – 서버 상태 관리, Infinite Query 기반 무한 스크롤
- **@tanstack/react-virtual** - 대규모 리스트 렌더링 최적화
- **MSW (Mock Service Worker)** - API mocking 및 에러 시나리오 구성
- **lucide-react** - 가볍고 일관된 SVG 아이콘 라이브러리

## 구현 상세

### 서버 상태 관리

- React Query를 사용해 서버 데이터 캐싱
- 무한 스크롤 페이지네이션 구현
- 에러/로딩/성공 상태 분리

### 성능 최적화

- 가상 스크롤을 통한 DOM 렌더링 최소화
- Tailwind CSS 사용으로 런타임 스타일 계산 제거

### 인증 처리

- JWT 기반 인증 구조로 로그인 상태를 관리했습니다.
- 로그인 성공 시 accessToken / refreshToken을 localStorage에 저장합니다.
- localStorage 접근은 CSR 환경에서만 수행되도록
  `typeof window !== 'undefined'` 체크를 적용해
  SSR 환경에서의 hydration 오류를 방지했습니다.
- 로그인 상태는 useEffect 이후 판단하여
  로그인 직후에도 GNB 상태가 즉시 반영되도록 처리했습니다.
- 로그인 폼은 react-hook-form을 사용해
  입력값 상태, 유효성 검증, 에러 메시지 관리를 단순화했습니다.

### 디자인 토큰 관리

- 색상은 Tailwind CSS theme에 디자인 토큰으로 정의하여
  `bg-primary`, `bg-disabled`와 같은 의미 기반 유틸리티 클래스로 사용했습니다.
- 하드코딩된 색상 값 사용을 지양하고,
  전역적으로 일관된 스타일을 유지하도록 구성했습니다.

### UX 개선 사항

- 로딩 상태 시 명확한 피드백 제공
- 에러 발생 시 모달을 통한 사용자 안내
- 버튼 비활성화 상태 명확히 표현
- 클릭 가능 표시 - 버튼 className에 `cursor-pointer`를 추가해 인터랙션 가능함을 명확히 표시

### API Mocking 전략

- MSW를 사용하여 API 서버 없이 개발
- 페이지별 정상 / 에러 시나리오 구성
- 무한 스크롤 중 400 에러 상황을 의도적으로 생성하여 에러 처리 UX 구현
