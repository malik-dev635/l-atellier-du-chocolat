"use client";

/**
 * Petit bus d'événement entre le rideau de préchargement et le Hero.
 * Évite un contexte React pour une information qui ne change qu'une fois,
 * et survit au double-mount du StrictMode (l'état vit sur `window`).
 */

const EVENT = "adc:intro-ready";

interface IntroWindow extends Window {
  __adcIntroReady?: boolean;
}

function getWin(): IntroWindow | null {
  return typeof window === "undefined" ? null : (window as IntroWindow);
}

export function isIntroReady(): boolean {
  return getWin()?.__adcIntroReady === true;
}

export function markIntroReady(): void {
  const win = getWin();
  if (!win || win.__adcIntroReady) return;
  win.__adcIntroReady = true;
  win.dispatchEvent(new Event(EVENT));
}

/**
 * Appelle `callback` dès que le rideau est retiré — immédiatement s'il l'est
 * déjà. Retourne la fonction de désabonnement.
 */
export function onIntroReady(callback: () => void): () => void {
  const win = getWin();
  if (!win) return () => undefined;
  if (win.__adcIntroReady) {
    callback();
    return () => undefined;
  }
  win.addEventListener(EVENT, callback, { once: true });
  return () => win.removeEventListener(EVENT, callback);
}
