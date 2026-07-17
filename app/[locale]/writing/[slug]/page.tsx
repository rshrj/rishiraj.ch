import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations, type Locale } from "@/lib/translations";
import { getEntry, getSlugs, formatDate } from "@/lib/content";
import Container from "@/components/Container";
import Prose from "@/components/Prose";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs("writing").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry("writing", slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.summary,
  };
}

export default async function WritingPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = getTranslations(locale as Locale);
  const entry = getEntry("writing", slug);
  if (!entry || entry.frontmatter.draft) notFound();

  const { default: MDXContent } = await import(
    `../../../../content/writing/${slug}.mdx`
  );

  return (
    <Container className="py-16 sm:py-20">
      <Link
        href={`/${locale}/writing`}
        className="label transition-colors hover:text-foreground"
      >
        ← {t.ui.allWriting}
      </Link>

      <header className="mt-8 border-b border-hairline pb-8">
        <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-[2.75rem]">
          {entry.frontmatter.title}
        </h1>
        <p className="label mt-4">{formatDate(entry.frontmatter.date, locale)}</p>
      </header>

      <article className="mt-10">
        <Prose>
          <MDXContent />
        </Prose>
      </article>
    </Container>
  );
}
