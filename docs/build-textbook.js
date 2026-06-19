// Project 0 — 자기소개 웹앱 실습 교재 (학습자용 워크북)
// 실행: node docs/build-textbook.js
// 출력: docs/Project0_실습교재.pptx

const pptxgen = require("pptxgenjs");
const path = require("path");

const COLOR = {
  navy: "1E2761",
  navySoft: "3A4A8A",
  ice: "CADCFC",
  amber: "F59E0B",
  amberSoft: "FEF3C7",
  green: "10B981",
  text: "1F2937",
  textMid: "475569",
  textMuted: "94A3B8",
  white: "FFFFFF",
  codeBg: "0F172A",
  codeText: "E2E8F0",
  codeAmber: "FBBF24",
  codeGreen: "86EFAC",
  rule: "E5E7EB",
  sand: "F8FAFC",
  redSoft: "FEE2E2",
  red: "DC2626"
};

const FONT = { h: "맑은 고딕", b: "맑은 고딕", code: "Consolas" };
const STEPS = ["문제정의", "사용자", "AI역할", "데이터", "설계", "MVP", "배포"];
const SHOTS = path.join(__dirname, "screenshots");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 × 5.625
pres.title = "Project 0 — 자기소개 웹앱 실습 교재";
pres.author = "AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정";

let slideNo = 0;

// =====================================================================
// 헬퍼
// =====================================================================
function nextNo() { return String(++slideNo).padStart(2, "0"); }

function chrome(slide, currentStep, no) {
  // 좌측 사이드바
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: COLOR.navy }, line: { type: "none" }
  });
  // 7STEP 진행 표시
  if (currentStep) {
    const cellW = 1.05;
    let x = 0.5;
    const y = 5.02;
    STEPS.forEach((label, i) => {
      const idx = i + 1;
      const active = idx === currentStep;
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: cellW, h: 0.22,
        fill: { color: active ? COLOR.navy : COLOR.sand },
        line: { color: active ? COLOR.navy : COLOR.rule, width: 0.5 },
        rectRadius: 0.03
      });
      slide.addText(`${idx}. ${label}`, {
        x, y, w: cellW, h: 0.22,
        fontFace: FONT.b, fontSize: 8,
        color: active ? COLOR.white : COLOR.textMid,
        bold: active, align: "center", valign: "middle", margin: 0
      });
      x += cellW + 0.06;
    });
  }
  // 푸터
  slide.addText("AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0 실습교재", {
    x: 0.5, y: 5.34, w: 9.0, h: 0.25,
    fontFace: FONT.b, fontSize: 8.5, color: COLOR.textMuted, margin: 0
  });
  // 페이지 번호 (우측)
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

function bullets(items, x, y, w, h, opts = {}) {
  return {
    text: items.map((t, i) => ({
      text: t,
      options: { bullet: { code: "25A0" }, breakLine: i < items.length - 1 }
    })),
    options: {
      x, y, w, h,
      fontFace: FONT.b,
      fontSize: opts.fontSize || 12,
      color: opts.color || COLOR.text,
      paraSpaceAfter: 3,
      margin: 0
    }
  };
}

function codeBlock(slide, x, y, w, h, lines, opts = {}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: COLOR.codeBg }, line: { type: "none" }
  });
  const runs = [];
  lines.forEach((ln, i) => {
    const obj = typeof ln === "string" ? { text: ln } : ln;
    runs.push({
      text: obj.text,
      options: { color: obj.color || COLOR.codeText, bold: !!obj.bold, breakLine: i < lines.length - 1 }
    });
  });
  slide.addText(runs, {
    x: x + 0.15, y: y + 0.10, w: w - 0.30, h: h - 0.20,
    fontFace: FONT.code, fontSize: opts.fontSize || 11, color: COLOR.codeText, margin: 0
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
    x: x + 0.20, y: y + 0.05, w: w - 0.30, h: 0.25,
    fontFace: FONT.b, fontSize: 9, color: COLOR.codeGreen, charSpacing: 3, bold: true, margin: 0
  });
  const runs = lines.map((ln, i) => {
    const obj = typeof ln === "string" ? { text: ln } : ln;
    return {
      text: obj.text,
      options: { color: obj.color || COLOR.codeText, breakLine: i < lines.length - 1 }
    };
  });
  slide.addText(runs, {
    x: x + 0.25, y: y + 0.32, w: w - 0.4, h: h - 0.42,
    fontFace: FONT.code, fontSize: 11, color: COLOR.codeText, margin: 0
  });
}

// 강사설명 / 실습 / 완료 기준 3분할 블록
function teachPracticeDone(slide, teach, practice, done, y) {
  const colW = 2.95, h = 1.95;
  const xs = [0.5, 3.55, 6.60];
  const titles = ["강사 설명", "실습", "완료 기준"];
  const accents = [COLOR.navy, COLOR.amber, COLOR.green];
  const contents = [teach, practice, done];
  for (let i = 0; i < 3; i++) {
    card(slide, xs[i], y, colW, h, { accent: accents[i] });
    slide.addText(titles[i], {
      x: xs[i] + 0.20, y: y + 0.10, w: colW - 0.3, h: 0.32,
      fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
    });
    const list = contents[i].map((t, j) => ({
      text: t,
      options: { bullet: { code: "25A0" }, breakLine: j < contents[i].length - 1 }
    }));
    slide.addText(list, {
      x: xs[i] + 0.20, y: y + 0.50, w: colW - 0.35, h: h - 0.60,
      fontFace: FONT.b, fontSize: 10.5, color: COLOR.text, paraSpaceAfter: 3, margin: 0
    });
  }
}

function notice(slide, x, y, w, text, type = "info") {
  const colors = {
    info:  { fill: COLOR.ice,      border: COLOR.navy,  text: COLOR.navy,  label: "참고" },
    warn:  { fill: COLOR.amberSoft, border: COLOR.amber, text: "92400E",   label: "주의" },
    danger:{ fill: COLOR.redSoft,   border: COLOR.red,   text: "991B1B",   label: "위험" }
  };
  const c = colors[type];
  const h = 0.40;
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

// =====================================================================
// SLIDE 01 — 표지
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  s.background = { color: COLOR.navy };
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.60, w: 10, h: 0.04, fill: { color: COLOR.amber }, line: { type: "none" }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.50, w: 0.5, h: 0.06,
    fill: { color: COLOR.amber }, line: { type: "none" }
  });
  s.addText("PROJECT 0 · 실습 교재", {
    x: 0.5, y: 0.62, w: 8, h: 0.4, fontFace: FONT.b, fontSize: 12,
    color: COLOR.ice, charSpacing: 6, bold: true, margin: 0
  });
  s.addText("자기소개 웹앱\n따라 만들기", {
    x: 0.5, y: 1.20, w: 9, h: 2.0,
    fontFace: FONT.h, fontSize: 44, color: COLOR.white, bold: true, lineSpacingMultiple: 1.05, margin: 0
  });
  s.addText("Next.js + Supabase + Vercel  /  비전공자 Step by Step", {
    x: 0.5, y: 3.30, w: 9, h: 0.5,
    fontFace: FONT.b, fontSize: 16, color: COLOR.ice, margin: 0
  });
  s.addText("이 교재는 학습자가 직접 따라 만들 수 있는 워크북입니다.\n각 슬라이드에 '강사 설명 / 실습 / 완료 기준' 이 함께 들어있습니다.", {
    x: 0.5, y: 3.85, w: 9, h: 0.8,
    fontFace: FONT.b, fontSize: 12, color: COLOR.ice, lineSpacingMultiple: 1.4, margin: 0
  });
  s.addText("AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정", {
    x: 0.5, y: 4.85, w: 9, h: 0.4,
    fontFace: FONT.b, fontSize: 11, color: COLOR.ice, margin: 0
  });
  s.addText(no, {
    x: 9.20, y: 4.85, w: 0.5, h: 0.4,
    fontFace: FONT.h, fontSize: 12, color: COLOR.ice, align: "right", margin: 0
  });
}

