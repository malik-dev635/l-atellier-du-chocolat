"use client";

import { useEffect, type ReactNode } from "react";

import { useLenis } from "@/hooks/useLenis";
import { ScrollTrigger } from "@/lib/gsap";

interface SmoothScrollProviderProps {
  readonly children: ReactNode;
}

/**
 * Monte Lenis pour toute la page et rafraîchit ScrollTrigger une fois les
 * polices chargées — sans quoi les positions de déclenchement sont calculées
 * sur les métriques de la police de repli.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps): ReactNode {
  useLenis();

  useEffect(() => {
    document.documentElement.classList.remove("no-js");

    let cancelled = false;
    const refresh = (): void => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    void document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
    };
  }, []);

  return children;
}
