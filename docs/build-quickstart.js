// 학습자용 한 장짜리 시작 가이드 (GitHub 다운로드 → 첫 화면)
// 실행: node docs/build-quickstart.js
// 출력: docs/학습자_시작가이드.pptx (+ PDF는 PowerPoint COM 별도 변환)

const pptxgen = require("pptxgenjs");
const path = require("path");

const COLOR = {
  navy: "1E2761",
  ice: "CADCFC",
  amber: "F59E0B",
  amberSoft: "FEF3C7",
  green: "10B981",
  greenSoft: "D1FAE5",
  text: "1F2937",
  textMid: "475569",
  textMuted: "94A3B8",
  white: "FFFFFF",
  codeBg: "0F172A",
  codeText: "E2E8F0",
  codeGreen: "86EFAC",
  codeAmber: "FBBF24",
  rule: "E5E7EB",
  sand: "F8FAFC",
  red: "DC2626",
  redSoft: "FEE2E2"
};
const FONT = { h: "맑은 고딕", b: "맑은 고딕", code: "Consolas" };

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 × 5.625
pres.title = "Project 0 — 학습자 시작 가이드";
pres.author = "AI혁신 길라잡이 김사부";

// ============== 공통 헬퍼 ==============
function chrome(slide, no) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: COLOR.navy }, line: { type: "none" }
  });
  slide.addText("AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0 학습자 시작 가이드", {
    x: 0.5, y: 5.34, w: 9.0, h: 0.25,
    fontFace: FONT.b, fontSize: 8.5, color: COLOR.textMuted, margin: 0
  });
  if (no) {
    slide.addText(no, {
      x: 9.20, y: 5.34, w: 0.5, h: 0.25,
      fontFace: FONT.b, fontSize: 8.5, color: COLOR.textMuted, align: "right", margin: 0
    });
  }
}

function header(slide, kicker, title, subtitle) {
  if (kicker) {
    slide.addText(kicker, {
      x: 0.55, y: 0.28, w: 9.0, h: 0.30,
      fontFace: FONT.b, fontSize: 10.5, color: COLOR.amber, bold: true, charSpacing: 4, margin: 0
    });
  }
  slide.addText(title, {
    x: 0.55, y: 0.52, w: 9.0, h: 0.65,
    fontFace: FONT.h, fontSize: 26, color: COLOR.navy, bold: true, margin: 0
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.55, y: 1.15, w: 9.0, h: 0.36,
      fontFace: FONT.b, fontSize: 13, color: COLOR.textMid, margin: 0
    });
  }
}

function card(slide, x, y, w, h, opts = {}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.fill || COLOR.white },
    line: { color: opts.border || COLOR.rule, width: 0.75 }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.08, h, fill: { color: opts.accent || COLOR.navy }, line: { type: "none" }
  });
}

function shellBlock(slide, x, y, w, h, lines) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: COLOR.codeBg }, line: { type: "none" }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.08, h, fill: { color: COLOR.green }, line: { type: "none" }
  });
  slide.addText("Terminal", {
    x: x + 0.20, y: y + 0.04, w: w - 0.30, h: 0.22,
    fontFace: FONT.b, fontSize: 8.5, color: COLOR.codeGreen, charSpacing: 3, bold: true, margin: 0
  });
  const runs = lines.map((ln, i) => {
    const obj = typeof ln === "string" ? { text: ln } : ln;
    return {
      text: obj.text,
      options: { color: obj.color || COLOR.codeText, breakLine: i < lines.length - 1 }
    };
  });
  slide.addText(runs, {
    x: x + 0.25, y: y + 0.28, w: w - 0.4, h: h - 0.36,
    fontFace: FONT.code, fontSize: 10.5, color: COLOR.codeText, margin: 0
  });
}

function notice(slide, x, y, w, text, type = "info") {
  const colors = {
    info:   { fill: COLOR.ice,       border: COLOR.navy,  text: COLOR.navy,    label: "참고" },
    warn:   { fill: COLOR.amberSoft, border: COLOR.amber, text: "92400E",      label: "주의" },
    danger: { fill: COLOR.redSoft,   border: COLOR.red,   text: "991B1B",      label: "위험" },
    success:{ fill: COLOR.greenSoft, border: COLOR.green, text: "065F46",      label: "성공" }
  };
  const c = colors[type];
  const h = 0.42;
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: c.fill }, line: { color: c.border, width: 0.5 }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.08, h, fill: { color: c.border }, line: { type: "none" }
  });
  slide.addText([
    { text: `${c.label}  `, options: { bold: true, color: c.text } },
    { text, options: { color: c.text } }
  ], {
    x: x + 0.18, y, w: w - 0.25, h,
    fontFace: FONT.b, fontSize: 11, valign: "middle", margin: 0
  });
}

