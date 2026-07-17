/** Site-wide constants: identity and external profile links. */

export const site = {
  name: "Rishi Raj",
  email: "me@rishiraj.ch",
} as const;

export interface ProfileLink {
  label: string;
  href: string;
}

/**
 * Only verified handles are listed. INSPIRE-HEP / ORCID / Google Scholar can be
 * added here once the exact identifiers are confirmed — no other code changes
 * are needed (Footer maps over this array).
 */
export const profileLinks: ProfileLink[] = [
  { label: "Email", href: "mailto:me@rishiraj.ch" },
  { label: "GitHub", href: "https://github.com/rshrj" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rshrj" },
];