// =====================================================================
// SLIDE 02 — 오늘 만들 최종 결과물 (실제 스크린샷)
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, null, no);
  header(s, "INTRO", "오늘 만들 최종 결과물", "실제로 이렇게 생긴 웹앱을 8시간 안에 만듭니다.");

  // 좌측: 데스크탑 스크린샷
  s.addImage({
    path: path.join(SHOTS, "home-desktop.png"),
    x: 0.55, y: 1.65, w: 4.30, h: 2.95,
    sizing: { type: "contain", w: 4.30, h: 2.95 }
  });
  s.addText("데스크탑 화면 (/ 메인)", {
    x: 0.55, y: 4.65, w: 4.3, h: 0.25,
    fontFace: FONT.b, fontSize: 10.5, color: COLOR.textMid, align: "center", italic: true, margin: 0
  });

  // 우측: 모바일 스크린샷
  s.addImage({
    path: path.join(SHOTS, "home-mobile.png"),
    x: 5.20, y: 1.65, w: 1.80, h: 2.95,
    sizing: { type: "contain", w: 1.80, h: 2.95 }
  });
  s.addText("모바일", {
    x: 5.20, y: 4.65, w: 1.80, h: 0.25,
    fontFace: FONT.b, fontSize: 10.5, color: COLOR.textMid, align: "center", italic: true, margin: 0
  });

  // 우측: 관리자 화면
  s.addImage({
    path: path.join(SHOTS, "admin-login.png"),
    x: 7.20, y: 1.65, w: 2.40, h: 1.40,
    sizing: { type: "contain", w: 2.40, h: 1.40 }
  });
  s.addText("관리자 (/admin)", {
    x: 7.20, y: 3.10, w: 2.40, h: 0.25,
    fontFace: FONT.b, fontSize: 9.5, color: COLOR.textMid, align: "center", italic: true, margin: 0
  });

  // 핵심 메시지
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.20, y: 3.50, w: 2.40, h: 1.10, fill: { color: COLOR.ice }, line: { type: "none" }
  });
  s.addText("핵심 경험\n\n· AI 콘텐츠 검수\n· DB → 화면 연결\n· 배포 URL 공유", {
    x: 7.30, y: 3.58, w: 2.20, h: 0.95,
    fontFace: FONT.b, fontSize: 10, color: COLOR.navy, lineSpacingMultiple: 1.3, margin: 0
  });
}

// =====================================================================
// SLIDE 03 — 사전 준비물
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, null, no);
  header(s, "PREP", "사전 준비물 체크", "계정과 자료가 준비되면 실습 속도가 빨라집니다.");

  // 좌측: 필수
  card(s, 0.5, 1.75, 4.45, 3.0, { accent: COLOR.navy });
  s.addText("필수 준비 (반드시)", {
    x: 0.75, y: 1.85, w: 4.0, h: 0.35,
    fontFace: FONT.h, fontSize: 14, color: COLOR.navy, bold: true, margin: 0
  });
  const must = bullets([
    "본인 이력서 또는 경력 메모",
    "Node.js 18+ 설치 (nodejs.org)",
    "GitHub 계정",
    "Supabase 계정 (supabase.com)",
    "Vercel 계정 (vercel.com)",
    "생성형 AI 계정 (ChatGPT / Claude)",
    "VS Code 또는 코드 에디터"
  ], 0.78, 2.25, 4.0, 2.40, { fontSize: 11.5 });
  s.addText(must.text, must.options);

  // 우측: 선택
  card(s, 5.05, 1.75, 4.45, 3.0, { accent: COLOR.amber });
  s.addText("선택 준비 (있으면 좋음)", {
    x: 5.30, y: 1.85, w: 4.0, h: 0.35,
    fontFace: FONT.h, fontSize: 14, color: COLOR.navy, bold: true, margin: 0
  });
  const opt = bullets([
    "프로필 사진 또는 대체 이미지",
    "30초 자기소개 영상용 스마트폰",
    "포트폴리오에 넣을 프로젝트 이미지",
    "도메인 이름 (선택)"
  ], 5.33, 2.25, 4.0, 1.5, { fontSize: 11.5 });
  s.addText(opt.text, opt.options);

  notice(s, 0.5, 4.50, 9.0,
    "주민번호 · 상세 주소 · 회사 내부자료는 웹앱에 절대 올리지 않습니다.",
    "warn"
  );
}

// =====================================================================
// SLIDE 04 — 8시간 시간표
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, null, no);
  header(s, "SCHEDULE", "8시간 실습 시간표", "오전은 콘텐츠 생성, 오후는 DB·웹앱·배포 중심.");

  const rows = [
    ["1교시", "09:00–10:00", "Step 1~2", "문제·사용자 정의 / 4W 작성"],
    ["2교시", "10:00–11:00", "Step 3",   "AI로 한 줄 소개·About·Skills·FAQ"],
    ["3교시", "11:00–12:00", "Step 4",   "이미지 생성 + 30초 영상 + URL 확보"],
    ["점심",  "12:00–13:00", "—",        "—"],
    ["4교시", "13:00–14:00", "Step 5",   "Supabase 4 테이블 / 샘플 데이터"],
    ["5교시", "14:00–15:00", "Step 6-①", "Next.js 프로젝트 / Hero·About"],
    ["6교시", "15:00–16:00", "Step 6-②", "Skills·Projects·Media DB 연결"],
    ["7교시", "16:00–17:00", "Step 7-①", "모바일 점검 / GitHub Push / Vercel"],
    ["8교시", "17:00–18:00", "Step 7-②", "검수 / 3분 발표 / 개선 계획"]
  ];
  // 헤더
  const colX = [0.5, 1.45, 3.05, 4.30];
  const colW = [0.95, 1.60, 1.25, 5.20];
  const head = ["교시", "시간", "단계", "활동"];
  head.forEach((h, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: colX[i], y: 1.72, w: colW[i], h: 0.32,
      fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(h, {
      x: colX[i], y: 1.72, w: colW[i], h: 0.32,
      fontFace: FONT.h, fontSize: 11, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
  });
  rows.forEach((r, i) => {
    const y = 2.04 + i * 0.32;
    const isLunch = r[0] === "점심";
    const bg = isLunch ? COLOR.amberSoft : (i % 2 === 0 ? COLOR.sand : COLOR.white);
    r.forEach((cell, j) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: colX[j], y, w: colW[j], h: 0.32,
        fill: { color: bg }, line: { color: COLOR.rule, width: 0.4 }
      });
      s.addText(cell, {
        x: colX[j] + 0.08, y, w: colW[j] - 0.16, h: 0.32,
        fontFace: FONT.b, fontSize: 10.5, color: COLOR.text,
        align: j < 3 ? "center" : "left", valign: "middle", margin: 0
      });
    });
  });
}

