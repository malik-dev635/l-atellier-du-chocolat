import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ABOUT } from "@/lib/mocks";
import styles from "./About.module.css";

/**
 * À propos : visuel détouré à gauche, discours de marque à droite, signature
 * manuscrite en pied de colonne. Server Component.
 */
export function About(): ReactNode {
  return (
    <section id="about" className="section section--white" aria-labelledby="about-title">
      <Reveal className={`container ${styles.grid}`}>
        <Parallax className={styles.visual} from={-6} to={6}>
          <RevealImage
            src={ABOUT.image}
            alt="Coffrets de l'Atelier du Chocolat empilés"
            sizes="(max-width: 900px) 90vw, 44vw"
            className={styles.image}
          />
        </Parallax>

        <div className={styles.content}>
          <div data-reveal>
            <Eyebrow align="start">{ABOUT.eyebrow}</Eyebrow>
          </div>

          <SectionTitle id="about-title" className={styles.title}>
            {ABOUT.title}
          </SectionTitle>

          <p className={`lead ${styles.text}`} data-reveal>
            {ABOUT.text}
          </p>

          <figure className={styles.signature} data-reveal>
            <figcaption className={styles.signatureName}>{ABOUT.signature}</figcaption>
            <p className={styles.signatureRole}>{ABOUT.role}</p>
          </figure>
        </div>
      </Reveal>
    </section>
  );
}
