"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useReadReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion";

interface ShopContextValue {
  readonly count: number;
  /** Ajoute un article et lance le flare depuis l'élément d'origine. */
  readonly addToCart: (origin: HTMLElement | null) => void;
  /** Le Header enregistre ici l'icône panier, cible du flare. */
  readonly setCartTarget: (el: HTMLElement | null) => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

interface ShopProviderProps {
  readonly children: ReactNode;
}

export function ShopProvider({ children }: ShopProviderProps): ReactNode {
  const [count, setCount] = useState(0);
  const cartTargetRef = useRef<HTMLElement | null>(null);
  const readReduced = useReadReducedMotion();

  const setCartTarget = useCallback((el: HTMLElement | null): void => {
    cartTargetRef.current = el;
  }, []);

  /**
   * Flare : une pastille dorée créée hors flux, animée de la carte vers
   * l'icône panier, puis retirée. Position fixe + transform uniquement.
   */
  const flare = useCallback(
    (origin: HTMLElement, target: HTMLElement): void => {
      const from = origin.getBoundingClientRect();
      const to = target.getBoundingClientRect();

      const dot = document.createElement("span");
      dot.setAttribute("aria-hidden", "true");
      Object.assign(dot.style, {
        position: "fixed",
        left: "0px",
        top: "0px",
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        background: "var(--c-gold)",
        pointerEvents: "none",
        zIndex: "90",
        willChange: "transform, opacity",
      } satisfies Partial<CSSStyleDeclaration>);
      document.body.appendChild(dot);

      const startX = from.left + from.width / 2 - 7;
      const startY = from.top + from.height / 2 - 7;
      const endX = to.left + to.width / 2 - 7;
      const endY = to.top + to.height / 2 - 7;

      gsap
        .timeline({
          onComplete: () => {
            dot.remove();
          },
        })
        .fromTo(
          dot,
          { x: startX, y: startY, scale: 0.4, opacity: 0 },
          { x: startX, y: startY - 40, scale: 1, opacity: 1, duration: 0.22, ease: EASE.micro },
        )
        .to(dot, {
          x: endX,
          y: endY,
          scale: 0.35,
          opacity: 0.9,
          duration: 0.62,
          ease: EASE.inOut,
        })
        .to(dot, { opacity: 0, duration: 0.14, ease: "power1.in" }, "-=0.06");
    },
    [],
  );

  const addToCart = useCallback(
    (origin: HTMLElement | null): void => {
      setCount((current) => current + 1);
      const target = cartTargetRef.current;
      if (!origin || !target || readReduced()) return;
      flare(origin, target);
    },
    [flare, readReduced],
  );

  const value = useMemo<ShopContextValue>(
    () => ({ count, addToCart, setCartTarget }),
    [count, addToCart, setCartTarget],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop doit être utilisé à l'intérieur de <ShopProvider>.");
  }
  return context;
}

export const DUR_CART_POP = DUR.state;