// =====================================================================
// SLIDE 05 — 전체 아키텍처
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, null, no);
  header(s, "ARCHITECTURE", "전체 구조 한 장 요약", "사용자가 보는 것은 화면이고, 화면의 내용은 DB에서 옵니다.");

  const boxes = [
    { label: "브라우저",  sub: "Next.js 화면\n(/ 와 /admin)",   color: COLOR.navy },
    { label: "Vercel",   sub: "Next.js 서버\n환경변수 보관",     color: COLOR.navySoft },
    { label: "Supabase", sub: "DB · Storage\n(4개 테이블)",   color: COLOR.amber }
  ];
  const sX = 0.7, boxW = 2.7, boxH = 2.0, gap = 0.45;
  boxes.forEach((b, i) => {
    const x = sX + i * (boxW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.95, w: boxW, h: boxH,
      fill: { color: COLOR.white }, line: { color: b.color, width: 2.5 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.95, w: boxW, h: 0.45, fill: { color: b.color }, line: { type: "none" }
    });
    s.addText(b.label, {
      x, y: 1.95, w: boxW, h: 0.45,
      fontFace: FONT.h, fontSize: 16, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    s.addText(b.sub, {
      x: x + 0.1, y: 2.50, w: boxW - 0.2, h: 1.4,
      fontFace: FONT.b, fontSize: 13, color: COLOR.text, align: "center", valign: "middle", margin: 0
    });
    if (i < boxes.length - 1) {
      const ax = x + boxW;
      s.addShape(pres.shapes.LINE, {
        x: ax + 0.04, y: 2.95, w: gap - 0.08, h: 0,
        line: { color: COLOR.textMid, width: 1.5, endArrowType: "triangle" }
      });
    }
  });
  notice(s, 0.5, 4.25, 9.0,
    "API Key 는 코드에 직접 쓰지 않습니다 — 환경변수(.env.local) → Vercel 에 별도 입력.",
    "info"
  );
}

// =====================================================================
// SLIDE 06 — 7STEP 사이클
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, null, no);
  header(s, "CYCLE", "프로젝트 사이클 7STEP", "이후 6개 프로젝트의 공통 골격이 됩니다.");

  const cellW = 1.21, cellH = 1.6;
  const startX = 0.5, startY = 1.85;
  const stepDesc = [
    ["문제 정의", "자기소개를\n한 URL로"],
    ["사용자", "페르소나\n화면 흐름"],
    ["AI 역할", "콘텐츠 초안\n검수"],
    ["데이터", "이미지·영상\nURL 확보"],
    ["설계", "DB 테이블\n화면 매핑"],
    ["MVP", "Next.js\n6 섹션"],
    ["배포", "GitHub →\nVercel"]
  ];
  stepDesc.forEach((d, i) => {
    const x = startX + i * (cellW + 0.05);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cellW, h: 0.45,
      fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(`STEP ${i + 1}`, {
      x, y: startY, w: cellW, h: 0.45,
      fontFace: FONT.b, fontSize: 10, color: COLOR.ice, charSpacing: 3, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY + 0.45, w: cellW, h: cellH - 0.45,
      fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.5 }
    });
    s.addText(d[0], {
      x, y: startY + 0.50, w: cellW, h: 0.4,
      fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true,
      align: "center", margin: 0
    });
    s.addText(d[1], {
      x: x + 0.1, y: startY + 0.92, w: cellW - 0.2, h: cellH - 0.95,
      fontFace: FONT.b, fontSize: 10.5, color: COLOR.textMid,
      align: "center", margin: 0
    });
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.15, w: 9.0, h: 0.55, fill: { color: COLOR.ice }, line: { type: "none" }
  });
  s.addText("AI 앱 = 아이디어 + 데이터 + 화면 + 배포가 연결될 때 완성됩니다.", {
    x: 0.5, y: 4.15, w: 9.0, h: 0.55,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true,
    align: "center", valign: "middle", margin: 0
  });
}

// =====================================================================
// SLIDE 07 — STEP 1: 문제 정의 (TPD)
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 1, no);
  header(s, "STEP 1", "문제 정의 — 무엇을 해결할까?", "기술보다 '왜' 가 먼저입니다.");

  teachPracticeDone(s,
    ["문제는 기술보다 먼저 정한다",
     "'멋진 사이트'보다 '누가 왜 보는가'",
     "한 문장으로 정리되면 다음 단계 진행"],
    ["내 소개 자료가 흩어진 상황 인식",
     "웹앱으로 보여줄 나의 이미지 정리",
     "문제 정의 문장 1개 작성"],
    ["문제 정의 한 문장 완성",
     "강사 또는 옆 사람에게 5초 안에 설명 가능",
     "다음 슬라이드 4W로 확장 가능"],
    1.80
  );
  notice(s, 0.5, 3.90, 9.0,
    "예시: 흩어진 자기소개 자료를 채용담당자가 한 URL로 볼 수 있게 만든다.",
    "info"
  );
}

// =====================================================================
// SLIDE 08 — STEP 1 워크시트: 4W
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 1, no);
  header(s, "STEP 1 · WORKSHEET", "4W로 목적 정리하기", "Who · What · Where · Why 를 채워보세요.");

  const cards = [
    ["Who",   "누가 볼 것인가?",   "예: 채용담당자, 팀원, 강사"],
    ["What",  "무엇을 보여줄 것인가?", "예: 역량, 프로젝트, 성장 과정"],
    ["Where", "어디서 사용할 것인가?", "예: 수업 제출, 면접, 포트폴리오"],
    ["Why",   "왜 필요한가?",      "예: 나를 짧고 정확하게 소개"]
  ];
  cards.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.5 + col * 4.60, y = 1.75 + row * 1.35;
    card(s, x, y, 4.45, 1.20, { accent: COLOR.amber });
    s.addText(c[0], {
      x: x + 0.20, y: y + 0.08, w: 1.0, h: 0.35,
      fontFace: FONT.h, fontSize: 18, color: COLOR.amber, bold: true, margin: 0
    });
    s.addText(c[1], {
      x: x + 0.20, y: y + 0.42, w: 4.0, h: 0.30,
      fontFace: FONT.h, fontSize: 12, color: COLOR.navy, bold: true, margin: 0
    });
    s.addText(c[2], {
      x: x + 0.20, y: y + 0.75, w: 4.0, h: 0.40,
      fontFace: FONT.b, fontSize: 10.5, color: COLOR.textMid, italic: true, margin: 0
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.50, w: 9.0, h: 0.40, fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.5 }
  });
  s.addText([
    { text: "나는 ", options: {} },
    { text: "[누가]", options: { color: COLOR.amber, bold: true } },
    { text: " 볼 수 있도록, ", options: {} },
    { text: "[핵심 강점]", options: { color: COLOR.amber, bold: true } },
    { text: "과 ", options: {} },
    { text: "[대표 경험]", options: { color: COLOR.amber, bold: true } },
    { text: "을 한눈에 보여주는 자기소개 웹앱을 만든다.", options: {} }
  ], {
    x: 0.65, y: 4.50, w: 8.7, h: 0.40,
    fontFace: FONT.b, fontSize: 11.5, color: COLOR.text, valign: "middle", margin: 0
  });
}

// =====================================================================
// SLIDE 09 — STEP 2: 사용자 정의
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 2, no);
  header(s, "STEP 2", "사용자 정의 — 누가 볼까?", "사용자를 정해야 화면 순서와 문구가 달라집니다.");

  teachPracticeDone(s,
    ["3가지 대표 사용자 예시 검토",
     "사용자에 따라 강조점이 달라짐",
     "1명을 선택하면 모든 결정의 기준이 된다"],
    ["대표 사용자 1명 선택",
     "그 사람이 가장 궁금해할 질문 3개 작성",
     "Hero에 들어갈 첫인상 한 문장 정의"],
    ["페르소나 1명 + 질문 3개 완성",
     "본인이 1분 안에 설명 가능"],
    1.80
  );

  const personas = [
    ["채용담당자", "짧고 검증 가능한 경력"],
    ["팀원",      "협업 가능성 / 역할"],
    ["강사·멘토", "학습 성과 / 성장"]
  ];
  personas.forEach((p, i) => {
    const x = 0.5 + i * 3.10;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 4.05, w: 2.95, h: 0.65, fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.5 }
    });
    s.addText(p[0], {
      x: x + 0.15, y: 4.08, w: 2.65, h: 0.30,
      fontFace: FONT.h, fontSize: 12, color: COLOR.navy, bold: true, margin: 0
    });
    s.addText(p[1], {
      x: x + 0.15, y: 4.38, w: 2.65, h: 0.27,
      fontFace: FONT.b, fontSize: 10.5, color: COLOR.textMid, margin: 0
    });
  });
}

