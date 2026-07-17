import { getTranslations, type Locale } from "@/lib/translations";
import { profileLinks } from "@/lib/site";
import Container from "@/components/Container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: getTranslations(locale as Locale).about.lead };
}

/** Two-column section: mono label on the left, content on the right. */
function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-hairline py-8 sm:grid-cols-[9rem_1fr] sm:gap-8">
      <h2 className="label pt-1">{label}</h2>
      <div>{children}</div>
    </section>
  );
}

/** A single résumé line. */
function Item({
  title,
  org,
  meta,
}: {
  title: string;
  org?: string;
  meta?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <p className="leading-snug">
        <span className="font-medium">{title}</span>
        {org && <span className="text-muted"> · {org}</span>}
      </p>
      {meta && <span className="label shrink-0 sm:pt-1">{meta}</span>}
    </div>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);

  return (
    <Container className="py-16 sm:py-20">
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        {t.about.lead}
      </h1>

      {/* Lead — English (long-form content), sourced from the CV / LinkedIn. */}
      <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed">
        <p>
          I am a theoretical and mathematical physicist. I defended my PhD at
          Sorbonne Université (LPTHE) in June 2026, working with Boris Pioline on
          BPS black holes and Donaldson–Thomas invariants — the mathematics of
          how supersymmetric bound states form, and why their protected counts
          jump across walls in moduli space.
        </p>
        <p>
          My background spans high-performance scientific computing, machine
          learning, and full-stack software engineering. I enjoy translating
          abstract mathematics into concrete algorithms that are conceptually
          rigorous and practically robust — and I am now bringing that toolkit to
          applied and quantitative research.
        </p>
      </div>

      <div className="mt-14">
        <Section label={t.about.education}>
          <div className="space-y-4">
            <Item
              title="PhD, Theoretical & Mathematical Physics"
              org="Sorbonne Université — LPTHE, Paris"
              meta="2023–2026"
            />
            <Item
              title="CERN STEAM Academy"
              org="CERN, Geneva"
              meta="2026"
            />
            <Item
              title="M.S. Physics"
              org="IIT Madras"
              meta="2018–2023"
            />
            <Item
              title="B.S. (Hons.) Theoretical & Mathematical Physics, Minor in Mathematics"
              org="IIT Madras"
              meta="2018–2023"
            />
          </div>
        </Section>

        <Section label={t.about.experience}>
          <div className="space-y-4">
            <Item
              title="Doctoral Researcher"
              org="LPTHE, Sorbonne Université"
              meta="2023–2026"
            />
            <Item
              title="Participant, STEAM Academy"
              org="CERN"
              meta="2026"
            />
            <Item
              title="Charpak Lab Fellow — Summer Researcher"
              org="LPTHE / LPENS, Paris"
              meta="2023"
            />
            <Item
              title="Teaching Assistant"
              org="IIT Madras"
              meta="2022–2023"
            />
            <Item
              title="Web Development Freelancer"
              org="Zenoholics"
              meta="2022"
            />
          </div>
        </Section>

        <Section label={t.about.skills}>
          <dl className="space-y-4">
            {[
              {
                k: "Programming",
                v: "Python · C/C++ (17/20) · Julia · Bash · SQL",
              },
              {
                k: "Scientific & symbolic",
                v: "Mathematica · SageMath · NumPy/SciPy · GSL · Boost · ROOT",
              },
              {
                k: "ML & data",
                v: "PyTorch · scikit-learn · pandas · time-series · cross-validation",
              },
              {
                k: "HPC & parallel",
                v: "CUDA · MPI · PBS · multi-core · profiling & optimization",
              },
              {
                k: "Engineering",
                v: "Linux · Git · CI/CD · Docker · pytest · CMake",
              },
            ].map((row) => (
              <div
                key={row.k}
                className="flex flex-col gap-0.5 sm:flex-row sm:gap-6"
              >
                <dt className="label shrink-0 sm:w-40 sm:pt-1">{row.k}</dt>
                <dd className="leading-relaxed">{row.v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section label={t.about.awards}>
          <div className="space-y-4">
            <Item title="CERN STEAM Academy" org="CERN" meta="2026" />
            <Item
              title="Charpak Lab Fellowship"
              org="French Government / Campus France"
              meta="2023"
            />
            <Item
              title="NIUS Physics Fellowship"
              org="HBCSE, TIFR"
              meta="2019–2020"
            />
            <Item
              title="KVPY Fellowship"
              org="DST, Government of India"
              meta="2018–2023"
            />
          </div>
        </Section>

        <Section label={t.about.contact}>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {profileLinks.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="underline decoration-muted underline-offset-4 transition-colors hover:decoration-foreground"
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </Section>
      </div>
    </Container>
  );
}
