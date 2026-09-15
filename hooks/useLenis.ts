"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LENIS_OPTIONS } from "@/lib/motion";

interface LenisWindow extends Window {
  __adcLenis?: Lenis;
}

/** Accès impératif à l'instance courante (overlay recherche, ancres…). */
export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  return (window as LenisWindow).__adcLenis ?? null;
}

/**
 * Initialise Lenis et le branche sur ScrollTrigger.
 * - désactivé sous `prefers-reduced-motion: reduce` (scroll natif),
 * - nettoyage complet au démontage, donc sans effet de bord au double-mount
 *   du StrictMode,
 * - aucun accès à `window` hors `useEffect`.
 */
export function useLenis(): void {
  const reduced = usePrefersReducedMotion();
  const instanceRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: LENIS_OPTIONS.lerp,
      duration: LENIS_OPTIONS.duration,
      easing: LENIS_OPTIONS.easing,
      smoothWheel: true,
    });

    instanceRef.current = lenis;
    (window as LenisWindow).__adcLenis = lenis;

    const onScroll = (): void => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const raf = (time: number): void => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      instanceRef.current = null;
      if ((window as LenisWindow).__adcLenis === lenis) {
        delete (window as LenisWindow).__adcLenis;
      }
    };
  }, [reduced]);
}
