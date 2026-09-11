"use client";

import { Mail, MapPin, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";
import FadeIn from "./FadeIn";

export default function Contact() {
  return (
    <section className="w-full bg-black text-white py-24 md:py-32 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* CTA Section */}
        <FadeIn>
          <div className="mb-24 space-y-8">
            <h2 className="text-6xl md:text-8xl font-bold leading-none">
              INTERESTED IN
              <br />
              RESEARCH
              <br />
              COLLABORATION?
            </h2>

            <a
              href="mailto:eshansengupta2000@gmail.com"
              className="inline-block px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm hover:opacity-80 transition-opacity"
            >
              Get in Touch
            </a>
          </div>
        </FadeIn>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-zinc-800 pt-16">
          {/* Left Column */}
          <FadeIn delay={0.2}>
            <div className="space-y-8">
              <a
                href="mailto:eshansengupta2000@gmail.com"
                className="group flex items-start gap-6 pb-6 border-b border-zinc-800 hover:opacity-70 transition-opacity"
              >
                <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-2">
                    Email
                  </p>
                  <p className="text-lg font-medium">
                    eshansengupta2000@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/place/Vilnius,+Lithuania"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-6 pb-6 border-b border-zinc-800 hover:opacity-70 transition-opacity"
              >
                <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-2">
                    Location
                  </p>
                  <p className="text-lg font-medium">
                    Vilnius, Lithuania
                  </p>
                </div>
              </a>

              <a
                href="https://orcid.org/0000-0002-6285-7654"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-6 hover:opacity-70 transition-opacity"
              >
                <ExternalLink className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-2">
                    ORCID
                  </p>
                  <p className="text-lg font-medium">
                    0000-0002-6285-7654
                  </p>
                </div>
              </a>
            </div>
          </FadeIn>

          {/* Right Column */}
          <FadeIn delay={0.3}>
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-6">
                  Social
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://linkedin.com/in/eshansengupta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-base font-medium hover:text-zinc-400 transition-colors pb-3 border-b border-zinc-800"
                  >
                    <span>LinkedIn</span>
                    <FaLinkedinIn className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/atpugneSnahsE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-base font-medium hover:text-zinc-400 transition-colors pb-3 border-b border-zinc-800"
                  >
                    <span>GitHub</span>
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com/_eshansengupta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-base font-medium hover:text-zinc-400 transition-colors pb-3 border-b border-zinc-800"
                  >
                    <span>Twitter / X</span>
                    <FaXTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com/eshansengupta.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-base font-medium hover:text-zinc-400 transition-colors"
                  >
                    <span>Instagram</span>
                    <FaInstagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
