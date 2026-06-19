// Project 0 — 자기소개 웹앱 강의 슬라이드 빌더
// 실행: node docs/build-slides.js
// 출력: docs/Project0_강의슬라이드.pptx

const pptxgen = require("pptxgenjs");
const path = require("path");

const COLOR = {
  navy: "1E2761",       // 메인
  navySoft: "3A4A8A",   // 보조
  ice: "CADCFC",        // 배경 강조
  amber: "F59E0B",      // 강조 포인트 (코드 하이라이트)
  text: "1F2937",       // 본문 다크
  textMid: "475569",    // 본문 중간
  textMuted: "94A3B8",  // 캡션
  white: "FFFFFF",
  codeBg: "0F172A",     // 코드 배경
  codeText: "E2E8F0",   // 코드 텍스트
  codeAmber: "FBBF24",  // 코드 강조
  codeGreen: "86EFAC",  // 코드 코멘트
  rule: "E5E7EB",
  sand: "F8FAFC"
};

const FONT = { h: "맑은 고딕", b: "맑은 고딕" };
const STEPS = ["문제정의", "사용자", "AI역할", "데이터", "설계", "MVP", "배포"];

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625
pres.title = "Project 0 — 자기소개 웹앱 강의 슬라이드";
pres.author = "AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정";

// =====================================================================
// 공통 헬퍼
// =====================================================================

function addBaseChrome(slide, currentStep /* 1-7 or null */) {
  // 좌측 네이비 사이드바 (모티프)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: COLOR.navy }, line: { type: "none" }
  });

  // 7STEP 진행 표시 (PDF 교재의 푸터 모방) — 푸터 위쪽
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

  // 푸터 텍스트 — 항상 맨 아래
  slide.addText("AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정 · Project 0", {
    x: 0.5, y: 5.34, w: 9.0, h: 0.25,
    fontFace: FONT.b, fontSize: 8.5, color: COLOR.textMuted, margin: 0
  });
}

function addTitle(slide, kicker, title, subtitle) {
  if (kicker) {
    slide.addText(kicker, {
      x: 0.55, y: 0.30, w: 9.0, h: 0.32,
      fontFace: FONT.b, fontSize: 11, color: COLOR.amber, bold: true, charSpacing: 4, margin: 0
    });
  }
  slide.addText(title, {
    x: 0.55, y: 0.55, w: 9.0, h: 0.65,
    fontFace: FONT.h, fontSize: 30, color: COLOR.navy, bold: true, margin: 0
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.55, y: 1.18, w: 9.0, h: 0.40,
      fontFace: FONT.b, fontSize: 14, color: COLOR.textMid, margin: 0
    });
  }
}

function card(slide, x, y, w, h, opts = {}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.fill || COLOR.white },
    line: { color: opts.border || COLOR.rule, width: 0.75 }
  });
  // accent bar (좌측)
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
      fontSize: opts.fontSize || 13,
      color: opts.color || COLOR.text,
      paraSpaceAfter: 4,
      margin: 0
    }
  };
}

function codeBlock(slide, x, y, w, h, lines /* array of {text, color?} or string */) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: COLOR.codeBg }, line: { type: "none" }
  });
  const runs = [];
  lines.forEach((ln, i) => {
    const obj = typeof ln === "string" ? { text: ln } : ln;
    runs.push({
      text: obj.text,
      options: {
        color: obj.color || COLOR.codeText,
        bold: !!obj.bold,
        breakLine: i < lines.length - 1
      }
    });
  });
  slide.addText(runs, {
    x: x + 0.18, y: y + 0.12, w: w - 0.36, h: h - 0.24,
    fontFace: "Consolas", fontSize: 11.5, color: COLOR.codeText, margin: 0
  });
}

// =====================================================================
// SLIDE 1 — 타이틀
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.navy };

  // accent bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.6, w: 10, h: 0.04, fill: { color: COLOR.amber }, line: { type: "none" }
  });
  // ice block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.5, w: 0.5, h: 0.06,
    fill: { color: COLOR.amber }, line: { type: "none" }
  });

  s.addText("PROJECT 0 · 사전 통합 실습", {
    x: 0.5, y: 0.62, w: 8, h: 0.4, fontFace: FONT.b, fontSize: 12,
    color: COLOR.ice, charSpacing: 6, bold: true, margin: 0
  });
  s.addText("자기소개 웹앱을\n8시간에 끝까지 만들기", {
    x: 0.5, y: 1.2, w: 9, h: 2.0,
    fontFace: FONT.h, fontSize: 44, color: COLOR.white, bold: true, lineSpacingMultiple: 1.05, margin: 0
  });
  s.addText("AI 콘텐츠 생성 → DB 저장 → 화면 연결 → 배포까지", {
    x: 0.5, y: 3.30, w: 9, h: 0.5,
    fontFace: FONT.b, fontSize: 18, color: COLOR.ice, margin: 0
  });
  s.addText("Next.js · Supabase · Vercel  /  비전공자 Step by Step", {
    x: 0.5, y: 3.85, w: 9, h: 0.4,
    fontFace: FONT.b, fontSize: 13, color: COLOR.ice, margin: 0
  });
  s.addText("AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정", {
    x: 0.5, y: 4.85, w: 9, h: 0.4,
    fontFace: FONT.b, fontSize: 11, color: COLOR.ice, margin: 0
  });
  s.addText("01", {
    x: 9.2, y: 4.85, w: 0.6, h: 0.4,
    fontFace: FONT.h, fontSize: 12, color: COLOR.ice, align: "right", margin: 0
  });
}

