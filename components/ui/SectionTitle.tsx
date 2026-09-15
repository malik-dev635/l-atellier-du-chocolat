"use client";

import { useRef, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { DUR, EASE, REVEAL_START, STAGGER } from "@/lib/motion";

interface SectionTitleProps {
  readonly children: string;
  readonly as?: "h1" | "h2" | "h3";
  readonly variant?: "default" | "display";
  readonly onDark?: boolean;
  readonly className?: string;
  readonly id?: string;
}

/**
 * Titre serif révélé LIGNE PAR LIGNE (jamais caractère par caractère : le
 * contraste de la didone se casse au découpage fin — cf. DNA
 * visual_effects.text_effects.params.split_strategy).
 *
 * Composant client isolé : les sections qui l'utilisent restent serveur.
 */
export function SectionTitle({
  children,
  as: Tag = "h2",
  variant = "default",
  onDark = false,
  className,
  id,
}: SectionTitleProps): ReactNode {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reduced) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      try {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self: SplitText) {
            return gsap.from(self.lines, {
              yPercent: 110,
              opacity: 0,
              duration: DUR.macro,
              ease: EASE.out,
              stagger: STAGGER.lines,
              scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
            });
          },
        });
        return () => {
          split.revert();
        };
      } catch {
        // SplitText indisponible : repli sur une révélation du bloc entier.
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: DUR.enter,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
        });
        return undefined;
      }
    },
    { dependencies: [reduced], revertOnUpdate: true },
  );

  const classes = [
    "title",
    variant === "display" ? "title--display" : "",
    onDark ? "title--on-dark" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} id={id} className={classes}>
      {children}
    </Tag>
  );
}
