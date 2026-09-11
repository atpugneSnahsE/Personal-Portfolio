import { getGithubProjects } from "@/lib/github";
import FadeIn from "./FadeIn";

export default async function Projects() {
  const projects = await getGithubProjects();

  return (
    <section className="w-full bg-white dark:bg-black py-24 md:py-32 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Title */}
        <FadeIn>
          <h2 className="text-6xl md:text-7xl font-bold text-black dark:text-white mb-20">
            BUILT
            <br />
            PROJECTS
          </h2>
        </FadeIn>

        {/* Projects Grid - Clean list without placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {projects.slice(0, 6).map((project: any, index: number) => (
            <FadeIn key={index} delay={index * 0.08}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group pb-6 border-b border-zinc-300 dark:border-zinc-700 hover:opacity-70 transition-opacity"
              >
                <h3 className="text-2xl font-bold text-black dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  {project.description || "Open source project"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.language && (
                    <span className="text-xs font-bold px-3 py-1 bg-black dark:bg-white text-white dark:text-black rounded">
                      {project.language}
                    </span>
                  )}
                  {project.stars > 0 && (
                    <span className="text-xs px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">
                      ★ {project.stars}
                    </span>
                  )}
                  {project.topics?.slice(0, 2).map((topic: string) => (
                    <span key={topic} className="text-xs px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded">
                      {topic}
                    </span>
                  ))}
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        {/* View All Button */}
        {projects.length > 6 && (
          <FadeIn delay={0.5}>
            <div className="pt-8">
              <a
                href="https://github.com/atpugneSnahsE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-sm hover:opacity-80 transition-opacity"
              >
                View More Projects
              </a>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
