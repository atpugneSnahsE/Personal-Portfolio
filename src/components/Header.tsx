"use client";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header
      className="
        fixed top-0 z-50 w-full
        border-b
        border-zinc-200/40
        bg-white/70
        backdrop-blur-2xl
        dark:border-zinc-900/50
        dark:bg-black/40
        animate-[slideDown_0.5s_var(--ease-out)_both]
      "
      style={{ borderTop: "1px solid rgba(255, 255, 255, 0.4)" }}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-6 md:px-8">

        {/* Logo */}
        <a
          href="/"
          className="
            flex items-center
            transition
            hover:opacity-80
          "
        >
          <img
            src="/header.png"
            alt="Eshan Sengupta Logo"
            className="h-8 w-auto object-contain"
          />
        </a>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}