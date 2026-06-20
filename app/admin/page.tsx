"use client";

import { useEffect, useState } from "react";
import type { Profile, Skill, Project, Media } from "@/lib/types";

type AdminData = {
  profiles: Profile[];
  skills: Skill[];
  projects: Project[];
  media: Media[];
};

const EMPTY_DATA: AdminData = { profiles: [], skills: [], projects: [], media: [] };

export default function AdminPage() {
  const [data, setData] = useState<AdminData>(EMPTY_DATA);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function call(method: "GET" | "POST" | "DELETE", body?: object) {
    const res = await fetch("/api/admin", {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store"
    });
    return res.json().catch(() => ({ ok: false, error: `서버 오류 (${res.status})` }));
  }

  async function refresh() {
    try {
      const res = await call("GET");
      if (res.ok) {
        setData(res.data);
        setMessage(null);
      } else {
        setMessage(`오류: ${res.error ?? "데이터를 불러오지 못했습니다."}`);
      }
    } catch {
      setMessage("오류: 서버에 연결하지 못했습니다.");
    }
  }

  async function addRow(table: string, row: Record<string, unknown>) {
    const cleaned = Object.fromEntries(
      Object.entries(row).filter(([, v]) => v !== "" && v !== null && v !== undefined)
    );
    const res = await call("POST", { table, row: cleaned });
    setMessage(res.ok ? `${table} 저장 완료` : `오류: ${res.error}`);
    if (res.ok) await refresh();
  }

  async function deleteRow(table: string, id: string) {
    if (!confirm(`${table} 의 이 행을 삭제할까요?`)) return;
    const res = await call("DELETE", { table, id });
    setMessage(res.ok ? `${table} 삭제 완료` : `오류: ${res.error}`);
    if (res.ok) await refresh();
  }

  const profile = data.profiles[0];

  return (
    <section className="space-y-12">
      <header>
        <h2 className="!mb-2">변경 가능 모드 · 데이터 입력</h2>
        <p className="text-sm text-amber-700">
          이 페이지에서는 누구나 데이터를 추가·수정·삭제할 수 있습니다.
        </p>
      </header>

      {message && (
        <div className="rounded bg-emerald-50 px-4 py-2 text-sm text-emerald-700">{message}</div>
      )}

      <ProfileForm initial={profile} onSubmit={(row) => addRow("profiles", row)} />
      <SkillsForm
        rows={data.skills}
        onAdd={(row) => addRow("skills", row)}
        onDelete={(id) => deleteRow("skills", id)}
      />
      <ProjectsForm
        rows={data.projects}
        onAdd={(row) => addRow("projects", row)}
        onDelete={(id) => deleteRow("projects", id)}
      />
      <MediaForm
        rows={data.media}
        onAdd={(row) => addRow("media", row)}
        onDelete={(id) => deleteRow("media", id)}
      />

      <p className="text-center text-xs text-slate-400">
        모든 변경 사항은 60초 안에 메인 페이지(/)에 반영됩니다.
      </p>
    </section>
  );
}

// ====== 개별 폼들 ======

function ProfileForm({
  initial,
  onSubmit
}: {
  initial?: Profile;
  onSubmit: (row: Record<string, unknown>) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [headline, setHeadline] = useState(initial?.headline ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setHeadline(initial.headline);
      setSummary(initial.summary);
      setEmail(initial.email);
    }
  }, [initial]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, headline, summary, email });
      }}
      className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100 space-y-3"
    >
      <h3 className="text-lg font-semibold">Profile (한 사람 1행)</h3>
      <Field label="이름" value={name} onChange={setName} required />
      <Field label="한 줄 소개 (Headline)" value={headline} onChange={setHeadline} required />
      <Field label="이메일" value={email} onChange={setEmail} type="email" required />
      <label className="block text-sm">
        <span className="text-slate-700">자기소개 문단 (Summary)</span>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={5}
          className="mt-1 w-full rounded border p-2"
          required
        />
      </label>
      <button className="rounded bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
        {initial ? "프로필 수정" : "프로필 저장"}
      </button>
    </form>
  );
}

