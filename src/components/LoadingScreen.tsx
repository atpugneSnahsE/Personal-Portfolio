"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

/* ── design tokens ─────────────────────────────────────────────────────
   A small world spinning into view, warmed by a low light on the horizon.
   Cool slate/teal globe (ocean → land → ice) against a near-black void,
   a single warm amber accent standing in for the light source itself.
------------------------------------------------------------------------- */

const COLORS = {
  bg: "#040509",
  oceanDim: "#0e2a3d",
  oceanMid: "#1c5f79",
  landDim: "#2c5f3f",
  landMid: "#6fb87a",
  landBright: "#d8f0cf",
  ice: "#eef6ff",
  accent: "#f2a65a",
  textDim: "#5b6472",
};

const STATUS_MESSAGES = [
  "Charting coastlines",
  "Raising terrain",
  "Spinning up the core",
  "Aligning the orbit",
  "Catching the light",
];

const NAME = "ESHAN SENGUPTA";
const ROLE = "ML Engineer  ·  Researcher  ·  Builder";

/* ── globe geometry ────────────────────────────────────────────────────
   Points evenly distributed on a unit sphere (fibonacci spiral), each
   given a fixed "elevation" from layered sine waves so continents hold
   their shape as the sphere spins — no external assets, no libraries.
------------------------------------------------------------------------- */

type SpherePoint = { x: number; y: number; z: number; land: boolean; ice: boolean; edge: boolean };

function buildSphere(count: number): SpherePoint[] {
  const pts: SpherePoint[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    const lat = Math.asin(y);
    const lon = Math.atan2(z, x);
    const n =
      Math.sin(lat * 3.1 + 0.4) * Math.cos(lon * 4.2 - 0.6) +
      Math.sin(lat * 5.3 - 1.1) * Math.cos(lon * 2.1 + 2.0) * 0.6 +
      Math.sin(lon * 6.8 + lat * 2.4) * 0.35;

    const ice = Math.abs(lat) > 1.2;
    const land = !ice && n > 0.18;
    const edge = !ice && n > 0.1 && n <= 0.22; // coastline band, gets a distinct glyph

    pts.push({ x, y, z, land, ice, edge });
  }
  return pts;
}

const LAND_RAMP = [" ", ".", ":", "+", "*", "%", "#", "@"];
const OCEAN_RAMP = [" ", ".", "·", "~", "≈"];

function lerpColor(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ar = (pa >> 16) & 255, ag = (pa >> 8) & 255, ab = pa & 255;
  const br = (pb >> 16) & 255, bg = (pb >> 8) & 255, bb = pb & 255;
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `rgb(${rr},${rg},${rb})`;
}

/* ── component ─────────────────────────────────────────────────────── */

