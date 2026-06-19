<!-- Slide number: 1 -->

PROJECT 0 · 사전 통합 실습
자기소개 웹앱을
8시간에 끝까지 만들기
AI 콘텐츠 생성 → DB 저장 → 화면 연결 → 배포까지
Next.js · Supabase · Vercel  /  비전공자 Step by Step

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정
01

### Notes:

<!-- Slide number: 2 -->

INTRO · 02
오늘 만들 최종 결과물
내 이력과 자기소개 자료를 하나의 URL로 만들어 공유합니다.

완성 형태
오늘의 핵심 경험
자기소개 Hero 화면
경력 · 역량 · 프로젝트 섹션
이미지와 자기소개 영상 삽입
외부 접속 가능한 배포 URL
관리자 페이지로 데이터 입력
AI가 만든 콘텐츠를 그대로 쓰지 않고 검토
DB에 저장한 데이터를 화면에 연결
환경변수로 API Key를 안전하게 다루기
GitHub Push → Vercel 배포 흐름 체득
모바일에서 배포 결과 직접 확인

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 3 -->

ARCHITECTURE · 03
한 줄로 이해하는 전체 구조
사용자가 보는 것은 화면이고, 화면의 내용은 DB에서 옵니다.

브라우저

Vercel

Supabase
Next.js 화면
(/ 와 /admin)
Next.js 서버
환경변수 보관
DB · Storage
(4개 테이블)

핵심: API Key 는 코드에 직접 쓰지 않습니다. 환경변수(.env.local) → Vercel 에 별도 입력.

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 4 -->

CYCLE · 04
프로젝트 사이클 7STEP
Project 0 에서 익힌 흐름이 이후 6개 프로젝트의 공통 골격이 됩니다.

STEP 1

STEP 2

STEP 3

STEP 4

STEP 5

STEP 6

STEP 7

문제 정의
사용자
AI 역할
데이터
설계
MVP
배포
흩어진 자기소개를
한 URL로 모은다
4W 로 페르소나
· 화면 흐름 정의
한 줄 소개·About
· Skills 초안
이미지·영상
→ URL 로 확보
DB 4 테이블
· 화면 매핑
Next.js 코드
· 6 섹션 구현
GitHub Push
→ Vercel

AI 앱 = 아이디어 + 데이터 + 화면 + 배포가 연결될 때 완성됩니다.

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 5 -->

STEP 1 · 05
문제 정의 ? 무엇을 해결할까?
문제는 기술보다 먼저 정합니다. '멋진 사이트'보다 '누가 왜 보는가'.

강사 설명
실습 ? 한 문장 정의
내 소개 자료가 흩어져 있는 상황을 한 문장으로
웹앱으로 보여주고 싶은 나의 이미지 정리
기술보다 '왜' 가 먼저

나는 [누가] 볼 수 있도록,

[나의 핵심 강점]과 [대표 경험]을
한눈에 보여주는 자기소개 웹앱을 만든다.

1. 문제정의

2. 사용자

3. AI역할

4. 데이터

5. 설계

6. MVP

7. 배포

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 6 -->

STEP 2 · 06
사용자 정의와 방문자 행동 흐름
사용자를 정해야 화면 순서와 문구가 달라집니다.
대표 사용자 후보 (1명 선택)
화면 흐름 (6 섹션)

Hero

About

Skills
채용담당자
짧고 검증 가능한 경력

프로젝트 팀원

Projects

Media

Contact
협업 가능성과 역할

강사 · 멘토
Must: 이름·한 줄 소개·자기소개 / Skills 4~6 / 이미지·영상 1 / 배포 URL
학습 성과와 성장 과정

1. 문제정의

2. 사용자

3. AI역할

4. 데이터

5. 설계

6. MVP

7. 배포

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 7 -->

STEP 3 · 07
AI 콘텐츠 4개 프롬프트
AI 는 작성자 대신 완성하는 도구가 아니라, 초안과 구조를 돕는 도구입니다.

프롬프트 1
프롬프트 2
프롬프트 3
프롬프트 4
한 줄 소개
About 문단
Skills 6개
FAQ 5개

30자 내외, 과장 금지
비전공자도 이해 쉽게
관심 / 강점 / 경험 / 목표
4문장, 친근하고 전문적
'할 수 있는 일' 중심
'학습 중' 도 솔직히
방문자 질문 → 2문장 답
고정 답변으로 안전하게

검수 원칙 ? 사실과 다른 내용 삭제 / 과장 표현 줄이기 / 내 말투로 다시 쓰기

1. 문제정의

2. 사용자

3. AI역할

4. 데이터

5. 설계

6. MVP

7. 배포

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 8 -->

