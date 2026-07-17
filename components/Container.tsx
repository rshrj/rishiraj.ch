/** Centered content column with the site's standard gutters. */
export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={`mx-auto w-full max-w-3xl px-6 sm:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
