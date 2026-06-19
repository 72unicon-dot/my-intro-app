// DB 4개 테이블에 대응하는 타입 정의
// 교재 Step 5의 schema 와 동일한 구조

export type Profile = {
  id: string;
  name: string;
  headline: string;
  summary: string;
  email: string;
};

export type Skill = {
  id: string;
  skill_name: string;
  skill_desc: string;
  level: "학습 중" | "가능" | "능숙" | string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  demo_url: string | null;
};

export type Media = {
  id: string;
  image_url: string | null;
  video_url: string | null;
  caption: string | null;
};
