import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/**
 * Landing-page photo slot. Renders the headshot if a `rishi.*` file is present
 * in `public/`, otherwise a neutral typographic placeholder — so the photo can
 * be dropped in later with no code change. Grayscale at rest, colour on hover
 * (a restrained Swiss photographic treatment).
 */
const CANDIDATES = ["rishi.jpg", "rishi.jpeg", "rishi.png", "rishi.webp"];

function findPhoto(): string | null {
  for (const name of CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), "public", name))) {
      return `/${name}`;
    }
  }
  return null;
}

export default function Photo({ className = "" }: { className?: string }) {
  const src = findPhoto();

  return (
    <div
      className={`group relative aspect-[4/5] w-full overflow-hidden border border-hairline bg-surface ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt="Rishi Raj"
          fill
          priority
          sizes="(max-width: 640px) 45vw, 220px"
          className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-display text-5xl font-semibold text-muted select-none">
            RR
          </span>
        </div>
      )}
    </div>
  );
}