// =====================================================================
// SLIDE 2 — 오늘 만들 것 + 핵심 경험
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, null);
  addTitle(s, "INTRO · 02", "오늘 만들 최종 결과물",
    "내 이력과 자기소개 자료를 하나의 URL로 만들어 공유합니다.");

  // 좌측: 완성 형태
  card(s, 0.5, 1.85, 4.45, 2.85, { accent: COLOR.navy });
  s.addText("완성 형태", {
    x: 0.75, y: 1.95, w: 4.0, h: 0.4,
    fontFace: FONT.h, fontSize: 16, color: COLOR.navy, bold: true, margin: 0
  });
  const left = bullets([
    "자기소개 Hero 화면",
    "경력 · 역량 · 프로젝트 섹션",
    "이미지와 자기소개 영상 삽입",
    "외부 접속 가능한 배포 URL",
    "관리자 페이지로 데이터 입력"
  ], 0.78, 2.4, 4.0, 2.3);
  s.addText(left.text, left.options);

  // 우측: 핵심 경험
  card(s, 5.05, 1.85, 4.45, 2.85, { accent: COLOR.amber });
  s.addText("오늘의 핵심 경험", {
    x: 5.30, y: 1.95, w: 4.0, h: 0.4,
    fontFace: FONT.h, fontSize: 16, color: COLOR.navy, bold: true, margin: 0
  });
  const right = bullets([
    "AI가 만든 콘텐츠를 그대로 쓰지 않고 검토",
    "DB에 저장한 데이터를 화면에 연결",
    "환경변수로 API Key를 안전하게 다루기",
    "GitHub Push → Vercel 배포 흐름 체득",
    "모바일에서 배포 결과 직접 확인"
  ], 5.33, 2.4, 4.0, 2.3);
  s.addText(right.text, right.options);
}

// =====================================================================
// SLIDE 3 — 전체 아키텍처 도해
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, null);
  addTitle(s, "ARCHITECTURE · 03", "한 줄로 이해하는 전체 구조",
    "사용자가 보는 것은 화면이고, 화면의 내용은 DB에서 옵니다.");

  // 세 박스: 브라우저 / Vercel(Next.js) / Supabase
  const boxes = [
    { label: "브라우저", sub: "Next.js 화면\n(/ 와 /admin)", color: COLOR.navy },
    { label: "Vercel", sub: "Next.js 서버\n환경변수 보관", color: COLOR.navySoft },
    { label: "Supabase", sub: "DB · Storage\n(4개 테이블)", color: COLOR.amber }
  ];
  const startX = 0.7;
  const boxW = 2.7, boxH = 2.0, gap = 0.45;
  boxes.forEach((b, i) => {
    const x = startX + i * (boxW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.05, w: boxW, h: boxH,
      fill: { color: COLOR.white }, line: { color: b.color, width: 2.5 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.05, w: boxW, h: 0.45, fill: { color: b.color }, line: { type: "none" }
    });
    s.addText(b.label, {
      x, y: 2.05, w: boxW, h: 0.45,
      fontFace: FONT.h, fontSize: 16, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    s.addText(b.sub, {
      x: x + 0.1, y: 2.6, w: boxW - 0.2, h: 1.4,
      fontFace: FONT.b, fontSize: 13, color: COLOR.text, align: "center", valign: "middle", margin: 0
    });
    // 화살표 (마지막 박스 제외)
    if (i < boxes.length - 1) {
      const ax = x + boxW;
      s.addShape(pres.shapes.LINE, {
        x: ax + 0.04, y: 3.05, w: gap - 0.08, h: 0,
        line: { color: COLOR.textMid, width: 1.5, endArrowType: "triangle" }
      });
    }
  });

  s.addText("핵심: API Key 는 코드에 직접 쓰지 않습니다. 환경변수(.env.local) → Vercel 에 별도 입력.", {
    x: 0.5, y: 4.30, w: 9, h: 0.35,
    fontFace: FONT.b, fontSize: 12, color: COLOR.textMid, italic: true, margin: 0
  });
}

// =====================================================================
// SLIDE 4 — 7STEP 사이클 요약
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, null);
  addTitle(s, "CYCLE · 04", "프로젝트 사이클 7STEP",
    "Project 0 에서 익힌 흐름이 이후 6개 프로젝트의 공통 골격이 됩니다.");

  const cellW = 1.21, cellH = 1.6;
  const startX = 0.5, startY = 1.95;
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
    // 네이비 라벨 박스
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cellW, h: 0.45,
      fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(`STEP ${i + 1}`, {
      x, y: startY, w: cellW, h: 0.45,
      fontFace: FONT.b, fontSize: 10, color: COLOR.ice, charSpacing: 3, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    // 본문
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

  // 강조 문장
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.10, w: 9.0, h: 0.55, fill: { color: COLOR.ice }, line: { type: "none" }
  });
  s.addText("AI 앱 = 아이디어 + 데이터 + 화면 + 배포가 연결될 때 완성됩니다.", {
    x: 0.5, y: 4.10, w: 9.0, h: 0.55,
    fontFace: FONT.h, fontSize: 14, color: COLOR.navy, bold: true,
    align: "center", valign: "middle", margin: 0
  });
}