STEP 4 · 08
이미지·영상은 'URL' 로 다룬다
DB 에는 파일이 아니라 '파일 주소' 만 저장합니다.

초급자 방식 (안전한 시작)
주의
이미지: public 폴더 또는 Supabase Storage
영상: 일부공개 YouTube 링크 등 외부 URL
DB media 테이블에는 URL 만 입력
30초 자기소개 영상 → 클릭 재생 권장
대용량 영상 파일 직접 업로드는 피하기
한글·공백 파일명은 오류의 원인
저작권 불명확한 이미지 사용 금지
민감한 개인 사진은 공개 전 확인

1. 문제정의

2. 사용자

3. AI역할

4. 데이터

5. 설계

6. MVP

7. 배포

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 9 -->

STEP 5 · 09
Supabase 4개 테이블 한 장 요약
처음에는 복잡한 관계 대신 단순 4 테이블로 시작합니다.

profiles

skills

projects

media

name
headline
summary
email
skill_name
skill_desc
level
title
description
image_url
demo_url
image_url
video_url
caption

1행 (나)

여러 행

여러 행

여러 행
저장 원칙: 이미지·영상은 파일이 아니라 URL 만 저장 → Storage 분리

1. 문제정의

2. 사용자

3. AI역할

4. 데이터

5. 설계

6. MVP

7. 배포

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 10 -->

STEP 5 · 10
코드 매핑 ? supabase/schema.sql
Supabase → SQL Editor 에 통째로 붙여넣고 Run.

-- 1) profiles : 나의 기본 정보 (한 사람당 1행)
create table profiles (
  id uuid primary key default gen_random_uuid(),
  name text, headline text, summary text, email text
);

-- 2) skills / 3) projects / 4) media 도 동일한 패턴으로 생성

-- RLS: 누구나 읽기만 가능, 쓰기는 Dashboard 에서만
alter table profiles enable row level security;
create policy "public read profiles" on profiles for select using (true);
샘플 데이터까지 한 번에 들어가도록 schema.sql 끝부분에 insert 문 포함

1. 문제정의

2. 사용자

3. AI역할

4. 데이터

5. 설계

6. MVP

7. 배포

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 11 -->

