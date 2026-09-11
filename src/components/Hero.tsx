"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import FadeIn from "./FadeIn";

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const profileImage = mounted && theme === "dark" ? "/profile-blk.png" : "/profile.png";

  return (
    <section className="w-full bg-white dark:bg-black pt-32 pb-20 md:pb-32 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* LEFT - Text */}
          <FadeIn>
            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-widest text-zinc-600 dark:text-zinc-400 font-medium mb-8">
                  Machine Learning Engineer
                </p>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-black dark:text-white mb-8">
                  ESHAN
                  <br />
                  SENGUPTA
                </h1>
              </div>

              <p className="hero-description text-base sm:text-lg md:text-xl leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-lg">
                AI researcher focused on LiDAR perception, autonomous systems, computer vision, and intelligent embedded systems. 14+ peer-reviewed publications.
              </p>

              {/* Stats */}
              <div className="hero-stats grid grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-zinc-300 dark:border-zinc-700">
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white">
                    14+
                  </p>
                  <p className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mt-2">
                    Publications
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white">
                    20+
                  </p>
                  <p className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mt-2">
                    Projects
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 md:gap-12">
                <div>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white">
                    Published In
                  </p>
                  <p className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mt-2">
                    Springer & IEEE
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white">
                    AI/ML
                  </p>
                  <p className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mt-2">
                    Research Focus
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-4 pt-8">
                <a
                  href="https://github.com/atpugneSnahsE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium text-sm hover:opacity-80 transition-opacity"
                >
                  View Work
                </a>
                <a
                  href="https://linkedin.com/in/eshansengupta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta px-6 py-3 border-2 border-black dark:border-white text-black dark:text-white font-medium text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Connect
                </a>
              </div>
            </div>
          </FadeIn>

          {/* RIGHT - Profile Image */}
          <FadeIn delay={0.2}>
            <div className="rounded-lg overflow-hidden flex items-start justify-center max-w-full">
              <img
                src={profileImage}
                alt="Profile illustration"
                className="w-full max-h-96 sm:max-h-96 md:max-h-[500px] lg:max-h-[600px] object-contain transition-opacity duration-300"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