// =====================================================================
// SLIDE 5 — STEP 1: 문제 정의
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, 1);
  addTitle(s, "STEP 1 · 05", "문제 정의 — 무엇을 해결할까?",
    "문제는 기술보다 먼저 정합니다. '멋진 사이트'보다 '누가 왜 보는가'.");

  // 좌측: 강사 설명
  card(s, 0.5, 1.85, 4.45, 2.7);
  s.addText("강사 설명", {
    x: 0.75, y: 1.95, w: 4.0, h: 0.4,
    fontFace: FONT.h, fontSize: 16, color: COLOR.navy, bold: true, margin: 0
  });
  const a = bullets([
    "내 소개 자료가 흩어져 있는 상황을 한 문장으로",
    "웹앱으로 보여주고 싶은 나의 이미지 정리",
    "기술보다 '왜' 가 먼저"
  ], 0.78, 2.4, 4.0, 2.0);
  s.addText(a.text, a.options);

  // 우측: 실습 + 문장 템플릿
  card(s, 5.05, 1.85, 4.45, 2.7, { accent: COLOR.amber });
  s.addText("실습 — 한 문장 정의", {
    x: 5.30, y: 1.95, w: 4.0, h: 0.4,
    fontFace: FONT.h, fontSize: 16, color: COLOR.navy, bold: true, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.30, y: 2.45, w: 4.0, h: 1.95, fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.5 }
  });
  s.addText([
    { text: "나는 ", options: {} },
    { text: "[누가]", options: { color: COLOR.amber, bold: true } },
    { text: " 볼 수 있도록,\n", options: { breakLine: true } },
    { text: "[나의 핵심 강점]", options: { color: COLOR.amber, bold: true } },
    { text: "과 ", options: {} },
    { text: "[대표 경험]", options: { color: COLOR.amber, bold: true } },
    { text: "을\n한눈에 보여주는 자기소개 웹앱을 만든다.", options: { breakLine: true } }
  ], {
    x: 5.45, y: 2.55, w: 3.7, h: 1.75,
    fontFace: FONT.b, fontSize: 13, color: COLOR.text, lineSpacingMultiple: 1.35, margin: 0
  });
}

// =====================================================================
// SLIDE 6 — STEP 2: 사용자 + 화면 흐름
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, 2);
  addTitle(s, "STEP 2 · 06", "사용자 정의와 방문자 행동 흐름",
    "사용자를 정해야 화면 순서와 문구가 달라집니다.");

  // 좌측: 페르소나 카드
  const personas = [
    ["채용담당자", "짧고 검증 가능한 경력"],
    ["프로젝트 팀원", "협업 가능성과 역할"],
    ["강사 · 멘토", "학습 성과와 성장 과정"]
  ];
  s.addText("대표 사용자 후보 (1명 선택)", {
    x: 0.5, y: 1.80, w: 4.5, h: 0.35,
    fontFace: FONT.h, fontSize: 14, color: COLOR.navy, bold: true, margin: 0
  });
  personas.forEach((p, i) => {
    const y = 2.20 + i * 0.78;
    card(s, 0.5, y, 4.45, 0.68, { accent: COLOR.navy });
    s.addText(p[0], {
      x: 0.75, y: y + 0.06, w: 4.0, h: 0.3,
      fontFace: FONT.h, fontSize: 14, color: COLOR.navy, bold: true, margin: 0
    });
    s.addText(p[1], {
      x: 0.75, y: y + 0.34, w: 4.0, h: 0.3,
      fontFace: FONT.b, fontSize: 12, color: COLOR.textMid, margin: 0
    });
  });

  // 우측: 화면 흐름
  s.addText("화면 흐름 (6 섹션)", {
    x: 5.05, y: 1.80, w: 4.5, h: 0.35,
    fontFace: FONT.h, fontSize: 14, color: COLOR.navy, bold: true, margin: 0
  });
  const flow = ["Hero", "About", "Skills", "Projects", "Media", "Contact"];
  const fY = 2.25;
  flow.forEach((f, i) => {
    const x = 5.05 + (i % 3) * 1.5;
    const y = fY + Math.floor(i / 3) * 0.85;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 1.35, h: 0.7,
      fill: { color: COLOR.ice }, line: { color: COLOR.navy, width: 1 }, rectRadius: 0.06
    });
    s.addText(f, {
      x, y, w: 1.35, h: 0.7,
      fontFace: FONT.h, fontSize: 14, color: COLOR.navy, bold: true,
      align: "center", valign: "middle", margin: 0
    });
  });
  s.addText("Must: 이름·한 줄 소개·자기소개 / Skills 4~6 / 이미지·영상 1 / 배포 URL", {
    x: 5.05, y: 4.05, w: 4.45, h: 0.45,
    fontFace: FONT.b, fontSize: 11, color: COLOR.textMid, italic: true, margin: 0
  });
}

