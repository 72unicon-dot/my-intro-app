import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseAdmin: SupabaseClient | null = null;

// 데모 모드의 빌드에서는 환경변수가 없어도 모듈을 불러올 수 있어야 합니다.
// 관리자 요청이 실제로 들어왔을 때만 service_role 클라이언트를 생성합니다.
export function getSupabaseAdmin(): SupabaseClient {
  if (supabaseAdmin) return supabaseAdmin;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY를 설정해 주세요."
    );
  }

  supabaseAdmin = createClient(url, serviceKey, {
    auth: { persistSession: false }
  });
  return supabaseAdmin;
}

export const ADMIN_TABLES = ["profiles", "skills", "projects", "media"] as const;
export type AdminTable = (typeof ADMIN_TABLES)[number];
