import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// =========================================================================
// 0. PORTFOLIO WEB APPS DATA (100% preserved from portfolio.html)
// =========================================================================
const PROJECTS = [
  {
    id: 'health-hub',
    kicker: 'WEB APP 01 · SMART EHS PLATFORM',
    status: 'Live Service',
    themeClass: 'theme-hub',
    brand: 'HEALTH-HUB',
    domain: 'health-hub-workspace.vercel.app',
    url: 'https://health-hub-workspace.vercel.app',
    title: 'HEALTH-HUB 스마트 보건관리 통합 플랫폼',
    subtitle: '아날로그 보건관리 업무를 페이퍼리스로 전환한 통합 디지털 워크스페이스',
    summary: 'MSDS 법적 규제대상 자동 분류와 기상청 API 연동 온열질환 실시간 모니터링을 하나의 플랫폼에 통합해 행정 오류와 검토 시간을 대폭 줄였습니다.',
    problem: '제조업 위탁 사업장 보건관리 현장에서 방대한 MSDS 문서를 수작업으로 대조해 법적 규제 대상을 분류하고, 하절기 체감온도를 매번 개별 확인하는 과정에 많은 시간과 인적 오류 위험이 발생했습니다.',
    solution: 'AI 코딩 협업과 React·Next.js 기반 웹앱 아키텍처를 결합해 MSDS 첨부 시 내부 알고리즘과 AI 분석으로 산안법·화관법 규제 물질을 자동 추출하도록 구현하고, 기상청 API를 연동해 현장별 온열질환 리스크를 실시간 수치화했습니다.',
    features: [
      'MSDS 문서 첨부 시 산안법·화관법 규제대상 물질 자동 분류',
      '기상청 API 연동 현장별 실시간 체감온도 및 온열질환 모니터링',
      '최신 산업안전보건법 및 KOSHA Guide 기반 컴플라이언스 검토 지원',
      '아날로그 서류 중심 보건관리 업무의 페이퍼리스(Paperless) 통합 관리'
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'AI Analysis', '기상청 API', 'Vercel'],
    iconSvg: '<path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/><path d="M9 12l2 2 4-4"/>'
  },
  {
    id: 'local-ventilation',
    kicker: 'WEB APP 02 · ENGINEERING CALCULATOR',
    status: 'Field Verified',
    themeClass: 'theme-vent',
    brand: 'Local Ventilation',
    domain: 'localventilation.netlify.app',
    url: 'https://localventilation.netlify.app/',
    title: '산업환기 기술계산 웹앱',
    subtitle: '현장에서 스마트폰으로 즉시 환기량과 산출 근거를 검증하는 공학 계산 도구',
    summary: '복잡한 후드 유형별 환기량 수식을 엑셀 대신 모바일·PC 웹앱으로 옮겨, 출장 현장에서도 계산 결과와 산출 과정을 즉시 확인할 수 있게 구현했습니다.',
    problem: '산업환기 기술지도 시 후드 유형별 제어풍속·필요환기량 계산식을 매번 엑셀에서 찾아 입력해야 했고, 출장 현장에서 즉각 결과를 확인하고 사업장 담당자에게 근거를 설명하기 어려웠습니다.',
    solution: '코딩 경험 없이 생성형 AI와 협업해 시작한 첫 현장 혁신 프로젝트로, 후드 유형별 계산식·단위·표기 방식을 산업환기 원리와 직접 교차 검증하며 오류를 잡았고 결과값과 산출 과정을 함께 보여주도록 설계했습니다.',
    features: [
      '후드 유형별 필요환기량 및 제어풍속 정밀 기술계산 엔진',
      '단순 결과값뿐 아니라 단계별 산출 공식과 계산 근거 투명 표시',
      '출장 현장 모바일 환경과 사무실 PC 모두에 최적화된 반응형 UI',
      '국소배기장치 성능 검증 및 공학적 개선안 제안 속도 획기적 단축'
    ],
    stack: ['JavaScript', 'Industrial Ventilation', 'Generative AI', 'Responsive UI', 'Netlify'],
    iconSvg: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>'
  },
  {
    id: 'kiha-safety',
    kicker: 'WEB APP 03 · CONFINED SPACE SAFETY',
    status: 'Live Service',
    themeClass: 'theme-kiha',
    brand: 'KIHA Safety Web',
    domain: 'kiha-safety-web.vercel.app',
    url: 'https://kiha-safety-web.vercel.app/',
    title: '밀폐공간 위험성평가 & 안전조치 웹앱',
    subtitle: '맨홀 등 고위험 밀폐공간 질식재해를 사전 통제하는 현장 점검 솔루션',
    summary: '산소·유해가스 농도 측정, 환기팬 가동, 공기호흡기 비치, 감시인 배치 등 필수 안전작업허가(PTW) 요건을 현장에서 직관적으로 검증합니다.',
    problem: '하절기 맨홀 등 밀폐공간 작업은 단 한 번의 절차 누락이 치명적인 질식사고로 이어지지만, 기존 서류 위주의 점검표는 현장에서 실시간 위험성평가와 필수 안전조치 확인에 한계가 있었습니다.',
    solution: '고용노동부·안전보건공단 연계 밀폐공간 질식재해 예방 전문가로 현장을 점검하며 쌓은 실무 노하우를 AI 웹 개발로 시스템화해, 작업 전 적정공기 확인부터 안전작업허가 검증까지 체계적으로 수행할 수 있게 구현했습니다.',
    features: [
      '밀폐공간 작업 전 산소·유해가스 농도(적정공기) 기준 체크 및 평가',
      '환기팬 가동·공기호흡기 비치·감시인 배치 등 필수 안전조치 검증',
      '서류 점검을 대체하는 현장 밀착형 안전작업허가(PTW) 프로세스 지원',
      '사고 후 대응이 아닌 작업 전 위험요인 선제 통제 중심의 UX 설계'
    ],
    stack: ['React', 'TypeScript', 'PTW Checklist', 'AI Workflow', 'Vercel'],
    iconSvg: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
  },
  {
    id: 'sif-master',
    kicker: 'WEB APP 04 · RISK ASSESSMENT PWA',
    status: '부서 실무 도입',
    themeClass: 'theme-sif',
    brand: 'SIF Master PWA',
    domain: 'sif-master-pwa.vercel.app',
    url: 'https://sif-master-pwa.vercel.app/',
    title: 'SIF Master 일반 위험성평가 PWA',
    subtitle: '소속 부서 실제 업무에 도입되어 활용 중인 현장 중심 위험성평가 앱',
    summary: '실무자가 실제 현장에서 업무를 수행하는 순서 그대로 화면을 설계해, 위험요인 발굴부터 개선대책 수립까지 매끄럽게 이어지는 PWA 웹앱입니다.',
    problem: '기존 위험성평가 도구는 현장 동선과 동떨어진 복잡한 양식 중심이어서 실무자들이 현장에서 즉시 기록하고 개선조치로 연결하는 데 부담이 컸습니다.',
    solution: '앞선 환기·밀폐공간 웹앱 개발 경험을 발전시켜 현장 실무자의 실제 작업 순서를 반영한 PWA(Progressive Web App)로 직접 기획·개발했고, 개인 학습을 넘어 소속 부서의 실제 업무 도구로 채택되었습니다.',
    features: [
      '현장 실무자 업무 흐름에 맞춘 단계별 위험성평가 입력 및 평가 인터페이스',
      '중대재해 고위험요인(SIF) 중심의 체계적 위험도 판정 및 개선대책 관리',
      '모바일 홈 화면 설치 및 현장 접근성을 높인 PWA 구조 적용',
      '개인 프로젝트를 넘어 조직 내부 실제 업무 프로세스에 정식 적용'
    ],
    stack: ['React', 'Next.js', 'PWA', 'Supabase / Firebase', 'Vercel'],
    iconSvg: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 12l2 2 4-4"/><path d="M7 8h10"/>'
  }
];

const projectsGrid = document.getElementById('projectsGrid');
PROJECTS.forEach((proj, projIdx) => {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'project-card reveal';
  card.style.setProperty('--reveal-delay', `${100 + projIdx * 90}ms`);
  card.setAttribute('data-project-id', proj.id);
  card.innerHTML = `
    <div class="project-visual ${proj.themeClass}">
      <div class="pv-top">
        <span>${proj.kicker}</span>
        <span class="pv-status">${proj.status}</span>
      </div>
      <div class="pv-mockup">
        <div>
          <div class="pv-brand">${proj.brand}</div>
          <div class="pv-domain">${proj.domain}</div>
        </div>
        <div class="pv-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">${proj.iconSvg}</svg>
        </div>
      </div>
    </div>
    <div class="project-body">
      <div class="project-title">${proj.title}</div>
      <p class="project-summary">${proj.summary}</p>
      <div class="project-footer">
        <div class="project-tags">
          ${proj.stack.slice(0, 3).map((t) => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <span class="project-cta">상세 보기 →</span>
      </div>
    </div>
  `;
  card.addEventListener('click', () => openProjectModal(proj));
  projectsGrid.appendChild(card);
});

