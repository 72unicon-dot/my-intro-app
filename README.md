# 내 자기소개 웹앱 (AI 앱크리에이터 · Project 0)

> 8시간 사전 통합 실습 — Next.js + Supabase + Vercel로 만드는 자기소개 웹앱

이 프로젝트는 교재 **Project0_자기소개_웹앱_실습교재.pptx.pdf** 의
7STEP 사이클(문제정의 → 사용자 → AI역할 → 데이터 → 설계 → MVP → 배포) 중
**Step 5~7** 의 실습 출발점이 되는 코드 스캐폴드입니다.

---

## 🚀 수강생 빠른 시작 (처음 받았을 때)

> **사전 준비**: Node.js 18+ 설치 ([nodejs.org](https://nodejs.org)) / VS Code 권장

### 방법 A. ZIP 다운로드 (Git 모르는 분 추천)

1. 이 페이지 우측 상단 **Code** 버튼 → **Download ZIP** 클릭
2. 다운로드된 `my-intro-app-main.zip` 압축 풀기 (바탕화면 권장)
3. 폴더명에 `-main` 이 붙어 있다면 **`my-intro-app`** 으로 이름 변경 (선택)
4. PowerShell 실행 → 폴더로 이동:
   ```powershell
   cd "C:\Users\본인이름\Desktop\my-intro-app"
   ```
5. 의존성 설치 (1~2분, 한 번만):
   ```powershell
   npm install
   ```
6. 환경변수 파일 만들기 — 아래 **2단계** 참고
7. 개발 서버 시작:
   ```powershell
   npm run dev
   ```
8. 브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 방법 B. Git Clone (Git CLI 가능한 분)

```bash
git clone https://github.com/72unicon-dot/my-intro-app.git
cd my-intro-app
npm install
# .env.local 만들기 (다음 섹션 참고)
npm run dev
```

### 환경변수 (.env.local) 만들기

1. `.env.local.example` 파일을 같은 폴더에 **복사** → 이름을 `.env.local` 로 변경
2. VS Code 또는 메모장으로 열어 **본인의 Supabase / 관리자 키** 입력:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
   SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
   ```

> 💡 **env가 없어도 앱은 동작합니다** — 노란 "DEMO MODE" 배너와 함께 샘플 데이터로 화면이 뜹니다.
> 본인 데이터를 보려면 `.env.local`을 채우고 서버를 재시작하세요 (`Ctrl+C` → `npm run dev`).

### 자주 막히는 곳 — 한 줄 해결

| 증상 | 해결 |
|---|---|
| `Port 3000 is in use, trying 3001` | 기존 dev 서버가 살아 있음 — 그 창에서 `Ctrl+C` 후 다시 |
| `localhost:3000` 에서 ERR_CONNECTION_REFUSED | 서버가 안 떠있음 — `npm run dev` 다시 |
| 노란 **DEMO MODE** 배너가 계속 뜸 | `.env.local`의 Supabase URL·키 오타 확인 후 서버 재시작 |
| Supabase 연결은 됐는데 화면이 비어있음 | Supabase Table Editor에서 `profiles` 행 1개 추가 |
| `/admin`에서 데이터를 불러오지 못함 | `SUPABASE_SERVICE_ROLE_KEY` 확인 후 서버 재시작 |

### 다음 단계
- `docs/Project0_실습교재.pptx` 를 열어 7STEP을 순서대로 따라가세요
- Supabase 가입 → `supabase/schema.sql` 실행 → 자신의 정보 입력
- 마지막에 GitHub 본인 저장소 만들어서 Push → Vercel 배포

---

## 폴더 구조

```
my-intro-app/
├── app/
│   ├── layout.tsx       ← 공통 레이아웃 (한글 lang, 폰트, 푸터)
│   ├── page.tsx         ← 메인 페이지 (DB 조회 후 6개 섹션 조립)
│   └── globals.css      ← Tailwind 전역 스타일
├── components/
│   ├── Hero.tsx         ← 이름·한 줄 소개·대표 이미지
│   ├── About.tsx        ← 자기소개 문단
│   ├── Skills.tsx       ← 역량 카드 (DB)
│   ├── Projects.tsx     ← 프로젝트 카드 (DB)
│   ├── Media.tsx        ← 이미지·영상 (DB)
│   └── Contact.tsx      ← 이메일 연락처
├── lib/
│   ├── supabase.ts      ← Supabase 클라이언트 (환경변수 사용)
│   └── types.ts         ← DB 4개 테이블 TypeScript 타입
├── supabase/
│   └── schema.sql       ← DB 테이블 생성 + RLS 정책 + 샘플 데이터
├── .env.local.example   ← 환경변수 예시 (실제 값은 .env.local 에)
├── .gitignore           ← .env.local 은 절대 커밋되지 않게 등록됨
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 0. 사전 준비

- Node.js 18+ 설치 ([nodejs.org](https://nodejs.org))
- Supabase 계정 ([supabase.com](https://supabase.com))
- GitHub 계정 ([github.com](https://github.com))
- Vercel 계정 ([vercel.com](https://vercel.com))

---

## 1. Supabase 프로젝트 만들기

1. Supabase Dashboard → **New Project** → 이름·비밀번호 입력
2. 생성된 프로젝트 → 좌측 **SQL Editor** 클릭
3. 본 저장소의 `supabase/schema.sql` 전체를 복사해서 붙여넣고 **Run**
4. 좌측 **Table Editor**에서 `profiles / skills / projects / media` 4개 테이블에 샘플 데이터가 들어가 있는지 확인
5. 본인 정보로 **profiles** 행을 수정 (홍길동 → 본인 이름)

> Storage를 쓰는 경우: 좌측 **Storage** → New bucket → public 으로 설정.
> 이미지 URL 칸에는 해당 파일의 **Public URL** 을 붙여 넣으세요.

### 키 가져오기
좌측 **Project Settings → API** 에서 두 값을 복사합니다.
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 2. 로컬에서 실행하기

```bash
# 의존성 설치
npm install

# 환경변수 파일 만들기 (예시를 복사 후 실제 값으로 수정)
cp .env.local.example .env.local
# Windows PowerShell: copy .env.local.example .env.local

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속 → DB의 정보가 보이면 성공.

> **데이터가 안 보일 때 확인 순서** (교재 p.33)
> 1. `.env.local` 의 URL/Key 오타
> 2. Supabase 의 RLS 정책이 `public read` 로 설정되었는지
> 3. 테이블에 행이 1개 이상 있는지
> 4. 브라우저 콘솔(F12)에 오류 메시지

---

## 3. GitHub 에 올리기

```bash
git init
git add .
git commit -m "feat: Project 0 자기소개 웹앱 초기 커밋"
# GitHub에서 빈 저장소 생성 후
git remote add origin https://github.com/YOUR-ID/my-intro-app.git
git branch -M main
git push -u origin main
```

> **반드시 `.env.local` 이 안 올라갔는지 확인**
> `git status` 에서 `.env.local` 이 보이지 않으면 OK.

---

## 4. Vercel 에 배포하기

1. [vercel.com](https://vercel.com) → **Add New → Project** → GitHub 저장소 Import
2. Framework Preset = **Next.js** (자동 인식)
3. **Environment Variables** 두 개 입력
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy** 클릭 → 1~2분 후 배포 URL 발급
5. PC와 모바일에서 URL 접속 → DB 데이터가 보이면 완료

---

## 5. 자주 발생하는 오류와 해결 (교재 p.37)

| 증상 | 원인 | 해결 |
|---|---|---|
| `Module not found: @supabase/...` | npm install 누락 | `npm install` 다시 실행 |
| `.env.local 에 ... 를 설정해 주세요` | 키 입력 누락 / 파일명 오타 | `.env.local` 파일명·내용 재확인 |
| 화면이 "데이터가 아직 없습니다" 상태 | profiles 테이블 비어있음 | Supabase Table Editor 에서 1행 추가 |
| Vercel 빌드 실패 | 환경변수 미입력 | Vercel → Settings → Environment Variables 재입력 |
| 이미지 깨짐 | 외부 도메인 허용 안 됨 | `next.config.js` 의 `remotePatterns` 에 도메인 추가 |

---

## 6. 관리자 페이지로 데이터 직접 입력하기 (선택)

SQL을 만지지 않고도 웹 화면에서 직접 데이터를 추가/수정/삭제할 수 있습니다.

1. `.env.local` 에 다음 값을 추가합니다:
   - `SUPABASE_SERVICE_ROLE_KEY` = Supabase Dashboard → Settings → API → **service_role** 키
   > service_role 키는 RLS를 우회하므로 **절대 외부에 공유 금지**. `NEXT_PUBLIC_` 접두사 X.
2. 개발 서버 재시작 후 [http://localhost:3000/admin](http://localhost:3000/admin) 접속
3. 접속 즉시 4개 폼(Profile / Skills / Projects / Media)이 보입니다
4. 각 폼에서 데이터를 입력하고 메인 페이지(`/`)에서 60초 안에 반영 확인
5. Vercel 배포 후에도 사용하려면 Vercel 대시보드에 `SUPABASE_SERVICE_ROLE_KEY`를 추가하세요

### 공개 변경 모드 동작
- `/admin`과 `/api/admin`은 별도 로그인 없이 사용할 수 있습니다
- 접속한 누구나 데이터를 추가·수정·삭제할 수 있습니다
- service_role 키는 서버에서만 사용되므로 브라우저에 노출되지 않습니다

---

## 7. 다음 단계

- [ ] `profiles` 행을 본인 정보로 수정
- [ ] `skills` 에 본인 역량 4개 이상 추가
- [ ] `projects` 에 프로젝트 카드 1개 이상 추가
- [ ] `media` 에 본인 이미지·영상 URL 등록
- [ ] 모바일에서 화면 확인
- [ ] 배포 URL을 README 상단에 추가
- [ ] 3분 발표 자료 작성 (문제 → 사용자 → AI 활용 → DB → 배포)

---

## 8. 보안 권고 (Next.js)

이 프로젝트는 **Next.js 14.2.35** 를 사용합니다 (14.x 라인의 마지막 패치 버전).

### 현재 상태
- ✅ **critical 권고 0건**
- ⚠️ **high 권고 1건 (14건의 advisory가 동일 패키지에 묶임)**, moderate 1건 — 모두 14.x 라인에서는 더 이상 패치되지 않습니다.

### 남아 있는 권고의 성격
대부분 다음과 같은 **이 실습에서 사용하지 않는 기능**과 관련됩니다.
- 자가 호스팅(self-hosted) 환경의 이미지 최적화 API
- 미들웨어 / 프록시 리라이트
- Pages Router 의 i18n
- React Server Components 의 deserialization

본 실습은 **Vercel에 배포** 하고, **Next/Image 동적 최적화 대신 외부 URL**을 직접 사용하며,
미들웨어·i18n·Pages Router 를 쓰지 않으므로 학습용으로는 안전합니다.

### 실제 서비스로 운영할 때
프로덕션 트래픽을 받는 사이트로 확장한다면 **Next.js 15+** 로 메이저 업그레이드를 권장합니다.

```bash
# Next 15.x 마이그레이션 (참고)
npx @next/codemod@canary upgrade latest
```

> 메이저 업그레이드는 React 19, 일부 API, ESLint 설정 변경이 동반됩니다.
> 본 교재의 실습 흐름과는 차이가 있으므로 별도 작업으로 진행하세요.

### 의존성 점검 명령
```bash
npm audit              # 현재 권고 상세 확인
npm outdated           # 새 버전 안내
```

---

## 라이선스 / 안내

- 이 코드는 **AI 앱크리에이터 과정 Project 0** 실습용 스캐폴드입니다.
- 절대 커밋하면 안 되는 것: `.env.local`, API Key, 개인정보(주민번호·주소·전화번호)
- 저작권이 불명확한 이미지는 사용하지 않습니다.
