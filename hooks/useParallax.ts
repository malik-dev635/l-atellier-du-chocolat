"use client";

import { useRef, type RefObject } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, SCRUB } from "@/lib/motion";

interface ParallaxOptions {
  /** Déplacement vertical en % de la hauteur de l'élément, du début à la fin. */
  readonly from?: number;
  readonly to?: number;
  readonly scrub?: number;
  /** Rotation légère, pour les éclats décoratifs. */
  readonly rotate?: number;
  /** Translation horizontale en % (watermark des catégories). */
  readonly xFrom?: number;
  readonly xTo?: number;
  /** Élément déclencheur ; par défaut, l'élément lui-même. */
  readonly trigger?: RefObject<HTMLElement | null>;
}

/**
 * Parallaxe liée au scroll (scrub). Transform uniquement, jamais de layout.
 * Neutralisée sous `prefers-reduced-motion`.
 */
export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {},
): RefObject<T | null> {
  const {
    from = -8,
    to = 8,
    scrub = SCRUB.image,
    rotate = 0,
    xFrom,
    xTo,
    trigger,
  } = options;

  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const triggerEl = trigger?.current ?? el;
      const horizontal = xFrom !== undefined && xTo !== undefined;

      const fromVars: gsap.TweenVars = horizontal
        ? { xPercent: xFrom }
        : { yPercent: from };
      const toVars: gsap.TweenVars = horizontal
        ? { xPercent: xTo }
        : { yPercent: to };

      if (rotate !== 0) {
        fromVars.rotate = -rotate;
        toVars.rotate = rotate;
      }

      gsap.fromTo(el, fromVars, {
        ...toVars,
        ease: EASE.scrub,
        scrollTrigger: {
          trigger: triggerEl,
          start: "top bottom",
          end: "bottom top",
          scrub,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: ref, dependencies: [reduced, from, to, scrub, rotate, xFrom, xTo], revertOnUpdate: true },
  );

  return ref;
}
