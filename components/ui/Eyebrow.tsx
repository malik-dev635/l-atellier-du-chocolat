import type { ReactNode } from "react";

interface EyebrowProps {
  readonly children: ReactNode;
  /** `start` supprime le filet de gauche, `center` centre le bloc. */
  readonly align?: "start" | "center" | "left";
  readonly onDark?: boolean;
  readonly className?: string;
}

/**
 * Suréclairage doré : capitales, tracking large, encadré de filets de 40px.
 * Composant serveur — aucun état, aucune animation propre.
 */
export function Eyebrow({
  children,
  align = "left",
  onDark = false,
  className,
}: EyebrowProps): ReactNode {
  const classes = [
    "eyebrow",
    align === "start" ? "eyebrow--start" : "",
    align === "center" ? "eyebrow--center" : "",
    onDark ? "eyebrow--on-dark" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <p className={classes}>{children}</p>;
}