// =====================================================================
// SLIDE 7 — STEP 3: AI 콘텐츠 4개 프롬프트
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, 3);
  addTitle(s, "STEP 3 · 07", "AI 콘텐츠 4개 프롬프트",
    "AI 는 작성자 대신 완성하는 도구가 아니라, 초안과 구조를 돕는 도구입니다.");

  const prompts = [
    ["한 줄 소개", "30자 내외, 과장 금지\n비전공자도 이해 쉽게"],
    ["About 문단", "관심 / 강점 / 경험 / 목표\n4문장, 친근하고 전문적"],
    ["Skills 6개", "'할 수 있는 일' 중심\n'학습 중' 도 솔직히"],
    ["FAQ 5개", "방문자 질문 → 2문장 답\n고정 답변으로 안전하게"]
  ];
  const cellW = 2.18, cellH = 2.55;
  const sX = 0.5, sY = 1.80;
  prompts.forEach((p, i) => {
    const x = sX + i * (cellW + 0.10);
    card(s, x, sY, cellW, cellH, { accent: COLOR.amber });
    s.addText(`프롬프트 ${i + 1}`, {
      x: x + 0.15, y: sY + 0.10, w: cellW - 0.2, h: 0.32,
      fontFace: FONT.b, fontSize: 10, color: COLOR.amber, charSpacing: 3, bold: true, margin: 0
    });
    s.addText(p[0], {
      x: x + 0.15, y: sY + 0.45, w: cellW - 0.2, h: 0.5,
      fontFace: FONT.h, fontSize: 16, color: COLOR.navy, bold: true, margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 0.15, y: sY + 0.95, w: 0.5, h: 0,
      line: { color: COLOR.amber, width: 1.5 }
    });
    s.addText(p[1], {
      x: x + 0.15, y: sY + 1.10, w: cellW - 0.2, h: 1.30,
      fontFace: FONT.b, fontSize: 12, color: COLOR.textMid, margin: 0
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.55, w: 9.0, h: 0.30, fill: { color: COLOR.ice }, line: { type: "none" }
  });
  s.addText("검수 원칙 — 사실과 다른 내용 삭제 / 과장 표현 줄이기 / 내 말투로 다시 쓰기", {
    x: 0.5, y: 4.55, w: 9.0, h: 0.30,
    fontFace: FONT.b, fontSize: 12, color: COLOR.navy, bold: true,
    align: "center", valign: "middle", margin: 0
  });
}

// =====================================================================
// SLIDE 8 — STEP 4: 미디어 (URL 저장 원칙)
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, 4);
  addTitle(s, "STEP 4 · 08", "이미지·영상은 'URL' 로 다룬다",
    "DB 에는 파일이 아니라 '파일 주소' 만 저장합니다.");

  // 좌측 박스: 초급자 방식
  card(s, 0.5, 1.85, 4.45, 2.7, { accent: COLOR.navy });
  s.addText("초급자 방식 (안전한 시작)", {
    x: 0.75, y: 1.95, w: 4.0, h: 0.4,
    fontFace: FONT.h, fontSize: 15, color: COLOR.navy, bold: true, margin: 0
  });
  const m1 = bullets([
    "이미지: public 폴더 또는 Supabase Storage",
    "영상: 일부공개 YouTube 링크 등 외부 URL",
    "DB media 테이블에는 URL 만 입력",
    "30초 자기소개 영상 → 클릭 재생 권장"
  ], 0.78, 2.45, 4.0, 2.0);
  s.addText(m1.text, m1.options);

  // 우측 박스: 주의
  card(s, 5.05, 1.85, 4.45, 2.7, { accent: COLOR.amber });
  s.addText("주의", {
    x: 5.30, y: 1.95, w: 4.0, h: 0.4,
    fontFace: FONT.h, fontSize: 15, color: COLOR.navy, bold: true, margin: 0
  });
  const m2 = bullets([
    "대용량 영상 파일 직접 업로드는 피하기",
    "한글·공백 파일명은 오류의 원인",
    "저작권 불명확한 이미지 사용 금지",
    "민감한 개인 사진은 공개 전 확인"
  ], 5.33, 2.45, 4.0, 2.0);
  s.addText(m2.text, m2.options);
}

// =====================================================================
// SLIDE 9 — STEP 5: DB 4 테이블 시각화
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, 5);
  addTitle(s, "STEP 5 · 09", "Supabase 4개 테이블 한 장 요약",
    "처음에는 복잡한 관계 대신 단순 4 테이블로 시작합니다.");

  const tables = [
    ["profiles", "name\nheadline\nsummary\nemail", "1행 (나)"],
    ["skills", "skill_name\nskill_desc\nlevel", "여러 행"],
    ["projects", "title\ndescription\nimage_url\ndemo_url", "여러 행"],
    ["media", "image_url\nvideo_url\ncaption", "여러 행"]
  ];
  const cellW = 2.18, cellH = 2.55;
  tables.forEach((t, i) => {
    const x = 0.5 + i * (cellW + 0.10);
    const y = 1.80;
    // 헤더
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cellW, h: 0.50, fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(t[0], {
      x, y, w: cellW, h: 0.50,
      fontFace: "Consolas", fontSize: 15, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    // 본문 (컬럼 목록)
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: y + 0.50, w: cellW, h: cellH - 0.85,
      fill: { color: COLOR.white }, line: { color: COLOR.rule, width: 0.75 }
    });
    s.addText(t[1], {
      x: x + 0.15, y: y + 0.60, w: cellW - 0.3, h: cellH - 1.05,
      fontFace: "Consolas", fontSize: 12, color: COLOR.text,
      lineSpacingMultiple: 1.4, margin: 0
    });
    // 카운트 라벨
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: y + cellH - 0.35, w: cellW, h: 0.35,
      fill: { color: COLOR.sand }, line: { type: "none" }
    });
    s.addText(t[2], {
      x, y: y + cellH - 0.35, w: cellW, h: 0.35,
      fontFace: FONT.b, fontSize: 11, color: COLOR.textMid,
      align: "center", valign: "middle", margin: 0
    });
  });

  s.addText("저장 원칙: 이미지·영상은 파일이 아니라 URL 만 저장 → Storage 분리", {
    x: 0.5, y: 4.55, w: 9.0, h: 0.30,
    fontFace: FONT.b, fontSize: 12, color: COLOR.amber, bold: true,
    align: "center", margin: 0
  });
}

