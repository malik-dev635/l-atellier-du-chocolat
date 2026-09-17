import Image from "next/image";
import type { ReactNode } from "react";

import logoCream from "@/assets/images/logo-cream.svg";
import logoSvg from "@/assets/images/logo.svg";

import { BRAND } from "@/lib/mocks";
import styles from "./Logo.module.css";

interface LogoProps {
  /** Bascule sur la version crème, pour le pied de page et les fonds sombres. */
  readonly onDark?: boolean;
  readonly size?: "sm" | "lg";
  readonly className?: string;
}

/**
 * Logo officiel — cabosse de cacao ouverte et signature manuscrite — le SVG
 * de la marque tel quel, en brun sur fond clair et en crème sur fond sombre.
 */
export function Logo({ onDark = false, size = "sm", className }: LogoProps): ReactNode {
  const classes = [
    styles.logo,
    size === "lg" ? styles.lg : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Image
      src={onDark ? logoCream : logoSvg}
      alt={BRAND.full}
      className={classes}
      priority={size === "sm"}
      sizes="(max-width: 640px) 96px, 210px"
    />
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