let no = 0;
function nextNo() { return String(++no).padStart(2, "0"); }

// =====================================================================
// SLIDE 01 — 표지
// =====================================================================
{
  const p = nextNo();
  const s = pres.addSlide();
  s.background = { color: COLOR.navy };
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.60, w: 10, h: 0.04, fill: { color: COLOR.amber }, line: { type: "none" }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.50, w: 0.5, h: 0.06, fill: { color: COLOR.amber }, line: { type: "none" }
  });
  s.addText("PROJECT 0 · 학습자 시작 가이드", {
    x: 0.5, y: 0.62, w: 8, h: 0.4, fontFace: FONT.b, fontSize: 12,
    color: COLOR.ice, charSpacing: 6, bold: true, margin: 0
  });
  s.addText("GitHub에서 코드 받아\n첫 화면 띄우기", {
    x: 0.5, y: 1.20, w: 9, h: 2.0,
    fontFace: FONT.h, fontSize: 40, color: COLOR.white, bold: true, lineSpacingMultiple: 1.05, margin: 0
  });
  s.addText("ZIP 다운로드 → 설치 → 환경변수 → 실행, 총 30분", {
    x: 0.5, y: 3.30, w: 9, h: 0.5,
    fontFace: FONT.b, fontSize: 16, color: COLOR.ice, margin: 0
  });
  s.addText("이 가이드는 GitHub 저장소를 처음 받은 학습자가\n로컬에서 자기소개 웹앱 화면을 띄우기까지의 모든 단계를 담고 있습니다.", {
    x: 0.5, y: 3.85, w: 9, h: 0.8,
    fontFace: FONT.b, fontSize: 12, color: COLOR.ice, lineSpacingMultiple: 1.4, margin: 0
  });
  s.addText("AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정", {
    x: 0.5, y: 4.85, w: 9, h: 0.4,
    fontFace: FONT.b, fontSize: 11, color: COLOR.ice, margin: 0
  });
  s.addText(p, {
    x: 9.20, y: 4.85, w: 0.5, h: 0.4,
    fontFace: FONT.h, fontSize: 12, color: COLOR.ice, align: "right", margin: 0
  });
}

// =====================================================================
// SLIDE 02 — 한 페이지 흐름도
// =====================================================================
{
  const p = nextNo();
  const s = pres.addSlide();
  chrome(s, p);
  header(s, "OVERVIEW", "전체 흐름 — 5단계 30분", "각 단계를 차례로 따라하면 누구나 첫 화면까지 도달합니다.");

  const steps = [
    { num: "1", title: "Node.js 설치", note: "(이미 있으면 SKIP)" },
    { num: "2", title: "ZIP 다운로드", note: "또는 git clone" },
    { num: "3", title: "npm install", note: "1~2분 대기" },
    { num: "4", title: ".env.local 만들기", note: "Supabase 키 입력" },
    { num: "5", title: "npm run dev", note: "localhost:3000" }
  ];
  const sX = 0.5, gap = 0.10;
  const cellW = (9.0 - gap * 4) / 5;
  steps.forEach((st, i) => {
    const x = sX + i * (cellW + gap);
    s.addShape(pres.shapes.OVAL, {
      x: x + (cellW - 0.55) / 2, y: 1.85, w: 0.55, h: 0.55,
      fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(st.num, {
      x: x + (cellW - 0.55) / 2, y: 1.85, w: 0.55, h: 0.55,
      fontFace: FONT.h, fontSize: 18, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.55, w: cellW, h: 1.30,
      fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.5 }
    });
    s.addText(st.title, {
      x, y: 2.65, w: cellW, h: 0.45,
      fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true,
      align: "center", margin: 0
    });
    s.addText(st.note, {
      x, y: 3.10, w: cellW, h: 0.70,
      fontFace: FONT.b, fontSize: 10.5, color: COLOR.textMid, italic: true,
      align: "center", margin: 0
    });
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: x + cellW + 0.005, y: 2.12, w: gap - 0.01, h: 0,
        line: { color: COLOR.textMid, width: 1.2, endArrowType: "triangle" }
      });
    }
  });

  notice(s, 0.5, 4.20, 9.0,
    "이 가이드의 슬라이드 번호 = 단계 번호 (대략). 막히면 해당 단계 슬라이드로 다시 돌아오세요.",
    "info");
}

