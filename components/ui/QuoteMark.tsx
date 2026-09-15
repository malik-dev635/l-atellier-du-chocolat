import type { ReactNode } from "react";

interface QuoteMarkProps {
  readonly className?: string;
  readonly size?: number;
}

/**
 * Guillemets décoratifs : deux virgules rondes à queue courte.
 *
 * Remplace l'icône `Quote` de lucide, dont les deux glyphes taillés en pointe
 * se lisaient comme des griffes. Ici chaque virgule est un disque plein avec
 * une petite queue arrondie — même encombrement, silhouette douce.
 */
export function QuoteMark({ className, size = 56 }: QuoteMarkProps): ReactNode {
  return (
    <svg
      className={className}
      width={size}
      height={size * (40 / 58)}
      viewBox="0 0 58 40"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {[0, 32].map((offset) => (
        <g key={offset} transform={`translate(${offset} 0)`}>
          <circle cx="13" cy="13" r="13" />
          <path d="M4 22.5c1.4 7.4 6 12.9 13.4 16.3 1.6.7 3-1.6 1.5-2.6-4.8-3.1-7.6-7.2-8.3-12.3a13 13 0 0 1-6.6-1.4Z" />
        </g>
      ))}
    </svg>
  );
}
