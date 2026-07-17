import { getTranslations, type Locale } from "@/lib/translations";
import { publications, SELF } from "@/content/publications";
import Container from "@/components/Container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: getTranslations(locale as Locale).sections.publications };
}

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const sorted = [...publications].sort((a, b) => b.year - a.year);

  return (
    <Container className="py-16 sm:py-20">
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        {t.sections.publications}
      </h1>

      <ol className="mt-10 border-t border-hairline">
        {sorted.map((pub) => (
          <li key={pub.title} className="border-b border-hairline py-7">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-lg font-semibold leading-snug tracking-tight">
                {pub.title}
              </h2>
              <span className="label shrink-0 pt-1">{pub.year}</span>
            </div>

            <p className="mt-2 text-sm text-muted">
              {pub.authors.map((author, i) => (
                <span key={author}>
                  {i > 0 && ", "}
                  <span className={author === SELF ? "text-foreground" : ""}>
                    {author}
                  </span>
                </span>
              ))}
            </p>

            <p className="mt-1 text-sm italic text-muted">{pub.venue}</p>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
              {pub.doi && (
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-muted underline-offset-4 transition-colors hover:decoration-foreground"
                >
                  DOI ↗
                </a>
              )}
              {pub.arxiv && (
                <a
                  href={`https://arxiv.org/abs/${pub.arxiv}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs underline decoration-muted underline-offset-4 transition-colors hover:decoration-foreground"
                >
                  arXiv:{pub.arxiv} ↗
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
