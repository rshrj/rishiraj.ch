import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Content index layer.
 *
 * `@next/mdx` compiles and renders each `.mdx` file (imported directly by the
 * dynamic routes), but it does not give us a queryable list of posts. This
 * module reads the frontmatter of every entry with `gray-matter` so index
 * pages can sort, filter, tag and teaser them. Bodies stay English-only and
 * live outside `app/[locale]/` (see the site plan / CLAUDE.md).
 */

export type EntryKind = "writing" | "projects";

export interface EntryLink {
  label: string;
  href: string;
}

export interface EntryFrontmatter {
  title: string;
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
  summary: string;
  tags?: string[];
  draft?: boolean;
  /** Project write-ups: short role/context line and external links. */
  role?: string;
  links?: EntryLink[];
}

export interface Entry {
  kind: EntryKind;
  slug: string;
  frontmatter: EntryFrontmatter;
}

const CONTENT_ROOT = path.join(process.cwd(), "content");

function contentDir(kind: EntryKind): string {
  return path.join(CONTENT_ROOT, kind);
}

function readSlugs(kind: EntryKind): string[] {
  const dir = contentDir(kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readEntry(kind: EntryKind, slug: string): Entry | null {
  const file = path.join(contentDir(kind), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data } = matter(fs.readFileSync(file, "utf8"));
  return {
    kind,
    slug,
    frontmatter: data as EntryFrontmatter,
  };
}

/** All non-draft entries of a kind, newest first. */
export function getEntries(kind: EntryKind): Entry[] {
  return readSlugs(kind)
    .map((slug) => readEntry(kind, slug))
    .filter((entry): entry is Entry => entry !== null)
    .filter((entry) => !entry.frontmatter.draft)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export function getEntry(kind: EntryKind, slug: string): Entry | null {
  return readEntry(kind, slug);
}

/** Slugs for `generateStaticParams` (drafts excluded from the static build). */
export function getSlugs(kind: EntryKind): string[] {
  return getEntries(kind).map((entry) => entry.slug);
}

export const getWriting = () => getEntries("writing");
export const getProjects = () => getEntries("projects");

/** Human-readable date, e.g. "10 June 2026". */
export function formatDate(iso: string, locale = "en"): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatYear(iso: string): string {
  return iso.slice(0, 4);
}
