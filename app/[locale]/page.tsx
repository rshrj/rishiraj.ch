import Link from "next/link";
import { getTranslations, type Locale } from "@/lib/translations";
import { getWriting, getProjects } from "@/lib/content";
import Container from "@/components/Container";
import Photo from "@/components/Photo";
import EntryList from "@/components/EntryList";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const projects = getProjects().slice(0, 3);
  const writing = getWriting().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <Container className="py-16 sm:py-24">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
          <div className="max-w-xl">
            <p className="label">{t.hero.location}</p>
            <h1 className="mt-4 font-display text-[clamp(2.75rem,9vw,4.75rem)] font-semibold leading-[0.92] tracking-tight">
              Rishi Raj
            </h1>
            <p className="mt-5 text-lg text-muted">{t.hero.role}</p>
          </div>
          <Photo className="w-36 shrink-0 sm:w-52" />
        </div>
        <p className="mt-12 max-w-2xl text-xl leading-relaxed sm:text-2xl">
          {t.hero.tagline}
        </p>
      </Container>

      {/* Selected work */}
      <Container className="border-t border-hairline py-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="label">{t.sections.selectedWork}</h2>
          <Link
            href={`/${locale}/projects`}
            className="label transition-colors hover:text-foreground"
          >
            {t.ui.viewAllProjects}
          </Link>
        </div>
        <div className="mt-8">
          <EntryList entries={projects} locale={locale} basePath="/projects" />
        </div>
      </Container>

      {/* Latest writing */}
      <Container className="border-t border-hairline py-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="label">{t.sections.latestWriting}</h2>
          <Link
            href={`/${locale}/writing`}
            className="label transition-colors hover:text-foreground"
          >
            {t.ui.viewAllWriting}
          </Link>
        </div>
        <div className="mt-8">
          <EntryList entries={writing} locale={locale} basePath="/writing" />
        </div>
      </Container>
    </>
  );
}
