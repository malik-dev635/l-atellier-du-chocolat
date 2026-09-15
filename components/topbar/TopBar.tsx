import type { ReactNode } from "react";

import { BRAND } from "@/lib/mocks";
import styles from "./TopBar.module.css";

/**
 * Bandeau promo pleine largeur, fond chocolat au lait.
 * Server Component : aucun état, aucune animation.
 */
export function TopBar(): ReactNode {
  return (
    <div className={styles.bar}>
      <p className={styles.text}>
        {BRAND.promo}{" "}
        <a className={`${styles.link} link-underline`} href="/#footer">
          {BRAND.promoCta}
        </a>
      </p>
    </div>
  );
}
