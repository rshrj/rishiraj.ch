"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { getTranslations, type Locale } from "@/lib/translations";

export default function Nav() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as Locale) ?? "en";
  const t = getTranslations(locale);
  const base = `/${locale}`;

  const items = [
    { href: `${base}/writing`, label: t.nav.writing },
    { href: `${base}/projects`, label: t.nav.projects },
    { href: `${base}/publications`, label: t.nav.publications },
    { href: `${base}/about`, label: t.nav.about },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="border-b border-hairline">
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <nav className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-5">
          <Link
            href={base}
            className="font-display text-base font-semibold tracking-tight transition-opacity hover:opacity-60"
          >
            Rishi Raj
          </Link>
          <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-sm">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={
                    isActive(item.href)
                      ? "underline decoration-1 underline-offset-4"
                      : "text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
