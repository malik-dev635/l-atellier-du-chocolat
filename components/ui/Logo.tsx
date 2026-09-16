import type { ReactNode } from "react";

import { BRAND } from "@/lib/mocks";
import styles from "./Logo.module.css";

interface LogoProps {
  /** Bascule sur la version crème, pour le pied de page et les fonds sombres. */
  readonly onDark?: boolean;
  readonly size?: "sm" | "lg";
  readonly className?: string;
}

/**
 * Logo officiel — cabosse de cacao ouverte et signature manuscrite — en
 * vecteur. Référence le symbole défini une fois par `<LogoDefs>` ; la couleur
 * vient de la CSS via `currentColor`.
 */
export function Logo({ onDark = false, size = "sm", className }: LogoProps): ReactNode {
  const classes = [
    styles.logo,
    size === "lg" ? styles.lg : "",
    onDark ? styles.onDark : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg className={classes} viewBox="106 106 846 726" role="img" aria-label={BRAND.full}>
      <use href="#logo-full" />
    </svg>
  );
}

interface LogoMarkProps {
  readonly className?: string;
}

/** La cabosse seule, décorative (badge du hero). */
export function LogoMark({ className }: LogoMarkProps): ReactNode {
  return (
    <svg className={className} viewBox="148 106 768 538" aria-hidden="true" focusable="false">
      <use href="#logo-mark" />
    </svg>
  );
}
