# YH Portfolio — AI/RAG Developer

Generative AI · RAG · Data Engineering 분야 개발자를 위한 **싱글 페이지 포트폴리오**입니다.  
Nuxt 3 기반으로 Hero부터 문의 CTA까지 한 페이지에서 섹션별로 구성되며, `/about`, `/projects` 같은 **클린 URL**로 각 영역에 바로 접근할 수 있습니다.

---

## 포트폴리오 핵심 요약

### 한 줄 소개

> 흩어진 문서와 데이터를 **답을 찾는 AI 서비스**로 만드는 AI/RAG 개발자

### 전문 분야

- **RAG 구축/고도화** — 문서 수집·전처리, 벡터 검색, 출처 표시
- **AI 챗봇/에이전트** — FAQ·고객 응대, Tool Calling, Guardrails
- **업무 자동화** — 문서 요약·분류, 보고서 초안, API 연동
- **LLM Ops & 서비스화** — 프롬프트 체인, 관리자 UI, PoC → 운영 확장

### 제공 서비스

| 서비스 | 설명 |
|--------|------|
| 문서 기반 Q&A 시스템 | PDF·매뉴얼 통합 검색, RAG 답변, 관리자 문서 관리 |
| 맞춤형 AI 챗봇 | FAQ 응대, 고객 문의 흐름, Tool Calling 연동 |
| AI 업무 자동화 | 문서 요약·분류, 반복 업무 워크플로우 |
| 멀티모달 AI / TTS·STT | 이미지·음성·텍스트 결합 서비스, 음성 입출력 기능 |

### 주요 프로젝트 (예시)

- 교육 자료 통합 검색 어시스턴트 (RAG · Prototype)
- 고객 문의 응대 AI 챗봇 (Case Study)
- 문서 분석·보고서 자동화 (In Progress)
- 내부 지식 검색 AI 서비스 (RAG · Prototype)

### 작업 프로세스

1. **문제 정의** — 목적, 사용자, 데이터, 업무 흐름 정리  
2. **데이터 진단** — 문서 구조·검색 가능성, RAG 적용 범위 판단  
3. **PoC 구현** — 작은 단위로 검증 가능한 형태 구현  
4. **운영·개선** — 피드백 반영, 관리자 기능·자동화 확장  

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| **Framework** | [Nuxt 3](https://nuxt.com/) (Vue 3, SSR) |
| **Styling** | Tailwind CSS 4, SCSS |
| **State** | Pinia |
| **Icons** | Font Awesome 4 |
| **Font** | Pretendard (CDN) |
| **Backend 연동 (예정)** | Firebase (Auth, Firestore, Storage) |
| **Build** | Vite |

### 주요 구현 특징

- **Optional Catch-all 라우팅** — `pages/[[section]].vue` 하나로 전체 포트폴리오 페이지 구성
- **클린 URL + 섹션 스크롤** — `composables/usePortfolioScroll.js`로 `/about` 등 경로와 섹션 스크롤 연동
- **커스텀 스무스 스크롤** — 1200ms ease-in-out, 헤더 오프셋(64px) 반영
- **CSS 변수 기반 디자인 토큰** — 타이포그래피(`--fz-*`), 카드 여백(`--card-*`)을 `<style>`에서 일괄 조정
- **브랜드 컬러** — Navy + Cyan (`assets/css/tailwind.css` `@theme`)

---

## 프로젝트 구조

```text
Portfolio/
├── app/
│   └── router.options.ts      # scrollBehavior 비활성 (커스텀 스크롤 사용)
├── assets/
│   ├── css/tailwind.css       # Tailwind 4 테마, scroll-margin
│   ├── scss/main.scss         # 전역 SCSS
│   └── fonts/                 # MARUBuri, SCDream 웹폰트
├── components/
│   ├── header.vue             # default 레이아웃용 헤더
│   └── footer.vue
├── composables/
│   └── usePortfolioScroll.js  # 섹션 네비게이션·스무스 스크롤
├── docs/
│   └── portfolio_site_revision_guide.md  # 디자인·콘텐츠 보완 가이드
├── layouts/
│   ├── portfolio.vue          # 포트폴리오 전용 (미니멀 래퍼)
│   └── default.vue
├── pages/
│   └── [[section]].vue        # 메인 포트폴리오 페이지 (전 섹션 포함)
├── plugins/
│   └── firebase.js            # Firebase 초기화
├── public/
│   └── images/                # 정적 이미지 (photo1.png, photo2.png 등)
├── stores/
│   └── auth.js                # Firebase 인증 스토어 (향후 확장용)
├── .env.example               # Firebase 환경 변수 샘플
├── nuxt.config.ts
└── package.json
```

### 페이지 섹션 구성 (`[[section]].vue`)

| 섹션 ID | URL | 내용 |
|---------|-----|------|
| Hero | `/` | 메인 카피, RAG Pipeline 카드, CTA |
| About | `/about` | 소개, 강점 카드 3개, 일러스트 |
| Expertise | `/expertise` | 핵심 역량 4카드, 프로세스 이미지 |
| Services | `/services` | AI 서비스 5종 |
| Projects | `/projects` | 프로젝트 필터·카드 |
| Process | `/process` | 작업 프로세스 4단계 |
| Contact | `/contact` | 프로젝트 문의 CTA |

### 이미지 경로

템플릿에서 `portfolioImages` 객체로 관리합니다 (`pages/[[section]].vue` script 영역).

```javascript
const portfolioImages = {
  about: '/images/photo1.png',
  expertise: '/images/photo2.png',
}
```

실제 파일은 **`public/images/`** 폴더에 두면 `/images/...` URL로 제공됩니다.

---

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example`을 복사해 `.env` 파일을 만들고 필요시 Firebase 값을 입력합니다.

```bash
cp .env.example .env
```

```env
NUXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NUXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=000000000000
NUXT_PUBLIC_FIREBASE_APP_ID=1:000000000000:web:0000000000000000000000
```

> Firebase는 향후 데이터 연동·인증 확장을 위해 포함되어 있습니다. 포트폴리오 정적 페이지만 사용할 경우 placeholder 값으로도 실행 가능합니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 (포트가 사용 중이면 3001, 3002 등으로 자동 변경될 수 있습니다).

### 4. 프로덕션 빌드

```bash
npm run build
npm run preview
```

---

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run generate` | 정적 사이트 생성 |
| `npm run preview` | 빌드 결과 미리보기 |

---

## 스타일 커스터마이징

`pages/[[section]].vue` 하단 `<style scoped>`의 CSS 변수만 수정하면 전체에 반영됩니다.

| 변수 그룹 | 예시 | 용도 |
|-----------|------|------|
| `--fz-*` | `--fz-section-title: 34px` | Hero·섹션·카드 타이포그래피 |
| `--card-*` | `--card-padding: 30px` | 카드 패딩, 그리드 간격, 모서리 |

브랜드 컬러는 `assets/css/tailwind.css`의 `@theme` 블록에서 변경합니다.

---

## 참고 문서

- [docs/portfolio_site_revision_guide.md](./docs/portfolio_site_revision_guide.md) — 섹션별 콘텐츠·디자인 보완 가이드
- [Nuxt 3 Documentation](https://nuxt.com/docs)

---

## License

Private project — All rights reserved.
