"use client";

import { useRef, type RefObject } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { DUR, EASE, REVEAL_START, STAGGER } from "@/lib/motion";

interface RevealOptions {
  /** Sélecteur des blocs à révéler, relatif au conteneur. */
  readonly selector?: string;
  /** Sélecteur des images à révéler par clip-path + contre-scale. */
  readonly imageSelector?: string;
  readonly start?: string;
  readonly stagger?: number;
}

/**
 * Révélation au scroll, une seule fois (`once: true`), sur les enfants marqués
 * `data-reveal` (bloc) et `data-reveal-image` (image).
 *
 * - transform + opacity + clip-path uniquement,
 * - `will-change` retiré à la fin de chaque tween,
 * - sous reduced-motion, les éléments sont posés à leur état final sans tween.
 */
export function useReveal<T extends HTMLElement>(
  options: RevealOptions = {},
): RefObject<T | null> {
  const {
    selector = "[data-reveal]",
    imageSelector = "[data-reveal-image]",
    start = REVEAL_START,
    stagger = STAGGER.cards,
  } = options;

  const scope = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const blocks = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(selector));
      const images = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(imageSelector));

      if (reduced) {
        gsap.set(blocks, { opacity: 1, y: 0, scale: 1, clearProps: "willChange" });
        gsap.set(images, { clipPath: "none", clearProps: "willChange" });
        images.forEach((wrap) => {
          gsap.set(wrap.children, { scale: 1, clearProps: "willChange" });
        });
        return;
      }

      if (blocks.length > 0) {
        // Un groupe par parent direct : les cartes d'une même grille
        // se déclenchent ensemble avec un stagger, pas les unes après les autres.
        const groups = new Map<Element, HTMLElement[]>();
        blocks.forEach((el) => {
          const key = el.parentElement ?? root;
          const bucket = groups.get(key);
          if (bucket) bucket.push(el);
          else groups.set(key, [el]);
        });

        groups.forEach((items) => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: DUR.enter,
            ease: EASE.out,
            stagger,
            overwrite: "auto",
            scrollTrigger: { trigger: items[0] ?? root, start, once: true },
            onComplete: () => {
              gsap.set(items, { clearProps: "willChange" });
            },
          });
        });
      }

      images.forEach((wrap) => {
        const inner = wrap.firstElementChild;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: wrap, start, once: true },
          onComplete: () => {
            gsap.set([wrap, inner].filter(Boolean), { clearProps: "willChange" });
          },
        });
        tl.to(wrap, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: DUR.macro,
          ease: EASE.out,
        });
        if (inner) {
          tl.to(inner, { scale: 1, duration: DUR.macro, ease: EASE.out }, 0);
        }
      });
    },
    { scope, dependencies: [reduced, selector, imageSelector, start, stagger], revertOnUpdate: true },
  );

  return scope;
}