// Project Detail Modal
const projectModal = document.getElementById('projectModal');
const modalBanner = document.getElementById('modalBanner');
const modalKicker = document.getElementById('modalKicker');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalProblem = document.getElementById('modalProblem');
const modalSolution = document.getElementById('modalSolution');
const modalFeatures = document.getElementById('modalFeatures');
const modalStack = document.getElementById('modalStack');
const modalUrlText = document.getElementById('modalUrlText');
const modalLiveLink = document.getElementById('modalLiveLink');
const modalCloseBtn = document.getElementById('modalCloseBtn');

function openProjectModal(proj) {
  modalBanner.className = 'modal-banner ' + proj.themeClass;
  modalKicker.textContent = proj.kicker + ' · ' + proj.status;
  modalTitle.textContent = proj.title;
  modalSubtitle.textContent = proj.subtitle;
  modalProblem.textContent = proj.problem;
  modalSolution.textContent = proj.solution;
  modalFeatures.innerHTML = proj.features.map((f) => `<li>${f}</li>`).join('');
  modalStack.innerHTML = proj.stack.map((s) => `<span class="skill-pill">${s}</span>`).join('');
  modalUrlText.textContent = proj.url;
  modalLiveLink.href = proj.url;

  projectModal.classList.add('is-open');
  document.body.classList.add('modal-open');
}

function closeProjectModal() {
  projectModal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

modalCloseBtn.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) closeProjectModal();
});

// Toast & Copy Email
const toastEl = document.getElementById('toast');
let toastTimer = null;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('is-visible');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('is-visible');
  }, 2200);
}

const copyEmailBtn = document.getElementById('copyEmailBtn');
copyEmailBtn.addEventListener('click', () => {
  const email = 'yusuk1548@gmail.com';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email)
      .then(() => showToast('이메일 주소(yusuk1548@gmail.com)가 복사되었습니다.'))
      .catch(() => fallbackCopy(email));
  } else {
    fallbackCopy(email);
  }
});

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast(`이메일 주소(${text})가 복사되었습니다.`);
  } catch {
    showToast(`이메일: ${text}`);
  }
  document.body.removeChild(ta);
}

// =========================================================================
// 1. THEME STATE (Light / Dark mode + shortcut 'D' + OS sync)
// =========================================================================
const rootEl = document.documentElement;
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIconSun = document.getElementById('themeIconSun');
const themeIconMoon = document.getElementById('themeIconMoon');
const themeLabel = document.getElementById('themeLabel');

let isDark = false;
try {
  const savedTheme = localStorage.getItem('portfolio_theme');
  if (savedTheme === 'dark') isDark = true;
} catch {}

function applyTheme(dark) {
  isDark = dark;
  if (dark) {
    rootEl.setAttribute('data-theme', 'dark');
    themeIconSun.style.display = 'block';
    themeIconMoon.style.display = 'none';
    themeLabel.textContent = 'Light';
  } else {
    rootEl.removeAttribute('data-theme');
    themeIconSun.style.display = 'none';
    themeIconMoon.style.display = 'block';
    themeLabel.textContent = 'Dark';
  }
  try {
    localStorage.setItem('portfolio_theme', dark ? 'dark' : 'light');
  } catch {}
}

applyTheme(isDark);

themeToggleBtn.addEventListener('click', () => applyTheme(!isDark));

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('is-open')) {
    closeProjectModal();
    return;
  }
  if (e.key === 'd' || e.key === 'D') {
    if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    applyTheme(!isDark);
  }
});

if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', (e) => applyTheme(e.matches));
  }
}

// =========================================================================
// 2. APPLE-STYLE 2K (2048x1280) TITANIUM & SAPPHIRE GLASS "AI × EHS" PORTAL
//    - Continuous createConicGradient sweep (0% dotted artifacts!)
//    - Multi-layer recessed 3D depth + layered mouse/touch parallax
//    - Matches var(--bg) (#f6f6f2 / #151517) 1:1 for seamless vector handoff
// =========================================================================
const portalCanvas = document.createElement('canvas');
portalCanvas.width = 2048;
portalCanvas.height = 1280;
const pCtx = portalCanvas.getContext('2d');

// Physical MacBook Pro 14" display aspect ratio is 30.076 / 19.32 = 1.5567,
// while canvas is 2048 / 1280 = 1.60 -> subtle X scale keeps the ring a 100% true circle in 3D
const SCREEN_ASPECT_COMP = (2048 / 1280) / 1.5567;
const CANVAS_RING_RADIUS = 350; // 350 / 1280 = 0.2734375 of display height

// 4K Vector Baton-Pass Overlay DOM refs
const portalVectorOverlay = document.getElementById('portal-vector-overlay');
const portalVectorStage = document.getElementById('portalVectorStage');
const portalVectorLabel = document.getElementById('portalVectorLabel');
const pvLayerOuter = document.getElementById('pvLayerOuter');
const pvLayerMain = document.getElementById('pvLayerMain');
const pvLayerInner = document.getElementById('pvLayerInner');
const pvSweepGroup = document.getElementById('pvSweepGroup');

let themeBlend = isDark ? 1 : 0;