// =====================================================================
// SLIDE 10 — STEP 2: 화면 흐름 + MVP
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 2, no);
  header(s, "STEP 2", "화면 흐름 + MVP 범위", "8시간에는 '작동하는 최소 기능' 에 집중합니다.");

  // 화면 흐름
  s.addText("방문자 행동 흐름 (6 섹션)", {
    x: 0.5, y: 1.75, w: 9, h: 0.32,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  const flow = ["Hero", "About", "Skills", "Projects", "Media", "Contact"];
  flow.forEach((f, i) => {
    const x = 0.5 + i * 1.55;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 2.10, w: 1.40, h: 0.55,
      fill: { color: COLOR.ice }, line: { color: COLOR.navy, width: 1 }, rectRadius: 0.06
    });
    s.addText(f, {
      x, y: 2.10, w: 1.40, h: 0.55,
      fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    if (i < flow.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: x + 1.42, y: 2.37, w: 0.10, h: 0,
        line: { color: COLOR.textMid, width: 1, endArrowType: "triangle" }
      });
    }
  });

  // Must / Won't
  card(s, 0.5, 3.00, 4.45, 1.85, { accent: COLOR.green });
  s.addText("Must — 반드시 구현", {
    x: 0.75, y: 3.10, w: 4.0, h: 0.30,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  const must = bullets([
    "이름 · 한 줄 소개 · 자기소개 문단",
    "핵심 역량 4~6개",
    "이미지 또는 영상 1개 이상",
    "배포 URL"
  ], 0.78, 3.45, 4.0, 1.30, { fontSize: 10.5 });
  s.addText(must.text, must.options);

  card(s, 5.05, 3.00, 4.45, 1.85, { accent: COLOR.red });
  s.addText("Won't — 오늘 제외", {
    x: 5.30, y: 3.10, w: 4.0, h: 0.30,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  const wont = bullets([
    "로그인 · 회원가입",
    "결제 기능",
    "실시간 AI 챗봇 API 연동",
    "복잡한 관리자 페이지 (간단 admin은 BONUS 단계에서)"
  ], 5.33, 3.45, 4.0, 1.30, { fontSize: 10.5 });
  s.addText(wont.text, wont.options);
}

// =====================================================================
// SLIDE 11 — STEP 3: AI 역할
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 3, no);
  header(s, "STEP 3", "AI는 무엇을 도와줄까?", "AI는 '대신 완성'하는 도구가 아니라 초안과 구조를 돕는 도구입니다.");

  teachPracticeDone(s,
    ["이력서 요약 / 문장 다듬기",
     "핵심 역량 키워드 추출",
     "이미지·영상 프롬프트 작성"],
    ["다음 4장의 프롬프트를 차례로 실행",
     "결과를 본인 말투로 다시 쓰기",
     "사실과 다른 내용 삭제"],
    ["한 줄 소개 / About / Skills / FAQ 초안 완성",
     "검수 후 본인이 100% 설명 가능"],
    1.80
  );

  notice(s, 0.5, 3.90, 9.0,
    "검수 원칙 — '최고, 완벽, 전문가' 같은 과장 표현은 줄이고, 타인이 봐도 이해되는 문장으로 다듬습니다.",
    "warn"
  );
}

// =====================================================================
// SLIDE 12 — STEP 3 프롬프트 1: 한 줄 소개
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 3, no);
  header(s, "STEP 3 · PROMPT 1", "한 줄 소개 만들기", "첫 화면 Hero에 들어갈 30자 내외 문장.");

  codeBlock(s, 0.5, 1.75, 9.0, 2.40, [
    { text: "# 프롬프트", color: COLOR.codeGreen },
    { text: "다음 이력서 내용을 바탕으로 자기소개 웹앱 첫 화면에 들어갈" },
    { text: "한 줄 소개를 5개 제안해 줘." },
    { text: "" },
    { text: "조건:" },
    { text: "1) 과장하지 말 것" },
    { text: "2) 비전공자도 이해하기 쉽게 쓸 것" },
    { text: "3) '무엇을 잘하는 사람인지' 드러낼 것" },
    { text: "4) 30자 내외로 짧게 쓸 것" },
    { text: "" },
    { text: "이력서 내용:", color: COLOR.codeAmber },
    { text: "[여기에 내 이력서 또는 경력 메모 붙여넣기]", color: COLOR.codeAmber }
  ]);
  notice(s, 0.5, 4.30, 9.0,
    "실습 — AI가 만든 5개 중 1개를 고르고 본인 말투로 수정 → DB profiles.headline 에 저장",
    "info"
  );
}

// =====================================================================
// SLIDE 13 — STEP 3 프롬프트 2: About
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 3, no);
  header(s, "STEP 3 · PROMPT 2", "About 문단 만들기", "About 섹션은 3~5문장으로 간결하게.");

  codeBlock(s, 0.5, 1.75, 9.0, 2.50, [
    { text: "# 프롬프트", color: COLOR.codeGreen },
    { text: "아래 정보를 바탕으로 About 섹션에 넣을 4문장 자기소개를 작성해 줘." },
    { text: "" },
    { text: "포함할 내용:", color: COLOR.codeAmber },
    { text: "- 현재 관심 분야" },
    { text: "- 내가 잘하는 일" },
    { text: "- 대표 경험 또는 학습 경험" },
    { text: "- 앞으로 만들고 싶은 AI 앱" },
    { text: "" },
    { text: "조건: 사실 기반 / 친근하지만 전문적 / 문장은 짧게" }
  ]);
  notice(s, 0.5, 4.40, 9.0,
    "완료 기준 — 문단을 읽었을 때 '내가 누구인지' 바로 이해되어야 합니다.",
    "info"
  );
}

// =====================================================================
// SLIDE 14 — STEP 3 프롬프트 3·4: Skills + FAQ
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 3, no);
  header(s, "STEP 3 · PROMPT 3·4", "Skills 카드 + FAQ", "기술명보다 '할 수 있는 일' 중심으로.");

  // 좌측: Skills 프롬프트
  s.addText("PROMPT 3 — Skills 6개", {
    x: 0.5, y: 1.75, w: 4.5, h: 0.30,
    fontFace: FONT.h, fontSize: 12, color: COLOR.navy, bold: true, margin: 0
  });
  codeBlock(s, 0.5, 2.05, 4.45, 2.60, [
    { text: "내 이력서를 바탕으로", color: COLOR.codeGreen },
    { text: "Skills 카드 6개를 만들어 줘." },
    { text: "" },
    { text: "각 카드는:" },
    { text: "- 역량명 (짧게)" },
    { text: "- 한 문장 설명" },
    { text: "- 숙련도: 학습 중 / 가능 / 능숙" },
    { text: "" },
    { text: "기술명보다 '할 수 있는 일'", color: COLOR.codeAmber },
    { text: "중심으로 작성.", color: COLOR.codeAmber }
  ], { fontSize: 10.5 });

  // 우측: FAQ 프롬프트
  s.addText("PROMPT 4 — FAQ 5개", {
    x: 5.05, y: 1.75, w: 4.5, h: 0.30,
    fontFace: FONT.h, fontSize: 12, color: COLOR.navy, bold: true, margin: 0
  });
  codeBlock(s, 5.05, 2.05, 4.45, 2.60, [
    { text: "방문자가 궁금해할 질문 예시:", color: COLOR.codeGreen },
    { text: "- 어떤 일을 잘하나요?" },
    { text: "- 어떤 도구를 사용할 수 있나요?" },
    { text: "- 어떤 프로젝트를 만들고 싶나요?" },
    { text: "- 협업할 때 강점은?" },
    { text: "" },
    { text: "위 형식으로 FAQ 5개를 만들어 줘." },
    { text: "답변은 2문장 이내.", color: COLOR.codeAmber }
  ], { fontSize: 10.5 });
}

// =====================================================================
// SLIDE 15 — STEP 4: 미디어 준비
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 4, no);
  header(s, "STEP 4", "이미지 · 영상 준비", "웹앱의 첫인상을 만드는 콘텐츠.");

  teachPracticeDone(s,
    ["Hero 대표 이미지 1장",
     "프로필 이미지 1장",
     "프로젝트 카드용 이미지 1~2장",
     "30초 자기소개 영상 1개"],
    ["AI 이미지 생성 도구로 깨끗한 이미지 만들기",
     "스마트폰으로 30초 영상 녹화",
     "YouTube에 '일부공개' 로 업로드 → URL 확보"],
    ["이미지 URL 2개 이상 확보",
     "영상 URL 1개 (선택)",
     "DB media 테이블에 입력 준비 완료"],
    1.80
  );

  notice(s, 0.5, 3.90, 9.0,
    "DB 에는 파일이 아니라 'URL'만 저장합니다. 큰 파일 직접 업로드는 피하세요.",
    "warn"
  );
}

