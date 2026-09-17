"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageProps } from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { onIntroReady } from "@/lib/intro";
import { HERO_SLIDES } from "@/lib/mocks";
import styles from "./HeroSlider.module.css";

/** Durée d'affichage d'une diapositive avant de passer à la suivante. */
const AUTOPLAY_MS = 6500;

type Slide = (typeof HERO_SLIDES)[number];

/**
 * Le visuel d'une diapositive : `<picture>` avec la version mobile en
 * portrait sous 640px, la version paysage au-dessus. Les deux passent par
 * l'optimiseur de next/image (srcSet, AVIF/WebP) via `getImageProps`.
 */
function Background({ slide, active, index }: { slide: Slide; active: boolean; index: number }): ReactNode {
  const common = { alt: slide.alt, sizes: "100vw", quality: 82, priority: index === 0 } as const;
  const { props: desktop } = getImageProps({ ...common, src: slide.image });
  const { props: mobile } = getImageProps({ ...common, src: slide.imageMobile });

  return (
    <picture className={styles.bg} data-active={active} aria-hidden={!active}>
      <source media="(max-width: 640px)" srcSet={mobile.srcSet} sizes="100vw" />
      <img
        {...desktop}
        alt={slide.alt}
        className={styles.img}
        draggable={false}
        fetchPriority={index === 0 ? "high" : "auto"}
      />
    </picture>
  );
}

/**
 * Hero en slider : un visuel plein cadre par diapositive (sujet à droite,
 * texte à gauche), fondu enchaîné, titre ligne par ligne qui se rejoue à
 * chaque changement. Les visuels sont composés pour le hero : jamais de
 * zoom, et sur mobile l'image est affichée entière sur un fond de la couleur
 * de son propre fond. L'autoplay attend la
 * fin du rideau, s'arrête au survol, au focus et quand l'onglet est caché.
 */
export function HeroSlider(): ReactNode {
  const slides = HERO_SLIDES;
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => onIntroReady(() => setReady(true)), []);

  useEffect(() => {
    const onVisibility = (): void => setPaused(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const goTo = useCallback(
    (index: number): void => {
      setActive(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  // Relancé à chaque changement (manuel ou non) : le compte repart de zéro.
  useEffect(() => {
    if (!ready || paused || reduced || slides.length < 2) return;
    const id = window.setTimeout(() => goTo(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [ready, paused, reduced, active, goTo, slides.length]);

  const current = slides[active] ?? slides[0];
  if (!current) return null;

  return (
    <section
      id="hero"
      className={styles.hero}
      style={{ "--slide-bg": current.bgMobile } as React.CSSProperties}
      data-ready={ready}
      aria-labelledby="hero-title"
      aria-roledescription="carrousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") goTo(active + 1);
        if (event.key === "ArrowLeft") goTo(active - 1);
      }}
    >
      <div className={styles.stage}>
        {slides.map((slide, index) => (
          <Background key={slide.id} slide={slide} active={index === active} index={index} />
        ))}

        {/* `key` : le bloc se remonte à chaque diapositive, les entrées rejouent. */}
        <div key={current.id} className={`container ${styles.content}`}>
          <h1 id="hero-title" className={`title title--display ${styles.title}`}>
            {current.title.map((line, index) => (
              <span key={line} className="line-mask">
                <span className={styles.line} style={{ "--i": index } as React.CSSProperties}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className={styles.lead}>{current.lead}</p>

          <div className={styles.cta}>
            <Button href={current.href} variant="outlineLight">
              {current.cta}
            </Button>
          </div>
        </div>

        <div className={`container ${styles.controls}`}>
          <div className={styles.dots} role="tablist" aria-label="Choisir une diapositive">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                className={styles.dot}
                aria-selected={index === active}
                aria-label={`Diapositive ${index + 1} : ${slide.title.join(" ")}`}
                data-paused={paused || !ready}
                onClick={() => goTo(index)}
              />
            ))}
            <span className={styles.counter} aria-hidden="true">
              {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} onClick={() => goTo(active - 1)} aria-label="Diapositive précédente">
              <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button type="button" className={styles.arrow} onClick={() => goTo(active + 1)} aria-label="Diapositive suivante">
              <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