function mixChan(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function mixRgb(c1, c2, t) {
  return `rgb(${mixChan(c1[0], c2[0], t)}, ${mixChan(c1[1], c2[1], t)}, ${mixChan(c1[2], c2[2], t)})`;
}

function mixRgba(c1, c2, t, a1, a2) {
  const a = a1 + (a2 - a1) * t;
  return `rgba(${mixChan(c1[0], c2[0], t)}, ${mixChan(c1[1], c2[1], t)}, ${mixChan(c1[2], c2[2], t)}, ${a.toFixed(4)})`;
}

const LIGHT_BG = [246, 246, 242];    // #f6f6f2 (:root --bg)
const DARK_BG = [21, 21, 23];        // #151517 ([data-theme="dark"] --bg)
const LIGHT_RING_HI = [37, 69, 117]; // #254575 brushed titanium highlight
const DARK_RING_HI = [255, 255, 255];
const LIGHT_RING = [15, 31, 56];     // #0f1f38 deep Apple navy-titanium
const DARK_RING = [220, 229, 244];   // #dce5f4 silver-titanium
const LIGHT_RING_LO = [6, 16, 32];   // #061020 deep chamfer shadow
const DARK_RING_LO = [150, 173, 201];
const LIGHT_ACCENT = [54, 96, 152];  // #366098
const DARK_ACCENT = [140, 180, 232]; // #8cb4e8

function drawPortalScreen(t, mx = 0, my = 0, contentAlpha = 1, parallaxDamp = 1) {
  const w = portalCanvas.width;
  const h = portalCanvas.height;
  const tb = themeBlend;

  // 1) Pure theme-matched background (1:1 identical to var(--bg))
  pCtx.globalCompositeOperation = 'source-over';
  pCtx.globalAlpha = 1;
  pCtx.fillStyle = mixRgb(LIGHT_BG, DARK_BG, tb);
  pCtx.fillRect(0, 0, w, h);

  if (contentAlpha <= 0.002) return;

  const R = CANVAS_RING_RADIUS;
  const ringW = R * 0.0955; // ~33.4px (exact match to SVG 21/220)
  const pScale = parallaxDamp; // unified parallax damping matched with 4K vector overlay

  // Multi-layer depth parallax offsets (outer 0.55x, main 1.0x, inner 1.18x, text 1.55x)
  const outX = mx * 15 * pScale;
  const outY = my * 10 * pScale;
  const mainX = mx * 26 * pScale;
  const mainY = my * 18 * pScale;
  const inX = mx * 31 * pScale;
  const inY = my * 21 * pScale;
  const txtX = mx * 41 * pScale;
  const txtY = my * 28 * pScale;

  const sweepAngle = t * 0.52 - Math.PI * 0.35;

  pCtx.save();
  pCtx.globalAlpha = contentAlpha;

  // --- LAYER A: Outer studio aura + frosted glass bezel + hairline guide ---
  pCtx.save();
  pCtx.translate(w * 0.5 + outX, h * 0.5 + outY);
  pCtx.scale(SCREEN_ASPECT_COMP, 1);

  const auraR = R * 1.545;
  const auraGrad = pCtx.createRadialGradient(0, 0, R * 0.80, 0, 0, auraR);
  auraGrad.addColorStop(0, mixRgba(LIGHT_ACCENT, DARK_ACCENT, tb, 0, 0));
  auraGrad.addColorStop(0.38, mixRgba(LIGHT_ACCENT, DARK_ACCENT, tb, 0.10, 0.14));
  auraGrad.addColorStop(0.72, mixRgba(LIGHT_ACCENT, DARK_ACCENT, tb, 0.03, 0.05));
  auraGrad.addColorStop(1, mixRgba(LIGHT_ACCENT, DARK_ACCENT, tb, 0, 0));
  pCtx.fillStyle = auraGrad;
  pCtx.beginPath();
  pCtx.arc(0, 0, auraR, 0, Math.PI * 2);
  pCtx.fill();

  // Outer fine orbital guide
  pCtx.lineWidth = 2.0;
  pCtx.strokeStyle = mixRgba(LIGHT_RING, DARK_RING, tb, 0.11, 0.13);
  pCtx.beginPath();
  pCtx.arc(0, 0, R * 1.22, 0, Math.PI * 2);
  pCtx.stroke();

  // Frosted-glass outer rim ring
  const glassGrad = pCtx.createLinearGradient(-R * 1.15, -R * 1.15, R * 1.15, R * 1.15);
  glassGrad.addColorStop(0, mixRgba([255, 255, 255], [255, 255, 255], tb, 0.55, 0.34));
  glassGrad.addColorStop(0.5, mixRgba(LIGHT_RING, DARK_RING, tb, 0.15, 0.18));
  glassGrad.addColorStop(1, mixRgba(LIGHT_RING_LO, DARK_RING_LO, tb, 0.22, 0.12));
  pCtx.lineWidth = 7.6;
  pCtx.strokeStyle = glassGrad;
  pCtx.beginPath();
  pCtx.arc(0, 0, R * 1.155, 0, Math.PI * 2);
  pCtx.stroke();
  pCtx.restore();

  // --- LAYER B: Sculpted Titanium Main Ring + Continuous Conic Studio Specular ---
  pCtx.save();
  pCtx.translate(w * 0.5 + mainX, h * 0.5 + mainY);
  pCtx.scale(SCREEN_ASPECT_COMP, 1);

  // Soft studio drop shadow underneath ring
  pCtx.save();
  pCtx.shadowColor = mixRgba([10, 22, 42], [0, 0, 0], tb, 0.24, 0.58);
  pCtx.shadowBlur = 42;
  pCtx.shadowOffsetX = -mx * 8 * pScale;
  pCtx.shadowOffsetY = 16 - my * 6 * pScale;

  const metalGrad = pCtx.createLinearGradient(-R * 0.78, -R * 0.80, R * 0.78, R * 0.80);
  metalGrad.addColorStop(0, mixRgb(LIGHT_RING_HI, DARK_RING_HI, tb));
  metalGrad.addColorStop(0.46, mixRgb(LIGHT_RING, DARK_RING, tb));
  metalGrad.addColorStop(1, mixRgb(LIGHT_RING_LO, DARK_RING_LO, tb));

  pCtx.strokeStyle = metalGrad;
  pCtx.lineWidth = ringW;
  pCtx.beginPath();
  pCtx.arc(0, 0, R, 0, Math.PI * 2);
  pCtx.stroke();
  pCtx.restore();

  // Precision outer & inner metallic chamfer highlights
  pCtx.lineWidth = 3.3;
  pCtx.strokeStyle = mixRgba([255, 255, 255], [255, 255, 255], tb, 0.58, 0.82);
  pCtx.beginPath();
  pCtx.arc(0, 0, R * 1.045, 0, Math.PI * 2);
  pCtx.stroke();

  pCtx.lineWidth = 3.0;
  pCtx.strokeStyle = mixRgba([186, 212, 248], [255, 255, 255], tb, 0.42, 0.50);
  pCtx.beginPath();
  pCtx.arc(0, 0, R * 0.955, 0, Math.PI * 2);
  pCtx.stroke();

  // 100% Continuous Conic Gradient Specular Sweep (ZERO dots, ZERO stepping!)
  pCtx.save();
  let sweepStyle;
  if (typeof pCtx.createConicGradient === 'function') {
    const cg = pCtx.createConicGradient(sweepAngle, 0, 0);
    cg.addColorStop(0.00, mixRgba([200, 224, 255], [255, 255, 255], tb, 0.0, 0.0));
    cg.addColorStop(0.08, mixRgba([200, 224, 255], [255, 255, 255], tb, 0.32, 0.42));
    cg.addColorStop(0.15, mixRgba([225, 240, 255], [255, 255, 255], tb, 0.86, 0.95));
    cg.addColorStop(0.22, mixRgba([200, 224, 255], [255, 255, 255], tb, 0.28, 0.36));
    cg.addColorStop(0.32, mixRgba([200, 224, 255], [255, 255, 255], tb, 0.0, 0.0));
    cg.addColorStop(0.58, mixRgba([200, 224, 255], [255, 255, 255], tb, 0.0, 0.0));
    cg.addColorStop(0.65, mixRgba([200, 224, 255], [255, 255, 255], tb, 0.30, 0.38));
    cg.addColorStop(0.73, mixRgba([200, 224, 255], [255, 255, 255], tb, 0.0, 0.0));
    cg.addColorStop(1.00, mixRgba([200, 224, 255], [255, 255, 255], tb, 0.0, 0.0));
    sweepStyle = cg;
  } else {
    const lg = pCtx.createLinearGradient(
      Math.cos(sweepAngle) * R, Math.sin(sweepAngle) * R,
      -Math.cos(sweepAngle) * R, -Math.sin(sweepAngle) * R
    );
    lg.addColorStop(0, mixRgba([225, 240, 255], [255, 255, 255], tb, 0.85, 0.95));
    lg.addColorStop(0.4, mixRgba([200, 224, 255], [255, 255, 255], tb, 0, 0));
    lg.addColorStop(1, mixRgba([200, 224, 255], [255, 255, 255], tb, 0.28, 0.36));
    sweepStyle = lg;
  }
  pCtx.strokeStyle = sweepStyle;
  pCtx.lineWidth = ringW * 0.78;
  pCtx.beginPath();
  pCtx.arc(0, 0, R, 0, Math.PI * 2);
  pCtx.stroke();
  pCtx.restore();
  pCtx.restore();

  // --- LAYER C: Concave Recessed Sapphire Bowl Inner Shadow + Silver Hairline ---
  pCtx.save();
  pCtx.translate(w * 0.5 + inX, h * 0.5 + inY);
  pCtx.scale(SCREEN_ASPECT_COMP, 1);

  const bowlR = R * 0.952;
  const bowlGrad = pCtx.createRadialGradient(0, 0, bowlR * 0.68, 0, 0, bowlR);
  bowlGrad.addColorStop(0, mixRgba([10, 22, 42], [0, 0, 0], tb, 0.0, 0.0));
  bowlGrad.addColorStop(0.68, mixRgba([10, 22, 42], [0, 0, 0], tb, 0.07, 0.18));
  bowlGrad.addColorStop(1, mixRgba([10, 22, 42], [0, 0, 0], tb, 0.18, 0.44));
  pCtx.fillStyle = bowlGrad;
  pCtx.beginPath();
  pCtx.arc(0, 0, bowlR, 0, Math.PI * 2);
  pCtx.fill();

  // Recessed silver hairline ring
  pCtx.lineWidth = 2.5;
  pCtx.strokeStyle = mixRgba(LIGHT_RING, DARK_RING, tb, 0.24, 0.34);
  pCtx.beginPath();
  pCtx.arc(0, 0, R * 0.865, 0, Math.PI * 2);
  pCtx.stroke();
  pCtx.restore();

  // --- LAYER D: Bold Crisp "AI × EHS" Typography (foreground depth parallax) ---
  pCtx.save();
  pCtx.translate(w * 0.5 + txtX, h * 0.5 + txtY);
  pCtx.scale(SCREEN_ASPECT_COMP, 1);
  pCtx.textAlign = 'center';
  pCtx.textBaseline = 'middle';

  const fontStack = "'Pretendard', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif";
  const fontMain = `700 106px ${fontStack}`;
  const fontCross = `500 94px ${fontStack}`;

  pCtx.font = fontMain;
  const aiW = pCtx.measureText('AI').width;
  const ehsW = pCtx.measureText('EHS').width;
  pCtx.font = fontCross;
  const crossW = pCtx.measureText('×').width;
  const gap = 21;
  const totalW = aiW + gap + crossW + gap + ehsW;
  let cursorX = -totalW * 0.5;

  pCtx.shadowColor = mixRgba([15, 31, 56], [0, 0, 0], tb, 0.11, 0.44);
  pCtx.shadowBlur = 18;
  pCtx.shadowOffsetY = 5;

  pCtx.font = fontMain;
  pCtx.fillStyle = mixRgb(LIGHT_RING, DARK_RING, tb);
  pCtx.fillText('AI', cursorX + aiW * 0.5, 3);
  cursorX += aiW + gap;

  pCtx.font = fontCross;
  pCtx.fillStyle = mixRgb(LIGHT_ACCENT, DARK_ACCENT, tb);
  pCtx.fillText('×', cursorX + crossW * 0.5, -1);
  cursorX += crossW + gap;

  pCtx.font = fontMain;
  pCtx.fillStyle = mixRgb(LIGHT_RING, DARK_RING, tb);
  pCtx.fillText('EHS', cursorX + ehsW * 0.5, 3);

  pCtx.restore();
  pCtx.restore();
}

drawPortalScreen(0, 0, 0, 1);

// =========================================================================
// 3. THREE.JS SCENE: HIGH-DETAIL MACBOOK PRO 14" + 1K STUDIO HDRI + WAVE
// =========================================================================
const webglCanvas = document.getElementById('webgl-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas: webglCanvas,
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.94;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 0.05, 100);
camera.position.set(0, 0.44, 9.4);

// 3A. Fast 1K Studio HDRI Environment via RGBELoader + PMREMGenerator
let hdriReady = false;
let modelReady = false;

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

const rgbeLoader = new RGBELoader();
rgbeLoader.load(
  '/studio.hdr',
  (hdrTexture) => {
    hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
    const envRT = pmremGenerator.fromEquirectangular(hdrTexture);
    scene.environment = envRT.texture;
    scene.environmentIntensity = 0.96;
    hdrTexture.dispose();
    pmremGenerator.dispose();
    hdriReady = true;
  },
  undefined,
  (err) => {
    console.warn('HDRI load failed, falling back to studio lights:', err);
    hdriReady = true;
  }
);

// Precision Apple Commercial Studio Lighting (crisp silver aluminum + legible 3D keyboard)
const hemiLight = new THREE.HemisphereLight(0xf6f8fc, 0x454b56, 0.55);
scene.add(hemiLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 1.55);
keyLight.position.set(-3.4, 8.2, 5.2);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
keyLight.shadow.camera.near = 1;
keyLight.shadow.camera.far = 20;
keyLight.shadow.camera.left = -3.4;
keyLight.shadow.camera.right = 3.4;
keyLight.shadow.camera.top = 3.4;
keyLight.shadow.camera.bottom = -3.4;
keyLight.shadow.bias = -0.0004;
keyLight.shadow.radius = 4.5;
scene.add(keyLight);

// Soft overhead-front fill to catch sculpted keycaps & aluminum chamfers
const frontFill = new THREE.DirectionalLight(0xf2f6ff, 0.62);
frontFill.position.set(1.8, 4.0, 6.2);
scene.add(frontFill);

// Crisp cool rear rim light for CNC lid edge separation
const rimLight = new THREE.DirectionalLight(0xdce8ff, 0.85);
rimLight.position.set(5.2, 4.5, -5.0);
scene.add(rimLight);

// 3B. Bold Diagonal 3D Particle Silk-Wave Ribbon (100% preserved)
const cols = 240;
const rows = 92;
const totalPts = cols * rows;
const wavePositions = new Float32Array(totalPts * 3);
const waveUVs = new Float32Array(totalPts * 2);

let idx = 0;
let uvIdx = 0;
for (let i = 0; i < cols; i++) {
  const u = i / (cols - 1);
  for (let j = 0; j < rows; j++) {
    const v = j / (rows - 1);
    wavePositions[idx++] = (u - 0.5) * 23.0;
    wavePositions[idx++] = (v - 0.5) * 5.8;
    wavePositions[idx++] = 0;
    waveUVs[uvIdx++] = u;
    waveUVs[uvIdx++] = v;
  }
}

const waveGeo = new THREE.BufferGeometry();
waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
waveGeo.setAttribute('aUv', new THREE.BufferAttribute(waveUVs, 2));

const waveUniforms = {
  uTime: { value: 0 },
  uColor: { value: new THREE.Color(isDark ? 0xebebf2 : 0x26262a) },
  uOpacity: { value: isDark ? 0.85 : 0.72 },
  uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
  uMouse: { value: new THREE.Vector2(99.0, 99.0) },
  uMouseEnergy: { value: 0.0 }
};

const waveMat = new THREE.ShaderMaterial({
  uniforms: waveUniforms,
  transparent: true,
  depthWrite: false,
  vertexShader: `
    attribute vec2 aUv;
    uniform float uTime;
    uniform float uPixelRatio;
    uniform vec2 uMouse;
    uniform float uMouseEnergy;
    varying float vAlpha;
    varying float vShade;

    void main() {
      float u = aUv.x;
      float v = aUv.y;
      float vc = v - 0.5;
      vec3 pos = position;

      float flow = u * 6.8 - uTime * 0.65;
      float flow2 = u * 3.6 - uTime * 0.38;
      float spineY = sin(flow2) * 0.95 + cos(u * 2.4 + uTime * 0.25) * 0.45;

      float twistAngle = sin(flow * 0.55) * 1.15 + cos(u * 4.2 - uTime * 0.42) * 0.55;
      float localY = vc * 5.4;
      float localZ = sin(flow + vc * 5.2) * 0.92 + cos(u * 9.0 - uTime * 0.75 - vc * 3.8) * 0.42;

      float ct = cos(twistAngle);
      float st = sin(twistAngle);
      float foldedY = localY * ct - localZ * st;
      float foldedZ = localY * st + localZ * ct;

      pos.y = spineY + foldedY * 0.78;
      pos.z = foldedZ * 0.95;

      // Real-time mouse cursor 3D silk ripple & gentle magnetic swell
      vec2 toMouse = pos.xy - uMouse;
      float dist = length(toMouse);
      float influence = exp(-dist * dist * 0.16);
      float ripple = sin(dist * 2.8 - uTime * 5.2) * exp(-dist * 0.38);
      vec2 pushDir = dist > 0.001 ? normalize(toMouse) : vec2(0.0);

      float activeStrength = 0.55 + uMouseEnergy * 0.95;
      pos.xy += pushDir * influence * 0.42 * activeStrength;
      pos.z += (influence * 1.15 + ripple * 0.55) * activeStrength;

      float vEdge = smoothstep(0.0, 0.14, v) * smoothstep(1.0, 0.86, v);
      float uEdge = smoothstep(0.0, 0.06, u) * smoothstep(1.0, 0.94, u);
      float crest = 0.55 + 0.45 * abs(sin(v * 3.14159265 * 2.0 + flow * 0.4));
      float depthGlow = smoothstep(-2.4, 2.2, pos.z);
      vShade = clamp(mix(0.42, 1.0, depthGlow) + influence * 0.35 * activeStrength, 0.0, 1.25);
      vAlpha = vEdge * uEdge * crest;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      float sizeBase = mix(17.5, 29.0, depthGlow) + influence * 9.5 * activeStrength;
      gl_PointSize = clamp((sizeBase * uPixelRatio) / -mvPosition.z, 1.7, 5.4);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying float vAlpha;
    varying float vShade;

    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      if (d > 0.5) discard;
      float disc = smoothstep(0.5, 0.18, d);
      gl_FragColor = vec4(uColor, clamp(disc * vAlpha * vShade * uOpacity, 0.0, 0.96));
    }
  `
});

const particleWave = new THREE.Points(waveGeo, waveMat);
// Push wave cleanly behind the open MacBook screen so wave crests NEVER poke through the display
particleWave.position.set(0.0, 0.12, -3.8);
particleWave.rotation.set(0.14, 0.04, -0.46);
scene.add(particleWave);

// 3C. High-Detail 14" MacBook Pro (public/macbook.glb)
const screenTexture = new THREE.CanvasTexture(portalCanvas);
screenTexture.colorSpace = THREE.SRGBColorSpace;
screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
screenTexture.magFilter = THREE.LinearFilter;
screenTexture.generateMipmaps = true;
screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
// New macbook.glb display mesh ('Object_107') uses glTF UV convention (v=0 top, v=1 bottom),
// so flipY = false renders the 2K portal ring canvas upright and un-mirrored 1:1.
screenTexture.flipY = false;

function createContactShadowTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);

  const g1 = ctx.createRadialGradient(256, 256, 58, 256, 256, 246);
  g1.addColorStop(0, 'rgba(0, 0, 0, 0.34)');
  g1.addColorStop(0.56, 'rgba(0, 0, 0, 0.12)');
  g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.44)';
  ctx.filter = 'blur(16px)';
  ctx.beginPath();
  ctx.roundRect(96, 130, 320, 252, 28);
  ctx.fill();

  return new THREE.CanvasTexture(c);
}

