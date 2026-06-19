import type { Profile, Skill, Project, Media } from "@/lib/types";

// 데모 모드용 샘플 데이터 — supabase/schema.sql 의 seed 와 동일한 구조
export const MOCK_PROFILE: Profile = {
  id: "demo-profile",
  name: "홍길동",
  headline: "AI 웹앱으로 일상을 자동화하는 비전공 개발자",
  summary:
    "안녕하세요, 저는 AI 앱크리에이터 과정에서 처음 코딩을 시작한 홍길동입니다.\n현재는 생성형 AI와 노코드 도구를 활용해 작은 자동화 앱을 만들고 있습니다.\n이전 직무는 고객 서비스였고, 사람들이 겪는 불편을 잘 관찰하는 것이 강점입니다.\n앞으로는 일상 속 반복 업무를 줄여주는 AI 앱을 만들고 싶습니다.",
  email: "hong@example.com"
};

export const MOCK_SKILLS: Skill[] = [
  { id: "s1", skill_name: "AI 프롬프트 설계", skill_desc: "원하는 결과를 얻기 위해 명확한 프롬프트를 작성합니다.", level: "가능" },
  { id: "s2", skill_name: "데이터 정리", skill_desc: "엑셀/시트 데이터를 분석 가능한 형태로 정돈합니다.", level: "능숙" },
  { id: "s3", skill_name: "웹 화면 구성", skill_desc: "Next.js + Tailwind 로 반응형 화면을 만듭니다.", level: "학습 중" },
  { id: "s4", skill_name: "Supabase DB", skill_desc: "간단한 테이블 설계와 데이터 조회를 할 수 있습니다.", level: "학습 중" },
  { id: "s5", skill_name: "이미지 생성", skill_desc: "용도에 맞는 이미지를 생성형 AI로 만들 수 있습니다.", level: "가능" },
  { id: "s6", skill_name: "영상 편집 기초", skill_desc: "30초 자기소개 영상을 직접 촬영·편집합니다.", level: "가능" }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "자기소개 웹앱",
    description: "AI 앱크리에이터 과정 Project 0 — 이력서를 웹앱으로 변환하고 Vercel에 배포했습니다.",
    image_url: "https://picsum.photos/seed/intro/600/400",
    demo_url: "https://example.com"
  },
  {
    id: "p2",
    title: "데일리 일정 정리 봇",
    description: "하루 일정을 LLM이 요약해 카카오톡으로 전송하는 자동화 미니 프로젝트입니다.",
    image_url: "https://picsum.photos/seed/bot/600/400",
    demo_url: null
  }
];

export const MOCK_MEDIA: Media[] = [
  { id: "m1", image_url: "https://picsum.photos/seed/profile/400/400", video_url: null, caption: "프로필 사진" },
  { id: "m2", image_url: "https://picsum.photos/seed/hero/800/400",    video_url: null, caption: "대표 이미지" },
  { id: "m3", image_url: null, video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "30초 자기소개 영상 (샘플)" }
];
