import { Mail } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { CTA_SECTION } from "@/lib/mocks";
import chocolat from "@/assets/images/chocolat.png";
import styles from "./CtaFooter.module.css";

/**
 * Bande sombre de conversion : titre sans-serif en casse mixte (la variante
 * réservée aux surfaces sombres dans le DNA), mot accentué en doré, l'unique
 * bouton plein de toute la page — et deux pralinés détourés qui débordent
 * de la bande à droite, en parallaxe lente.
 */
export function CtaFooter(): ReactNode {
  return (
    <section className={styles.band} aria-labelledby="cta-title">
      <Parallax className={styles.praline} from={-6} to={6} decorative>
        <Image
          src={chocolat}
          alt=""
          sizes="(max-width: 900px) 220px, 520px"
          quality={82}
          draggable={false}
        />
      </Parallax>

      <Reveal className={`container ${styles.inner}`}>
        <div data-reveal>
          <h2 id="cta-title" className={styles.title}>
            {CTA_SECTION.titleBefore}{" "}
            <span className={styles.accent}>{CTA_SECTION.titleAccent}</span>
          </h2>
          <p className={styles.subtitle}>{CTA_SECTION.subtitle}</p>
        </div>

        <div data-reveal>
          <Button href="/#contact" variant="solid">
            <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
            {CTA_SECTION.cta}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