const macbookGroup = new THREE.Group();
scene.add(macbookGroup);

// Reduced ~20% vs previous 3.64 so open MacBook sits cleanly beneath hero headline with generous gap
const TARGET_WIDTH = 2.90;
const TARGET_DEPTH = 2.05;

// Soft studio contact shadow beneath rubber feet
const contactShadowMat = new THREE.MeshBasicMaterial({
  map: createContactShadowTexture(),
  transparent: true,
  depthWrite: false,
  opacity: isDark ? 0.38 : 0.76
});
const contactShadowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(TARGET_WIDTH * 1.46, TARGET_DEPTH * 1.48),
  contactShadowMat
);
contactShadowPlane.rotation.x = -Math.PI / 2;
contactShadowPlane.position.set(0, -0.006, 0.02);
macbookGroup.add(contactShadowPlane);

// Real directional PCF soft shadow catcher on studio floor
const floorShadowMat = new THREE.ShadowMaterial({
  opacity: isDark ? 0.12 : 0.24
});
const floorShadowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  floorShadowMat
);
floorShadowPlane.rotation.x = -Math.PI / 2;
floorShadowPlane.position.set(0, -0.010, 0);
floorShadowPlane.receiveShadow = true;
macbookGroup.add(floorShadowPlane);

// References discovered & bound dynamically from macbook.glb
let lidPivot = null;
let screenMesh = null;
const screenLocalCenter = new THREE.Vector3();
const screenWorldCenter = new THREE.Vector3();

