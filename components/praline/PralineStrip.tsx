import Image from "next/image";
import type { ReactNode } from "react";

import pralineStrip from "@/assets/images/praline-strip.jpg";
import styles from "./PralineStrip.module.css";

/**
 * Frise décorative pleine largeur, bord à bord. Purement ornementale :
 * retirée de l'arbre d'accessibilité, non interactive.
 */
export function PralineStrip(): ReactNode {
  return (
    <div className={styles.strip} aria-hidden="true">
      <Image
        src={pralineStrip}
        alt=""
        sizes="100vw"
        placeholder="blur"
        className={styles.image}
      />
    </div>
  );
}
