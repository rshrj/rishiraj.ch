import { getTranslations, type Locale } from "@/lib/translations";
import { profileLinks } from "@/lib/site";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <footer className="mt-24 border-t border-hairline">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-baseline sm:justify-between">
          <nav
            aria-label={t.footer.contact}
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm"
          >
            {profileLinks.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <LanguageSwitcher />
        </div>
        <div className="flex items-baseline justify-between">
          <span className="label">
            © {new Date().getFullYear()} Rishi Raj
          </span>
          <span className="label">{t.footer.note}</span>
        </div>
      </div>
    </footer>
  );
}