// Exact rotation offsets around the re-pivoted mechanical hinge axis of RcexTyyhpuJYATQ_61
// (Baked pose = 0 rad = 110° open; +1.885 rad closes lid flush over deck; +0.16 rad = ~101° hero open; +0.349 rad = 90° vertical for zoom-in)
const LID_CLOSED_X = 1.885;
const LID_OPEN_X = 0.16;
const LID_ZOOM_VERTICAL_X = 0.3491; // +20 deg -> screen normal becomes exact [0, 0, +1]

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// Material buckets identified from macbook.glb inspection
const ALUMINUM_SHELL_MATS = new Set(['zNRfbdNyoCOxSDD', 'HdeQgqDhVRltuvQ', 'XvtJEVWVvyDeJRR']);
const TRACKPAD_MATS = new Set(['WiyOPYJEeiHNVjF']);
const KEYCAP_MATS = new Set(['waAAeDqzqDLObIi', 'sqkqSXQCeccDMmm', 'kMkIQgtfAZdmtyc']);
const KEY_LEGEND_MATS = new Set(['quuXrfeUujYrUMo']);
const BEZEL_GLASS_MATS = new Set(['ZtrFkpzRROyZncn', 'pKaDkdyuuvylYHt']);

gltfLoader.load(
  '/macbook.glb',
  (gltf) => {
    const model = gltf.scene;

    // 1) Inspect hierarchy & tune PBR materials for crisp Apple Silver Aluminum + 3D Keyboard
    model.traverse((obj) => {
      if (!obj.isMesh) return;

      const mat = obj.material;
      const matName = mat && mat.name ? mat.name : '';

      // Identify display screen mesh (Object_107 / material HlQwFCAPWzetDQy with emissiveMap)
      if (obj.name === 'Object_107' || matName === 'HlQwFCAPWzetDQy' || (mat && mat.emissiveMap)) {
        screenMesh = obj;
        obj.castShadow = false;
        obj.receiveShadow = false;
        obj.material = new THREE.MeshBasicMaterial({
          map: screenTexture,
          toneMapped: false
        });
        obj.geometry.computeBoundingBox();
        if (obj.geometry.boundingBox) {
          obj.geometry.boundingBox.getCenter(screenLocalCenter);
        }
        return;
      }

      obj.castShadow = true;
      obj.receiveShadow = true;

      if (!mat) return;

      if (ALUMINUM_SHELL_MATS.has(matName)) {
        // Authentic Apple Silver Anodized Aluminum preserving original normal + roughness maps
        mat.color.setHex(0xcfd4dc);
        mat.envMapIntensity = 1.08;
        mat.needsUpdate = true;
      } else if (TRACKPAD_MATS.has(matName)) {
        // Force Touch Glass Trackpad in slightly cooler silver tone for crisp deck contrast
        mat.color.setHex(0xbec4ce);
        mat.envMapIntensity = 1.0;
        mat.needsUpdate = true;
      } else if (KEYCAP_MATS.has(matName)) {
        // Matte anodized jet-black sculpted keycaps & recessed keyboard well with crisp specular edges
        mat.color.setHex(0x16181e);
        mat.metalness = 0.14;
        mat.roughness = 0.48;
        mat.envMapIntensity = 0.72;
        mat.needsUpdate = true;
      } else if (KEY_LEGEND_MATS.has(matName)) {
        // Subtle crisp white backlit MacBook keycap legends
        mat.color.setHex(0xeaf0f8);
        if (mat.emissive) {
          mat.emissive.setHex(0xd8e4f5);
          mat.emissiveIntensity = 0.28;
        }
        mat.roughness = 0.35;
        mat.needsUpdate = true;
      } else if (BEZEL_GLASS_MATS.has(matName)) {
        // Glossy obsidian glass bezel & dark chrome Apple logo
        mat.envMapIntensity = 0.85;
        mat.needsUpdate = true;
      } else if (mat.envMapIntensity !== undefined) {
        mat.envMapIntensity = 0.88;
      }
    });

    // 2) Re-pivot the upper lid assembly ('RcexTyyhpuJYATQ_61') cleanly onto its real hinge axis
    const lidRawNode = model.getObjectByName('RcexTyyhpuJYATQ_61');
    if (lidRawNode && lidRawNode.parent) {
      const hingeLocal = new THREE.Vector3(0, -11.0, 0.25);
      lidPivot = new THREE.Group();
      lidPivot.name = 'MacBookLidHingePivot';
      lidPivot.position.copy(hingeLocal);

      lidRawNode.parent.add(lidPivot);
      lidRawNode.position.sub(hingeLocal);
      lidPivot.add(lidRawNode);

      // Start completely closed before preloader fades out
      lidPivot.rotation.x = LID_CLOSED_X;
    }

    // 3) Normalize scale & center base chassis ('EhCmdLAMoLoXcIA_43') so y=0 rests on rubber feet
    const baseNode = model.getObjectByName('EhCmdLAMoLoXcIA_43') || model;
    model.updateMatrixWorld(true);
    const baseBox = new THREE.Box3().setFromObject(baseNode);
    const baseSize = new THREE.Vector3();
    const baseCenter = new THREE.Vector3();
    baseBox.getSize(baseSize);
    baseBox.getCenter(baseCenter);

    const modelScale = TARGET_WIDTH / Math.max(0.001, baseSize.x);
    model.scale.setScalar(modelScale);
    model.position.set(
      -baseCenter.x * modelScale,
      -baseBox.min.y * modelScale,
      -baseCenter.z * modelScale
    );

    macbookGroup.add(model);
    macbookGroup.updateMatrixWorld(true);
    modelReady = true;

    console.info('[MacBook GLB Loaded]', {
      lidPivot: lidPivot ? lidPivot.name : null,
      screenMesh: screenMesh ? screenMesh.name : null,
      scale: Number(modelScale.toFixed(4))
    });
  },
  undefined,
  (err) => {
    console.error('Failed to load /macbook.glb:', err);
    modelReady = true;
  }
);

