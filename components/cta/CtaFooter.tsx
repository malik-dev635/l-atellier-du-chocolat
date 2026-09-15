import { Download } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CTA_SECTION } from "@/lib/mocks";
import styles from "./CtaFooter.module.css";

/**
 * Bande sombre de conversion : titre sans-serif en casse mixte (la variante
 * réservée aux surfaces sombres dans le DNA), mot accentué en doré, et l'unique
 * bouton plein de toute la page.
 */
export function CtaFooter(): ReactNode {
  return (
    <section className={styles.band} aria-labelledby="cta-title">
      <Reveal className={`container ${styles.inner}`}>
        <div data-reveal>
          <h2 id="cta-title" className={styles.title}>
            {CTA_SECTION.titleBefore}{" "}
            <span className={styles.accent}>{CTA_SECTION.titleAccent}</span>
          </h2>
          <p className={styles.subtitle}>{CTA_SECTION.subtitle}</p>
        </div>

        <div data-reveal>
          <Button href="/#footer" variant="solid">
            <Download size={18} strokeWidth={1.75} aria-hidden="true" />
            {CTA_SECTION.cta}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