// =====================================================================
// SLIDE 16 — STEP 5: DB 4 테이블
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 5, no);
  header(s, "STEP 5", "DB 4 테이블 한 장 요약", "처음에는 복잡한 관계 대신 단순 4 테이블로 시작.");

  const tables = [
    ["profiles", "name\nheadline\nsummary\nemail", "1행 (나)"],
    ["skills",   "skill_name\nskill_desc\nlevel",   "여러 행"],
    ["projects", "title\ndescription\nimage_url\ndemo_url", "여러 행"],
    ["media",    "image_url\nvideo_url\ncaption",   "여러 행"]
  ];
  const cellW = 2.18, cellH = 2.45;
  tables.forEach((t, i) => {
    const x = 0.5 + i * (cellW + 0.10), y = 1.80;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cellW, h: 0.46, fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(t[0], {
      x, y, w: cellW, h: 0.46,
      fontFace: FONT.code, fontSize: 14, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: y + 0.46, w: cellW, h: cellH - 0.80,
      fill: { color: COLOR.white }, line: { color: COLOR.rule, width: 0.75 }
    });
    s.addText(t[1], {
      x: x + 0.18, y: y + 0.55, w: cellW - 0.36, h: cellH - 0.95,
      fontFace: FONT.code, fontSize: 11.5, color: COLOR.text,
      lineSpacingMultiple: 1.35, margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: y + cellH - 0.34, w: cellW, h: 0.34,
      fill: { color: COLOR.sand }, line: { type: "none" }
    });
    s.addText(t[2], {
      x, y: y + cellH - 0.34, w: cellW, h: 0.34,
      fontFace: FONT.b, fontSize: 10.5, color: COLOR.textMid,
      align: "center", valign: "middle", margin: 0
    });
  });

  notice(s, 0.5, 4.50, 9.0,
    "저장 원칙 — 이미지·영상은 파일이 아니라 URL만 저장 (Storage 와 분리).",
    "info"
  );
}

// =====================================================================
// SLIDE 17 — STEP 5: Supabase 프로젝트 만들기 (따라하기)
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 5, no);
  header(s, "STEP 5 · DO", "Supabase 프로젝트 만들기", "5분이면 첫 번째 테이블까지 만들 수 있습니다.");

  const steps = [
    "supabase.com 가입 → New Project",
    "이름과 DB 비밀번호 입력 (메모해 두기)",
    "리전(서울/도쿄) 선택 → Create",
    "좌측 SQL Editor 클릭",
    "본 교재의 schema.sql 통째로 붙여넣기 → Run",
    "좌측 Table Editor → 4 테이블 확인"
  ];
  steps.forEach((t, i) => {
    const y = 1.80 + i * 0.43;
    s.addShape(pres.shapes.OVAL, {
      x: 0.5, y: y + 0.04, w: 0.36, h: 0.36,
      fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(String(i + 1), {
      x: 0.5, y: y + 0.04, w: 0.36, h: 0.36,
      fontFace: FONT.h, fontSize: 12, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.0, y, w: 8.5, h: 0.40, fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.4 }
    });
    s.addText(t, {
      x: 1.18, y, w: 8.2, h: 0.40,
      fontFace: FONT.b, fontSize: 11.5, color: COLOR.text, valign: "middle", margin: 0
    });
  });

  notice(s, 0.5, 4.55, 9.0,
    "Project Settings → API 에서 Project URL 과 anon public 키를 복사해 두세요.",
    "info"
  );
}

// =====================================================================
// SLIDE 18 — STEP 5 코드: schema.sql
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 5, no);
  header(s, "STEP 5 · CODE", "schema.sql — 통째로 Run", "테이블 + RLS 정책 + 샘플 데이터를 한 번에 생성.");

  codeBlock(s, 0.5, 1.70, 9.0, 2.80, [
    { text: "-- 1) profiles : 나의 기본 정보 (한 사람당 1행)", color: COLOR.codeGreen },
    { text: "create table profiles (" },
    { text: "  id uuid primary key default gen_random_uuid()," },
    { text: "  name text, headline text, summary text, email text" },
    { text: ");" },
    { text: "" },
    { text: "-- 2) skills / 3) projects / 4) media 도 동일 패턴", color: COLOR.codeGreen },
    { text: "" },
    { text: "-- RLS: 누구나 읽기만, 쓰기는 Dashboard 에서만", color: COLOR.codeGreen },
    { text: "alter table profiles enable row level security;" },
    { text: "create policy \"public read profiles\" on profiles for select using (true);" }
  ]);
  s.addText("샘플 데이터(insert)도 schema.sql 끝부분에 포함 → 별도 입력 불필요", {
    x: 0.5, y: 4.58, w: 9.0, h: 0.30,
    fontFace: FONT.b, fontSize: 11, color: COLOR.textMid, italic: true, margin: 0
  });
}

// =====================================================================
// SLIDE 19 — STEP 6: 폴더 구조
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 6, no);
  header(s, "STEP 6", "프로젝트 폴더 구조", "파일 이름과 역할부터 익숙해지면 됩니다.");

  const rows = [
    ["app/page.tsx",            "첫 화면 — DB 조회 후 6개 섹션 조립"],
    ["app/layout.tsx",          "공통 레이아웃 / 푸터 / 한글 lang"],
    ["app/admin/page.tsx",      "관리자 페이지 — 비밀번호 + 4개 폼"],
    ["app/api/admin/route.ts",  "서버 API — 비밀번호 검증 + DB 쓰기"],
    ["components/*.tsx",        "Hero·About·Skills·Projects·Media·Contact"],
    ["lib/supabase.ts",         "DB 클라이언트 (anon key, 읽기 전용)"],
    ["lib/supabase-admin.ts",   "서버 전용 (service_role, RLS 우회)"],
    ["lib/mock-data.ts",        "데모 모드용 샘플 데이터"],
    ["lib/types.ts",            "DB 4 테이블의 TypeScript 타입"],
    ["supabase/schema.sql",     "테이블 + RLS + 샘플 데이터"],
    [".env.local",              "API Key 보관 — GitHub 금지!"]
  ];
  rows.forEach((r, i) => {
    const y = 1.78 + i * 0.275;
    s.addText(r[0], {
      x: 0.55, y, w: 3.5, h: 0.26,
      fontFace: FONT.code, fontSize: 11, color: COLOR.navy, bold: true, margin: 0
    });
    s.addText(r[1], {
      x: 4.10, y, w: 5.4, h: 0.26,
      fontFace: FONT.b, fontSize: 11, color: COLOR.textMid, margin: 0
    });
  });
}

// =====================================================================
// SLIDE 20 — STEP 6: 코드 받기 + 설치
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 6, no);
  header(s, "STEP 6 · DO", "코드 받기 → 설치 → 실행", "3개 명령어로 로컬 서버를 띄웁니다.");

  shellBlock(s, 0.5, 1.75, 9.0, 2.50, [
    { text: "# 1) 강사가 제공한 zip 압축 풀기 또는 GitHub 에서 clone", color: COLOR.codeGreen },
    { text: "git clone <repo-url> my-intro-app" },
    { text: "cd my-intro-app" },
    { text: "" },
    { text: "# 2) 의존성 설치 (1~2분)", color: COLOR.codeGreen },
    { text: "npm install" },
    { text: "" },
    { text: "# 3) 환경변수 파일 만들기 (다음 슬라이드 참고)", color: COLOR.codeGreen },
    { text: "cp .env.local.example .env.local" },
    { text: "" },
    { text: "# 4) 개발 서버 실행 → http://localhost:3000", color: COLOR.codeGreen },
    { text: "npm run dev" }
  ]);
  notice(s, 0.5, 4.40, 9.0,
    "env가 아직 없어도 데모 모드(샘플 데이터)로 화면이 뜹니다 — 멈추지 말고 진행.",
    "info"
  );
}