// =====================================================================
// SLIDE 10 — STEP 5 코드 매핑: schema.sql
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, 5);
  addTitle(s, "STEP 5 · 10", "코드 매핑 — supabase/schema.sql",
    "Supabase → SQL Editor 에 통째로 붙여넣고 Run.");

  codeBlock(s, 0.5, 1.70, 9.0, 2.80, [
    { text: "-- 1) profiles : 나의 기본 정보 (한 사람당 1행)", color: COLOR.codeGreen },
    { text: "create table profiles (" },
    { text: "  id uuid primary key default gen_random_uuid()," },
    { text: "  name text, headline text, summary text, email text" },
    { text: ");" },
    { text: "" },
    { text: "-- 2) skills / 3) projects / 4) media 도 동일한 패턴으로 생성", color: COLOR.codeGreen },
    { text: "" },
    { text: "-- RLS: 누구나 읽기만 가능, 쓰기는 Dashboard 에서만", color: COLOR.codeGreen },
    { text: "alter table profiles enable row level security;" },
    { text: "create policy \"public read profiles\" on profiles for select using (true);" }
  ]);

  s.addText("샘플 데이터까지 한 번에 들어가도록 schema.sql 끝부분에 insert 문 포함", {
    x: 0.5, y: 4.58, w: 9.0, h: 0.30,
    fontFace: FONT.b, fontSize: 11, color: COLOR.textMid, italic: true, margin: 0
  });
}

// =====================================================================
// SLIDE 11 — STEP 6: 프로젝트 폴더 구조
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, 6);
  addTitle(s, "STEP 6 · 11", "프로젝트 폴더 구조",
    "파일 이름과 역할부터 익숙해지면 됩니다.");

  const rows = [
    ["app/page.tsx", "첫 화면 — DB 조회 후 6개 섹션 조립"],
    ["app/layout.tsx", "공통 레이아웃 / 푸터 / 한글 lang"],
    ["app/admin/page.tsx", "관리자 페이지 — 비밀번호 + 4개 폼"],
    ["app/api/admin/route.ts", "서버 API — 비밀번호 검증 + DB 쓰기"],
    ["components/*.tsx", "Hero · About · Skills · Projects · Media · Contact"],
    ["lib/supabase.ts", "DB 클라이언트 (anon key, 읽기 전용)"],
    ["lib/supabase-admin.ts", "서버 전용 (service_role, RLS 우회)"],
    ["lib/types.ts", "DB 4 테이블의 TypeScript 타입"],
    ["supabase/schema.sql", "테이블 + RLS + 샘플 데이터"],
    [".env.local", "API Key 보관 — GitHub 금지!"]
  ];
  rows.forEach((r, i) => {
    const y = 1.80 + i * 0.30;
    s.addText(r[0], {
      x: 0.55, y, w: 3.5, h: 0.28,
      fontFace: "Consolas", fontSize: 11.5, color: COLOR.navy, bold: true, margin: 0
    });
    s.addText(r[1], {
      x: 4.10, y, w: 5.4, h: 0.28,
      fontFace: FONT.b, fontSize: 11.5, color: COLOR.textMid, margin: 0
    });
  });
}

// =====================================================================
// SLIDE 12 — STEP 6: page.tsx 데이터 흐름
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, 6);
  addTitle(s, "STEP 6 · 12", "page.tsx — DB → 화면 데이터 흐름",
    "서버 컴포넌트가 Promise.all 로 4 테이블을 한 번에 조회합니다.");

  codeBlock(s, 0.5, 1.70, 9.0, 2.80, [
    { text: "import { supabase } from \"@/lib/supabase\";" },
    { text: "import Hero from \"@/components/Hero\";  // (다른 컴포넌트들도)" },
    { text: "" },
    { text: "export const revalidate = 60;  // 60초마다 재조회", color: COLOR.codeGreen },
    { text: "" },
    { text: "async function getData() {" },
    { text: "  const [p, sk, pr, m] = await Promise.all([" },
    { text: "    supabase.from(\"profiles\").select(\"*\").limit(1).maybeSingle()," },
    { text: "    supabase.from(\"skills\").select(\"*\")," },
    { text: "    supabase.from(\"projects\").select(\"*\")," },
    { text: "    supabase.from(\"media\").select(\"*\")" },
    { text: "  ]);" },
    { text: "  return { profile: p.data, skills: sk.data, ... };" },
    { text: "}" }
  ]);

  s.addText("profile 이 없으면 '데이터가 아직 없습니다' 안내 → 학습자가 원인을 바로 인지", {
    x: 0.5, y: 4.58, w: 9.0, h: 0.30,
    fontFace: FONT.b, fontSize: 11, color: COLOR.textMid, italic: true, margin: 0
  });
}

