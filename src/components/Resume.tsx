"use client";

import { Download, FileText, BookOpen, Briefcase } from "lucide-react";
import FadeIn from "./FadeIn";

export default function Resume() {
  return (
    <section className="w-full bg-white dark:bg-black py-24 md:py-32 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Left Column - Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <FadeIn>
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-widest text-zinc-600 dark:text-zinc-400 font-medium">
                Professional Profile
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
                Eshan
                <br />
                Sengupta
              </h2>

              <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
                AI Researcher focused on Machine Learning, Computer Vision, LiDAR perception, IoT-Fog computing, and autonomous systems. Published across Springer, IEEE, and high-impact venues with focus on real-world intelligent systems.
              </p>

              {/* Profile Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-300 dark:border-zinc-700">
                <div>
                  <BookOpen className="w-6 h-6 text-black dark:text-white mb-3" />
                  <p className="text-sm font-bold text-black dark:text-white mb-1">
                    Education
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    MSc AI Systems
                  </p>
                </div>
                <div>
                  <Briefcase className="w-6 h-6 text-black dark:text-white mb-3" />
                  <p className="text-sm font-bold text-black dark:text-white mb-1">
                    Experience
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    15+ Years
                  </p>
                </div>
                <div>
                  <FileText className="w-6 h-6 text-black dark:text-white mb-3" />
                  <p className="text-sm font-bold text-black dark:text-white mb-1">
                    Publications
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    14+ Papers
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Column - Resume Download */}
          <FadeIn delay={0.2}>
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-widest text-zinc-600 dark:text-zinc-400 font-medium">
                Resume Access
              </p>

              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                  Download CV
                </h3>

                <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
                  View detailed education, publications, technical expertise, experience, certifications, and research profile.
                </p>

                <a
                  href="/resume.html"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-sm hover:opacity-80 transition-opacity"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>

                <a
                  href="/resume.html"
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-bold uppercase tracking-wider text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  View Interactive Resume
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
