import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isDemoMode = !url || !anonKey;

// 환경변수가 없으면 null. page.tsx 가 isDemoMode 를 보고 mock 데이터로 대체한다.
export const supabase: SupabaseClient | null = isDemoMode
  ? null
  : createClient(url!, anonKey!);