// =====================================================================
// SLIDE 13 — STEP 6: 6 컴포넌트 × DB 매핑
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, 6);
  addTitle(s, "STEP 6 · 13", "6 컴포넌트 × DB 테이블 매핑",
    "각 섹션이 어느 테이블에서 데이터를 받는지 한눈에 확인합니다.");

  const rows = [
    ["Hero.tsx",     "profiles.name / headline + media.image_url"],
    ["About.tsx",    "profiles.summary"],
    ["Skills.tsx",   "skills (모든 행)"],
    ["Projects.tsx", "projects (모든 행)"],
    ["Media.tsx",    "media (YouTube URL 자동 임베드)"],
    ["Contact.tsx",  "profiles.email"]
  ];
  rows.forEach((r, i) => {
    const y = 1.85 + i * 0.50;
    // 좌측 컴포넌트 칩
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y, w: 3.0, h: 0.42,
      fill: { color: COLOR.navy }, line: { type: "none" }, rectRadius: 0.05
    });
    s.addText(r[0], {
      x: 0.5, y, w: 3.0, h: 0.42,
      fontFace: "Consolas", fontSize: 13, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    // 화살표
    s.addShape(pres.shapes.LINE, {
      x: 3.55, y: y + 0.21, w: 0.45, h: 0,
      line: { color: COLOR.amber, width: 1.5, endArrowType: "triangle" }
    });
    // 우측 DB 매핑
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 4.05, y, w: 5.4, h: 0.42,
      fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.5 }, rectRadius: 0.05
    });
    s.addText(r[1], {
      x: 4.20, y, w: 5.2, h: 0.42,
      fontFace: "Consolas", fontSize: 12, color: COLOR.text,
      valign: "middle", margin: 0
    });
  });
}

// =====================================================================
// SLIDE 14 — STEP 6: 환경변수와 보안
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, 6);
  addTitle(s, "STEP 6 · 14", "환경변수와 키 분리 — 절대 코드에 쓰지 않는다",
    "공개 키와 비공개 키를 구분하고 GitHub 에는 키 자체를 올리지 않습니다.");

  codeBlock(s, 0.5, 1.70, 9.0, 1.80, [
    { text: "# .env.local  (절대 GitHub 에 커밋하지 않음)", color: COLOR.codeGreen },
    { text: "NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co" },
    { text: "NEXT_PUBLIC_SUPABASE_ANON_KEY=...        # 공개 OK (RLS 로 보호)", color: COLOR.codeText },
    { text: "" },
    { text: "ADMIN_PASSWORD=myproject1234              # 서버 전용", color: COLOR.codeAmber },
    { text: "SUPABASE_SERVICE_ROLE_KEY=...             # 서버 전용 (RLS 우회)", color: COLOR.codeAmber }
  ]);

  // 보안 원칙 카드 2개
  card(s, 0.5, 3.60, 4.45, 1.20, { accent: COLOR.navy });
  s.addText("공개 키 (NEXT_PUBLIC_*)", {
    x: 0.7, y: 3.66, w: 4.0, h: 0.32,
    fontFace: FONT.h, fontSize: 12, color: COLOR.navy, bold: true, margin: 0
  });
  s.addText("브라우저에 노출 OK.\nRLS public read 정책으로 보호.", {
    x: 0.7, y: 4.00, w: 4.0, h: 0.75,
    fontFace: FONT.b, fontSize: 11, color: COLOR.textMid, margin: 0
  });

  card(s, 5.05, 3.60, 4.45, 1.20, { accent: COLOR.amber });
  s.addText("비공개 키 (서버 전용)", {
    x: 5.25, y: 3.66, w: 4.0, h: 0.32,
    fontFace: FONT.h, fontSize: 12, color: COLOR.navy, bold: true, margin: 0
  });
  s.addText("API 라우트에서만 사용.\nNEXT_PUBLIC_ 절대 금지.", {
    x: 5.25, y: 4.00, w: 4.0, h: 0.75,
    fontFace: FONT.b, fontSize: 11, color: COLOR.textMid, margin: 0
  });
}

