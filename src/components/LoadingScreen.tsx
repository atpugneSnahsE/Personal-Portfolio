"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── ASCII art assets ──────────────────────────────────────────────── */

const HAPPY_MAC = [
  "        .-\"\"\"\"\"\"\"-.        ",
  "       /            \\       ",
  "      |   O      O   |      ",
  "      |      <>      |      ",
  "      |    \\____/    |      ",
  "       \\            /       ",
  "        '-........-'        ",
];

const BOOT_LOGO = [
  "  ╔══════════════════════════════════════════╗",
  "  ║           E S H A N   S Y S T E M S     ║",
  "  ║              v2.0.4 — 2026              ║",
  "  ╚══════════════════════════════════════════╝",
];

const MEMORY_CHECK_LINES = [
  "APPLE ][' ROM CHECK ...................... OK",
  "EXTENDED MEMORY: 16384K ................. OK",
  "NEURAL PROCESSOR ................. DETECTED",
  "QUANTUM CORE v3.1 ................ ONLINE",
];

const BOOT_LINES = [
  { text: "> Loading neural network weights...", delay: 60 },
  { text: "> Initializing quantum core...", delay: 50 },
  { text: "> Calibrating retro encabulator...", delay: 55 },
  { text: "> Establishing secure channel...", delay: 45 },
  { text: "> All systems nominal.", delay: 40 },
];

const REVEAL_LINES = [
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "",
  "          E S H A N   S E N G U P T A",
  "",
  "   ML Engineer  ·  Researcher  ·  Builder",
  "",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
];

/* ── helpers ───────────────────────────────────────────────────────── */

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function randomChar(): string {
  const chars = "█▓▒░@#$%&*?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return chars[Math.floor(Math.random() * chars.length)];
}

