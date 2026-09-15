import type { ReactNode } from "react";

interface LeafOrnamentProps {
  readonly className?: string;
}

/**
 * Rameau au trait doré, au centre du badge curviligne du Hero.
 *
 * Volontairement en SVG inline et non en image : la version raster portait le
 * fond crème de la maquette, et `mix-blend-mode: multiply` ne pouvait pas le
 * neutraliser — GSAP pose un transform sur le badge pendant l'intro, ce qui
 * crée un contexte d'empilement et isole le fond de l'élément à fusionner.
 * Le trait vectoriel règle le problème à la source, et pèse 1 Ko au lieu de 11.
 */
export function LeafOrnament({ className }: LeafOrnamentProps): ReactNode {
  return (
    <svg
      className={className}
      viewBox="0 0 90 104"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        {/* Tige principale */}
        <path d="M20 100C30 84 41 68 50 51c8-15 14-31 16-47" />

        {/* Feuilles à droite de la tige */}
        <path d="M55 40c2-11 9-21 20-26 2 12-2 24-11 31-3 2-6 3-9 3Z" />
        <path d="M48 58c4-10 13-18 24-20 0 12-6 23-16 28-3 1-6 1-8 0Z" />
        <path d="M39 76c5-9 15-15 26-16-2 11-9 21-19 25-3 1-6 1-8-1Z" />

        {/* Feuilles à gauche de la tige */}
        <path d="M52 46c-7-8-17-12-27-10 4 11 13 19 24 20 2 0 3-1 3-2Z" />
        <path d="M43 65c-8-7-18-9-28-6 5 10 15 17 26 16 2 0 3-1 2-3Z" />
        <path d="M33 84c-8-6-18-7-27-3 6 10 16 15 26 13 2-1 3-2 1-4Z" />

        {/* Nervures */}
        <path d="M62 22c1 9-1 17-5 24M56 44c-1 8-4 15-8 21M47 66c-2 7-5 13-9 18" opacity="0.55" />
      </g>
    </svg>
  );
}