// =====================================================================
// SLIDE 15 — STEP 7: GitHub Push
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, 7);
  addTitle(s, "STEP 7 · 15", "GitHub 에 코드 저장",
    "배포 전에 코드가 안전하게 저장되어 있어야 합니다.");

  codeBlock(s, 0.5, 1.80, 5.5, 2.5, [
    { text: "# 1) 저장소 초기화", color: COLOR.codeGreen },
    { text: "git init" },
    { text: "git add ." },
    { text: "git commit -m \"feat: 초기 커밋\"" },
    { text: "" },
    { text: "# 2) GitHub 원격 저장소 연결", color: COLOR.codeGreen },
    { text: "git remote add origin <URL>" },
    { text: "git branch -M main" },
    { text: "git push -u origin main" }
  ]);

  card(s, 6.20, 1.80, 3.30, 2.5, { accent: COLOR.amber });
  s.addText("커밋 전 확인", {
    x: 6.40, y: 1.90, w: 3.0, h: 0.4,
    fontFace: FONT.h, fontSize: 14, color: COLOR.navy, bold: true, margin: 0
  });
  const t = bullets([
    ".gitignore 가 .env.local 포함",
    "git status 에 .env.local 안 보임",
    "API Key 가 코드에 직접 박혀있지 않음",
    "README 에 실행 방법 작성"
  ], 6.45, 2.35, 3.0, 1.95, { fontSize: 11 });
  s.addText(t.text, t.options);
}

// =====================================================================
// SLIDE 16 — STEP 7: Vercel 배포
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, 7);
  addTitle(s, "STEP 7 · 16", "Vercel 배포 — 5단계",
    "배포 URL 이 생기면 내 웹앱을 외부에서 볼 수 있습니다.");

  const steps = [
    "GitHub 저장소를 Vercel 에 Import",
    "Framework Preset = Next.js 자동 인식",
    "Environment Variables 에 4개 키 입력",
    "Deploy 클릭 → 1~2분 대기",
    "발급된 URL 을 PC + 모바일에서 확인"
  ];
  steps.forEach((t, i) => {
    const y = 1.85 + i * 0.55;
    // 번호 동그라미
    s.addShape(pres.shapes.OVAL, {
      x: 0.6, y: y + 0.04, w: 0.42, h: 0.42,
      fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(String(i + 1), {
      x: 0.6, y: y + 0.04, w: 0.42, h: 0.42,
      fontFace: FONT.h, fontSize: 14, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    // 본문 카드
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.20, y, w: 8.3, h: 0.50, fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.5 }
    });
    s.addText(t, {
      x: 1.40, y, w: 8.0, h: 0.50,
      fontFace: FONT.b, fontSize: 13, color: COLOR.text, valign: "middle", margin: 0
    });
  });
}

// =====================================================================
// SLIDE 17 — STEP 7: 모바일 검수 체크리스트
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, 7);
  addTitle(s, "STEP 7 · 17", "제출 전 최종 체크리스트",
    "포트폴리오는 모바일로 볼 가능성이 높습니다.");

  const groups = [
    ["기능", ["Hero / About 표시", "Skills 4개 이상", "Projects 1개 이상", "이미지·영상 표시"]],
    ["DB · 배포", ["Supabase 데이터 표시", "환경변수 정상", "Vercel URL 접속", "모바일 화면 확인"]],
    ["안전", ["개인정보 제거", "API Key 비공개", "저작권 OK 이미지", "회사 내부정보 없음"]]
  ];
  groups.forEach((g, i) => {
    const x = 0.5 + i * 3.10;
    const y = 1.80;
    // 헤더
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.95, h: 0.4, fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(g[0], {
      x, y, w: 2.95, h: 0.4,
      fontFace: FONT.h, fontSize: 14, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    // 본문
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
}

// =====================================================================
// SLIDE 18 — Bonus: 관리자 페이지 /admin
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, null);
  addTitle(s, "BONUS · 18", "관리자 페이지 (/admin) 로 데이터 입력",
    "SQL 을 만지지 않고 웹 화면에서 직접 추가·수정·삭제할 수 있습니다.");

  // 좌측: 흐름도
  s.addText("진입 흐름", {
    x: 0.5, y: 1.85, w: 4.5, h: 0.35,
    fontFace: FONT.h, fontSize: 14, color: COLOR.navy, bold: true, margin: 0
  });
  const flow = [
    "/admin 접속",
    "ADMIN_PASSWORD 입력",
    "x-admin-password 헤더 검증",
    "Profile / Skills / Projects / Media 폼"
  ];
  flow.forEach((f, i) => {
    const y = 2.25 + i * 0.55;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y, w: 4.45, h: 0.45,
      fill: { color: COLOR.sand }, line: { color: COLOR.rule, width: 0.5 }
    });
    s.addText(`${i + 1}. ${f}`, {
      x: 0.7, y, w: 4.2, h: 0.45,
      fontFace: FONT.b, fontSize: 13, color: COLOR.text, valign: "middle", margin: 0
    });
  });

  // 우측: 보안 설계
  card(s, 5.05, 1.85, 4.45, 2.80, { accent: COLOR.amber });
  s.addText("보안 설계", {
    x: 5.30, y: 1.95, w: 4.0, h: 0.4,
    fontFace: FONT.h, fontSize: 14, color: COLOR.navy, bold: true, margin: 0
  });
  const sec = bullets([
    "service_role 키는 서버에서만 사용",
    "쓰기 경로는 /api/admin 한 곳으로 격리",
    "비밀번호는 sessionStorage 만 사용",
    "profiles 는 자동 upsert (1행 유지)",
    "메인 페이지는 anon 키 + RLS public read"
  ], 5.33, 2.4, 4.0, 2.2, { fontSize: 12 });
  s.addText(sec.text, sec.options);
}

