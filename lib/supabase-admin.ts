import { createClient } from "@supabase/supabase-js";

// 서버 전용 클라이언트 — service_role 키 사용 → RLS 우회 가능
// 이 파일을 절대 클라이언트 컴포넌트에서 import 하지 마세요.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error(
    ".env.local 에 NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 를 설정해 주세요."
  );
}

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false }
});

export const ADMIN_TABLES = ["profiles", "skills", "projects", "media"] as const;
export type AdminTable = (typeof ADMIN_TABLES)[number];
