"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { getLenis } from "@/hooks/useLenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion";
import styles from "./SearchOverlay.module.css";

interface SearchOverlayProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

const SHELL_ID = "page-shell";

/**
 * Overlay de recherche : descend en clip-path, met la page en retrait
 * (scale + blur), verrouille le scroll, rend le focus au déclencheur en
 * sortant. Rendu en portail pour rester net pendant que la page floute.
 */
export function SearchOverlay({ open, onClose }: SearchOverlayProps): ReactNode {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ouverture / fermeture animée + effets de page.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const shell = document.getElementById(SHELL_ID);
    const lenis = getLenis();

    if (open) {
      lenis?.stop();
      const tl = gsap.timeline();
      if (reduced) {
        gsap.set(panel, { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1 });
        if (shell) gsap.set(shell, { opacity: 0.75 });
      } else {
        tl.set(panel, { autoAlpha: 1 })
          .fromTo(
            panel,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: DUR.slide, ease: EASE.out },
          )
          .fromTo(
            panel.querySelectorAll("[data-search-item]"),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: DUR.state, ease: EASE.out, stagger: 0.06 },
            "-=0.35",
          );
        if (shell) {
          gsap.to(shell, {
            scale: 0.98,
            filter: "blur(2px)",
            duration: DUR.slide,
            ease: EASE.inOut,
          });
        }
      }
      inputRef.current?.focus({ preventScroll: true });
      return;
    }

    // Fermeture : plus courte que l'ouverture.
    lenis?.start();
    if (reduced) {
      gsap.set(panel, { autoAlpha: 0 });
      if (shell) gsap.set(shell, { opacity: 1, scale: 1, filter: "none" });
      return;
    }
    gsap.to(panel, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: DUR.state,
      ease: EASE.inOut,
      onComplete: () => {
        gsap.set(panel, { autoAlpha: 0 });
      },
    });
    if (shell) {
      gsap.to(shell, {
        scale: 1,
        filter: "blur(0px)",
        duration: DUR.state,
        ease: EASE.inOut,
        onComplete: () => {
          gsap.set(shell, { clearProps: "filter,transform,willChange" });
        },
      });
    }
  }, [open, reduced]);

  // Échap ferme l'overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={panelRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Recherche"
      aria-hidden={!open}
      style={{ visibility: "hidden", opacity: 0 }}
    >
      <div className={styles.inner}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Fermer la recherche">
          <X size={24} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <form
          className={styles.form}
          data-search-item
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label className={styles.label} htmlFor="site-search">
            Que cherchez-vous ?
          </label>
          <input
            ref={inputRef}
            id="site-search"
            className={styles.input}
            type="search"
            placeholder="Praliné, tablette, coffret…"
            autoComplete="off"
            tabIndex={open ? 0 : -1}
          />
        </form>

        <p className={styles.hint} data-search-item>
          Suggestions : truffe fruits rouges · coffret douze pièces · tablette noir 85 %
        </p>
      </div>
    </div>,
    document.body,
  );
}