function SkillsForm({
  rows,
  onAdd,
  onDelete
}: {
  rows: Skill[];
  onAdd: (row: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}) {
  const [skill_name, setName] = useState("");
  const [skill_desc, setDesc] = useState("");
  const [level, setLevel] = useState("학습 중");

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100 space-y-4">
      <h3 className="text-lg font-semibold">Skills</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd({ skill_name, skill_desc, level });
          setName("");
          setDesc("");
          setLevel("학습 중");
        }}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        <Field label="역량명" value={skill_name} onChange={setName} required />
        <label className="block text-sm">
          <span className="text-slate-700">숙련도</span>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mt-1 w-full rounded border p-2"
          >
            <option>학습 중</option>
            <option>가능</option>
            <option>능숙</option>
          </select>
        </label>
        <div className="sm:col-span-2">
          <Field label="설명 (한 문장)" value={skill_desc} onChange={setDesc} required />
        </div>
        <button className="rounded bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 sm:col-span-2">
          역량 추가
        </button>
      </form>

      <RowList
        rows={rows.map((r) => ({ id: r.id, primary: r.skill_name, secondary: `${r.level} · ${r.skill_desc}` }))}
        onDelete={onDelete}
      />
    </div>
  );
}

function ProjectsForm({
  rows,
  onAdd,
  onDelete
}: {
  rows: Project[];
  onAdd: (row: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImage] = useState("");
  const [demo_url, setDemo] = useState("");

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100 space-y-4">
      <h3 className="text-lg font-semibold">Projects</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd({ title, description, image_url, demo_url });
          setTitle("");
          setDescription("");
          setImage("");
          setDemo("");
        }}
        className="space-y-3"
      >
        <Field label="제목" value={title} onChange={setTitle} required />
        <label className="block text-sm">
          <span className="text-slate-700">설명 (해결한 문제 + 사용 도구)</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded border p-2"
            required
          />
        </label>
        <Field label="이미지 URL" value={image_url} onChange={setImage} type="url" />
        <Field label="데모 URL" value={demo_url} onChange={setDemo} type="url" />
        <button className="rounded bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
          프로젝트 추가
        </button>
      </form>

      <RowList
        rows={rows.map((r) => ({
          id: r.id,
          primary: r.title,
          secondary: r.description
        }))}
        onDelete={onDelete}
      />
    </div>
  );
}

function MediaForm({
  rows,
  onAdd,
  onDelete
}: {
  rows: Media[];
  onAdd: (row: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}) {
  const [image_url, setImage] = useState("");
  const [video_url, setVideo] = useState("");
  const [caption, setCaption] = useState("");

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100 space-y-4">
      <h3 className="text-lg font-semibold">Media (이미지 또는 영상)</h3>
      <p className="text-xs text-slate-500">한 행에 이미지 URL 또는 영상 URL 중 하나만 채워도 됩니다.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd({ image_url, video_url, caption });
          setImage("");
          setVideo("");
          setCaption("");
        }}
        className="space-y-3"
      >
        <Field label="이미지 URL (선택)" value={image_url} onChange={setImage} type="url" />
        <Field label="영상 URL — YouTube 링크 (선택)" value={video_url} onChange={setVideo} type="url" />
        <Field label="캡션 (선택)" value={caption} onChange={setCaption} />
        <button className="rounded bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
          미디어 추가
        </button>
      </form>

      <RowList
        rows={rows.map((r) => ({
          id: r.id,
          primary: r.caption ?? (r.video_url ? "영상" : "이미지"),
          secondary: r.video_url ?? r.image_url ?? ""
        }))}
        onDelete={onDelete}
      />
    </div>
  );
}

// ====== 공통 유틸 컴포넌트 ======

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded border p-2"
        required={required}
      />
    </label>
  );
}

function RowList({
  rows,
  onDelete
}: {
  rows: { id: string; primary: string; secondary: string }[];
  onDelete: (id: string) => void;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-slate-400">아직 등록된 행이 없습니다.</p>;
  }
  return (
    <ul className="divide-y rounded border">
      {rows.map((r) => (
        <li key={r.id} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium">{r.primary}</div>
            <div className="truncate text-xs text-slate-500">{r.secondary}</div>
          </div>
          <button
            onClick={() => onDelete(r.id)}
            className="rounded border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}