// =========================================================================
// 4. FAST PRELOADER + INTRO + SCROLL CHOREOGRAPHY + ACCURATE VIEWPORT NAV SYNC
// =========================================================================
const preloader = document.getElementById('preloader');
const hexProgress = document.getElementById('hexProgress');
const topControls = document.getElementById('topControls');
const floatingNav = document.getElementById('floatingNav');
const navLinks = Array.from(floatingNav.querySelectorAll('a'));
const heroCopy = document.getElementById('heroCopy');
const heroBottomBar = document.getElementById('heroBottomBar');
const scrollIndicator = document.getElementById('scrollIndicator');
const scrollIndicatorFill = document.getElementById('scrollIndicatorFill');
const scrollTrack = document.getElementById('scrollTrack');
const replayBtn = document.getElementById('replayBtn');
const backToTopBtn = document.getElementById('backToTopBtn');

const HEX_LEN = 168;
const PRELOADER_MIN_SEC = 0.88; // Crisp 0.8–1.0s minimum splash
let introState = 'preloader';
let introStartTime = 0;
let preloaderStartTime = performance.now();

let targetHeroP = 0;
let currentHeroP = 0;
let isHeroInView = true;

let mouseX = 0;
let mouseY = 0;
let smoothMouseX = 0;
let smoothMouseY = 0;
let mouseActive = false;
let targetMouseEnergy = 0;
let smoothMouseEnergy = 0;
let prevClientX = 0;
let prevClientY = 0;

function updatePointerInput(clientX, clientY, energyScale = 1.0, rangeScale = 1.0) {
  const dx = clientX - prevClientX;
  const dy = clientY - prevClientY;
  prevClientX = clientX;
  prevClientY = clientY;
  const speed = Math.min(1.0, Math.hypot(dx, dy) / 38);
  targetMouseEnergy = Math.max(targetMouseEnergy, (0.35 + speed * 0.85) * energyScale);
  mouseActive = true;
  mouseX = ((clientX / Math.max(1, window.innerWidth)) - 0.5) * 2 * rangeScale;
  mouseY = ((clientY / Math.max(1, window.innerHeight)) - 0.5) * 2 * rangeScale;
}

window.addEventListener('mousemove', (e) => {
  updatePointerInput(e.clientX, e.clientY, 1.0, 1.0);
});

// Passive touch listeners: gentle 3D wave & MacBook feedback without ever blocking vertical scroll
window.addEventListener('touchstart', (e) => {
  if (!e.touches || !e.touches.length) return;
  const t = e.touches[0];
  prevClientX = t.clientX;
  prevClientY = t.clientY;
  updatePointerInput(t.clientX, t.clientY, 0.55, 0.65);
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  if (!e.touches || !e.touches.length) return;
  const t = e.touches[0];
  updatePointerInput(t.clientX, t.clientY, 0.6, 0.65);
}, { passive: true });

window.addEventListener('touchend', () => {
  // Smoothly return MacBook to center once finger lifts
  mouseX = 0;
  mouseY = 0;
}, { passive: true });

const sectionIds = ['about', 'career', 'projects', 'capabilities', 'contact'];
const sectionEls = sectionIds.map((id) => document.getElementById(id));
const aboutEl = document.getElementById('about');

// =========================================================================
// 4A. APPLE-STYLE SCROLL REVEAL (IntersectionObserver + Instant Nav Jump)
// =========================================================================
const revealEls = Array.from(document.querySelectorAll('.reveal'));
let revealObserver = null;

function markRevealed(el, instant = false) {
  if (!el || el.classList.contains('is-visible')) return;
  if (instant) {
    el.style.setProperty('--reveal-delay', '0ms');
  }
  el.classList.add('is-visible');
  if (revealObserver) revealObserver.unobserve(el);

  const delayVal = instant ? 0 : (parseFloat(getComputedStyle(el).getPropertyValue('--reveal-delay')) || 0);
  setTimeout(() => {
    el.classList.add('is-settled');
  }, delayVal + 850);
}

function revealSectionImmediately(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return;
  const targets = target.querySelectorAll('.reveal');
  targets.forEach((el, i) => {
    el.style.setProperty('--reveal-delay', `${Math.min(i * 45, 220)}ms`);
    markRevealed(el, false);
  });
}

function revealVisibleInViewport(forceInView = false) {
  const vh = window.innerHeight;
  const cutoff = forceInView ? vh * 0.96 : vh * 0.72;
  revealEls.forEach((el) => {
    if (el.classList.contains('is-visible')) return;
    const rect = el.getBoundingClientRect();
    // Fallback for fast scrolls, tall cards, or elements already above viewport
    if (rect.top <= cutoff) {
      markRevealed(el, rect.bottom < 0);
    }
  });
}

if ('IntersectionObserver' in window) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          markRevealed(entry.target, false);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => markRevealed(el, true));
}

// Guarantee immediate reveal when clicking floating nav tabs or jumping via URL hash
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('#')) {
      const targetId = href.slice(1);
      revealSectionImmediately(targetId);
      setTimeout(() => revealVisibleInViewport(true), 350);
      setTimeout(() => revealVisibleInViewport(true), 800);
    }
  });
});

