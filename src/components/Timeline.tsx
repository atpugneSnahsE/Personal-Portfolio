import FadeIn from "./FadeIn";

const academic = [
  {
    year: "2025 – Present",
    title: "M.Sc. in Artificial Intelligence Systems",
    description: "Vilnius Tech • GPA: 9.75/10",
    tags: ["LiDAR", "Computer Vision", "Autonomous Systems"],
  },
  {
    year: "2024",
    title: "B.Tech. in Computer Science & Engineering",
    description: "GNDU • ICCR Scholarship • GPA: 8.27/10",
    tags: ["Machine Learning", "IoT", "Software Engineering"],
  },
];

const professional = [
  {
    year: "2026 – Present",
    title: "Laboratory Assistant, Vilnius Tech",
    subtitle: "Transport and Logistics Competence Centre",
    tags: ["LiDAR", "RADAR", "Stereo Camera", "Radar"],
  },
  {
    year: "2024 – 2025",
    title: "IT Intern, BSRM",
    description: "ML-based ANPR, forecasting, SQL automation",
    tags: ["ANPR", "Forecasting", "SQL"],
  },
  {
    year: "2024",
    title: "Database Trainee",
    description: "Oracle SQL, PL/SQL, APEX",
    tags: ["Oracle", "PL/SQL", "APEX"],
  },
];

export default function Timeline() {
  return (
    <section className="w-full bg-white dark:bg-black py-24 md:py-32 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Title */}
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-20">
            RESEARCH &
            <br />
            EXPERIENCE
          </h2>
        </FadeIn>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Academic Column */}
          <FadeIn delay={0.1}>
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-widest font-bold text-black dark:text-white">
                Academic
              </p>

              <div className="space-y-6">
                {academic.map((item, index) => (
                  <div
                    key={index}
                    className="pb-6 border-b border-zinc-300 dark:border-zinc-700"
                  >
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                      {item.year}
                    </p>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Professional Column */}
          <FadeIn delay={0.2}>
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-widest font-bold text-black dark:text-white">
                Professional & Research
              </p>

              <div className="space-y-6">
                {professional.map((item, index) => (
                  <div
                    key={index}
                    className="pb-6 border-b border-zinc-300 dark:border-zinc-700"
                  >
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                      {item.year}
                    </p>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-1">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-500 mb-2 italic">
                        {item.subtitle}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
                        {item.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
