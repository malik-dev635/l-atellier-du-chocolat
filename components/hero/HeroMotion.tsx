"use client";

import { useRef, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { onIntroReady } from "@/lib/intro";
import { DUR, EASE, SCRUB, STAGGER } from "@/lib/motion";

interface HeroMotionProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * Chorégraphie d'entrée du Hero, jouée quand le rideau se retire :
 *   1. titre révélé ligne par ligne (masque parent, translateY 110% → 0),
 *   2. visuels du collage en clip-path montant + contre-scale 1.15 → 1,
 *      décalés de 120 ms,
 *   3. badge curviligne et CTA en dernier (fade + translateY 20px).
 *
 * Puis parallaxe différenciée sur les visuels (attribut `data-parallax`).
 */
export function HeroMotion({ children, className }: HeroMotionProps): ReactNode {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const lines = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-hero-line]"));
      const medias = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-hero-media]"));
      const inners = medias
        .map((el) => el.firstElementChild)
        .filter((el): el is Element => el !== null);
      const late = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-hero-late]"));

      const settle = (): void => {
        gsap.set(lines, { yPercent: 0, y: 0 });
        gsap.set(medias, { clipPath: "none" });
        gsap.set(inners, { scale: 1 });
        gsap.set(late, { opacity: 1, y: 0 });
      };

      // Onglet en arrière-plan : pas de requestAnimationFrame, donc pas de
      // chorégraphie possible. On pose directement l'état final plutôt que de
      // laisser un Hero vide jusqu'à ce que l'onglet reprenne la main.
      if (reduced || document.visibilityState === "hidden") {
        settle();
        return;
      }

      const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.out } });

      // `fromTo` explicite, et `y: 0` obligatoire : l'état initial vient du CSS
      // (`translateY(110%)`), que GSAP lit dans la matrice calculée comme un `y`
      // en PIXELS. Un simple `to({ yPercent: 0 })` animait donc yPercent de 0 à
      // 0 en laissant `y` figé à 110 % — le titre ne bougeait jamais.
      tl.fromTo(
        lines,
        { yPercent: 110, y: 0 },
        { yPercent: 0, y: 0, duration: DUR.macro, stagger: STAGGER.lines },
        0,
      )
        .to(
          medias,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: DUR.enter,
            stagger: STAGGER.collage,
          },
          0.1,
        )
        .to(inners, { scale: 1, duration: DUR.enter, stagger: STAGGER.collage }, 0.1)
        .to(
          late,
          { opacity: 1, y: 0, duration: DUR.enter, stagger: 0.08 },
          "-=0.45",
        )
        .add(() => {
          gsap.set([...lines, ...medias, ...inners, ...late], { clearProps: "willChange" });
        });

      const stop = onIntroReady(() => {
        tl.play();
      });

      // Parallaxe : vitesses différenciées, premier plan plus rapide que le fond.
      medias.forEach((el) => {
        const speed = Number.parseFloat(el.dataset.parallax ?? "0");
        if (!Number.isFinite(speed) || speed === 0) return;
        gsap.fromTo(
          el,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: EASE.scrub,
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: SCRUB.image,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      return () => {
        stop();
        tl.kill();
      };
    },
    { scope, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