// =====================================================================
// SLIDE 21 — STEP 6: .env.local 설정
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 6, no);
  header(s, "STEP 6 · CONFIG", ".env.local — API Key 안전 보관", "절대 코드에 직접 쓰지 않고, GitHub 에 올리지 않는다.");

  codeBlock(s, 0.5, 1.70, 9.0, 1.95, [
    { text: "# 공개 키 (브라우저 노출 OK · RLS public read 로 보호)", color: COLOR.codeGreen },
    { text: "NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co" },
    { text: "NEXT_PUBLIC_SUPABASE_ANON_KEY=...                    # anon public" },
    { text: "" },
    { text: "# 서버 전용 (절대 NEXT_PUBLIC_ 접두사 X)", color: COLOR.codeAmber },
    { text: "ADMIN_PASSWORD=myproject1234                          # 본인이 정함" },
    { text: "SUPABASE_SERVICE_ROLE_KEY=...                         # service_role" }
  ]);
  notice(s, 0.5, 3.80, 9.0,
    "service_role 키는 RLS 를 우회합니다. 절대 외부 공유 금지 — 발견 즉시 재발급.",
    "danger"
  );
  notice(s, 0.5, 4.30, 9.0,
    ".gitignore 에 .env.local 이 이미 등록되어 있습니다 → git status 에 보이지 않아야 정상.",
    "info"
  );
}

// =====================================================================
// SLIDE 22 — STEP 6: 실행 결과 (실제 화면)
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 6, no);
  header(s, "STEP 6 · RESULT", "npm run dev — 실제 화면 확인", "이렇게 보이면 1차 성공입니다.");

  s.addImage({
    path: path.join(SHOTS, "home-full.png"),
    x: 0.55, y: 1.65, w: 2.20, h: 2.85,
    sizing: { type: "contain", w: 2.20, h: 2.85 }
  });
  s.addText("전체 페이지 (스크롤)", {
    x: 0.55, y: 4.55, w: 2.20, h: 0.22,
    fontFace: FONT.b, fontSize: 9.5, color: COLOR.textMid, align: "center", italic: true, margin: 0
  });

  // 우측: 섹션 매핑
  s.addText("6개 섹션 × DB 테이블 매핑", {
    x: 3.10, y: 1.70, w: 6.4, h: 0.32,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  const rows = [
    ["Hero",     "profiles.name / headline + media.image_url"],
    ["About",    "profiles.summary"],
    ["Skills",   "skills (모든 행)"],
    ["Projects", "projects (모든 행)"],
    ["Media",    "media (YouTube URL 자동 임베드)"],
    ["Contact",  "profiles.email"]
  ];
  rows.forEach((r, i) => {
    const y = 2.10 + i * 0.43;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 3.10, y, w: 1.50, h: 0.35,
      fill: { color: COLOR.navy }, line: { type: "none" }, rectRadius: 0.04
    });
    s.addText(r[0], {
      x: 3.10, y, w: 1.50, h: 0.35,
      fontFace: FONT.code, fontSize: 11, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: 4.65, y: y + 0.175, w: 0.30, h: 0,
      line: { color: COLOR.amber, width: 1.2, endArrowType: "triangle" }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.0, y, w: 4.45, h: 0.35,
      fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.4 }
    });
    s.addText(r[1], {
      x: 5.12, y, w: 4.30, h: 0.35,
      fontFace: FONT.code, fontSize: 10.5, color: COLOR.text, valign: "middle", margin: 0
    });
  });
}

// =====================================================================
// SLIDE 23 — STEP 6: 데모 모드 vs 실데이터 모드
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 6, no);
  header(s, "STEP 6 · TIP", "데모 모드 vs 실데이터 모드", "환경변수가 없어도 앱이 동작합니다.");

  // 좌측: 데모 모드
  card(s, 0.5, 1.75, 4.45, 3.0, { accent: COLOR.amber });
  s.addText("DEMO MODE (env 없음)", {
    x: 0.75, y: 1.85, w: 4.0, h: 0.35,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  const dm = bullets([
    "상단에 노란 'DEMO MODE' 배너 표시",
    "lib/mock-data.ts 의 샘플 데이터 사용",
    "강의 시연이나 첫 점검에 유용",
    "Supabase 미접속 — 인터넷 끊겨도 동작"
  ], 0.78, 2.25, 4.0, 1.95, { fontSize: 11 });
  s.addText(dm.text, dm.options);
  s.addText("isDemoMode = true", {
    x: 0.78, y: 4.30, w: 4.0, h: 0.30,
    fontFace: FONT.code, fontSize: 11, color: COLOR.amber, bold: true, margin: 0
  });

  // 우측: 실데이터 모드
  card(s, 5.05, 1.75, 4.45, 3.0, { accent: COLOR.green });
  s.addText("LIVE MODE (env 있음)", {
    x: 5.30, y: 1.85, w: 4.0, h: 0.35,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  const lm = bullets([
    "배너 사라짐 → Supabase 데이터 사용",
    "관리자 페이지(/admin) 에서 입력한 내용이 즉시 반영 (60초)",
    "GitHub Push / Vercel 배포 시에도 동일하게 동작",
    "내용이 안 보이면 RLS 또는 env 오타 의심"
  ], 5.33, 2.25, 4.0, 2.10, { fontSize: 11 });
  s.addText(lm.text, lm.options);
  s.addText("isDemoMode = false", {
    x: 5.33, y: 4.40, w: 4.0, h: 0.30,
    fontFace: FONT.code, fontSize: 11, color: COLOR.green, bold: true, margin: 0
  });
}

// =====================================================================
// SLIDE 24 — STEP 6 코드: page.tsx 데이터 흐름
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 6, no);
  header(s, "STEP 6 · CODE", "page.tsx — DB → 화면 데이터 흐름", "서버 컴포넌트가 4 테이블을 한 번에 조회.");

  codeBlock(s, 0.5, 1.70, 9.0, 2.80, [
    { text: "import { supabase, isDemoMode } from \"@/lib/supabase\";" },
    { text: "import { MOCK_PROFILE, MOCK_SKILLS, ... } from \"@/lib/mock-data\";" },
    { text: "" },
    { text: "export const revalidate = 60;  // 60초마다 재조회", color: COLOR.codeGreen },
    { text: "" },
    { text: "async function getData() {" },
    { text: "  if (isDemoMode || !supabase) {                       // env 없으면 mock", color: COLOR.codeAmber },
    { text: "    return { profile: MOCK_PROFILE, skills: MOCK_SKILLS, ... };" },
    { text: "  }" },
    { text: "  const [p, sk, pr, m] = await Promise.all([" },
    { text: "    supabase.from(\"profiles\").select(\"*\").limit(1).maybeSingle()," },
    { text: "    supabase.from(\"skills\").select(\"*\"), ..." },
    { text: "  ]);" },
    { text: "  return { profile: p.data, skills: sk.data, ... };" },
    { text: "}" }
  ]);
  s.addText("DEMO MODE 가 학습자를 보호 — env를 잊어도 앱이 뻗지 않습니다.", {
    x: 0.5, y: 4.58, w: 9.0, h: 0.30,
    fontFace: FONT.b, fontSize: 11, color: COLOR.textMid, italic: true, margin: 0
  });
}

// =====================================================================
// SLIDE 25 — STEP 7: 모바일 검수
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 7, no);
  header(s, "STEP 7", "모바일에서 반응형 점검", "포트폴리오는 모바일로 볼 가능성이 높습니다.");

  // 좌측: 실제 모바일 캡처
  s.addImage({
    path: path.join(SHOTS, "home-mobile.png"),
    x: 0.55, y: 1.65, w: 2.0, h: 2.85,
    sizing: { type: "contain", w: 2.0, h: 2.85 }
  });
  s.addText("모바일 (420px)", {
    x: 0.55, y: 4.55, w: 2.0, h: 0.22,
    fontFace: FONT.b, fontSize: 9.5, color: COLOR.textMid, align: "center", italic: true, margin: 0
  });

  // 우측: 체크리스트
  card(s, 3.0, 1.75, 6.5, 2.30, { accent: COLOR.navy });
  s.addText("점검 항목", {
    x: 3.25, y: 1.85, w: 6.0, h: 0.30,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  const ck = bullets([
    "텍스트가 너무 작지 않은가?",
    "이미지가 잘리지 않는가?",
    "버튼을 손가락으로 누를 수 있는가?",
    "영상 링크가 열리는가?",
    "Skills/Projects 카드가 세로로 쌓이는가?"
  ], 3.30, 2.20, 6.0, 1.80, { fontSize: 11 });
  s.addText(ck.text, ck.options);

  notice(s, 3.0, 4.15, 6.5,
    "Chrome 개발자 도구 (F12) → Toggle device toolbar 로 모바일 시뮬레이션.",
    "info"
  );
}

// =====================================================================
// SLIDE 26 — STEP 7: GitHub Push
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 7, no);
  header(s, "STEP 7 · DO", "GitHub 에 코드 저장", "배포 전에 코드가 안전하게 저장되어야 합니다.");

  shellBlock(s, 0.5, 1.75, 5.5, 2.95, [
    { text: "# 1) 저장소 초기화 + 첫 커밋", color: COLOR.codeGreen },
    { text: "git init" },
    { text: "git add ." },
    { text: "git commit -m \"feat: 초기 커밋\"" },
    { text: "" },
    { text: "# 2) GitHub 에서 새 저장소 생성 후", color: COLOR.codeGreen },
    { text: "git remote add origin <URL>" },
    { text: "git branch -M main" },
    { text: "git push -u origin main" }
  ]);
  card(s, 6.20, 1.75, 3.30, 2.95, { accent: COLOR.amber });
  s.addText("커밋 전 확인", {
    x: 6.40, y: 1.85, w: 3.0, h: 0.35,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  const t = bullets([
    ".gitignore 에 .env.local 포함",
    "git status 에 .env.local 안 보임",
    "API Key 가 코드에 박혀있지 않음",
    "README 에 실행 방법 작성"
  ], 6.45, 2.25, 3.0, 2.40, { fontSize: 10.5 });
  s.addText(t.text, t.options);
}

// =====================================================================
// SLIDE 27 — STEP 7: Vercel 배포
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, 7, no);
  header(s, "STEP 7 · DO", "Vercel 배포 — 5단계", "배포 URL 이 생기면 외부에서 접속 가능.");

  const steps = [
    "GitHub 저장소를 Vercel 에 Import",
    "Framework Preset = Next.js (자동 인식)",
    "Environment Variables 에 4개 키 입력",
    "Deploy 클릭 → 1~2분 대기",
    "발급된 URL 을 PC + 모바일에서 확인"
  ];
  steps.forEach((t, i) => {
    const y = 1.78 + i * 0.55;
    s.addShape(pres.shapes.OVAL, {
      x: 0.6, y: y + 0.04, w: 0.42, h: 0.42,
      fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(String(i + 1), {
      x: 0.6, y: y + 0.04, w: 0.42, h: 0.42,
      fontFace: FONT.h, fontSize: 14, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.20, y, w: 8.30, h: 0.50, fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.5 }
    });
    s.addText(t, {
      x: 1.40, y, w: 8.0, h: 0.50,
      fontFace: FONT.b, fontSize: 13, color: COLOR.text, valign: "middle", margin: 0
    });
  });
}

