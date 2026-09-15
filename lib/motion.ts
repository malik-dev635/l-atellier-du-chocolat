"use client";

import { hasCustomEase } from "@/lib/gsap";

/**
 * Source unique des valeurs de motion. Miroir exact de
 * design/chocolat-dna.json → design_system.motion + visual_effects.
 * Aucun composant ne doit écrire une durée ou une easing en dur.
 */

const custom = typeof window !== "undefined" && hasCustomEase();

export const EASE = {
  /** Entrées : ease-out expo (0.16, 1, 0.3, 1) */
  out: custom ? "adcOut" : "expo.out",
  /** Transitions d'état : (0.65, 0, 0.35, 1) */
  inOut: custom ? "adcInOut" : "power2.inOut",
  /** Micro-interactions : ease-out quart (0.25, 1, 0.5, 1) */
  micro: custom ? "adcMicro" : "power4.out",
  /** Scroll-linked : jamais de linear ailleurs qu'ici. */
  scrub: "none",
  /** Pop du badge panier. */
  pop: "back.out(2.2)",
} as const;

export const DUR = {
  micro: 0.25,
  state: 0.4,
  slide: 0.7,
  enter: 0.9,
  macro: 1.1,
  curtain: 1.0,
  cardIn: 0.4,
  cardOut: 0.3,
} as const;

export const STAGGER = {
  lines: 0.09,
  cards: 0.11,
  list: 0.08,
  collage: 0.12,
} as const;

export const SCRUB = {
  soft: 1,
  image: 1.2,
} as const;

export const REVEAL_START = "top 75%";
export const REVEAL_START_LATE = "top 85%";

/** Rotation continue des textes curvilignes (secondes par tour). */
export const CURVED_ROTATION_DURATION = 40;

/** Cycle complet du marquee fantôme des catégories. */
export const MARQUEE_DURATION = 28;

/** Lenis — visual_effects.scroll_effects.smooth_scroll */
export const LENIS_OPTIONS = {
  lerp: 0.08,
  duration: 1.2,
  easing: (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
} as const;
