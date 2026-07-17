"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Locale } from "@/lib/translations";

const languages: { code: Locale; name: string }[] = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as Locale;

  const handleLanguageChange = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center gap-3">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => handleLanguageChange(lang.code)}
          aria-current={currentLocale === lang.code ? "true" : undefined}
          title={lang.name}
          className={
            "font-mono text-xs uppercase tracking-wide underline-offset-4 transition-colors " +
            (currentLocale === lang.code
              ? "text-foreground underline decoration-1"
              : "text-muted hover:text-foreground hover:underline")
          }
        >
          {lang.code}
        </button>
      ))}
    </div>
  );
}
