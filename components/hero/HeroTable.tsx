import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { HERO } from "@/lib/mocks";
import heroTable from "@/assets/images/hero-table.jpg";
import { HeroMotion } from "./HeroMotion";
import styles from "./HeroTable.module.css";

/**
 * Rend l'esperluette en italique calligraphique — signature typographique
 * relevée dans la maquette (DNA → typography.font_style_notes).
 */
function renderLine(line: string): ReactNode {
  const parts = line.split("&");
  if (parts.length === 1) return line;

  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? <em className={styles.amp}>&amp;</em> : null}
    </span>
  ));
}

/**
 * Hero « la table » : un seul visuel, plein cadre — les pralinés sur pierre,
 * photographiés sur fond chocolat sombre. Le panneau de gauche reprend la
 * couleur exacte de ce fond, si bien que la photo et le texte partagent la
 * même surface : le titre en crème, la photo qui continue à droite, bord net.
 *
 * Même chorégraphie d'entrée que le hero collage (HeroMotion) : titre ligne
 * par ligne, photo révélée par rideau montant, texte et CTA en dernier.
 */
export function HeroTable(): ReactNode {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <HeroMotion className={styles.stage}>
        <figure className={styles.photo} data-hero-media data-parallax="5">
          <Image
            src={heroTable}
            alt="Six pralinés de l'atelier posés sur deux plaques de pierre"
            fill
            sizes="(max-width: 900px) 100vw, 56vw"
            quality={86}
            priority
            fetchPriority="high"
            style={{ objectFit: "cover", objectPosition: "60% 50%" }}
          />
        </figure>

        <div className={`container ${styles.content}`}>
          <h1 id="hero-title" className={`title title--display ${styles.title}`}>
            {HERO.title.map((line) => (
              <span key={line} className="line-mask">
                <span data-hero-line>{renderLine(line)}</span>
              </span>
            ))}
          </h1>

          <p className={styles.lead} data-hero-late>
            {HERO.lead}
          </p>

          <div className={styles.cta} data-hero-late>
            <Button href="/#categories" variant="outlineLight">
              {HERO.cta}
            </Button>
          </div>
        </div>
      </HeroMotion>
    </section>
  );
}
