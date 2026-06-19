import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 자기소개 웹앱",
  description: "AI 앱크리에이터 과정 Project 0 — 자기소개 웹앱"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <main className="mx-auto max-w-3xl">{children}</main>
        <footer className="text-center text-xs text-slate-500 py-10">
          Built with Next.js · Supabase · Vercel — AI 앱크리에이터 과정 Project 0
          <br />
          <a href="/admin" className="mt-2 inline-block text-slate-400 hover:underline">
            관리자
          </a>
        </footer>
      </body>
    </html>
  );
}
