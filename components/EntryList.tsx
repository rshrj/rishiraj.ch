import Link from "next/link";
import { type Entry, formatYear } from "@/lib/content";

/** Shared list of writing/project entries — used on the home teasers and the
 *  Writing / Projects index pages. */
export default function EntryList({
  entries,
  locale,
  basePath,
}: {
  entries: Entry[];
  locale: string;
  /** Route segment, e.g. "/writing" or "/projects". */
  basePath: string;
}) {
  return (
    <ul className="border-t border-hairline">
      {entries.map((entry) => (
        <li key={entry.slug} className="border-b border-hairline">
          <Link
            href={`/${locale}${basePath}/${entry.slug}`}
            className="group block py-6"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-lg font-semibold tracking-tight underline-offset-4 group-hover:underline">
                {entry.frontmatter.title}
              </h3>
              <time className="label shrink-0 pt-1">
                {formatYear(entry.frontmatter.date)}
              </time>
            </div>
            <p className="mt-1 max-w-prose text-sm leading-relaxed text-muted">
              {entry.frontmatter.summary}
            </p>
            {entry.frontmatter.tags && entry.frontmatter.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                {entry.frontmatter.tags.map((tag) => (
                  <span key={tag} className="label">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
