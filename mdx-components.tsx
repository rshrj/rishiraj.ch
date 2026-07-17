import type { MDXComponents } from "mdx/types";

/**
 * Required by `@next/mdx` in the App Router. The MDX loader wires this file in
 * as the component provider, which lets MDX render inside Server Components
 * (the alternative — the `@mdx-js/react` React-context provider — is client-only
 * and throws "createContext only works in Client Components").
 *
 * Merge any custom element overrides here; styling is handled by the `.prose`
 * wrapper (see components/Prose.tsx and globals.css).
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
