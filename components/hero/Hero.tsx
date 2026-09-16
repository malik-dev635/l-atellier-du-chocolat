import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { CurvedText } from "@/components/ui/CurvedText";
import { HERO } from "@/lib/mocks";
import heroBars from "@/assets/images/hero-bars.jpg";
import logoMark from "@/assets/images/logo-mark.png";
import heroMug from "@/assets/images/hero-mug.jpg";
import heroSphere from "@/assets/images/hero-sphere.jpg";
import { HeroMotion } from "./HeroMotion";
import styles from "./Hero.module.css";

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
 * Hero : collage asymétrique de trois visuels, titre serif display sur trois
 * lignes, badge curviligne et CTA fantôme. Server Component — toute la motion
 * est branchée par `HeroMotion`.
 */
export function Hero(): ReactNode {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <HeroMotion className={styles.stage}>
        <figure className={`${styles.media} ${styles.bars}`} data-hero-media data-parallax="4">
          <Image
            src={heroBars}
            alt="Tablettes de chocolat noir alignées sur un plan de travail"
            fill
            sizes="(max-width: 900px) 40vw, 16vw"
            placeholder="blur"
            style={{ objectFit: "cover" }}
          />
        </figure>

        <figure className={`${styles.media} ${styles.mug}`} data-hero-media data-parallax="7">
          <Image
            src={heroMug}
            alt="Chocolat chaud dans une tasse en céramique, éclats de chocolat blanc"
            fill
            sizes="(max-width: 900px) 60vw, 24vw"
            placeholder="blur"
            style={{ objectFit: "cover" }}
          />
        </figure>

        <div className={styles.center}>
          <div className={styles.badge} data-hero-late>
            <CurvedText className={styles.curved} text={HERO.curved} size={100} />
            <Image className={styles.leaf} src={logoMark} alt="" width={72} height={50} aria-hidden="true" />
          </div>

          <h1 id="hero-title" className={`title title--display ${styles.title}`}>
            {HERO.title.map((line) => (
              <span key={line} className="line-mask">
                <span data-hero-line>{renderLine(line)}</span>
              </span>
            ))}
          </h1>

          <div className={styles.cta} data-hero-late>
            <Button href="/#categories">{HERO.cta}</Button>
          </div>
        </div>

        <figure className={`${styles.media} ${styles.sphere}`} data-hero-media data-parallax="5">
          <Image
            src={heroSphere}
            alt="Étui de poudre de cacao de l'atelier, fèves et cabosse ouverte"
            fill
            sizes="(max-width: 900px) 70vw, 34vw"
            quality={85}
            priority
            fetchPriority="high"
            style={{ objectFit: "cover" }}
          />
        </figure>
      </HeroMotion>
    </section>
  );
}
