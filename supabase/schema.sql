-- =====================================================================
-- AI 앱크리에이터 과정 Project 0 — 자기소개 웹앱 DB 스키마
-- 사용법: Supabase Dashboard → SQL Editor 에 전체 복사 후 [Run]
-- =====================================================================

-- 1) profiles : 나의 기본 정보 (한 사람당 1행만 사용)
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  headline text not null,
  summary text not null,
  email text not null,
  created_at timestamptz default now()
);

-- 2) skills : 핵심 역량 카드
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  skill_name text not null,
  skill_desc text not null,
  level text not null default '학습 중',
  created_at timestamptz default now()
);

-- 3) projects : 프로젝트 카드
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text,
  demo_url text,
  created_at timestamptz default now()
);

-- 4) media : 이미지/영상 URL
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  image_url text,
  video_url text,
  caption text,
  created_at timestamptz default now()
);

-- =====================================================================
-- 공개 읽기 정책 (RLS)
-- 이 웹앱은 누구나 "읽기"만 가능합니다. 쓰기는 Supabase Dashboard에서만.
-- =====================================================================

alter table profiles enable row level security;
alter table skills   enable row level security;
alter table projects enable row level security;
alter table media    enable row level security;

create policy "public read profiles" on profiles for select using (true);
create policy "public read skills"   on skills   for select using (true);
create policy "public read projects" on projects for select using (true);
create policy "public read media"    on media    for select using (true);

-- =====================================================================
-- 샘플 데이터 (학습자는 본인 정보로 바꾸세요)
-- =====================================================================

insert into profiles (name, headline, summary, email) values
('홍길동',
 'AI 웹앱으로 일상을 자동화하는 비전공 개발자',
 E'안녕하세요, 저는 AI 앱크리에이터 과정에서 처음 코딩을 시작한 홍길동입니다.\n현재는 생성형 AI와 노코드 도구를 활용해 작은 자동화 앱을 만들고 있습니다.\n이전 직무는 고객 서비스였고, 사람들이 겪는 불편을 잘 관찰하는 것이 강점입니다.\n앞으로는 일상 속 반복 업무를 줄여주는 AI 앱을 만들고 싶습니다.',
 'hong@example.com');

insert into skills (skill_name, skill_desc, level) values
('AI 프롬프트 설계', '원하는 결과를 얻기 위해 명확한 프롬프트를 작성합니다.', '가능'),
('데이터 정리',     '엑셀/시트 데이터를 분석 가능한 형태로 정돈합니다.',     '능숙'),
('웹 화면 구성',     'Next.js + Tailwind 로 반응형 화면을 만듭니다.',          '학습 중'),
('Supabase DB',     '간단한 테이블 설계와 데이터 조회를 할 수 있습니다.',     '학습 중'),
('이미지 생성',     '용도에 맞는 이미지를 생성형 AI로 만들 수 있습니다.',     '가능'),
('영상 편집 기초',   '30초 자기소개 영상을 직접 촬영·편집합니다.',             '가능');

insert into projects (title, description, image_url, demo_url) values
('자기소개 웹앱',
 'AI 앱크리에이터 과정 Project 0 — 이력서를 웹앱으로 변환하고 Vercel에 배포했습니다.',
 'https://picsum.photos/seed/intro/600/400',
 'https://example.com'),
('데일리 일정 정리 봇',
 '하루 일정을 LLM이 요약해 카카오톡으로 전송하는 자동화 미니 프로젝트입니다.',
 'https://picsum.photos/seed/bot/600/400',
 null);

insert into media (image_url, video_url, caption) values
('https://picsum.photos/seed/profile/400/400', null, '프로필 사진'),
('https://picsum.photos/seed/hero/800/400',    null, '대표 이미지'),
(null, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '30초 자기소개 영상 (샘플 링크)');
