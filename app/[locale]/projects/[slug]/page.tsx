import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations, type Locale } from "@/lib/translations";
import { getEntry, getSlugs, formatDate } from "@/lib/content";
import Container from "@/components/Container";
import Prose from "@/components/Prose";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs("projects").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry("projects", slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = getTranslations(locale as Locale);
  const entry = getEntry("projects", slug);
  if (!entry || entry.frontmatter.draft) notFound();

  const { frontmatter } = entry;
  const { default: MDXContent } = await import(
    `../../../../content/projects/${slug}.mdx`
  );

  return (
    <Container className="py-16 sm:py-20">
      <Link
        href={`/${locale}/projects`}
        className="label transition-colors hover:text-foreground"
      >
        ← {t.ui.allProjects}
      </Link>

      <header className="mt-8 border-b border-hairline pb-8">
        <p className="label">{formatDate(frontmatter.date, locale)}</p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-[2.75rem]">
          {frontmatter.title}
        </h1>
        {frontmatter.role && (
          <p className="mt-4 text-muted">{frontmatter.role}</p>
        )}
        {frontmatter.links && frontmatter.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {frontmatter.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-muted underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      <article className="mt-10">
        <Prose>
          <MDXContent />
        </Prose>
      </article>
    </Container>
  );
}