// =====================================================================
// SLIDE 19 — 자주 발생하는 오류 & 해결
// =====================================================================
{
  const s = pres.addSlide();
  addBaseChrome(s, null);
  addTitle(s, "TROUBLESHOOTING · 19", "자주 발생하는 오류와 해결",
    "오류는 실패가 아니라 연결 구조를 이해하는 기회입니다.");

  const rows = [
    ["Module not found: @supabase/...", "npm install 누락", "npm install 다시 실행"],
    [".env.local 에 ... 설정해 주세요", "환경변수 미입력", ".env.local 파일명·내용 재확인"],
    ["'데이터가 아직 없습니다' 화면", "profiles 테이블 비어있음", "Supabase Table Editor 에서 1행 추가"],
    ["Vercel Build failed", "환경변수 미입력", "Vercel → Settings 에서 재입력"],
    ["이미지 깨짐", "외부 도메인 미허용", "next.config.js remotePatterns 추가"]
  ];
  const colX = [0.5, 3.40, 6.10];
  const colW = [2.85, 2.65, 3.35];
  const headers = ["증상", "원인", "해결"];
  // 헤더
  headers.forEach((h, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: colX[i], y: 1.80, w: colW[i], h: 0.40,
      fill: { color: COLOR.navy }, line: { type: "none" }
    });
    s.addText(h, {
      x: colX[i], y: 1.80, w: colW[i], h: 0.40,
      fontFace: FONT.h, fontSize: 12, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
  });
  // 행
  rows.forEach((r, i) => {
    const y = 2.22 + i * 0.50;
    const bg = i % 2 === 0 ? COLOR.sand : COLOR.white;
    r.forEach((cell, j) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: colX[j], y, w: colW[j], h: 0.50,
        fill: { color: bg }, line: { color: COLOR.rule, width: 0.4 }
      });
      s.addText(cell, {
        x: colX[j] + 0.12, y, w: colW[j] - 0.24, h: 0.50,
        fontFace: j === 0 ? "Consolas" : FONT.b,
        fontSize: j === 0 ? 10.5 : 11,
        color: COLOR.text, valign: "middle", margin: 0
      });
    });
  });
}

// =====================================================================
// SLIDE 20 — 정리 + 다음 프로젝트
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLOR.navy };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0.6, w: 10, h: 0.04, fill: { color: COLOR.amber }, line: { type: "none" }
  });
  s.addText("WRAP UP · 20", {
    x: 0.5, y: 0.85, w: 9, h: 0.35,
    fontFace: FONT.b, fontSize: 11, color: COLOR.amber, bold: true, charSpacing: 4, margin: 0
  });
  s.addText("오늘 만든 흐름이 모든 AI 앱의 골격이다", {
    x: 0.5, y: 1.20, w: 9, h: 0.7,
    fontFace: FONT.h, fontSize: 30, color: COLOR.white, bold: true, margin: 0
  });

  // 6개 칩
  const next = [
    "데이터 분석", "CV / NLP", "RAG 챗봇",
    "Agent 자동화", "멀티모달", "서비스 배포"
  ];
  const cellW = 1.40, cellH = 0.95, gap = 0.10;
  next.forEach((n, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.5 + col * (cellW + gap) + (col >= 0 ? 0 : 0);
    const y = 2.20 + row * (cellH + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5 + col * (cellW + gap), y, w: cellW, h: cellH,
      fill: { color: COLOR.navySoft }, line: { color: COLOR.amber, width: 0.75 }
    });
    s.addText(`Project ${i + 1}`, {
      x: 0.5 + col * (cellW + gap), y: y + 0.10, w: cellW, h: 0.30,
      fontFace: FONT.b, fontSize: 10, color: COLOR.amber, charSpacing: 3, bold: true,
      align: "center", margin: 0
    });
    s.addText(n, {
      x: 0.5 + col * (cellW + gap), y: y + 0.42, w: cellW, h: 0.45,
      fontFace: FONT.h, fontSize: 13, color: COLOR.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
  });

  // 우측 강조 문장
  s.addText("문제 → 데이터 → AI → 화면 → 배포", {
    x: 5.10, y: 2.20, w: 4.4, h: 0.45,
    fontFace: FONT.h, fontSize: 20, color: COLOR.amber, bold: true, margin: 0
  });
  s.addText("Project 0 에서 익힌 순서가 이후 6개 프로젝트의 공통 골격이 됩니다.", {
    x: 5.10, y: 2.70, w: 4.4, h: 1.0,
    fontFace: FONT.b, fontSize: 14, color: COLOR.ice, lineSpacingMultiple: 1.4, margin: 0
  });

  s.addText("Thank you", {
    x: 5.10, y: 3.85, w: 4.4, h: 0.6,
    fontFace: FONT.h, fontSize: 28, color: COLOR.white, bold: true, margin: 0
  });
  s.addText("AI혁신 길라잡이 김사부 | AI 앱크리에이터 과정", {
    x: 5.10, y: 4.45, w: 4.4, h: 0.4,
    fontFace: FONT.b, fontSize: 11, color: COLOR.ice, margin: 0
  });
}

// =====================================================================
// 저장
// =====================================================================
const out = path.join(__dirname, "Project0_강의슬라이드.pptx");
pres.writeFile({ fileName: out }).then(() => {
  console.log("OK:", out);
});
