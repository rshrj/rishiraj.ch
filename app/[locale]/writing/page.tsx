import { getTranslations, type Locale } from "@/lib/translations";
import { getWriting } from "@/lib/content";
import Container from "@/components/Container";
import EntryList from "@/components/EntryList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: getTranslations(locale as Locale).sections.writing };
}

export default async function WritingIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  const entries = getWriting();

  return (
    <Container className="py-16 sm:py-20">
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        {t.sections.writing}
      </h1>
      <div className="mt-10">
        <EntryList entries={entries} locale={locale} basePath="/writing" />
      </div>
    </Container>
  );
}