function generateStatic(width: number, height: number): string[][] {
  const rows: string[][] = [];
  for (let y = 0; y < height; y++) {
    const row: string[] = [];
    for (let x = 0; x < width; x++) {
      row.push(Math.random() > 0.5 ? randomChar() : " ");
    }
    rows.push(row);
  }
  return rows;
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

  // screen state
  const [screenContent, setScreenContent] = useState<string[]>([]);
  const [glitchStyle, setGlitchStyle] = useState<React.CSSProperties>({});
  const [staticNoise, setStaticNoise] = useState<string[][]>([]);
  const [showStatic, setShowStatic] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [rgbSplit, setRgbSplit] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"power" | "memtest" | "happy" | "boot" | "reveal" | "done">("power");

  const cancelledRef = useRef(false);
  const screenContentRef = useRef<string[]>([]);
  const scanlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // glitch helper — displaces horizontal slices
  const triggerGlitch = useCallback(async (duration = 200, intensity = 6) => {
    if (cancelledRef.current || isReduced) return;
    setRgbSplit(true);

    setGlitchStyle({
      filter: `brightness(${1 + Math.random() * 0.3})`,
      transform: `translateX(${(Math.random() - 0.5) * intensity}px)`,
    });

    await sleep(duration * 0.3);
    setGlitchStyle({
      filter: `brightness(${0.7 + Math.random() * 0.2})`,
      transform: `translateX(${(Math.random() - 0.5) * intensity * 1.5}px) skewX(${(Math.random() - 0.5) * 2}deg)`,
    });
    await sleep(duration * 0.3);
    setGlitchStyle({
      filter: `brightness(${1.1 + Math.random() * 0.15})`,
      transform: `translateX(${(Math.random() - 0.5) * intensity * 0.5}px)`,
    });
    await sleep(duration * 0.4);

    setGlitchStyle({});
    setRgbSplit(false);
  }, [isReduced]);

  // static burst
  const triggerStatic = useCallback(async (duration = 180) => {
    if (cancelledRef.current || isReduced) return;
    setStaticNoise(generateStatic(60, 12));
    setShowStatic(true);
    await sleep(duration);
    setShowStatic(false);
  }, [isReduced]);

  // scanline roll
  const scanlineRoll = useCallback(async () => {
    if (cancelledRef.current || isReduced || !scanlineRef.current) return;
    const el = scanlineRef.current;
    for (let y = -10; y <= 110; y += 3) {
      if (cancelledRef.current) return;
      el.style.top = `${y}%`;
      el.style.opacity = "1";
      await sleep(8);
    }
    el.style.opacity = "0";
  }, [isReduced]);

  // ── main boot sequence ─────────────────────────────────────────────

  useEffect(() => {
    if (isReduced) {
      // instant: show final state
      screenContentRef.current = REVEAL_LINES;
      setScreenContent([...REVEAL_LINES]);
      setPhase("reveal");
      setProgress(100);
      setTimeout(() => {
        setFading(true);
        setTimeout(() => setDone(true), 500);
      }, 600);
      return;
    }

    let cancelled = false;
    cancelledRef.current = false;

    // helper to update screen content via ref + state
    const updateScreen = (lines: string[]) => {
      screenContentRef.current = lines;
      setScreenContent([...lines]);
    };

    async function boot() {
      // ── PHASE 0: Power On ──
      setPhase("power");
      await sleep(200);
      if (cancelled) return;

      // CRT warm-up: scanline rolls down
      await scanlineRoll();
      if (cancelled) return;

      // brightness flash
      setBrightness(1.8);
      await sleep(80);
      setBrightness(1.2);
      await sleep(60);
      setBrightness(1);
      await sleep(300);
      if (cancelled) return;

      // ── PHASE 1: Boot Logo + Memory Test ──
      setPhase("memtest");
      const logoLines = [...BOOT_LOGO, ""];
      updateScreen(logoLines);
      await sleep(400);
      if (cancelled) return;

      for (const line of MEMORY_CHECK_LINES) {
        if (cancelled) return;
        const current = [...screenContentRef.current];
        current.push(line);
        updateScreen(current);

        // progress
        const idx = MEMORY_CHECK_LINES.indexOf(line);
        setProgress(Math.round(((idx + 1) / MEMORY_CHECK_LINES.length) * 40));

        await sleep(180 + Math.random() * 120);

        // micro-glitch on each check
        if (idx < MEMORY_CHECK_LINES.length - 1) {
          setGlitchStyle({ transform: `translateX(${(Math.random() - 0.5) * 3}px)` });
          await sleep(40);
          setGlitchStyle({});
        }
      }

      setProgress(40);
      await sleep(300);
      if (cancelled) return;

      // ── GLITCH 1→2 ──
      await triggerStatic(150);
      await triggerGlitch(250, 8);
      if (cancelled) return;

      // clear screen
      updateScreen([]);
      await sleep(200);
      if (cancelled) return;

      // ── PHASE 2: Happy Mac ASCII ──
      setPhase("happy");
      const macLines: string[] = ["", "  BOOTING PERSONALITY MODULE...", ""];
      updateScreen([...macLines]);
      await sleep(300);
      if (cancelled) return;

      // draw Happy Mac line by line with jitter
      for (let i = 0; i < HAPPY_MAC.length; i++) {
        if (cancelled) return;
        const jitter = Math.random() > 0.7;
        if (jitter) {
          setGlitchStyle({ transform: `translateX(${(Math.random() - 0.5) * 2}px)` });
          await sleep(25);
          setGlitchStyle({});
        }
        macLines.push(HAPPY_MAC[i]);
        updateScreen([...macLines]);
        setProgress(40 + Math.round(((i + 1) / HAPPY_MAC.length) * 30));
        await sleep(100 + Math.random() * 60);
      }

      // Happy Mac "blinks" — replace eyes briefly
      await sleep(600);
      if (cancelled) return;
      const blinkMac = [...macLines];
      blinkMac[macLines.length - 5] = "      |   -      -   |      ";
      updateScreen([...blinkMac]);
      await sleep(120);
      updateScreen([...macLines]);
      await sleep(400);
      if (cancelled) return;

      // ── GLITCH 2→3 ──
      setBrightness(1.6);
      await sleep(50);
      setBrightness(0.6);
      await sleep(40);
      setBrightness(1);
      await triggerGlitch(200, 10);
      if (cancelled) return;

      // clear
      updateScreen([]);
      await sleep(150);
      if (cancelled) return;

      // ── PHASE 3: System Boot ──
      setPhase("boot");
      const bootAccum: string[] = [];
      for (const line of BOOT_LINES) {
        if (cancelled) return;
        // type the text
        let current = "";
        for (let i = 0; i < line.text.length; i++) {
          if (cancelled) return;
          current += line.text[i];
          updateScreen([...bootAccum, current]);
          await sleep(12 + Math.random() * 8);
        }
        // add checkmark with micro-glitch
        setGlitchStyle({ transform: `translateX(${Math.random() * 2 - 1}px)` });
        await sleep(30);
        setGlitchStyle({});
        bootAccum.push(line.text + "  ✓");
        updateScreen([...bootAccum]);

        const idx = BOOT_LINES.indexOf(line);
        setProgress(70 + Math.round(((idx + 1) / BOOT_LINES.length) * 25));

        await sleep(80 + Math.random() * 60);
      }

      setProgress(95);
      await sleep(200);
      if (cancelled) return;

      // ── GLITCH 3→4 ──
      await triggerStatic(120);
      await triggerGlitch(180, 12);
      if (cancelled) return;

      updateScreen([]);
      await sleep(150);
      if (cancelled) return;

      // ── PHASE 4: Reveal ──
      setPhase("reveal");
      const revealAccum: string[] = [];
      for (const line of REVEAL_LINES) {
        if (cancelled) return;
        revealAccum.push(line);
        updateScreen([...revealAccum]);
        await sleep(line === "" ? 60 : 100);
      }
      setProgress(100);

      // final glow pulse
      setBrightness(1.15);
      await sleep(150);
      setBrightness(1);
      await sleep(800);
      if (cancelled) return;

      // ── FADE OUT ──
      setFading(true);
      await sleep(500);
      if (cancelled) return;
      setDone(true);
    }

    boot();

    return () => {
      cancelled = true;
      cancelledRef.current = true;
    };
  }, [isReduced, scanlineRoll, triggerGlitch, triggerStatic]);

  return (
    <>
      {children}
      {!done && (
        <div
          className={`fixed inset-0 z-[999999] flex items-center justify-center bg-black transition-opacity duration-500 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* CRT scanline overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px)",
              backgroundSize: "100% 2px",
            }}
          />

          {/* vignette */}
          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* roll scanline */}
          <div
            ref={scanlineRef}
            className="pointer-events-none absolute left-0 right-0 z-30 h-[4px] opacity-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(16,185,129,0.4), rgba(255,255,255,0.15), transparent)",
            }}
          />

          {/* main screen container */}
          <div
            className="relative z-10 w-full max-w-2xl px-6 transition-none"
            style={{
              filter: `brightness(${brightness})`,
              transform: glitchStyle.transform as string || undefined,
              ...glitchStyle,
            }}
          >
            {/* RGB split layer (red channel) */}
            {rgbSplit && (
              <div
                className="pointer-events-none absolute inset-0 z-30 opacity-30"
                style={{
                  color: "#ff0000",
                  mixBlendMode: "screen",
                  transform: "translateX(-2px)",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.8rem",
                  lineHeight: "1.5",
                  whiteSpace: "pre",
                  overflow: "hidden",
                }}
              >
                {screenContent.join("\n")}
              </div>
            )}

            {/* RGB split layer (cyan channel) */}
            {rgbSplit && (
              <div
                className="pointer-events-none absolute inset-0 z-30 opacity-30"
                style={{
                  color: "#00ffff",
                  mixBlendMode: "screen",
                  transform: "translateX(2px)",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.8rem",
                  lineHeight: "1.5",
                  whiteSpace: "pre",
                  overflow: "hidden",
                }}
              >
                {screenContent.join("\n")}
              </div>
            )}

            {/* static noise overlay */}
            {showStatic && (
              <div
                className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                {staticNoise.map((row, y) => (
                  <div
                    key={y}
                    className="text-[8px] leading-[10px] text-emerald-500/60 whitespace-pre"
                  >
                    {row.join("")}
                  </div>
                ))}
              </div>
            )}

            {/* logo header */}
            {(phase === "power" || phase === "memtest") && screenContent.length > 0 && (
              <div className="mb-2">
                {BOOT_LOGO.map((line, i) => (
                  <div
                    key={i}
                    className="text-[10px] sm:text-xs text-emerald-600/40 leading-tight whitespace-pre"
                    style={{ fontFamily: "var(--font-mono), monospace" }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}

            {/* main content */}
            <div
              className="min-h-[300px] sm:min-h-[360px]"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              {phase === "memtest" && screenContent.length > BOOT_LOGO.length + 1 && (
                <div className="mt-2">
                  {screenContent.slice(BOOT_LOGO.length + 1).map((line, i) => (
                    <div
                      key={i}
                      className="text-xs sm:text-sm leading-relaxed"
                      style={{
                        color: line.includes("OK") || line.includes("DETECTED") || line.includes("ONLINE")
                          ? "#10b981"
                          : "#6ee7b7",
                        textShadow: "0 0 8px rgba(16,185,129,0.4)",
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              )}

              {phase === "happy" && (
                <div className="mt-1">
                  {screenContent.map((line, i) => {
                    const isAscii = i >= 1 && i <= 7;
                    const isLabel = i === 0 || i === 8;
                    return (
                      <div
                        key={i}
                        className={`leading-relaxed whitespace-pre ${
                          isAscii
                            ? "text-sm sm:text-base text-emerald-300"
                            : isLabel
                              ? "text-xs text-emerald-500/70"
                              : "text-xs text-emerald-400"
                        }`}
                        style={{
                          textShadow: isAscii
                            ? "0 0 10px rgba(16,185,129,0.5)"
                            : "0 0 6px rgba(16,185,129,0.3)",
                        }}
                      >
                        {line}
                      </div>
                    );
                  })}
                </div>
              )}

              {phase === "boot" && (
                <div className="mt-1">
                  {screenContent.map((line, i) => (
                    <div
                      key={i}
                      className="text-xs sm:text-sm leading-relaxed"
                      style={{
                        color: line.includes("✓") ? "#10b981" : "#6ee7b7",
                        textShadow: "0 0 6px rgba(16,185,129,0.3)",
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              )}

              {phase === "reveal" && (
                <div className="mt-2 text-center">
                  {screenContent.map((line, i) => {
                    const isName = line.includes("ESHAN");
                    const isRole = line.includes("ML Engineer");
                    const isBorder = line.includes("━");
                    return (
                      <div
                        key={i}
                        className={`whitespace-pre ${
                          isBorder
                            ? "text-emerald-500/30 text-xs"
                            : isName
                              ? "text-lg sm:text-2xl font-bold text-emerald-400 tracking-[0.15em]"
                              : isRole
                                ? "text-xs sm:text-sm text-emerald-500/70 tracking-[0.2em] mt-1"
                                : "text-emerald-400"
                        }`}
                        style={{
                          textShadow: isName
                            ? "0 0 20px rgba(16,185,129,0.6), 0 0 40px rgba(16,185,129,0.3)"
                            : "0 0 8px rgba(16,185,129,0.3)",
                        }}
                      >
                        {line}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* blinking cursor */}
              {!isReduced && phase !== "reveal" && (
                <span className="inline-block w-[8px] h-[14px] bg-emerald-400 animate-pulse mt-1 ml-1 align-middle" />
              )}
            </div>

            {/* progress bar */}
            <div className="mt-4 h-[3px] w-full rounded-full bg-emerald-900/30 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #059669, #10b981, #6ee7b7)",
                  boxShadow: "0 0 10px rgba(16,185,129,0.5)",
                }}
              />
            </div>

            {/* bottom status */}
            <div className="mt-3 flex items-center justify-between text-[10px] text-emerald-600/30" style={{ fontFamily: "var(--font-mono), monospace" }}>
              <span className="animate-pulse">■</span>
              <span>SESSION — PORTFOLIO v2</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
