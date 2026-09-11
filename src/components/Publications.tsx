import { getOrcidWorks } from "@/lib/orcid";
import FadeIn from "./FadeIn";

export default async function Publications() {
  const publications = await getOrcidWorks();

  return (
    <section className="w-full bg-white dark:bg-black py-24 md:py-32 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Title */}
        <FadeIn>
          <h2 className="text-6xl md:text-7xl font-bold text-black dark:text-white mb-4">
            MY
            <br />
            RESEARCH
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mb-16 font-light">
            Peer-reviewed publications in AI, computer vision, and autonomous systems
          </p>
        </FadeIn>

        {/* Publications Grid - Clean list */}
        <div className="space-y-6">
          {publications.slice(0, 8).map((publication: any, index: number) => {
            const yearLabel =
              publication.year &&
              !isNaN(Number(publication.year)) &&
              Number(publication.year) > 0
                ? publication.year
                : null;

            return (
              <FadeIn key={`${publication.title}-${index}`} delay={index * 0.05}>
                <a
                  href={publication.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block pb-6 border-b border-zinc-300 dark:border-zinc-700 hover:opacity-70 transition-opacity"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white leading-snug flex-1">
                      {publication.title}
                    </h3>
                    {yearLabel && (
                      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                        {yearLabel}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 bg-black dark:bg-white text-white dark:text-black uppercase tracking-wide rounded">
                      {publication.venue || "Journal"}
                    </span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400 uppercase">
                      {publication.type}
                    </span>
                  </div>
                </a>
              </FadeIn>
            );
          })}
        </div>

        {/* View All Button */}
        {publications.length > 6 && (
          <FadeIn delay={0.5}>
            <div className="pt-8">
              <a
                href="https://orcid.org/0000-0002-6285-7654"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-sm hover:opacity-80 transition-opacity"
              >
                View All Publications
              </a>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