// =====================================================================
// SLIDE 28 — BONUS: 관리자 페이지
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, null, no);
  header(s, "BONUS", "관리자 페이지 (/admin)", "SQL 을 만지지 않고 화면에서 데이터 입력.");

  // 좌측: 실제 관리자 화면
  s.addImage({
    path: path.join(SHOTS, "admin-login.png"),
    x: 0.55, y: 1.70, w: 4.40, h: 2.50,
    sizing: { type: "contain", w: 4.40, h: 2.50 }
  });
  s.addText("/admin 비밀번호 입력 화면", {
    x: 0.55, y: 4.25, w: 4.40, h: 0.25,
    fontFace: FONT.b, fontSize: 10, color: COLOR.textMid, align: "center", italic: true, margin: 0
  });

  // 우측: 진입 흐름
  s.addText("진입 흐름", {
    x: 5.20, y: 1.70, w: 4.30, h: 0.32,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  const flow = [
    "/admin 접속",
    "ADMIN_PASSWORD 입력",
    "x-admin-password 헤더 검증",
    "Profile / Skills / Projects / Media 폼"
  ];
  flow.forEach((f, i) => {
    const y = 2.08 + i * 0.48;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.20, y, w: 4.30, h: 0.42,
      fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.4 }
    });
    s.addText(`${i + 1}.  ${f}`, {
      x: 5.35, y, w: 4.10, h: 0.42,
      fontFace: FONT.b, fontSize: 11.5, color: COLOR.text, valign: "middle", margin: 0
    });
  });

  notice(s, 0.55, 4.55, 8.95,
    "service_role 키는 서버에서만 사용 — 브라우저에 절대 노출되지 않습니다.",
    "info"
  );
}

// =====================================================================
// SLIDE 29 — BONUS: 관리자 보안 설계
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, null, no);
  header(s, "BONUS · SECURITY", "관리자 페이지 보안 설계", "비밀번호 + 서버 키 분리로 안전하게.");

  const items = [
    ["x-admin-password 헤더 검증", "모든 POST/DELETE 는 서버에서 비밀번호 확인 후 진행"],
    ["service_role 은 서버 전용",   "NEXT_PUBLIC_ 접두사 없음 → 브라우저 번들에서 제외"],
    ["쓰기 경로 단일화",         "모든 변경은 /api/admin 한 곳을 통해서만"],
    ["sessionStorage 만 사용",   "비밀번호를 localStorage 에 저장하지 않음 (탭 닫으면 사라짐)"],
    ["profiles 자동 upsert",     "한 사람 1행 유지 — 중복 입력 방지"],
    ["메인 페이지는 anon key + RLS", "공개 페이지는 읽기만, 쓰기는 admin 만 가능"]
  ];
  items.forEach((it, i) => {
    const y = 1.78 + i * 0.50;
    card(s, 0.5, y, 9.0, 0.42, { accent: COLOR.green });
    s.addText(it[0], {
      x: 0.70, y, w: 3.5, h: 0.42,
      fontFace: FONT.h, fontSize: 11.5, color: COLOR.navy, bold: true, valign: "middle", margin: 0
    });
    s.addText(it[1], {
      x: 4.25, y, w: 5.20, h: 0.42,
      fontFace: FONT.b, fontSize: 11, color: COLOR.textMid, valign: "middle", margin: 0
    });
  });
}

// =====================================================================
// SLIDE 30 — 자주 발생하는 오류 (표)
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, null, no);
  header(s, "TROUBLESHOOTING", "자주 발생하는 오류와 해결", "오류는 실패가 아니라 구조를 이해하는 기회.");

  const rows = [
    ["Module not found: @supabase/...", "npm install 누락",     "npm install 재실행"],
    ["env.local 에 ... 설정해 주세요",   "환경변수 미입력",       ".env.local 파일명·내용 재확인"],
    ["'데이터가 아직 없습니다' 화면",      "profiles 비어있음",      "Supabase Table Editor 에 1행 추가"],
    ["Vercel Build failed",            "환경변수 미입력",       "Vercel Settings 에서 재입력"],
    ["이미지 깨짐",                    "외부 도메인 미허용",    "next.config.js remotePatterns 추가"],
    ["관리자 로그인 실패",              "ADMIN_PASSWORD 불일치", ".env.local 값 확인 후 재시작"]
  ];
  const colX = [0.5, 3.50, 6.20];
  const colW = [2.95, 2.65, 3.30];
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
// SLIDE 31 — 최종 체크리스트
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, null, no);
  header(s, "FINAL CHECK", "제출 전 최종 체크리스트", "아래 항목을 확인한 뒤 URL 을 제출합니다.");

  const groups = [
    ["기능",      ["Hero / About 표시", "Skills 4개 이상", "Projects 1개 이상", "이미지·영상 표시"]],
    ["DB · 배포", ["Supabase 데이터 표시", "환경변수 정상",   "Vercel URL 접속",  "모바일 화면 확인"]],
    ["안전",      ["개인정보 제거",     "API Key 비공개",   "저작권 OK 이미지",  "회사 내부정보 없음"]]
  ];
  groups.forEach((g, i) => {
    const x = 0.5 + i * 3.10;
    const y = 1.78;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.95, h: 0.4, fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(g[0], {
      x, y, w: 2.95, h: 0.4,
      fontFace: FONT.h, fontSize: 14, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: y + 0.4, w: 2.95, h: 2.30,
      fill: { color: COLOR.white }, line: { color: COLOR.rule, width: 0.75 }
    });
    const items = g[1].map((t) => `☐  ${t}`).join("\n");
    s.addText(items, {
      x: x + 0.15, y: y + 0.55, w: 2.65, h: 2.10,
      fontFace: FONT.b, fontSize: 12, color: COLOR.text, lineSpacingMultiple: 1.7, margin: 0
    });
  });
  notice(s, 0.5, 4.55, 9.0,
    "제출 양식 — 이름 / 웹앱 제목 / 배포 URL / GitHub URL / 사용한 AI 도구 / 어려웠던 점 / 개선 계획.",
    "info"
  );
}

