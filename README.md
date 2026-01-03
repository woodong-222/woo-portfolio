# Woo Portfolio

React 19 + TypeScript + Vite 7 기반으로 제작한 이동우의 인터랙티브 포트폴리오입니다. 하나의 스크롤 컨테이너에서 Hero → About → Projects → Contact 섹션을 자연스럽게 탐색하고, 다국어(i18next)와 애니메이션(Framer Motion)으로 시각적 완성도를 높였습니다.

## 주요 기능
- **섹션 동기화 내비게이션**: `useScrollSpy`와 헤더가 동일한 스크롤 컨테이너를 바라보고 현재 위치를 실시간으로 표시합니다.
- **Hero 하이라이트**: 번역 리소스 기반의 소개 문구와 최신 업데이트 정보를 노출합니다.
- **프로젝트 스택 카드**: 프로젝트 데이터를 `projects.data.ts`에서 중앙 관리하고, 스택형 카드 UI로 핵심 내용을 보여줍니다.
- **Floating Connect**: 어디서든 메일을 보낼 수 있는 플로팅 CTA. Contact 섹션의 버튼과 커스텀 이벤트로 연동됩니다.
- **다국어 지원**: i18next + 브라우저 언어 감지로 한/영을 자동 전환하고, 필요한 텍스트는 JSON 리소스로 분리했습니다.

## 기술 스택
- UI: React 19, Vite 7, TypeScript
- 스타일: SCSS, CSS Modules, 커스텀 변수 시스템
- 애니메이션: Framer Motion, react-parallax-tilt
- 번역: i18next, i18next-browser-languagedetector
- 기타: EmailJS(연락 폼), Lucide 아이콘

## 시작하기
```bash
pnpm install
pnpm dev
pnpm build   # tsc -b + vite build
```

### 환경 변수
`.env` 파일에 다음 값을 설정해야 EmailJS 전송이 활성화됩니다. (미설정 시 폼은 시뮬레이션 모드로 동작)

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

## 디렉터리 개요
```
src/
  components/
    layout/        # Header, FloatingConnect 등 공통 레이아웃
    sections/      # Hero, About, Projects, Contact 등 메인 섹션
    modals/        # (준비 중) 프로젝트 상세 모달
  utils/
    hooks/         # useScrollSpy, useResponsive 등 커스텀 훅
    locales/       # i18next 리소스
    styles/        # 전역 스타일 및 SCSS 변수
```

## 린트 & 포맷
- `pnpm lint`로 ESLint(Airbnb + TypeScript + Prettier) 규칙을 확인할 수 있습니다.

필요 기능이나 수정 아이디어가 있다면 자유롭게 이슈/PR로 남겨 주세요!
