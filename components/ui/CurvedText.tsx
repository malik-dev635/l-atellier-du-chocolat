"use client";

import { useId, useRef, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { CURVED_ROTATION_DURATION } from "@/lib/motion";

interface CurvedTextProps {
  readonly text: string;
  /** Nombre de répétitions du texte autour du cercle. */
  readonly repeat?: number;
  readonly size?: number;
  readonly className?: string;
  readonly reverse?: boolean;
}

/**
 * Texte disposé sur un chemin circulaire (SVG textPath), en rotation continue.
 * La rotation est mise en pause hors viewport, et supprimée sous
 * `prefers-reduced-motion`. Purement décoratif : aria-hidden.
 */
export function CurvedText({
  text,
  repeat = 1,
  size = 200,
  className,
  reverse = false,
}: CurvedTextProps): ReactNode {
  const rawId = useId();
  const pathId = `curved-${rawId.replace(/[:]/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg || reduced) return;

      const tween = gsap.to(svg, {
        rotate: reverse ? -360 : 360,
        duration: CURVED_ROTATION_DURATION,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      const trigger = ScrollTrigger.create({
        trigger: svg,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) tween.play();
          else tween.pause();
        },
      });

      return () => {
        trigger.kill();
        tween.kill();
      };
    },
    { dependencies: [reduced, reverse], revertOnUpdate: true },
  );

  const r = size / 2 - 12;
  const c = size / 2;
  // Cercle complet en deux arcs, sens horaire.
  const d = `M ${c},${c} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`;
  const content = Array.from({ length: repeat }, () => text).join("");

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path id={pathId} d={d} fill="none" />
      </defs>
      <text>
        <textPath href={`#${pathId}`} startOffset="0">
          {content}
        </textPath>
      </text>
    </svg>
  );
}
