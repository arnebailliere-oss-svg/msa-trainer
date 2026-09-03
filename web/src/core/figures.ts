/**
 * Generated SVG figures — drawn from question variables, never scanned.
 * Pure functions returning SVG strings so they work in the browser and in the content validator.
 * Colours use currentColor for strokes/text (theme-aware) and fixed accent fills.
 */

export type FigureSpec = { type: string } & Record<string, unknown>;

const ACCENT = "#7c6cff";
const ACCENT2 = "#22d3ee";
const ACCENT3 = "#ff6b9d";
const ACCENT4 = "#ffc857";
const SOFT = "rgba(124,108,255,0.18)";

const num = (v: unknown, fallback = 0): number => {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = Number(v.replace(",", ".").replace("−", "-"));
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
};
const str = (v: unknown, fallback = ""): string => (v == null ? fallback : String(v));
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const f = (n: number) => (Math.round(n * 100) / 100).toString();

function svg(w: number, h: number, body: string, label: string): string {
  return `<svg viewBox='0 0 ${w} ${h}' width='${w}' height='${h}' role='img' aria-label='${esc(label)}' style='max-width:100%;height:auto'>${body}</svg>`;
}
function text(x: number, y: number, s: string, opts: { size?: number; anchor?: "start" | "middle" | "end"; bold?: boolean; fill?: string } = {}): string {
  return `<text x='${f(x)}' y='${f(y)}' font-size='${opts.size ?? 13}' text-anchor='${opts.anchor ?? "middle"}' ${opts.bold ? "font-weight='700'" : ""} fill='${opts.fill ?? "currentColor"}' font-family='system-ui, sans-serif'>${esc(s)}</text>`;
}
function line(x1: number, y1: number, x2: number, y2: number, opts: { dashed?: boolean; width?: number; color?: string } = {}): string {
  return `<line x1='${f(x1)}' y1='${f(y1)}' x2='${f(x2)}' y2='${f(y2)}' stroke='${opts.color ?? "currentColor"}' stroke-width='${opts.width ?? 2}' ${opts.dashed ? "stroke-dasharray='6 4'" : ""} stroke-linecap='round'/>`;
}
function rightAngleMark(cx: number, cy: number, dx: number, dy: number, size = 14): string {
  // small square at corner (cx,cy) pointing into directions dx (±1 along x) and dy (±1 along y)
  const x1 = cx + dx * size;
  const y1 = cy + dy * size;
  return `<path d='M ${f(x1)} ${f(cy)} L ${f(x1)} ${f(y1)} L ${f(cx)} ${f(y1)}' fill='none' stroke='currentColor' stroke-width='1.5'/><circle cx='${f(cx + dx * size * 0.5)}' cy='${f(cy + dy * size * 0.5)}' r='1.6' fill='currentColor'/>`;
}
function angleArc(cx: number, cy: number, r: number, fromDeg: number, toDeg: number, label: string, color = ACCENT3): string {
  const a1 = (fromDeg * Math.PI) / 180;
  const a2 = (toDeg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy - r * Math.sin(a1);
  const x2 = cx + r * Math.cos(a2);
  const y2 = cy - r * Math.sin(a2);
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  const sweep = toDeg > fromDeg ? 0 : 1;
  const mid = ((fromDeg + toDeg) / 2) * (Math.PI / 180);
  const lx = cx + (r + 12) * Math.cos(mid);
  const ly = cy - (r + 12) * Math.sin(mid);
  return `<path d='M ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${large} ${sweep} ${f(x2)} ${f(y2)}' fill='none' stroke='${color}' stroke-width='2'/>${label ? text(lx, ly + 4, label, { size: 13, fill: color, bold: true }) : ""}`;
}

// --- triangles ------------------------------------------------------------------

/** Right triangle, right angle at C (bottom-left). a = CB (bottom), b = CA (left), c = AB. */
export function rightTriangle(spec: FigureSpec): string {
  const a = num(spec.a, 4);
  const b = num(spec.b, 3);
  const labels = (spec.labels ?? {}) as Record<string, unknown>;
  const W = 340;
  const H = 230;
  const padL = 96; // room for the left-hand label
  const pad = 40;
  const scale = Math.min((W - padL - pad) / a, (H - 2 * pad) / b);
  const C = { x: padL, y: H - pad };
  const B = { x: padL + a * scale, y: H - pad };
  const A = { x: padL, y: H - pad - b * scale };
  const alphaDeg = (Math.atan2(a, b) * 180) / Math.PI; // angle at A between AC (down) and AB
  const betaDeg = (Math.atan2(b, a) * 180) / Math.PI;
  let body = `<polygon points='${f(A.x)},${f(A.y)} ${f(B.x)},${f(B.y)} ${f(C.x)},${f(C.y)}' fill='${SOFT}' stroke='currentColor' stroke-width='2' stroke-linejoin='round'/>`;
  body += rightAngleMark(C.x, C.y, 1, -1);
  if (labels.a !== undefined) body += text((C.x + B.x) / 2, C.y + 20, str(labels.a), { bold: true });
  if (labels.b !== undefined) body += text(C.x - 14, (C.y + A.y) / 2 + 4, str(labels.b), { anchor: "end", bold: true });
  if (labels.c !== undefined) body += text((A.x + B.x) / 2 + 14, (A.y + B.y) / 2 - 8, str(labels.c), { anchor: "start", bold: true });
  if (labels.alpha !== undefined) body += angleArc(A.x, A.y, 26, 270, 270 + alphaDeg, str(labels.alpha));
  if (labels.beta !== undefined) body += angleArc(B.x, B.y, 26, 180 - betaDeg, 180, str(labels.beta), ACCENT2);
  body += text(A.x - 8, A.y - 8, str(labels.A, "A"), { size: 12 }) + text(B.x + 10, B.y + 16, str(labels.B, "B"), { size: 12 }) + text(C.x - 8, C.y + 16, str(labels.C, "C"), { size: 12 });
  return svg(W, H, body, "Rechtwinkliges Dreieck");
}

/** General triangle from angles alpha, beta (deg) at A, B and base c (AB). */
export function triangle(spec: FigureSpec): string {
  const alpha = num(spec.alpha, 60);
  const beta = num(spec.beta, 50);
  const labels = (spec.labels ?? {}) as Record<string, unknown>;
  const gamma = 180 - alpha - beta;
  const W = 320;
  const H = 230;
  const c = 1;
  const b = (c * Math.sin((beta * Math.PI) / 180)) / Math.sin((gamma * Math.PI) / 180);
  const Cx = b * Math.cos((alpha * Math.PI) / 180);
  const Cy = b * Math.sin((alpha * Math.PI) / 180);
  const minX = Math.min(0, Cx);
  const maxX = Math.max(c, Cx);
  const pad = 44;
  const scale = Math.min((W - 2 * pad) / (maxX - minX), (H - 2 * pad) / Cy);
  const ox = pad - minX * scale;
  const A = { x: ox, y: H - pad };
  const B = { x: ox + c * scale, y: H - pad };
  const C = { x: ox + Cx * scale, y: H - pad - Cy * scale };
  let body = `<polygon points='${f(A.x)},${f(A.y)} ${f(B.x)},${f(B.y)} ${f(C.x)},${f(C.y)}' fill='${SOFT}' stroke='currentColor' stroke-width='2' stroke-linejoin='round'/>`;
  if (labels.c !== undefined) body += text((A.x + B.x) / 2, A.y + 20, str(labels.c), { bold: true });
  if (labels.b !== undefined) body += text((A.x + C.x) / 2 - 12, (A.y + C.y) / 2, str(labels.b), { anchor: "end", bold: true });
  if (labels.a !== undefined) body += text((B.x + C.x) / 2 + 12, (B.y + C.y) / 2, str(labels.a), { anchor: "start", bold: true });
  if (labels.alpha !== undefined) body += angleArc(A.x, A.y, 24, 0, alpha, str(labels.alpha));
  if (labels.beta !== undefined) body += angleArc(B.x, B.y, 24, 180 - beta, 180, str(labels.beta), ACCENT2);
  if (labels.gamma !== undefined) body += angleArc(C.x, C.y, 22, 180 + alpha, 360 - beta, str(labels.gamma), ACCENT4);
  if (labels.h !== undefined) {
    // height from C onto the base line AB
    body += line(C.x, C.y, C.x, A.y, { dashed: true, color: ACCENT3 }) + rightAngleMark(C.x, A.y, C.x < (A.x + B.x) / 2 ? 1 : -1, -1, 10);
    // label in the lower quarter, where the triangle is wide enough to keep it off the edges
    body += text(C.x + 8, A.y - (A.y - C.y) * 0.25 + 4, str(labels.h), { anchor: "start", fill: ACCENT3, bold: true });
  }
  body += text(A.x - 10, A.y + 16, "A", { size: 12 }) + text(B.x + 10, B.y + 16, "B", { size: 12 }) + text(C.x, C.y - 10, "C", { size: 12 });
  return svg(W, H, body, "Dreieck");
}

// --- quadrilaterals & circle ------------------------------------------------------

export function rectangle(spec: FigureSpec): string {
  const a = num(spec.a, 4);
  const b = num(spec.b, 2);
  const labels = (spec.labels ?? {}) as Record<string, unknown>;
  const W = 300;
  const H = 200;
  const pad = 44;
  const scale = Math.min((W - 2 * pad) / a, (H - 2 * pad) / b);
  const w = a * scale;
  const h = b * scale;
  const x = (W - w) / 2;
  const y = (H - h) / 2;
  let body = `<rect x='${f(x)}' y='${f(y)}' width='${f(w)}' height='${f(h)}' fill='${SOFT}' stroke='currentColor' stroke-width='2'/>`;
  if (spec.diagonal) body += line(x, y + h, x + w, y, { dashed: true, color: ACCENT3 }) + text(x + w / 2 + 10, y + h / 2 - 6, str(spec.diagonal), { fill: ACCENT3, bold: true, anchor: "start" });
  if (labels.a !== undefined) body += text(x + w / 2, y + h + 20, str(labels.a), { bold: true });
  if (labels.b !== undefined) body += text(x - 10, y + h / 2 + 4, str(labels.b), { anchor: "end", bold: true });
  return svg(W, H, body, "Rechteck");
}

export function parallelogram(spec: FigureSpec): string {
  const a = num(spec.a, 5);
  const h = num(spec.h, 2.5);
  const off = num(spec.offset, 1.5);
  const labels = (spec.labels ?? {}) as Record<string, unknown>;
  const W = 320;
  const H = 200;
  const pad = 44;
  const scale = Math.min((W - 2 * pad) / (a + off), (H - 2 * pad) / h);
  const x0 = pad;
  const y0 = H - pad;
  const pts = [
    [x0, y0],
    [x0 + a * scale, y0],
    [x0 + (a + off) * scale, y0 - h * scale],
    [x0 + off * scale, y0 - h * scale],
  ];
  let body = `<polygon points='${pts.map((p) => `${f(p[0]!)},${f(p[1]!)}`).join(" ")}' fill='${SOFT}' stroke='currentColor' stroke-width='2' stroke-linejoin='round'/>`;
  const hx = x0 + (off + a * 0.6) * scale;
  body += line(hx, y0, hx, y0 - h * scale, { dashed: true, color: ACCENT3 }) + rightAngleMark(hx, y0, 1, -1, 10);
  if (labels.a !== undefined) body += text(x0 + (a * scale) / 2, y0 + 20, str(labels.a), { bold: true });
  if (labels.h !== undefined) body += text(hx + 10, y0 - (h * scale) / 2 + 4, str(labels.h), { anchor: "start", fill: ACCENT3, bold: true });
  if (labels.b !== undefined) body += text(x0 + (off * scale) / 2 - 10, y0 - (h * scale) / 2, str(labels.b), { anchor: "end", bold: true });
  return svg(W, H, body, "Parallelogramm");
}

export function trapezoid(spec: FigureSpec): string {
  const a = num(spec.a, 6);
  const c = num(spec.c, 3);
  const h = num(spec.h, 2.5);
  const labels = (spec.labels ?? {}) as Record<string, unknown>;
  const W = 320;
  const H = 200;
  const pad = 44;
  const scale = Math.min((W - 2 * pad) / a, (H - 2 * pad) / h);
  const x0 = (W - a * scale) / 2;
  const y0 = H - pad;
  const inset = ((a - c) * scale) / 2;
  const pts = [
    [x0, y0],
    [x0 + a * scale, y0],
    [x0 + a * scale - inset, y0 - h * scale],
    [x0 + inset, y0 - h * scale],
  ];
  let body = `<polygon points='${pts.map((p) => `${f(p[0]!)},${f(p[1]!)}`).join(" ")}' fill='${SOFT}' stroke='currentColor' stroke-width='2' stroke-linejoin='round'/>`;
  const hx = x0 + inset + (c * scale) / 2;
  body += line(hx, y0, hx, y0 - h * scale, { dashed: true, color: ACCENT3 });
  if (labels.a !== undefined) body += text(x0 + (a * scale) / 2, y0 + 20, str(labels.a), { bold: true });
  if (labels.c !== undefined) body += text(hx, y0 - h * scale - 8, str(labels.c), { bold: true });
  if (labels.h !== undefined) body += text(hx + 10, y0 - (h * scale) / 2 + 4, str(labels.h), { anchor: "start", fill: ACCENT3, bold: true });
  return svg(W, H, body, "Trapez");
}

export function circle(spec: FigureSpec): string {
  const labels = (spec.labels ?? {}) as Record<string, unknown>;
  const W = 240;
  const H = 220;
  const cx = W / 2;
  const cy = H / 2;
  const r = 82;
  let body = `<circle cx='${cx}' cy='${cy}' r='${r}' fill='${SOFT}' stroke='currentColor' stroke-width='2'/><circle cx='${cx}' cy='${cy}' r='3' fill='currentColor'/>`;
  if (labels.r !== undefined) {
    const ang = -35 * (Math.PI / 180);
    body += line(cx, cy, cx + r * Math.cos(ang), cy + r * Math.sin(ang), { color: ACCENT3 }) + text(cx + (r / 2) * Math.cos(ang) + 8, cy + (r / 2) * Math.sin(ang) - 6, str(labels.r), { fill: ACCENT3, bold: true, anchor: "start" });
  }
  if (labels.d !== undefined) body += line(cx - r, cy, cx + r, cy, { color: ACCENT2 }) + text(cx, cy + 18, str(labels.d), { fill: ACCENT2, bold: true });
  if (labels.u !== undefined) body += text(cx, cy + r + 24, str(labels.u), { bold: true });
  body += text(cx + 8, cy - 6, "M", { size: 11, anchor: "start" });
  return svg(W, H, body, "Kreis");
}

// --- coordinate system ------------------------------------------------------------

interface CoordOpts {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  W: number;
  H: number;
  pad: number;
}
function coordMap(o: CoordOpts) {
  const sx = (o.W - 2 * o.pad) / (o.xmax - o.xmin);
  const sy = (o.H - 2 * o.pad) / (o.ymax - o.ymin);
  return { X: (x: number) => o.pad + (x - o.xmin) * sx, Y: (y: number) => o.H - o.pad - (y - o.ymin) * sy, sx, sy };
}

/**
 * Coordinate system with optional points [{x,y,label}], lines [{m,n,label,color}], parabolas [{a,d,e,label}].
 */
export function coordinateSystem(spec: FigureSpec): string {
  const xmin = num(spec.xmin, -5);
  const xmax = num(spec.xmax, 5);
  const ymin = num(spec.ymin, -5);
  const ymax = num(spec.ymax, 5);
  const W = num(spec.width, 300);
  const H = num(spec.height, 300);
  const o: CoordOpts = { xmin, xmax, ymin, ymax, W, H, pad: 24 };
  const { X, Y } = coordMap(o);
  let body = "";
  for (let x = Math.ceil(xmin); x <= xmax; x++) body += line(X(x), Y(ymin), X(x), Y(ymax), { width: 1, color: x === 0 ? "currentColor" : "rgba(128,128,160,0.25)" });
  for (let y = Math.ceil(ymin); y <= ymax; y++) body += line(X(xmin), Y(y), X(xmax), Y(y), { width: 1, color: y === 0 ? "currentColor" : "rgba(128,128,160,0.25)" });
  // arrows + labels
  body += `<polygon points='${f(X(xmax))},${f(Y(0))} ${f(X(xmax) - 8)},${f(Y(0) - 4)} ${f(X(xmax) - 8)},${f(Y(0) + 4)}' fill='currentColor'/>`;
  body += `<polygon points='${f(X(0))},${f(Y(ymax))} ${f(X(0) - 4)},${f(Y(ymax) + 8)} ${f(X(0) + 4)},${f(Y(ymax) + 8)}' fill='currentColor'/>`;
  body += text(X(xmax) - 4, Y(0) - 6, "x", { size: 11, anchor: "end" }) + text(X(0) + 8, Y(ymax) + 8, "y", { size: 11, anchor: "start" });
  for (const v of [1, xmax]) if (v <= xmax && v > 0) body += text(X(v) - (v === xmax ? 6 : 0), Y(0) + 13, String(v), { size: 10 });
  for (const v of [1, ymax]) if (v <= ymax && v > 0) body += text(X(0) - 5, Y(v) + 4, String(v), { size: 10, anchor: "end" });
  if (xmin < 0) body += text(X(xmin), Y(0) + 13, String(xmin), { size: 10 });
  if (ymin < 0) body += text(X(0) - 5, Y(ymin) + 4, String(ymin), { size: 10, anchor: "end" });

  const colors = [ACCENT, ACCENT3, ACCENT2, ACCENT4];
  const lines = (spec.lines ?? []) as Record<string, unknown>[];
  lines.forEach((l, i) => {
    const m = num(l.m, 1);
    const n = num(l.n, 0);
    const col = str(l.color, colors[i % colors.length]!);
    // clip to y range
    const pts: [number, number][] = [];
    const candidates = [xmin, xmax, (ymin - n) / (m || 1e-9), (ymax - n) / (m || 1e-9)].filter((x) => x >= xmin && x <= xmax);
    for (const x of candidates) {
      const y = m * x + n;
      if (y >= ymin - 1e-9 && y <= ymax + 1e-9) pts.push([x, y]);
    }
    pts.sort((p, q) => p[0] - q[0]);
    if (pts.length >= 2) {
      const p0 = pts[0]!;
      const p1 = pts[pts.length - 1]!;
      body += line(X(p0[0]), Y(p0[1]), X(p1[0]), Y(p1[1]), { color: col, width: 2.5 });
      if (l.label) body += text(X(p1[0]) - 6, Y(p1[1]) - 8, str(l.label), { fill: col, bold: true, anchor: "end", size: 12 });
    }
  });
  const parabolas = (spec.parabolas ?? []) as Record<string, unknown>[];
  parabolas.forEach((p, i) => {
    const a = num(p.a, 1);
    const d = num(p.d, 0);
    const e = num(p.e, 0);
    const col = str(p.color, colors[(i + 1) % colors.length]!);
    let path = "";
    let started = false;
    for (let x = xmin; x <= xmax + 1e-9; x += (xmax - xmin) / 120) {
      const y = a * (x - d) ** 2 + e;
      if (y < ymin - 0.5 || y > ymax + 0.5) {
        started = false;
        continue;
      }
      path += `${started ? "L" : "M"} ${f(X(x))} ${f(Y(y))} `;
      started = true;
    }
    body += `<path d='${path}' fill='none' stroke='${col}' stroke-width='2.5'/>`;
    if (p.label) body += text(X(d) + 10, Y(e) + (a > 0 ? 18 : -10), str(p.label), { fill: col, bold: true, anchor: "start", size: 12 });
  });
  const points = (spec.points ?? []) as Record<string, unknown>[];
  points.forEach((pt) => {
    const x = num(pt.x);
    const y = num(pt.y);
    const col = str(pt.color, ACCENT3);
    body += `<circle cx='${f(X(x))}' cy='${f(Y(y))}' r='5' fill='${col}'/>`;
    if (pt.label) body += text(X(x) + 8, Y(y) - 8, str(pt.label), { bold: true, anchor: "start" });
  });
  return svg(W, H, body, "Koordinatensystem");
}

// --- statistics -------------------------------------------------------------------

export function barChart(spec: FigureSpec): string {
  const categories = (spec.categories ?? []) as unknown[];
  const values = ((spec.values ?? []) as unknown[]).map((v) => num(v));
  const unit = str(spec.unit, "");
  const W = 60 + categories.length * 70;
  const H = 210;
  const maxV = Math.max(1, ...values);
  const colors = [ACCENT, ACCENT2, ACCENT3, ACCENT4, "#3ddc97", "#f97316"];
  let body = line(40, 170, W - 10, 170, { width: 1.5 }) + line(40, 170, 40, 20, { width: 1.5 });
  if (unit) body += text(36, 24, unit, { size: 11, anchor: "end" });
  values.forEach((v, i) => {
    const h = (v * 140) / maxV;
    const x = 60 + i * 70;
    body += `<rect x='${x}' y='${f(170 - h)}' width='44' height='${f(h)}' rx='4' fill='${colors[i % colors.length]}'/>`;
    body += text(x + 22, 162 - h, f(v), { bold: true });
    body += text(x + 22, 188, str(categories[i]), { size: 12 });
  });
  return svg(W, H, body, "Säulendiagramm");
}

export function pieChart(spec: FigureSpec): string {
  const categories = (spec.categories ?? []) as unknown[];
  const values = ((spec.values ?? []) as unknown[]).map((v) => num(v));
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const W = 340;
  const H = 220;
  const cx = 110;
  const cy = 110;
  const r = 90;
  const colors = [ACCENT, ACCENT2, ACCENT3, ACCENT4, "#3ddc97", "#f97316"];
  let ang = -90;
  let body = "";
  values.forEach((v, i) => {
    const sweep = (v / total) * 360;
    const a1 = (ang * Math.PI) / 180;
    const a2 = ((ang + sweep) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2);
    const y2 = cy + r * Math.sin(a2);
    const large = sweep > 180 ? 1 : 0;
    body += `<path d='M ${cx} ${cy} L ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${large} 1 ${f(x2)} ${f(y2)} Z' fill='${colors[i % colors.length]}' stroke='#0d0f1c' stroke-width='1.5'/>`;
    body += `<rect x='230' y='${30 + i * 26}' width='14' height='14' rx='3' fill='${colors[i % colors.length]}'/>` + text(250, 42 + i * 26, `${str(categories[i])}${spec.showValues ? ` (${f(v)})` : ""}`, { size: 12, anchor: "start" });
    ang += sweep;
  });
  return svg(W, H, body, "Kreisdiagramm");
}

/** Two-stage tree with outcomes A/B and probabilities pA, pB (strings shown as labels). */
export function treeDiagram(spec: FigureSpec): string {
  const a = str(spec.a, "R");
  const b = str(spec.b, "B");
  const pa = str(spec.pa, "");
  const pb = str(spec.pb, "");
  const stages = Math.max(1, Math.min(3, num(spec.stages, 2)));
  const W = 120 + stages * 120;
  const H = 40 + 2 ** stages * 34;
  let body = "";
  const draw = (x: number, y: number, depth: number, span: number) => {
    if (depth === stages) return;
    const nx = x + 110;
    const y1 = y - span / 2;
    const y2 = y + span / 2;
    body += line(x, y, nx, y1, { color: ACCENT3 }) + line(x, y, nx, y2, { color: ACCENT2 });
    body += text((x + nx) / 2, (y + y1) / 2 - 6, pa, { size: 11, fill: ACCENT3 }) + text((x + nx) / 2, (y + y2) / 2 + 14, pb, { size: 11, fill: ACCENT2 });
    body += `<circle cx='${f(nx)}' cy='${f(y1)}' r='11' fill='${ACCENT3}'/>` + text(nx, y1 + 4, a, { size: 11, bold: true, fill: "#fff" });
    body += `<circle cx='${f(nx)}' cy='${f(y2)}' r='11' fill='${ACCENT2}'/>` + text(nx, y2 + 4, b, { size: 11, bold: true, fill: "#062b1c" });
    draw(nx, y1, depth + 1, span / 2);
    draw(nx, y2, depth + 1, span / 2);
  };
  body += `<circle cx='30' cy='${H / 2}' r='6' fill='currentColor'/>`;
  draw(30, H / 2, 0, H / 2);
  return svg(W, H, body, "Baumdiagramm");
}

// --- solids -----------------------------------------------------------------------

export function box(spec: FigureSpec): string {
  const a = num(spec.a, 4);
  const b = num(spec.b, 2);
  const c = num(spec.c, 3);
  const labels = (spec.labels ?? {}) as Record<string, unknown>;
  const W = 300;
  const H = 220;
  const k = 0.5; // oblique depth factor
  const scale = Math.min(180 / (a + b * k), 150 / (c + b * k));
  const x0 = 50;
  const y0 = H - 40;
  const A = a * scale;
  const C = c * scale;
  const dx = b * k * scale;
  const dy = b * k * scale;
  const P = (x: number, y: number) => `${f(x)},${f(y)}`;
  let body = `<polygon points='${P(x0, y0)} ${P(x0 + A, y0)} ${P(x0 + A, y0 - C)} ${P(x0, y0 - C)}' fill='${SOFT}' stroke='currentColor' stroke-width='2'/>`;
  body += `<polygon points='${P(x0, y0 - C)} ${P(x0 + A, y0 - C)} ${P(x0 + A + dx, y0 - C - dy)} ${P(x0 + dx, y0 - C - dy)}' fill='rgba(34,211,238,0.18)' stroke='currentColor' stroke-width='2'/>`;
  body += `<polygon points='${P(x0 + A, y0)} ${P(x0 + A + dx, y0 - dy)} ${P(x0 + A + dx, y0 - C - dy)} ${P(x0 + A, y0 - C)}' fill='rgba(255,107,157,0.16)' stroke='currentColor' stroke-width='2'/>`;
  body += line(x0, y0, x0 + dx, y0 - dy, { dashed: true, width: 1.2 }) + line(x0 + dx, y0 - dy, x0 + A + dx, y0 - dy, { dashed: true, width: 1.2 }) + line(x0 + dx, y0 - dy, x0 + dx, y0 - C - dy, { dashed: true, width: 1.2 });
  if (labels.a !== undefined) body += text(x0 + A / 2, y0 + 18, str(labels.a), { bold: true });
  if (labels.b !== undefined) body += text(x0 + A + dx / 2 + 12, y0 - dy / 2 + 4, str(labels.b), { anchor: "start", bold: true });
  if (labels.c !== undefined) body += text(x0 - 10, y0 - C / 2 + 4, str(labels.c), { anchor: "end", bold: true });
  return svg(W, H, body, "Quader");
}

export function cylinder(spec: FigureSpec): string {
  const r = num(spec.r, 2);
  const h = num(spec.h, 4);
  const labels = (spec.labels ?? {}) as Record<string, unknown>;
  const W = 340;
  const H = 230;
  const scale = Math.min(80 / r, 150 / h);
  const R = r * scale;
  const Hh = h * scale;
  const cx = 120;
  const top = (H - Hh) / 2;
  const ry = Math.max(10, R * 0.32);
  let body = `<path d='M ${f(cx - R)} ${f(top)} L ${f(cx - R)} ${f(top + Hh)} A ${f(R)} ${f(ry)} 0 0 0 ${f(cx + R)} ${f(top + Hh)} L ${f(cx + R)} ${f(top)}' fill='${SOFT}' stroke='currentColor' stroke-width='2'/>`;
  body += `<ellipse cx='${cx}' cy='${f(top)}' rx='${f(R)}' ry='${f(ry)}' fill='rgba(34,211,238,0.22)' stroke='currentColor' stroke-width='2'/>`;
  body += `<path d='M ${f(cx - R)} ${f(top + Hh)} A ${f(R)} ${f(ry)} 0 0 1 ${f(cx + R)} ${f(top + Hh)}' fill='none' stroke='currentColor' stroke-width='1.2' stroke-dasharray='5 4'/>`;
  body += line(cx, top, cx + R, top, { color: ACCENT3 }) + `<circle cx='${cx}' cy='${f(top)}' r='2.5' fill='currentColor'/>`;
  if (labels.r !== undefined) body += text(cx + R / 2, top - 8, str(labels.r), { fill: ACCENT3, bold: true });
  if (labels.d !== undefined) body += text(cx, top - 8, str(labels.d), { fill: ACCENT3, bold: true });
  if (labels.h !== undefined) body += text(cx + R + 12, top + Hh / 2 + 4, str(labels.h), { anchor: "start", bold: true });
  return svg(W, H, body, "Zylinder");
}

/** A single angle of `deg` degrees (1–360) with arc and label. */
export function angle(spec: FigureSpec): string {
  const deg = Math.max(1, Math.min(360, num(spec.deg, 45)));
  const label = str(spec.label, `${f(deg)}°`);
  const W = 220;
  const H = 170;
  const len = 78;
  const cx = deg <= 90 ? 60 : 110;
  const cy = deg <= 180 ? 122 : 92;
  const rad = (deg * Math.PI) / 180;
  let body = line(cx, cy, cx + len, cy) + line(cx, cy, cx + len * Math.cos(rad), cy - len * Math.sin(rad));
  if (deg === 360) body += `<circle cx='${cx}' cy='${cy}' r='24' fill='none' stroke='${ACCENT3}' stroke-width='2'/>` + text(cx, cy - 32, label, { fill: ACCENT3, bold: true });
  else if (deg === 90) body += rightAngleMark(cx, cy, 1, -1) + text(cx + 30, cy - 30, label, { fill: ACCENT3, bold: true });
  else body += angleArc(cx, cy, 24, 0, deg, label);
  body += `<circle cx='${cx}' cy='${cy}' r='3' fill='currentColor'/>`;
  return svg(W, H, body, `Winkel ${label}`);
}

/** Square pyramid: base edge a, height h. */
export function pyramid(spec: FigureSpec): string {
  const a = num(spec.a, 4);
  const h = num(spec.h, 5);
  const labels = (spec.labels ?? {}) as Record<string, unknown>;
  const W = 300;
  const H = 240;
  const k = 0.5;
  const scale = Math.min(180 / (a + a * k), 160 / (h + (a * k) / 2));
  const A = a * scale;
  const d = a * k * scale;
  const x0 = 50;
  const y0 = H - 36;
  const P1 = [x0, y0];
  const P2 = [x0 + A, y0];
  const P3 = [x0 + A + d, y0 - d];
  const P4 = [x0 + d, y0 - d];
  const cx = x0 + A / 2 + d / 2;
  const cy = y0 - d / 2;
  const T = [cx, cy - h * scale];
  const P = (p: number[]) => `${f(p[0]!)},${f(p[1]!)}`;
  let body = `<polygon points='${P(P1)} ${P(P2)} ${P(P3)} ${P(P4)}' fill='${SOFT}' stroke='none'/>`;
  body += `<polygon points='${P(P1)} ${P(P2)} ${P(T)}' fill='rgba(34,211,238,0.16)' stroke='none'/>`;
  body += line(P1[0]!, P1[1]!, P2[0]!, P2[1]!) + line(P2[0]!, P2[1]!, P3[0]!, P3[1]!);
  body += line(P3[0]!, P3[1]!, P4[0]!, P4[1]!, { dashed: true, width: 1.2 }) + line(P4[0]!, P4[1]!, P1[0]!, P1[1]!, { dashed: true, width: 1.2 });
  body += line(P1[0]!, P1[1]!, T[0]!, T[1]!) + line(P2[0]!, P2[1]!, T[0]!, T[1]!) + line(P3[0]!, P3[1]!, T[0]!, T[1]!) + line(P4[0]!, P4[1]!, T[0]!, T[1]!, { dashed: true, width: 1.2 });
  body += line(cx, cy, T[0]!, T[1]!, { dashed: true, color: ACCENT3 }) + `<circle cx='${f(cx)}' cy='${f(cy)}' r='2.5' fill='${ACCENT3}'/>`;
  if (labels.h !== undefined) body += text(cx + 10, cy - (h * scale) / 2, str(labels.h), { anchor: "start", fill: ACCENT3, bold: true });
  if (labels.a !== undefined) body += text(x0 + A / 2, y0 + 18, str(labels.a), { bold: true });
  return svg(W, H, body, "Pyramide");
}

/** Cone: radius r, height h. */
export function cone(spec: FigureSpec): string {
  const r = num(spec.r, 2);
  const h = num(spec.h, 5);
  const labels = (spec.labels ?? {}) as Record<string, unknown>;
  const W = 300;
  const H = 240;
  const scale = Math.min(90 / r, 170 / h);
  const R = r * scale;
  const Hh = h * scale;
  const cx = 130;
  const cy = H - 40;
  const ry = Math.max(8, R * 0.3);
  const top = cy - Hh;
  let body = `<path d='M ${f(cx - R)} ${f(cy)} L ${f(cx)} ${f(top)} L ${f(cx + R)} ${f(cy)} A ${f(R)} ${f(ry)} 0 0 0 ${f(cx - R)} ${f(cy)}' fill='${SOFT}' stroke='currentColor' stroke-width='2' stroke-linejoin='round'/>`;
  body += `<path d='M ${f(cx - R)} ${f(cy)} A ${f(R)} ${f(ry)} 0 0 1 ${f(cx + R)} ${f(cy)}' fill='none' stroke='currentColor' stroke-width='1.2' stroke-dasharray='5 4'/>`;
  body += line(cx, cy, cx, top, { dashed: true, color: ACCENT3 }) + line(cx, cy, cx + R, cy, { color: ACCENT2 }) + `<circle cx='${cx}' cy='${cy}' r='2.5' fill='currentColor'/>`;
  if (labels.h !== undefined) body += text(cx + 8, cy - Hh / 2, str(labels.h), { anchor: "start", fill: ACCENT3, bold: true });
  if (labels.r !== undefined) body += text(cx + R / 2, cy + 18, str(labels.r), { fill: ACCENT2, bold: true });
  if (labels.s !== undefined) body += text(cx + R / 2 + 14, top + Hh / 2, str(labels.s), { anchor: "start", bold: true });
  return svg(W, H, body, "Kegel");
}

/** Sphere with equator and radius. */
export function sphere(spec: FigureSpec): string {
  const labels = (spec.labels ?? {}) as Record<string, unknown>;
  const W = 240;
  const H = 220;
  const cx = W / 2;
  const cy = H / 2;
  const R = 84;
  let body = `<circle cx='${cx}' cy='${cy}' r='${R}' fill='${SOFT}' stroke='currentColor' stroke-width='2'/>`;
  body += `<path d='M ${f(cx - R)} ${cy} A ${R} ${f(R * 0.3)} 0 0 0 ${f(cx + R)} ${cy}' fill='none' stroke='currentColor' stroke-width='1.6'/>`;
  body += `<path d='M ${f(cx - R)} ${cy} A ${R} ${f(R * 0.3)} 0 0 1 ${f(cx + R)} ${cy}' fill='none' stroke='currentColor' stroke-width='1.2' stroke-dasharray='5 4'/>`;
  body += line(cx, cy, cx + R, cy, { color: ACCENT3 }) + `<circle cx='${cx}' cy='${cy}' r='3' fill='currentColor'/>`;
  if (labels.r !== undefined) body += text(cx + R / 2, cy - 8, str(labels.r), { fill: ACCENT3, bold: true });
  body += text(cx + 8, cy + 16, "M", { size: 11, anchor: "start" });
  return svg(W, H, body, "Kugel");
}

// --- registry ---------------------------------------------------------------------

const GENERATORS: Record<string, (spec: FigureSpec) => string> = {
  angle,
  pyramid,
  cone,
  sphere,
  rightTriangle,
  triangle,
  rectangle,
  parallelogram,
  trapezoid,
  circle,
  coordinateSystem,
  barChart,
  pieChart,
  treeDiagram,
  box,
  cylinder,
};

export const FIGURE_TYPES = Object.keys(GENERATORS);

export function renderFigure(spec: FigureSpec): string {
  const gen = GENERATORS[spec.type];
  if (!gen) throw new Error(`unknown figure type "${spec.type}"`);
  return gen(spec);
}
