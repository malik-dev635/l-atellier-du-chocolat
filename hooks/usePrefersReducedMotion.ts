"use client";

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/** Côté serveur on suppose « motion autorisée » : le CSS gère déjà le repli. */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Lit la préférence système, et la suit si l'utilisateur la change en cours de
 * session. `useSyncExternalStore` évite tout accès à `window` pendant le SSR.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Variante impérative pour les callbacks (hors rendu) : renvoie une fonction
 * qui lit la préférence au moment de l'appel.
 */
export function useReadReducedMotion(): () => boolean {
  return useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(QUERY).matches;
  }, []);
}
