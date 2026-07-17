/**
 * Publications — structured data (not markdown), rendered by
 * `app/[locale]/publications/page.tsx`. Sourced from the Quantitative Research
 * CV, which is authoritative on published-vs-accepted status. hep-th convention:
 * equal-contribution works list authors alphabetically.
 */

export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  doi?: string;
  arxiv?: string;
}

/** "me" is bolded in the rendered author list. */
export const SELF = "Rishi Raj";

export const publications: Publication[] = [
  {
    title: "Learning holographic horizons",
    authors: ["Vishnu Jejjala", "Sukrut Mondkar", "Ayan Mukhopadhyay", "Rishi Raj"],
    venue: "Physical Review D 111.2, 026016",
    year: 2025,
    doi: "10.1103/PhysRevD.111.026016",
    arxiv: "2312.08442",
  },
  {
    title: "Black hole quantum mechanics and generalized error functions",
    authors: ["Boris Pioline", "Rishi Raj"],
    venue: "Journal of High Energy Physics 03, 179",
    year: 2026,
    doi: "10.1007/JHEP03(2026)179",
    arxiv: "2507.08551",
  },
  {
    title: "BPS Dendroscopy on Local ℙ¹ × ℙ¹",
    authors: ["Bruno Le Floch", "Boris Pioline", "Rishi Raj"],
    venue: "Annales Henri Poincaré",
    year: 2026,
    doi: "10.1007/s00023-026-01666-3",
    arxiv: "2412.07680",
  },
  {
    title: "Magnetically Coupled Oscillators and a Smartphone",
    authors: ["Praveen Pathak", "Yogita Patel", "Rishi Raj"],
    venue: "The Physics Teacher 62.6, pp. 463–467",
    year: 2024,
    doi: "10.1119/5.0150809",
  },
];