export default function LoadingScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [done, setDone] = useState(false);
  const [fading, setFading] = useState(false);
  const [isReduced, setIsReduced] = useState(false);
  const [phase, setPhase] = useState<"globe" | "reveal">("globe");
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [globeScale, setGlobeScale] = useState(1);
  const [globeOpacity, setGlobeOpacity] = useState(1);
  const [revealOpacity, setRevealOpacity] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const cancelledRef = useRef(false);

  const sphere = useMemo(() => buildSphere(4200), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* draw a single frame of the globe onto the canvas at rotation angle */
  const drawGlobe = useCallback(
    (canvas: HTMLCanvasElement, angle: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const fontSize = cssW < 420 ? 7 : 8.5;
      const cellW = fontSize * 0.62;
      const cellH = fontSize * 1.15;
      const cols = Math.floor(cssW / cellW);
      const rows = Math.floor(cssH / cellH);

      // work in real pixels so the sphere projects as a true circle —
      // cells aren't square, so scaling by column/row counts distorts it
      const radiusPx = Math.min(cssW, cssH) * 0.42;
      const centerPxX = cssW / 2;
      const centerPxY = cssH / 2;

      // soft atmospheric glow behind the globe
      const grad = ctx.createRadialGradient(
        cssW / 2, cssH / 2, radiusPx * 0.85,
        cssW / 2, cssH / 2, radiusPx * 1.7
      );
      grad.addColorStop(0, "rgba(28,95,121,0.18)");
      grad.addColorStop(1, "rgba(4,5,9,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cssW, cssH);

      const depthBuf = new Float32Array(cols * rows).fill(-Infinity);
      const charBuf: (string | null)[] = new Array(cols * rows).fill(null);
      const colorBuf: (string | null)[] = new Array(cols * rows).fill(null);

      const cosA = Math.cos(angle), sinA = Math.sin(angle);
      const tilt = 0.42; // fixed axial tilt, radians
      const cosT = Math.cos(tilt), sinT = Math.sin(tilt);

      // light direction: warm, coming from upper-right, toward the viewer
      const lx = 0.5, ly = 0.55, lz = 0.9;
      const llen = Math.sqrt(lx * lx + ly * ly + lz * lz);
      const LX = lx / llen, LY = ly / llen, LZ = lz / llen;

      for (let i = 0; i < sphere.length; i++) {
        const p = sphere[i];

        // rotate around Y (spin)
        let x = p.x * cosA + p.z * sinA;
        let z = -p.x * sinA + p.z * cosA;
        let y = p.y;

        // fixed axial tilt around X
        const ty = y * cosT - z * sinT;
        const tz = y * sinT + z * cosT;
        y = ty;
        z = tz;

        if (z < -0.05) continue; // backface cull

        const pxX = centerPxX + x * radiusPx;
        const pxY = centerPxY - y * radiusPx;
        const col = Math.floor(pxX / cellW);
        const row = Math.floor(pxY / cellH);
        if (col < 0 || col >= cols || row < 0 || row >= rows) continue;

        const idx = row * cols + col;
        if (z <= depthBuf[idx]) continue;
        depthBuf[idx] = z;

        const brightness = Math.max(0, x * LX + y * LY + z * LZ);
        let ch: string;
        let color: string;

        if (p.ice) {
          const b = Math.min(1, brightness + 0.35);
          ch = b > 0.6 ? "@" : "*";
          color = lerpColor(COLORS.oceanMid, COLORS.ice, b);
        } else if (p.edge) {
          ch = "^";
          color = lerpColor(COLORS.landDim, COLORS.accent, brightness);
        } else if (p.land) {
          const b = Math.min(LAND_RAMP.length - 1, Math.floor(brightness * LAND_RAMP.length));
          ch = LAND_RAMP[b];
          color =
            brightness > 0.82
              ? lerpColor(COLORS.landMid, COLORS.landBright, (brightness - 0.82) / 0.18)
              : lerpColor(COLORS.landDim, COLORS.landMid, brightness / 0.82);
        } else {
          const b = Math.min(OCEAN_RAMP.length - 1, Math.floor(brightness * OCEAN_RAMP.length));
          ch = OCEAN_RAMP[b];
          color = lerpColor(COLORS.oceanDim, COLORS.oceanMid, brightness);
        }

        charBuf[idx] = ch;
        colorBuf[idx] = color;
      }

      ctx.font = `${fontSize}px ui-monospace, "SF Mono", "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const ch = charBuf[idx];
          if (!ch || ch === " ") continue;
          ctx.fillStyle = colorBuf[idx] as string;
          ctx.fillText(ch, col * cellW, row * cellH);
        }
      }
    },
    [sphere]
  );

  /* main sequence: spin the globe, advance progress, then reveal */
  useEffect(() => {
    if (isReduced) {
      setPhase("reveal");
      setProgress(100);
      setRevealOpacity(1);
      setGlobeOpacity(0);
      const t = setTimeout(() => {
        setFading(true);
        setTimeout(() => setDone(true), 500);
      }, 500);
      return () => clearTimeout(t);
    }

    cancelledRef.current = false;
    const totalDuration = 3600;
    const canvas = canvasRef.current;

    startRef.current = performance.now();

    const tick = (now: number) => {
      if (cancelledRef.current) return;
      const elapsed = now - startRef.current;
      const t = Math.min(1, elapsed / totalDuration);

      setProgress(Math.round(t * 100));
      setStatusIdx(Math.min(STATUS_MESSAGES.length - 1, Math.floor(t * STATUS_MESSAGES.length)));

      if (canvas) drawGlobe(canvas, elapsed * 0.00065);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        beginReveal();
      }
    };

    async function beginReveal() {
      await sleep(250);
      if (cancelledRef.current) return;
      setPhase("reveal");
      setGlobeScale(1.6);
      setGlobeOpacity(0);
      await sleep(150);
      if (cancelledRef.current) return;
      setRevealOpacity(1);
      await sleep(1100);
      if (cancelledRef.current) return;
      setFading(true);
      await sleep(500);
      if (cancelledRef.current) return;
      setDone(true);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelledRef.current = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReduced, drawGlobe]);

  return (
    <>
      {children}
      {!done && (
        <div
          className={`fixed inset-0 z-[999999] flex items-center justify-center transition-opacity duration-500 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
          style={{ background: COLORS.bg }}
        >
          {/* faint vignette to keep focus on the globe */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6">
            {/* globe canvas */}
            <div
              className="relative h-[240px] w-full sm:h-[300px] transition-all duration-500 ease-out"
              style={{
                transform: `scale(${globeScale})`,
                opacity: globeOpacity,
              }}
            >
              <canvas ref={canvasRef} className="h-full w-full" />
            </div>

            {/* name reveal, fades in as globe fades out */}
            <div
              className="absolute flex flex-col items-center text-center transition-opacity duration-700"
              style={{ opacity: revealOpacity }}
            >
              <span
                className="text-lg sm:text-2xl font-semibold tracking-[0.18em]"
                style={{
                  color: COLORS.landBright,
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  textShadow: `0 0 24px ${COLORS.accent}55`,
                }}
              >
                {NAME}
              </span>
              <span
                className="mt-2 text-[10px] sm:text-xs tracking-[0.25em]"
                style={{ color: COLORS.textDim }}
              >
                {ROLE}
              </span>
            </div>

            {/* progress + status, hidden during reveal */}
            <div
              className="mt-6 w-full transition-opacity duration-300"
              style={{ opacity: phase === "globe" ? 1 : 0 }}
            >
              <div
                className="h-[2px] w-full overflow-hidden rounded-full"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-150"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${COLORS.oceanMid}, ${COLORS.accent})`,
                    boxShadow: `0 0 8px ${COLORS.accent}66`,
                  }}
                />
              </div>
              <div
                className="mt-3 flex items-center justify-between text-[10px] tracking-[0.15em]"
                style={{
                  color: COLORS.textDim,
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                <span>{STATUS_MESSAGES[statusIdx]}…</span>
                <span style={{ color: COLORS.accent }}>{progress.toString().padStart(3, "0")}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}