// =====================================================================
// SLIDE 32 — 3분 발표 구성
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, null, no);
  header(s, "PRESENTATION", "3분 발표 — 흐름으로 설명하기", "완벽한 앱보다 '어떤 흐름으로 만들었는가'.");

  const pts = [
    ["문제",     "왜 만들었는가?",       "30초"],
    ["사용자",   "누가 보는가?",         "20초"],
    ["AI 활용", "무엇을 생성·검수했나?", "40초"],
    ["DB",       "어떤 데이터를 저장했나?", "30초"],
    ["배포",     "URL 로 접속 가능한가?",  "40초"],
    ["회고",     "어려웠던 점과 다음 계획", "20초"]
  ];
  pts.forEach((p, i) => {
    const y = 1.78 + i * 0.50;
    s.addShape(pres.shapes.OVAL, {
      x: 0.6, y: y + 0.06, w: 0.36, h: 0.36,
      fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(String(i + 1), {
      x: 0.6, y: y + 0.06, w: 0.36, h: 0.36,
      fontFace: FONT.h, fontSize: 12, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.10, y, w: 8.40, h: 0.48,
      fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.4 }
    });
    s.addText(p[0], {
      x: 1.25, y, w: 1.3, h: 0.48,
      fontFace: FONT.h, fontSize: 12, color: COLOR.navy, bold: true, valign: "middle", margin: 0
    });
    s.addText(p[1], {
      x: 2.55, y, w: 5.5, h: 0.48,
      fontFace: FONT.b, fontSize: 11.5, color: COLOR.text, valign: "middle", margin: 0
    });
    s.addText(p[2], {
      x: 8.0, y, w: 1.30, h: 0.48,
      fontFace: FONT.code, fontSize: 11, color: COLOR.amber, bold: true,
      align: "right", valign: "middle", margin: 0
    });
  });
}

// =====================================================================
// SLIDE 33 — 보안 권고
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  chrome(s, null, no);
  header(s, "SECURITY NOTE", "Next.js 보안 권고", "본 프로젝트는 14.2.35 (14.x 라인 마지막 패치) 사용.");

  // 좌측: 현 상태
  card(s, 0.5, 1.75, 4.45, 1.40, { accent: COLOR.green });
  s.addText("현재 상태", {
    x: 0.75, y: 1.85, w: 4.0, h: 0.30,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  s.addText("· critical 권고 0건\n· high 1건 / moderate 1건 (잔존)\n· 학습용으로는 안전", {
    x: 0.78, y: 2.20, w: 4.0, h: 0.85,
    fontFace: FONT.b, fontSize: 11, color: COLOR.text, lineSpacingMultiple: 1.4, margin: 0
  });

  // 우측: 실서비스 권고
  card(s, 5.05, 1.75, 4.45, 1.40, { accent: COLOR.amber });
  s.addText("실서비스로 확장 시", {
    x: 5.30, y: 1.85, w: 4.0, h: 0.30,
    fontFace: FONT.h, fontSize: 13, color: COLOR.navy, bold: true, margin: 0
  });
  s.addText("Next 15+ 메이저 업그레이드 권장\n(React 19 동반, API 일부 변경)", {
    x: 5.33, y: 2.20, w: 4.0, h: 0.85,
    fontFace: FONT.b, fontSize: 11, color: COLOR.text, lineSpacingMultiple: 1.4, margin: 0
  });

  // 하단: 점검 명령
  s.addText("의존성 점검 명령", {
    x: 0.5, y: 3.35, w: 9.0, h: 0.30,
    fontFace: FONT.h, fontSize: 12, color: COLOR.navy, bold: true, margin: 0
  });
  shellBlock(s, 0.5, 3.65, 9.0, 1.05, [
    { text: "npm audit              # 현재 권고 상세 확인", color: COLOR.codeGreen },
    { text: "npm outdated           # 새 버전 안내", color: COLOR.codeGreen }
  ]);
}

// =====================================================================
// SLIDE 34 — 다음 6개 프로젝트로 확장
// =====================================================================
{
  const no = nextNo();
  const s = pres.addSlide();
  s.background = { color: COLOR.navy };
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0.60, w: 10, h: 0.04, fill: { color: COLOR.amber }, line: { type: "none" }
  });
  s.addText("WRAP UP", {
    x: 0.5, y: 0.85, w: 9, h: 0.35,
    fontFace: FONT.b, fontSize: 11, color: COLOR.amber, bold: true, charSpacing: 4, margin: 0
  });
  s.addText("오늘 만든 흐름이 모든 AI 앱의 골격이다", {
    x: 0.5, y: 1.20, w: 9, h: 0.7,
    fontFace: FONT.h, fontSize: 28, color: COLOR.white, bold: true, margin: 0
  });

  const next = [
    "데이터 분석", "CV / NLP", "RAG 챗봇",
    "Agent 자동화", "멀티모달", "서비스 배포"
  ];
  const cellW = 1.40, cellH = 0.95, gap = 0.10;
  next.forEach((n, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.5 + col * (cellW + gap);
    const y = 2.20 + row * (cellH + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cellW, h: cellH,
      fill: { color: COLOR.navySoft }, line: { color: COLOR.amber, width: 0.75 }
    });
    s.addText(`Project ${i + 1}`, {
      x, y: y + 0.10, w: cellW, h: 0.30,
      fontFace: FONT.b, fontSize: 10, color: COLOR.amber, charSpacing: 3, bold: true,
      align: "center", margin: 0
    });
    s.addText(n, {
      x, y: y + 0.42, w: cellW, h: 0.45,
      fontFace: FONT.h, fontSize: 13, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
  });

  s.addText("문제 → 데이터 → AI → 화면 → 배포", {
    x: 5.10, y: 2.20, w: 4.4, h: 0.45,
    fontFace: FONT.h, fontSize: 18, color: COLOR.amber, bold: true, margin: 0
  });
  s.addText("Project 0 에서 익힌 순서가 이후 모든 프로젝트의 공통 골격이 됩니다.", {
    x: 5.10, y: 2.70, w: 4.4, h: 1.0,
    fontFace: FONT.b, fontSize: 13, color: COLOR.ice, lineSpacingMultiple: 1.4, margin: 0
  });
  s.addText("Thank you", {
    x: 5.10, y: 3.85, w: 4.4, h: 0.6,
    fontFace: FONT.h, fontSize: 24, color: COLOR.white, bold: true, margin: 0
  });
  s.addText("AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정", {
    x: 5.10, y: 4.45, w: 4.4, h: 0.4,
    fontFace: FONT.b, fontSize: 10.5, color: COLOR.ice, margin: 0
  });
  s.addText(String(slideNo + 1).padStart(2, "0"), {
    x: 9.20, y: 4.85, w: 0.5, h: 0.4,
    fontFace: FONT.h, fontSize: 12, color: COLOR.ice, align: "right", margin: 0
  });
  slideNo++; // count this slide
}

// =====================================================================
// 저장
// =====================================================================
const out = path.join(__dirname, "Project0_실습교재.pptx");
pres.writeFile({ fileName: out }).then(() => {
  console.log("OK:", out, "—", slideNo, "slides");
});
