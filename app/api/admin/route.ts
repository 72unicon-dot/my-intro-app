import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, ADMIN_TABLES, type AdminTable } from "@/lib/supabase-admin";

export const runtime = "nodejs";

// 모든 요청은 헤더 x-admin-password 를 검사한다.
// 일치하지 않으면 401을 돌려준다.
function checkPassword(req: NextRequest): NextResponse | null {
  const provided = req.headers.get("x-admin-password");
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD 가 서버에 설정되지 않았습니다." },
      { status: 500 }
    );
  }
  if (provided !== expected) {
    return NextResponse.json({ ok: false, error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }
  return null;
}

function isAllowedTable(t: string): t is AdminTable {
  return (ADMIN_TABLES as readonly string[]).includes(t);
}

// 모든 4개 테이블의 데이터 한 번에 조회 (관리자 페이지 첫 진입 시 사용)
export async function GET(req: NextRequest) {
  const bad = checkPassword(req);
  if (bad) return bad;

  const [profiles, skills, projects, media] = await Promise.all([
    supabaseAdmin.from("profiles").select("*").order("created_at"),
    supabaseAdmin.from("skills").select("*").order("created_at"),
    supabaseAdmin.from("projects").select("*").order("created_at"),
    supabaseAdmin.from("media").select("*").order("created_at")
  ]);
  return NextResponse.json({
    ok: true,
    data: {
      profiles: profiles.data ?? [],
      skills: skills.data ?? [],
      projects: projects.data ?? [],
      media: media.data ?? []
    }
  });
}

// 행 추가 (또는 profile 의 경우 upsert)
export async function POST(req: NextRequest) {
  const bad = checkPassword(req);
  if (bad) return bad;

  const body = await req.json().catch(() => null);
  if (!body || !isAllowedTable(body.table) || typeof body.row !== "object") {
    return NextResponse.json(
      { ok: false, error: "요청 형식이 올바르지 않습니다. {table, row} 가 필요합니다." },
      { status: 400 }
    );
  }

  // profile 은 한 사람 1행 원칙 → 기존 1행이 있으면 update, 없으면 insert
  if (body.table === "profiles") {
    const { data: existing } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .limit(1)
      .maybeSingle();
    if (existing?.id) {
      const { error } = await supabaseAdmin
        .from("profiles")
        .update(body.row)
        .eq("id", existing.id);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true, mode: "updated" });
    }
  }

  const { error } = await supabaseAdmin.from(body.table).insert(body.row);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, mode: "inserted" });
}

// 행 삭제 — body: { table, id }
export async function DELETE(req: NextRequest) {
  const bad = checkPassword(req);
  if (bad) return bad;

  const body = await req.json().catch(() => null);
  if (!body || !isAllowedTable(body.table) || typeof body.id !== "string") {
    return NextResponse.json(
      { ok: false, error: "요청 형식이 올바르지 않습니다. {table, id} 가 필요합니다." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin.from(body.table).delete().eq("id", body.id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
