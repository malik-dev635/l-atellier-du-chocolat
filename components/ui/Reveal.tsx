"use client";

import type { ReactNode } from "react";

import { useReveal } from "@/hooks/useReveal";

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly start?: string;
  readonly stagger?: number;
}

/**
 * Wrapper client minimal : applique la révélation au scroll à tous les
 * descendants marqués `data-reveal` / `data-reveal-image`.
 *
 * C'est ce qui permet aux sections de rester des Server Components : elles
 * n'émettent que du balisage + attributs, l'animation est branchée ici.
 */
export function Reveal({ children, className, start, stagger }: RevealProps): ReactNode {
  const scope = useReveal<HTMLDivElement>({
    ...(start !== undefined ? { start } : {}),
    ...(stagger !== undefined ? { stagger } : {}),
  });

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
