import { getTranslations } from '../../lib/server-translations';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale as 'en' | 'de' | 'fr' | 'it');
  
  return {
    title: t.title,
    description: t.description,
  };
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
