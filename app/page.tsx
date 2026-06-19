import { supabase, isDemoMode } from "@/lib/supabase";
import type { Profile, Skill, Project, Media } from "@/lib/types";
import { MOCK_PROFILE, MOCK_SKILLS, MOCK_PROJECTS, MOCK_MEDIA } from "@/lib/mock-data";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import MediaSection from "@/components/Media";
import Contact from "@/components/Contact";

export const revalidate = 60;

async function getData() {
  // 데모 모드 — .env.local 미설정 시 mock 데이터로 화면 확인 가능
  if (isDemoMode || !supabase) {
    return {
      profile: MOCK_PROFILE,
      skills: MOCK_SKILLS,
      projects: MOCK_PROJECTS,
      media: MOCK_MEDIA
    };
  }

  const [profileRes, skillsRes, projectsRes, mediaRes] = await Promise.all([
    supabase.from("profiles").select("*").limit(1).maybeSingle(),
    supabase.from("skills").select("*").order("skill_name"),
    supabase.from("projects").select("*").order("title"),
    supabase.from("media").select("*")
  ]);

  return {
    profile: (profileRes.data as Profile | null) ?? null,
    skills: (skillsRes.data as Skill[] | null) ?? [],
    projects: (projectsRes.data as Project[] | null) ?? [],
    media: (mediaRes.data as Media[] | null) ?? []
  };
}

export default async function Page() {
  const { profile, skills, projects, media } = await getData();

  if (!profile) {
    return (
      <section className="text-center">
        <h2>데이터가 아직 없습니다</h2>
        <p className="text-slate-600">
          Supabase 프로젝트의 <code>profiles</code> 테이블에 데이터를 한 줄 추가해 주세요.
          <br />
          (교재 Step 5 — Supabase 테이블 만들기 참고)
        </p>
      </section>
    );
  }

  return (
    <>
      {isDemoMode && (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-800">
          DEMO MODE — <code>.env.local</code>의 Supabase 키가 없어 샘플 데이터로 표시 중입니다.
        </div>
      )}
      <Hero profile={profile} heroImage={media[0]?.image_url ?? null} />
      <About summary={profile.summary} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <MediaSection media={media} />
      <Contact email={profile.email} />
    </>
  );
}