// =====================================================================
// SLIDE 03 — STEP 1: Node.js 설치
// =====================================================================
{
  const p = nextNo();
  const s = pres.addSlide();
  chrome(s, p);
  header(s, "STEP 1", "Node.js 18+ 설치 확인", "이미 설치되어 있으면 다음 단계로 넘어갑니다.");

  // 좌측: 확인 방법
  card(s, 0.5, 1.75, 4.45, 2.0, { accent: COLOR.navy });
  s.addText("설치 확인 방법", {
    x: 0.75, y: 1.85, w: 4.0, h: 0.32,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  s.addText("PowerShell 열고 입력:", {
    x: 0.75, y: 2.20, w: 4.0, h: 0.30,
    fontFace: FONT.b, fontSize: 11, color: COLOR.textMid, margin: 0
  });
  shellBlock(s, 0.78, 2.55, 4.0, 0.65, [
    { text: "node -v", color: COLOR.codeGreen }
  ]);
  s.addText("v18.x.x 이상이 보이면 OK", {
    x: 0.78, y: 3.28, w: 4.0, h: 0.30,
    fontFace: FONT.b, fontSize: 10.5, color: COLOR.textMid, italic: true, margin: 0
  });

  // 우측: 설치하는 법
  card(s, 5.05, 1.75, 4.45, 2.0, { accent: COLOR.amber });
  s.addText("설치하지 않은 경우", {
    x: 5.30, y: 1.85, w: 4.0, h: 0.32,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  s.addText("1) nodejs.org 접속\n2) LTS 버전 다운로드\n3) 설치 후 PowerShell 재시작\n4) node -v 다시 확인", {
    x: 5.30, y: 2.20, w: 4.0, h: 1.5,
    fontFace: FONT.b, fontSize: 12, color: COLOR.text, lineSpacingMultiple: 1.5, margin: 0
  });

  notice(s, 0.5, 3.95, 9.0,
    "VS Code (code.visualstudio.com) 도 같이 설치해두면 .env.local 편집할 때 편합니다.",
    "info");
}

// =====================================================================
// SLIDE 04 — STEP 2-A: ZIP 다운로드
// =====================================================================
{
  const p = nextNo();
  const s = pres.addSlide();
  chrome(s, p);
  header(s, "STEP 2 · 방법 A", "GitHub에서 ZIP 다운로드", "비전공자 추천 — Git CLI 몰라도 됩니다.");

  // 단계 카드들
  const steps = [
    { n: "1", t: "github.com/72unicon-dot/my-intro-app 접속" },
    { n: "2", t: "녹색 [ Code ] 버튼 클릭" },
    { n: "3", t: "메뉴 하단의 'Download ZIP' 클릭" },
    { n: "4", t: "다운로드된 my-intro-app-main.zip 압축 풀기" },
    { n: "5", t: "압축 푼 폴더를 바탕화면으로 이동 (또는 원하는 위치)" }
  ];
  steps.forEach((st, i) => {
    const y = 1.78 + i * 0.50;
    s.addShape(pres.shapes.OVAL, {
      x: 0.6, y: y + 0.04, w: 0.42, h: 0.42,
      fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(st.n, {
      x: 0.6, y: y + 0.04, w: 0.42, h: 0.42,
      fontFace: FONT.h, fontSize: 14, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.20, y, w: 8.30, h: 0.50, fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.5 }
    });
    s.addText(st.t, {
      x: 1.40, y, w: 8.0, h: 0.50,
      fontFace: FONT.b, fontSize: 12, color: COLOR.text, valign: "middle", margin: 0
    });
  });

  notice(s, 0.5, 4.45, 9.0,
    "폴더 이름이 my-intro-app-main 으로 끝납니다. 그대로 둬도 되고, my-intro-app 로 변경해도 됩니다.",
    "info");
}

// =====================================================================
// SLIDE 05 — STEP 2-B: Git Clone (선택)
// =====================================================================
{
  const p = nextNo();
  const s = pres.addSlide();
  chrome(s, p);
  header(s, "STEP 2 · 방법 B (선택)", "Git Clone — 익숙한 분만", "결과는 ZIP 다운로드와 동일합니다.");

  shellBlock(s, 0.5, 1.80, 9.0, 1.85, [
    { text: "# 원하는 위치 (예: 바탕화면) 로 이동", color: COLOR.codeGreen },
    { text: "cd ~/Desktop" },
    { text: "" },
    { text: "# 저장소 복제", color: COLOR.codeGreen },
    { text: "git clone https://github.com/72unicon-dot/my-intro-app.git" },
    { text: "cd my-intro-app" }
  ]);

  // 비교 카드
  card(s, 0.5, 3.85, 4.45, 1.10, { accent: COLOR.green });
  s.addText("Git Clone 장점", {
    x: 0.75, y: 3.92, w: 4.0, h: 0.30,
    fontFace: FONT.h, fontSize: 12, color: COLOR.navy, bold: true, margin: 0
  });
  s.addText("· git pull 로 강사 업데이트 즉시 반영\n· 본인 작업 이력 (commit) 관리 가능", {
    x: 0.78, y: 4.20, w: 4.0, h: 0.70,
    fontFace: FONT.b, fontSize: 10.5, color: COLOR.textMid, lineSpacingMultiple: 1.4, margin: 0
  });

  card(s, 5.05, 3.85, 4.45, 1.10, { accent: COLOR.amber });
  s.addText("ZIP 다운로드 장점", {
    x: 5.30, y: 3.92, w: 4.0, h: 0.30,
    fontFace: FONT.h, fontSize: 12, color: COLOR.navy, bold: true, margin: 0
  });
  s.addText("· Git 명령어 몰라도 됨\n· 한 번에 끝 — 가장 빠른 시작", {
    x: 5.33, y: 4.20, w: 4.0, h: 0.70,
    fontFace: FONT.b, fontSize: 10.5, color: COLOR.textMid, lineSpacingMultiple: 1.4, margin: 0
  });
}

// =====================================================================
// SLIDE 06 — STEP 3: PowerShell → 폴더 이동 → npm install
// =====================================================================
{
  const p = nextNo();
  const s = pres.addSlide();
  chrome(s, p);
  header(s, "STEP 3", "PowerShell 에서 npm install", "라이브러리 100여 개를 1~2분에 설치합니다.");

  shellBlock(s, 0.5, 1.78, 9.0, 2.55, [
    { text: "# 1) PowerShell 실행 (검색창에 powershell)", color: COLOR.codeGreen },
    { text: "" },
    { text: "# 2) 압축 푼 폴더로 이동 (본인 경로로 수정)", color: COLOR.codeGreen },
    { text: "cd \"C:\\Users\\본인이름\\Desktop\\my-intro-app-main\"" },
    { text: "" },
    { text: "# 3) 의존성 설치 (1~2분, 한 번만)", color: COLOR.codeGreen },
    { text: "npm install" }
  ]);

  notice(s, 0.5, 4.45, 9.0,
    "한글 경로(예: 바탕화면)도 동작합니다. 폴더 경로에 공백이 있으면 반드시 따옴표로 감싸세요.",
    "info");
}

// =====================================================================
// SLIDE 07 — STEP 4: .env.local 만들기
// =====================================================================
{
  const p = nextNo();
  const s = pres.addSlide();
  chrome(s, p);
  header(s, "STEP 4", ".env.local 만들기", "API Key를 안전하게 보관합니다.");

  // 만드는 법
  s.addText("만드는 법", {
    x: 0.5, y: 1.72, w: 9, h: 0.30,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  s.addText("1) .env.local.example 파일을 마우스 우클릭 → 복사 → 같은 폴더에 붙여넣기\n" +
            "2) 복사된 파일의 이름을 .env.local 로 변경 (앞의 점 . 도 포함)\n" +
            "3) VS Code 또는 메모장으로 열어서 본인 키 값으로 채우기", {
    x: 0.5, y: 2.05, w: 9, h: 1.00,
    fontFace: FONT.b, fontSize: 11.5, color: COLOR.text, lineSpacingMultiple: 1.5, margin: 0
  });

  shellBlock(s, 0.5, 3.10, 9.0, 1.40, [
    { text: "NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co" },
    { text: "NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY" },
    { text: "ADMIN_PASSWORD=본인이_정한_비밀번호                # 예: myproject1234", color: COLOR.codeAmber },
    { text: "SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY    # 절대 공유 X", color: COLOR.codeAmber }
  ]);

  notice(s, 0.5, 4.62, 9.0,
    "Supabase 키 발급 — Supabase Dashboard → Settings → API → Project URL / anon / service_role 복사",
    "info");
}

// =====================================================================
// SLIDE 08 — STEP 5: npm run dev + 성공 신호
// =====================================================================
{
  const p = nextNo();
  const s = pres.addSlide();
  chrome(s, p);
  header(s, "STEP 5", "npm run dev — 첫 화면", "이제 브라우저에서 본인 앱을 볼 수 있습니다.");

  shellBlock(s, 0.5, 1.78, 4.45, 1.10, [
    { text: "npm run dev", color: COLOR.codeGreen }
  ]);

  // 성공 신호 박스
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.98, w: 4.45, h: 1.65,
    fill: { color: COLOR.codeBg }, line: { type: "none" }
  });
  s.addText("성공 시 콘솔 출력", {
    x: 0.70, y: 3.04, w: 4.0, h: 0.22,
    fontFace: FONT.b, fontSize: 8.5, color: COLOR.codeGreen, charSpacing: 3, bold: true, margin: 0
  });
  s.addText([
    { text: "▲ Next.js 14.2.35", options: { color: COLOR.codeText, breakLine: true } },
    { text: "- Local:        http://localhost:3000", options: { color: COLOR.codeText, breakLine: true } },
    { text: "- Environments: .env.local", options: { color: COLOR.codeAmber, breakLine: true } },
    { text: "✓ Ready in 3s", options: { color: COLOR.codeGreen, bold: true } }
  ], {
    x: 0.70, y: 3.40, w: 4.10, h: 1.18,
    fontFace: FONT.code, fontSize: 10.5, paraSpaceAfter: 2, margin: 0
  });

  // 우측: 다음 행동
  card(s, 5.05, 1.78, 4.45, 2.70, { accent: COLOR.green });
  s.addText("다음 행동", {
    x: 5.30, y: 1.88, w: 4.0, h: 0.30,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  s.addText("· 브라우저 새 탭 → localhost:3000\n" +
            "· 노란 'DEMO MODE' 배너가 없으면 LIVE 모드 ✓\n" +
            "· /admin 접속 → ADMIN_PASSWORD 입력\n" +
            "· Profile/Skills/Projects/Media 폼에 본인 정보 입력\n" +
            "· 60초 안에 메인 페이지에 반영", {
    x: 5.33, y: 2.25, w: 4.0, h: 2.10,
    fontFace: FONT.b, fontSize: 11.5, color: COLOR.text, lineSpacingMultiple: 1.5, margin: 0
  });

  notice(s, 0.5, 4.65, 9.0,
    "서버를 멈추려면 PowerShell 창에서 Ctrl + C. 다시 시작하려면 npm run dev.",
    "info");
}

// =====================================================================
// SLIDE 09 — 자주 막히는 곳 (트러블슈팅)
// =====================================================================
{
  const p = nextNo();
  const s = pres.addSlide();
  chrome(s, p);
  header(s, "TROUBLESHOOTING", "자주 막히는 곳 — 한 줄 해결", "막혀도 당황하지 말고 표에서 찾으세요.");

  const rows = [
    ["Port 3000 is in use",            "이전 서버 미종료",        "그 창에서 Ctrl+C → npm run dev"],
    ["ERR_CONNECTION_REFUSED",         "서버가 안 떠있음",         "PowerShell에서 npm run dev 실행"],
    ["노란 'DEMO MODE' 배너가 계속",     ".env.local 키 오타",        "키 4개 재확인 후 서버 재시작"],
    ["화면이 비어있음 (LIVE 모드)",      "profiles 테이블 비어있음",  "Supabase 또는 /admin 에서 1행 추가"],
    ["/admin 비밀번호가 틀리다고",        "ADMIN_PASSWORD 불일치",     ".env.local 수정 후 서버 재시작"],
    ["node 명령어를 찾을 수 없음",        "Node.js 미설치",           "nodejs.org에서 LTS 설치"]
  ];
  const colX = [0.5, 3.20, 5.60];
  const colW = [2.65, 2.35, 3.90];
  const headers = ["증상", "원인", "해결"];
  headers.forEach((h, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: colX[i], y: 1.78, w: colW[i], h: 0.38,
      fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(h, {
      x: colX[i], y: 1.78, w: colW[i], h: 0.38,
      fontFace: FONT.h, fontSize: 12, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
  });
  rows.forEach((r, i) => {
    const y = 2.16 + i * 0.43;
    const bg = i % 2 === 0 ? COLOR.sand : COLOR.white;
    r.forEach((cell, j) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: colX[j], y, w: colW[j], h: 0.43,
        fill: { color: bg }, line: { color: COLOR.rule, width: 0.4 }
      });
      s.addText(cell, {
        x: colX[j] + 0.10, y, w: colW[j] - 0.20, h: 0.43,
        fontFace: j === 0 ? FONT.code : FONT.b,
        fontSize: j === 0 ? 10 : 10.5,
        color: COLOR.text, valign: "middle", margin: 0
      });
    });
  });
}

// =====================================================================
// SLIDE 10 — 마무리 + 다음 단계
// =====================================================================
{
  const p = nextNo();
  const s = pres.addSlide();
  s.background = { color: COLOR.navy };
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0.60, w: 10, h: 0.04, fill: { color: COLOR.amber }, line: { type: "none" }
  });
  s.addText("WRAP UP", {
    x: 0.5, y: 0.85, w: 9, h: 0.35,
    fontFace: FONT.b, fontSize: 11, color: COLOR.amber, bold: true, charSpacing: 4, margin: 0
  });
  s.addText("화면이 떴다면 시작 가이드 완료!", {
    x: 0.5, y: 1.20, w: 9, h: 0.7,
    fontFace: FONT.h, fontSize: 26, color: COLOR.white, bold: true, margin: 0
  });
  s.addText("이제 docs/Project0_실습교재.pptx 를 펴고 7STEP을 따라가세요.", {
    x: 0.5, y: 1.90, w: 9, h: 0.4,
    fontFace: FONT.b, fontSize: 14, color: COLOR.ice, margin: 0
  });

  const next = [
    ["STEP 1", "문제 정의 + 4W"],
    ["STEP 2", "사용자 + 화면 흐름"],
    ["STEP 3", "AI 콘텐츠 4개 프롬프트"],
    ["STEP 4", "이미지·영상 URL"],
    ["STEP 5", "Supabase 4 테이블"],
    ["STEP 6", "본인 데이터 입력"],
    ["STEP 7", "GitHub Push → Vercel"]
  ];
  const cellW = 1.21, gap = 0.05;
  next.forEach((n, i) => {
    const x = 0.5 + i * (cellW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.80, w: cellW, h: 1.40,
      fill: { color: "3A4A8A" }, line: { color: COLOR.amber, width: 0.75 }
    });
    s.addText(n[0], {
      x, y: 2.95, w: cellW, h: 0.30,
      fontFace: FONT.b, fontSize: 10, color: COLOR.amber, charSpacing: 3, bold: true,
      align: "center", margin: 0
    });
    s.addText(n[1], {
      x: x + 0.06, y: 3.30, w: cellW - 0.12, h: 0.82,
      fontFace: FONT.h, fontSize: 11, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
  });

  s.addText("막히는 단계가 있으면 강사에게 슬라이드 번호와 함께 질문하세요.", {
    x: 0.5, y: 4.40, w: 9.0, h: 0.40,
    fontFace: FONT.b, fontSize: 12, color: COLOR.ice, align: "center", italic: true, margin: 0
  });
  s.addText("AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정", {
    x: 0.5, y: 4.95, w: 9, h: 0.4,
    fontFace: FONT.b, fontSize: 11, color: COLOR.ice, align: "center", margin: 0
  });
  s.addText(String(no + 1).padStart(2, "0"), {
    x: 9.20, y: 4.95, w: 0.5, h: 0.4,
    fontFace: FONT.h, fontSize: 12, color: COLOR.ice, align: "right", margin: 0
  });
  no++;
}

// =====================================================================
// 저장
// =====================================================================
const out = path.join(__dirname, "학습자_시작가이드.pptx");
pres.writeFile({ fileName: out }).then(() => {
  console.log("OK:", out, "—", no, "slides");
});
