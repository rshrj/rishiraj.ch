import { getTranslations, type Locale } from "@/lib/server-translations";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }, { locale: "fr" }, { locale: "it" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);

  return {
    title: {
      default: t.title,
      template: `%s — ${t.title}`,
    },
    description: t.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} />
    </div>
  );
}
