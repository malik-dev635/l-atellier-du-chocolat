"use client";

import { useRef, useState, type ReactNode } from "react";

import { Logo } from "@/components/ui/Logo";
import { getLenis } from "@/hooks/useLenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { markIntroReady } from "@/lib/intro";
import { BRAND } from "@/lib/mocks";
import { DUR, EASE } from "@/lib/motion";
import styles from "./Preloader.module.css";

/**
 * Rideau de chargement crème. Le Hero est déjà monté dessous : on ne retarde
 * rien, on masque le temps que la marque se révèle, puis le rideau se retire
 * vers le haut (clip-path) et libère l'intro du Hero.
 *
 * Le logo est une image détourée, pas un tracé : la révélation se fait donc
 * par masque montant plutôt que par animation de strokeDashoffset.
 */
export function Preloader(): ReactNode {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const lenis = getLenis();
      lenis?.stop();

      let settled = false;
      let failsafe = 0;

      const finish = (): void => {
        if (settled) return;
        settled = true;
        window.clearTimeout(failsafe);
        lenis?.start();
        markIntroReady();
        setDone(true);
      };

      // Un onglet en arrière-plan ne reçoit pas de requestAnimationFrame : la
      // timeline GSAP n'avancerait jamais et le rideau resterait en place, page
      // verrouillée. On ne joue l'intro que si l'onglet est réellement visible,
      // et un garde-fou la conclut de toute façon au bout de 4 s.
      if (reduced || document.visibilityState === "hidden") {
        finish();
        return;
      }

      const mark = root.querySelector(`.${styles.mark}`);
      const word = root.querySelector(`.${styles.word}`);

      const tl = gsap.timeline({ onComplete: finish });

      tl.fromTo(
        mark,
        { clipPath: "inset(100% 0% 0% 0%)", scale: 1.06 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.1, ease: EASE.out },
      )
        .to(word, { opacity: 1, y: 0, duration: DUR.state, ease: EASE.out }, "-=0.4")
        .to(
          root,
          { clipPath: "inset(0% 0% 100% 0%)", duration: DUR.curtain, ease: EASE.out },
          "+=0.2",
        );

      failsafe = window.setTimeout(finish, 4000);

      return () => {
        window.clearTimeout(failsafe);
        tl.kill();
        lenis?.start();
      };
    },
    { dependencies: [reduced] },
  );

  if (done) return null;

  return (
    <div ref={rootRef} className={styles.curtain} role="status" aria-live="polite">
      <span className="sr-only">Chargement de la boutique</span>
      <div className={styles.center} aria-hidden="true">
        <span className={styles.mark}>
          <Logo size="lg" priority />
        </span>
        <span className={styles.word}>{BRAND.tagline}</span>
      </div>
    </div>
  );
}
