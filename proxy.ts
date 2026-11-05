import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'de', 'fr', 'it'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().split('-')[0])
      .find(lang => locales.includes(lang));
    if (preferred) return preferred;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameLocale = locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameLocale) {
    const locale = getLocale(request);
    const newPathname = pathname === '/' ? '' : pathname;
    return NextResponse.redirect(
      new URL(`/${locale}${newPathname}`, request.url)
    );
  }

  const response = NextResponse.next();
  response.headers.set('x-locale', pathnameLocale);
  return response;
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf)$).*)',
  ],
};
