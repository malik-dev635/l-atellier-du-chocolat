import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

interface RevealImageProps {
  readonly src: StaticImageData;
  readonly alt: string;
  readonly sizes: string;
  readonly className?: string;
  /** `true` uniquement sur le visuel principal du Hero (LCP). */
  readonly priority?: boolean;
  readonly quality?: number;
}

/**
 * Image en révélation « rideau » : le conteneur porte `data-reveal-image`
 * (clip-path animé par le `Reveal` parent) et l'image son contre-scale.
 *
 * Composant serveur : il n'émet que du balisage. Le ratio est fixé par la CSS
 * du conteneur, ce qui garantit un CLS nul.
 */
export function RevealImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
  quality = 82,
}: RevealImageProps): ReactNode {
  const classes = ["media", className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classes} data-reveal-image>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        {...(priority
          ? { priority: true, fetchPriority: "high" as const }
          : { loading: "lazy" as const, placeholder: "blur" as const })}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
