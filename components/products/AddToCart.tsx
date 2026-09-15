"use client";

import { ShoppingBag } from "lucide-react";
import { useCallback, useRef, type ReactNode } from "react";

import { useShop } from "@/components/providers/ShopProvider";

interface AddToCartProps {
  readonly productName: string;
  readonly className?: string;
}

/**
 * Seul fragment client de la boutique : le reste des fiches produit est rendu
 * côté serveur. Le flare part du bloc produit entier, pas du bouton, pour que
 * la trajectoire vers le panier parte du visuel.
 */
export function AddToCart({ productName, className }: AddToCartProps): ReactNode {
  const ref = useRef<HTMLButtonElement>(null);
  const { addToCart } = useShop();

  const handleClick = useCallback((): void => {
    const origin = ref.current?.closest("[data-product]");
    addToCart(origin instanceof HTMLElement ? origin : ref.current);
  }, [addToCart]);

  return (
    <button
      ref={ref}
      type="button"
      className={["btn", className ?? ""].filter(Boolean).join(" ")}
      onClick={handleClick}
      aria-label={`Ajouter ${productName} au panier`}
    >
      <ShoppingBag size={16} strokeWidth={1.75} aria-hidden="true" />
      Ajouter
    </button>
  );
}