STEP 6 · 11
프로젝트 폴더 구조
파일 이름과 역할부터 익숙해지면 됩니다.
app/page.tsx
첫 화면 ? DB 조회 후 6개 섹션 조립
app/layout.tsx
공통 레이아웃 / 푸터 / 한글 lang
app/admin/page.tsx
관리자 페이지 ? 비밀번호 + 4개 폼
app/api/admin/route.ts
서버 API ? 비밀번호 검증 + DB 쓰기
components/*.tsx
Hero · About · Skills · Projects · Media · Contact
lib/supabase.ts
DB 클라이언트 (anon key, 읽기 전용)
lib/supabase-admin.ts
서버 전용 (service_role, RLS 우회)
lib/types.ts
DB 4 테이블의 TypeScript 타입
supabase/schema.sql
테이블 + RLS + 샘플 데이터
.env.local
API Key 보관 ? GitHub 금지!

1. 문제정의

2. 사용자

3. AI역할

4. 데이터

5. 설계

6. MVP

7. 배포

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 12 -->

STEP 6 · 12
page.tsx ? DB → 화면 데이터 흐름
서버 컴포넌트가 Promise.all 로 4 테이블을 한 번에 조회합니다.

import { supabase } from "@/lib/supabase";
import Hero from "@/components/Hero";  // (다른 컴포넌트들도)

export const revalidate = 60;  // 60초마다 재조회

async function getData() {
  const [p, sk, pr, m] = await Promise.all([
    supabase.from("profiles").select("*").limit(1).maybeSingle(),
    supabase.from("skills").select("*"),
    supabase.from("projects").select("*"),
    supabase.from("media").select("*")
  ]);
  return { profile: p.data, skills: sk.data, ... };
}
profile 이 없으면 '데이터가 아직 없습니다' 안내 → 학습자가 원인을 바로 인지

1. 문제정의

2. 사용자

3. AI역할

4. 데이터

5. 설계

6. MVP

7. 배포

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 13 -->

STEP 6 · 13
6 컴포넌트 × DB 테이블 매핑
각 섹션이 어느 테이블에서 데이터를 받는지 한눈에 확인합니다.

Hero.tsx

profiles.name / headline + media.image_url

About.tsx

profiles.summary

Skills.tsx

skills (모든 행)

Projects.tsx

projects (모든 행)

Media.tsx

media (YouTube URL 자동 임베드)

Contact.tsx

profiles.email

1. 문제정의

2. 사용자

3. AI역할

4. 데이터

5. 설계

6. MVP

7. 배포

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 14 -->

STEP 6 · 14
환경변수와 키 분리 ? 절대 코드에 쓰지 않는다
공개 키와 비공개 키를 구분하고 GitHub 에는 키 자체를 올리지 않습니다.

# .env.local  (절대 GitHub 에 커밋하지 않음)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...        # 공개 OK (RLS 로 보호)

ADMIN_PASSWORD=myproject1234              # 서버 전용
SUPABASE_SERVICE_ROLE_KEY=...             # 서버 전용 (RLS 우회)

공개 키 (NEXT_PUBLIC_*)
비공개 키 (서버 전용)
브라우저에 노출 OK. RLS public read 정책으로 보호.
API 라우트에서만 사용. NEXT_PUBLIC_ 절대 금지.

1. 문제정의

2. 사용자

3. AI역할

4. 데이터

5. 설계

6. MVP

7. 배포

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 15 -->

STEP 7 · 15
GitHub 에 코드 저장
배포 전에 코드가 안전하게 저장되어 있어야 합니다.

커밋 전 확인
# 1) 저장소 초기화
git init
git add .
git commit -m "feat: 초기 커밋"

# 2) GitHub 원격 저장소 연결
git remote add origin <URL>
git branch -M main
git push -u origin main
.gitignore 가 .env.local 포함
git status 에 .env.local 안 보임
API Key 가 코드에 직접 박혀있지 않음
README 에 실행 방법 작성

1. 문제정의

2. 사용자

3. AI역할

4. 데이터

5. 설계

6. MVP

7. 배포

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 16 -->

STEP 7 · 16
Vercel 배포 ? 5단계
배포 URL 이 생기면 내 웹앱을 외부에서 볼 수 있습니다.

GitHub 저장소를 Vercel 에 Import

1

Framework Preset = Next.js 자동 인식

2

Environment Variables 에 4개 키 입력

3

Deploy 클릭 → 1~2분 대기

4

발급된 URL 을 PC + 모바일에서 확인

5

1. 문제정의

2. 사용자

3. AI역할

4. 데이터

5. 설계

6. MVP

7. 배포

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 17 -->

STEP 7 · 17
제출 전 최종 체크리스트
포트폴리오는 모바일로 볼 가능성이 높습니다.

기능

DB · 배포

안전

?  Hero / About 표시
?  Skills 4개 이상
?  Projects 1개 이상
?  이미지·영상 표시
?  Supabase 데이터 표시
?  환경변수 정상
?  Vercel URL 접속
?  모바일 화면 확인
?  개인정보 제거
?  API Key 비공개
?  저작권 OK 이미지
?  회사 내부정보 없음

1. 문제정의

2. 사용자

3. AI역할

4. 데이터

5. 설계

6. MVP

7. 배포

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 18 -->

BONUS · 18
관리자 페이지 (/admin) 로 데이터 입력
SQL 을 만지지 않고 웹 화면에서 직접 추가·수정·삭제할 수 있습니다.
진입 흐름

보안 설계

1. /admin 접속
service_role 키는 서버에서만 사용
쓰기 경로는 /api/admin 한 곳으로 격리
비밀번호는 sessionStorage 만 사용
profiles 는 자동 upsert (1행 유지)
메인 페이지는 anon 키 + RLS public read

2. ADMIN_PASSWORD 입력

3. x-admin-password 헤더 검증

4. Profile / Skills / Projects / Media 폼

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 19 -->

TROUBLESHOOTING · 19
자주 발생하는 오류와 해결
오류는 실패가 아니라 연결 구조를 이해하는 기회입니다.

증상

원인

해결

Module not found: @supabase/...

npm install 누락

npm install 다시 실행

.env.local 에 ... 설정해 주세요

환경변수 미입력

.env.local 파일명·내용 재확인

'데이터가 아직 없습니다' 화면

profiles 테이블 비어있음

Supabase Table Editor 에서 1행 추가

Vercel Build failed

환경변수 미입력

Vercel → Settings 에서 재입력

이미지 깨짐

외부 도메인 미허용

next.config.js remotePatterns 추가

AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0

### Notes:

<!-- Slide number: 20 -->

WRAP UP · 20
오늘 만든 흐름이 모든 AI 앱의 골격이다

문제 → 데이터 → AI → 화면 → 배포
Project 1
Project 2
Project 3
데이터 분석
CV / NLP
RAG 챗봇
Project 0 에서 익힌 순서가 이후 6개 프로젝트의 공통 골격이 됩니다.

Project 4
Project 5
Project 6
Agent 자동화
멀티모달
서비스 배포
Thank you
AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정

### Notes:
