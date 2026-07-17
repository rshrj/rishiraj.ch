/** Wrapper that applies the long-form `.prose` styles (see globals.css) to
 *  rendered MDX content. */
export default function Prose({ children }: { children: React.ReactNode }) {
  return <div className="prose">{children}</div>;
}
