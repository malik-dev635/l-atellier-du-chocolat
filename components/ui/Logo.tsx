import Image from "next/image";
import type { ReactNode } from "react";

import { BRAND } from "@/lib/mocks";
import logoDark from "@/assets/images/logo.png";
import logoLight from "@/assets/images/logo-light.png";
import styles from "./Logo.module.css";

interface LogoProps {
  /** Bascule sur la version crème, pour le pied de page et les fonds sombres. */
  readonly onDark?: boolean;
  readonly size?: "sm" | "lg";
  readonly className?: string;
  readonly priority?: boolean;
}

/**
 * Logo officiel de la maison : cabosse de cacao ouverte et signature
 * manuscrite, fourni dans `marque/logo.png`.
 *
 * Deux fichiers plutôt qu'un filtre CSS : le tracé est détouré en alpha, la
 * variante claire réutilise exactement le même masque avec une encre crème.
 * Un `filter: invert()` aurait vidé le brun de sa chaleur.
 */
export function Logo({
  onDark = false,
  size = "sm",
  className,
  priority = false,
}: LogoProps): ReactNode {
  const classes = [styles.logo, size === "lg" ? styles.lg : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      <Image
        src={onDark ? logoLight : logoDark}
        alt={BRAND.full}
        sizes={size === "lg" ? "132px" : "84px"}
        priority={priority}
        style={{ width: "100%", height: "auto" }}
      />
    </span>
  );
}
