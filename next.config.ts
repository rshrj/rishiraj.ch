import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let Next treat .md / .mdx as first-class source alongside ts/tsx.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Short, printable CV link (encoded in the QR code on the printed CV).
  // Temporary redirect so /cv can be repointed to a newer PDF later; the
  // dated PDF itself stays put, so old links keep resolving to that exact file.
  async redirects() {
    return [
      {
        source: "/:locale(en|de|fr|it)?/cv",
        destination: "/cv/Rishi_Raj_CV_2026-11.pdf",
        permanent: false,
      },
    ];
  },
};

// Plugins are declared as string tuples (not imported functions) so the config
// stays serializable across the Turbopack Rust boundary — required because both
// `dev` and `build` run with --turbopack. See CLAUDE.md / next.config notes.
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      ["remark-gfm"],
      ["remark-math"],
      // remark-frontmatter must run before remark-mdx-frontmatter so the leading
      // `---` block is recognised as frontmatter (stripped from rendered output),
      // then exported as a `frontmatter` binding.
      ["remark-frontmatter"],
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
    rehypePlugins: [
      ["rehype-katex"],
      // Dual-theme highlighting emits --shiki-light / --shiki-dark CSS vars that
      // globals.css switches on prefers-color-scheme. keepBackground:false lets
      // our own code-block surface show through.
      [
        "rehype-pretty-code",
        {
          theme: { dark: "github-dark", light: "github-light" },
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
