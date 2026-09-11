type SectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function Section({
  id,
  title,
  subtitle,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className="
        mx-auto
        w-full
        max-w-7xl
        px-6
        md:px-12
        py-16
        md:py-28
        border-t
        border-zinc-300
        dark:border-zinc-700
      "
    >
      {title && (
        <div className="mb-16 md:mb-20">
          <h2
            className="
              text-5xl sm:text-6xl
              md:text-7xl
              font-bold
              tracking-tight
              text-black
              dark:text-white
              leading-tight
              mb-4
            "
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}