window.addEventListener('hashchange', () => {
  const id = window.location.hash.replace(/^#/, '');
  if (id) revealSectionImmediately(id);
  revealVisibleInViewport(true);
});

if (window.location.hash) {
  revealSectionImmediately(window.location.hash.replace(/^#/, ''));
}
revealVisibleInViewport(true);

function updateScrollState() {
  const heroMax = Math.max(1, scrollTrack.offsetHeight - window.innerHeight);
  targetHeroP = Math.max(0, Math.min(1, window.scrollY / heroMax));
  isHeroInView = window.scrollY < scrollTrack.offsetHeight + 120;

  revealVisibleInViewport();

  // Global scroll progress bar
  const docMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const docP = Math.max(0, Math.min(1, window.scrollY / docMax));
  scrollIndicatorFill.style.height = (docP * 100).toFixed(1) + '%';

  // Show floating nav ONLY once About section enters the upper viewport
  const aboutRect = aboutEl.getBoundingClientRect();
  if (aboutRect.top <= window.innerHeight * 0.55 && introState !== 'preloader') {
    floatingNav.classList.add('is-visible');
  } else {
    floatingNav.classList.remove('is-visible');
  }

  // Viewport-relative active tab calculation
  const triggerLine = window.innerHeight * 0.38;
  let activeId = sectionIds[0];

  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 24) {
    activeId = sectionIds[sectionIds.length - 1];
  } else {
    for (let i = 0; i < sectionEls.length; i++) {
      const el = sectionEls[i];
      if (el && el.getBoundingClientRect().top <= triggerLine) {
        activeId = sectionIds[i];
      }
    }
  }

  navLinks.forEach((link) => {
    if (link.getAttribute('href') === '#' + activeId) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });
}

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function startSequence() {
  window.scrollTo({ top: 0, behavior: 'auto' });
  targetHeroP = 0;
  currentHeroP = 0;
  introState = 'preloader';
  preloaderStartTime = performance.now();
  preloader.classList.remove('is-hidden');
  topControls.classList.remove('is-visible');
  floatingNav.classList.remove('is-visible');
  scrollIndicator.classList.remove('is-visible');
  heroCopy.style.opacity = '0';
  heroBottomBar.style.opacity = '0';
  webglCanvas.style.opacity = '1';
  if (portalVectorOverlay) {
    portalVectorOverlay.style.opacity = '0';
    portalVectorOverlay.style.visibility = 'hidden';
  }
  particleWave.visible = true;
  hexProgress.style.strokeDashoffset = String(HEX_LEN);
  if (lidPivot) {
    lidPivot.rotation.x = LID_CLOSED_X;
  }
}

replayBtn.addEventListener('click', startSequence);

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
function easeInOutCubic(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
function clamp01(x) { return Math.max(0, Math.min(1, x)); }
function lerp(a, b, t) { return a + (b - a) * t; }

const stickyStage = document.querySelector('.sticky-stage');

function getViewportSize() {
  const vw = Math.max(1, (stickyStage && stickyStage.clientWidth) || window.innerWidth);
  const vh = Math.max(1, (stickyStage && stickyStage.clientHeight) || window.innerHeight);
  return { vw, vh };
}

// Responsive framing: guarantees zero horizontal clip on 375px~430px portrait mobile
// AND >= 50-70px breathing room between .hero-copy bottom and open MacBook lid top
function computeResponsiveFraming() {
  const { vw, vh } = getViewportSize();
  const aspect = vw / vh;
  const isPortraitMobile = aspect < 0.85;

  let macScale = 1.0;
  let baseZ = 9.4;

  if (isPortraitMobile) {
    // Dedicated portrait mobile scale & camera distance so MacBook fits cleanly with side margins
    macScale = lerp(0.84, 0.94, clamp01((aspect - 0.42) / 0.43));
    const desiredScreenWidthFill = 0.82; // Leaves ~9% clean margin on left & right even during 3/4 intro
    const requiredFullW = (TARGET_WIDTH * macScale) / desiredScreenWidthFill;
    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
    baseZ = Math.max(11.4, Math.min(15.6, requiredFullW / (2 * tanHalfFov * aspect)));
  } else if (aspect < 1.05) {
    macScale = 0.96;
    baseZ = 11.4;
  } else if (aspect < 1.32) {
    baseZ = 10.3;
  }

  // Measure actual rendered hero headline bottom to prevent overlap at any viewport height
  const copyRect = heroCopy.getBoundingClientRect();
  const copyBottomRatio = copyRect.height > 0 ? (copyRect.bottom / vh) : 0.22;
  const desiredGapPx = isPortraitMobile
    ? Math.max(48, Math.min(72, vh * 0.075))
    : Math.max(52, Math.min(72, vh * 0.068));
  const minLidTopRatio = copyBottomRatio + desiredGapPx / vh;

  const openCamY = isPortraitMobile ? 0.42 : 0.44;
  const openLookY = isPortraitMobile ? -0.16 : -0.20;
  const approxLidZ = -1.0 * macScale;
  const distToLid = baseZ - approxLidZ;
  const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * distToLid;
  const viewCenterYAtLid = lerp(openCamY, openLookY, distToLid / (baseZ + 0.5));

  // Target NDC Y for the top bezel (top of viewport = +1, bottom = -1)
  const targetTopNDC = Math.min(isPortraitMobile ? 0.24 : 0.32, 1 - 2 * minLidTopRatio);
  const maxLidTopWorldY = viewCenterYAtLid + targetTopNDC * halfH;
  const openLidHeight = 1.98 * macScale;
  const macOpenY = isPortraitMobile
    ? Math.min(-1.18, Math.max(-1.68, maxLidTopWorldY - openLidHeight))
    : Math.min(-1.46, Math.max(-1.82, maxLidTopWorldY - openLidHeight));

  return { baseZ, macOpenY, macScale, openCamY, openLookY };
}

let framing = computeResponsiveFraming();

function handleViewportResize() {
  const { vw, vh } = getViewportSize();
  camera.aspect = vw / vh;
  camera.updateProjectionMatrix();
  renderer.setSize(vw, vh);
  waveUniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2);
  framing = computeResponsiveFraming();
  updateScrollState();
}

window.addEventListener('resize', handleViewportResize);
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', handleViewportResize);
}

const lightWaveColor = new THREE.Color(0x26262a);
const darkWaveColor = new THREE.Color(0xebebf2);
const projectedCenter = new THREE.Vector3();

// =========================================================================
// 5. MAIN ANIMATION LOOP (60fps)
//    - Snappy 0.88s preloader synced with GLB + 1K HDRI ready state
//    - Automatic MacBook sweep-in & lid opening independent of scroll
//    - 2048x1280 titanium/sapphire portal -> 4K SVG+HTML vector baton-pass
//    - Rapid particle wave fade-out & visible=false for 0% screen bleed-through
// =========================================================================
let lastTime = performance.now();
let elapsed = 0;

function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min(0.05, (now - lastTime) / 1000);
  lastTime = now;
  elapsed += dt;

  if (introState === 'preloader') {
    const pElapsed = (now - preloaderStartTime) / 1000;
    const assetsDone = (modelReady && hdriReady) || pElapsed >= 6.0;
    const rawProg = clamp01(pElapsed / (PRELOADER_MIN_SEC * 0.92));
    const loadProg = assetsDone ? rawProg : Math.min(0.90, rawProg);
    hexProgress.style.strokeDashoffset = String(HEX_LEN * (1 - easeInOutCubic(loadProg)));

    if (pElapsed >= PRELOADER_MIN_SEC && assetsDone) {
      preloader.classList.add('is-hidden');
      introState = 'entering';
      introStartTime = now;
      framing = computeResponsiveFraming();
      topControls.classList.add('is-visible');
      scrollIndicator.classList.add('is-visible');
      updateScrollState();
    }
  }

  if (!isHeroInView && introState === 'ready') return;

  // Smooth theme blend so MacBook screen background transitions seamlessly with CSS var(--bg)
  themeBlend = lerp(themeBlend, isDark ? 1 : 0, 0.10);

  // Theme-synced wave, shadows & subtle exposure adaptation
  const targetWaveCol = isDark ? darkWaveColor : lightWaveColor;
  waveUniforms.uColor.value.lerp(targetWaveCol, 0.08);
  const targetWaveOpacity = isDark ? 0.86 : 0.72;
  contactShadowMat.opacity = lerp(contactShadowMat.opacity, isDark ? 0.34 : 0.76, 0.08);
  floorShadowMat.opacity = lerp(floorShadowMat.opacity, isDark ? 0.12 : 0.24, 0.08);
  renderer.toneMappingExposure = lerp(renderer.toneMappingExposure, isDark ? 0.88 : 0.95, 0.06);
  waveUniforms.uTime.value = elapsed;

  smoothMouseX = lerp(smoothMouseX, mouseX, 0.075);
  smoothMouseY = lerp(smoothMouseY, mouseY, 0.075);
  targetMouseEnergy = Math.max(0.0, targetMouseEnergy - dt * 1.4);
  smoothMouseEnergy = lerp(smoothMouseEnergy, targetMouseEnergy, 0.10);
  currentHeroP = lerp(currentHeroP, targetHeroP, 0.12);

  // Automatic intro sequence (independent of scroll, starts right after preloader):
  // 0.00s -> 1.00s: MacBook sweeps in from sleek 3/4 angle to front center
  // 0.14s -> 1.44s: MacBook lid smoothly opens from closed to full open!
  let introElapsed = 0;
  if (introState === 'entering') {
    introElapsed = (now - introStartTime) / 1000;
    if (introElapsed >= 1.55) introState = 'ready';
  } else if (introState === 'ready') {
    introElapsed = 1.55;
  }

  const enterT = easeOutCubic(clamp01(introElapsed / 1.0));
  const autoOpenP = easeInOutCubic(clamp01((introElapsed - 0.14) / 1.30));

  // Scroll choreography:
  // 0.04 -> 0.22: Particle wave rapidly fades to 0 & visible=false (zero dots bleed onto screen!)
  // 0.06 -> 0.68: Camera zooms cleanly into MacBook display until all 4 bezels leave viewport
  // 0.44 -> 0.56: Pixel-matched baton-pass from 2K Canvas -> 4K Vector SVG + HTML overlay
  // 0.62 -> 0.74: WebGL canvas dissolves seamlessly into pure var(--bg)
  // 0.54 -> 0.92: 4K Vector ring & HTML "AI × EHS" expand smoothly & fade to 0 -> #about
  const zoomP = easeInOutCubic(clamp01((currentHeroP - 0.06) / 0.62));
  const handoffP = easeInOutCubic(clamp01((currentHeroP - 0.44) / 0.12));
  const stageFadeOutP = easeInOutCubic(clamp01((currentHeroP - 0.62) / 0.12));
  const vectorFlyP = easeInOutCubic(clamp01((currentHeroP - 0.54) / 0.38));
  const vectorFadeOutP = easeInOutCubic(clamp01((currentHeroP - 0.72) / 0.20));

  // Fade out 2K canvas ring/text cleanly during baton-pass (background stays pure var(--bg))
  const canvasPortalAlpha = 1 - handoffP;
  const portalParallaxDamp = 1 - zoomP;
  drawPortalScreen(elapsed, smoothMouseX, smoothMouseY, canvasPortalAlpha, portalParallaxDamp);
  screenTexture.needsUpdate = true;

  // Lid smoothly opens automatically, and levels to exact 90° vertical during zoom-in
  if (lidPivot) {
    const targetOpenX = lerp(LID_OPEN_X, LID_ZOOM_VERTICAL_X, zoomP);
    lidPivot.rotation.x = lerp(LID_CLOSED_X, targetOpenX, autoOpenP);
  }

  const parallaxWeight = (1 - zoomP) * enterT;
  const macY = lerp(framing.macOpenY - 0.08, framing.macOpenY, autoOpenP);
  macbookGroup.scale.setScalar(framing.macScale);
  macbookGroup.position.set(
    smoothMouseX * 0.10 * parallaxWeight,
    macY + smoothMouseY * -0.035 * parallaxWeight,
    0
  );

  // Slight Apple-ad top-down keyboard angle at rest; levels to 0° during screen zoom-in
  const baseTiltX = lerp(lerp(0.18, 0.14, autoOpenP), 0.0, zoomP);
  macbookGroup.rotation.set(
    baseTiltX + smoothMouseY * 0.05 * parallaxWeight,
    lerp(-0.52, 0, enterT) + smoothMouseX * 0.11 * parallaxWeight,
    lerp(-0.04, 0, enterT) - smoothMouseX * 0.018 * parallaxWeight
  );

  // Rapid early fade-out & complete hide of diagonal particle wave so 0 dots bleed during zoom
  const waveZoomFade = 1 - easeOutCubic(clamp01((currentHeroP - 0.04) / 0.18));
  const desiredWaveOp = targetWaveOpacity * waveZoomFade;
  waveUniforms.uOpacity.value = lerp(waveUniforms.uOpacity.value, desiredWaveOp, 0.28);
  if (desiredWaveOp <= 0.002 && waveUniforms.uOpacity.value <= 0.008) {
    waveUniforms.uOpacity.value = 0;
    particleWave.visible = false;
  } else {
    particleWave.visible = true;
  }

  const baseZ = framing.baseZ;
  if (mouseActive && particleWave.visible) {
    const waveDist = baseZ - particleWave.position.z;
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * waveDist;
    const halfW = halfH * camera.aspect;
    const worldMX = smoothMouseX * halfW - particleWave.position.x;
    const worldMY = -smoothMouseY * halfH - particleWave.position.y;
    const invAngle = -particleWave.rotation.z;
    const cA = Math.cos(invAngle);
    const sA = Math.sin(invAngle);
    waveUniforms.uMouse.value.set(
      worldMX * cA - worldMY * sA,
      worldMX * sA + worldMY * cA
    );
    waveUniforms.uMouseEnergy.value = smoothMouseEnergy * waveZoomFade;
  }

  if (particleWave.visible) {
    particleWave.position.x = -smoothMouseX * 0.34 * parallaxWeight;
    particleWave.position.y = 0.12 + smoothMouseY * 0.22 * parallaxWeight;
    particleWave.rotation.x = 0.14 + smoothMouseY * 0.08 * parallaxWeight;
    particleWave.rotation.y = 0.04 + smoothMouseX * 0.09 * parallaxWeight;
  }

  // Compute exact world-space center of the real GLB screen mesh for dead-center portal zoom-in
  macbookGroup.updateMatrixWorld(true);
  if (screenMesh) {
    screenWorldCenter.copy(screenLocalCenter).applyMatrix4(screenMesh.matrixWorld);
  } else {
    screenWorldCenter.set(0, macY + 1.0, -1.0);
  }

  // Camera framing: clean eye-level Apple product perspective, then zooms cleanly past all 4 bezels
  const openCamY = lerp(framing.openCamY + 0.12, framing.openCamY, autoOpenP);
  const openLookY = lerp(framing.openLookY - 0.06, framing.openLookY, autoOpenP);
  const openLookZ = -0.5;

  const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
  const scaledScreenW = 2.815 * framing.macScale;
  const scaledScreenH = 1.808 * framing.macScale;
  const dVertFill = scaledScreenH / (2 * tanHalfFov);
  const dHorizFill = scaledScreenW / (2 * tanHalfFov * Math.max(0.35, camera.aspect));
  const dBezelCleared = Math.min(dVertFill, dHorizFill);
  const zoomTargetZ = screenWorldCenter.z + dBezelCleared * 0.80;

  const camX = lerp(0, screenWorldCenter.x, zoomP);
  const camY = lerp(openCamY, screenWorldCenter.y, zoomP);
  const camZ = lerp(baseZ, zoomTargetZ, zoomP);

  const lookX = lerp(0, screenWorldCenter.x, zoomP);
  const lookY = lerp(openLookY, screenWorldCenter.y, zoomP);
  const lookZ = lerp(openLookZ, screenWorldCenter.z, zoomP);

  camera.position.set(camX, camY, camZ);
  camera.lookAt(lookX, lookY, lookZ);
  camera.updateMatrixWorld(true);

  // --- 4K VECTOR BATON-PASS OVERLAY (sub-pixel matched to 3D MacBook ring!) ---
  const vectorOpacity = handoffP * (1 - vectorFadeOutP);
  if (portalVectorOverlay && portalVectorStage) {
    if (vectorOpacity > 0.002) {
      const { vw, vh } = getViewportSize();

      // Exact 3D->2D projection of screenWorldCenter + exact pixel radius of the 3D ring
      projectedCenter.copy(screenWorldCenter).project(camera);
      const centerXpx = (projectedCenter.x * 0.5 + 0.5) * vw;
      const centerYpx = (-projectedCenter.y * 0.5 + 0.5) * vh;

      const camDist = Math.max(0.15, camera.position.z - screenWorldCenter.z);
      const visibleH = 2 * camDist * tanHalfFov;
      const ringWorldRadius = scaledScreenH * (CANVAS_RING_RADIUS / portalCanvas.height);
      const projectedRingRadiusPx = (ringWorldRadius / visibleH) * vh;

      // Vector stage base ring radius = 220px -> exact 1:1 handoff scale, then smooth 4K portal expansion
      const matchScale = projectedRingRadiusPx / 220;
      const flyThroughMult = 1 + vectorFlyP * 2.65;
      const finalScale = matchScale * flyThroughMult;

      portalVectorOverlay.style.visibility = 'visible';
      portalVectorOverlay.style.opacity = vectorOpacity.toFixed(4);
      portalVectorStage.style.left = `${centerXpx.toFixed(2)}px`;
      portalVectorStage.style.top = `${centerYpx.toFixed(2)}px`;
      portalVectorStage.style.transform = `translate(-50%, -50%) scale(${finalScale.toFixed(4)})`;

      // Sync continuous rotating metallic highlight clock angle with 2K canvas createConicGradient
      const sweepDeg = ((elapsed * 0.52 - Math.PI * 0.35) * 180) / Math.PI + 189;
      if (pvSweepGroup) {
        pvSweepGroup.setAttribute('transform', `rotate(${sweepDeg.toFixed(2)} 400 400)`);
      }

      // Unified layered parallax inside vector overlay (exact match to canvas, relaxes to 0 on zoom)
      const vpWeight = portalParallaxDamp;
      if (pvLayerOuter) {
        pvLayerOuter.setAttribute('transform', `translate(${(smoothMouseX * 9.4 * vpWeight).toFixed(2)} ${(smoothMouseY * 6.3 * vpWeight).toFixed(2)})`);
      }
      if (pvLayerMain) {
        pvLayerMain.setAttribute('transform', `translate(${(smoothMouseX * 16.3 * vpWeight).toFixed(2)} ${(smoothMouseY * 11.3 * vpWeight).toFixed(2)})`);
      }
      if (pvLayerInner) {
        pvLayerInner.setAttribute('transform', `translate(${(smoothMouseX * 19.5 * vpWeight).toFixed(2)} ${(smoothMouseY * 13.2 * vpWeight).toFixed(2)})`);
      }
      if (portalVectorLabel) {
        portalVectorLabel.style.transform = `translate(calc(-50% + ${(smoothMouseX * 25.8 * vpWeight).toFixed(2)}px), calc(-50% + ${(smoothMouseY * 17.6 * vpWeight).toFixed(2)}px))`;
      }
    } else {
      portalVectorOverlay.style.opacity = '0';
      portalVectorOverlay.style.visibility = 'hidden';
    }
  }

  // Hero headline fades in smoothly as MacBook opens, fades out cleanly on scroll zoom
  const introCopyFade = easeOutCubic(clamp01((introElapsed - 0.12) / 0.65));
  const zoomCopyFade = 1 - clamp01((currentHeroP - 0.08) / 0.26);
  const copyOpacity = introCopyFade * zoomCopyFade;

  heroCopy.style.opacity = copyOpacity.toFixed(3);
  heroCopy.style.transform = `translate(-50%, ${lerp(16, 0, introCopyFade) - zoomP * 32}px)`;
  heroBottomBar.style.opacity = (introCopyFade * (1 - clamp01((currentHeroP - 0.06) / 0.20))).toFixed(3);

  // Seamless dissolve of 3D WebGL canvas into pure var(--bg) once bezels have cleared
  webglCanvas.style.opacity = (1 - stageFadeOutP).toFixed(3);

  renderer.render(scene, camera);
}

requestAnimationFrame(animate);
