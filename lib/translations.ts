import en from '../locales/en.json';
import de from '../locales/de.json';
import fr from '../locales/fr.json';
import it from '../locales/it.json';

const translations = {
  en,
  de,
  fr,
  it,
};

export type Locale = keyof typeof translations;

export function getTranslations(locale: Locale) {
  return translations[locale];
}
