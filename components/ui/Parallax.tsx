"use client";

import type { ReactNode } from "react";

import { useParallax } from "@/hooks/useParallax";

interface ParallaxProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly from?: number;
  readonly to?: number;
  /** Translation horizontale en % (watermark des catégories). */
  readonly xFrom?: number;
  readonly xTo?: number;
  readonly rotate?: number;
  readonly scrub?: number;
  /** `true` pour les ornements purement décoratifs (retirés de l'arbre a11y). */
  readonly decorative?: boolean;
}

/**
 * Enveloppe un visuel décoratif dans une parallaxe verticale liée au scroll.
 * Les vitesses sont différenciées par appelant (premier plan vs fond).
 */
export function Parallax({
  children,
  className,
  from,
  to,
  xFrom,
  xTo,
  rotate,
  scrub,
  decorative = false,
}: ParallaxProps): ReactNode {
  const ref = useParallax<HTMLDivElement>({
    ...(from !== undefined ? { from } : {}),
    ...(to !== undefined ? { to } : {}),
    ...(xFrom !== undefined ? { xFrom } : {}),
    ...(xTo !== undefined ? { xTo } : {}),
    ...(rotate !== undefined ? { rotate } : {}),
    ...(scrub !== undefined ? { scrub } : {}),
  });

  return (
    <div ref={ref} className={className} {...(decorative ? { "aria-hidden": true } : {})}>
      {children}
    </div>
  );
}
