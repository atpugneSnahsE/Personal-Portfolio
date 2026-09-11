import FadeIn from "./FadeIn";

const areas = [
  {
    title: "AI & Machine Learning",
    description: "Deep expertise in neural networks, PyTorch, TensorFlow, and modern deep learning frameworks. Specialized in computer vision and object detection systems.",
  },
  {
    title: "Computer Vision Systems",
    description: "Building advanced computer vision solutions including LiDAR perception, autonomous systems, and real-time image processing applications.",
  },
  {
    title: "Research & Development",
    description: "Academic publishing, quantitative research, signal processing, and mathematical modeling for complex AI systems and autonomous platforms.",
  },
  {
    title: "Full-Stack Engineering",
    description: "End-to-end development using Python, Java, SQL, REST APIs, and modern software engineering practices. Production-ready systems.",
  },
];

export default function Skills() {
  return (
    <section className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 py-24 md:py-32 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Title */}
        <FadeIn>
          <h2 className="text-6xl md:text-7xl font-bold text-black dark:text-white mb-20">
            RESEARCH &
            <br />
            DEVELOPMENT AREAS
          </h2>
        </FadeIn>

        {/* Development Areas Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {areas.map((area, index) => (
            <FadeIn key={area.title} delay={index * 0.1}>
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                  {area.title}
                </h3>
                <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
                  {area.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
