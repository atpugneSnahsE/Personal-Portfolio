type SectionProps = {
  id?: string;
  title?: string;
  children: React.ReactNode;
};

export default function Section({
  id,
  title,
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
        md:px-8
        py-10
        md:py-16
      "
    >
      {title && (
        <div className="mb-6 md:mb-10">
          <h2
            className="
              text-2xl sm:text-3xl
              font-bold
              tracking-[var(--tracking-heading)]
              text-zinc-900
              dark:text-white
              md:text-5xl
            "
          >
            {title}
          </h2>
        </div>
      )}

      {children}
    </section>
  );
}