import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { VideoCard } from "./VideoCard";
import { ABOUT } from "@/lib/mocks";
import styles from "./About.module.css";

/**
 * À propos : la vidéo de l'atelier (aperçu carré muet, lecture entière en
 * lightbox) à gauche, discours de marque à droite, signature manuscrite en
 * pied de colonne. Server Component ; seule la vignette est client.
 */
export function About(): ReactNode {
  return (
    <section id="about" className="section section--white" aria-labelledby="about-title">
      <Reveal className={`container ${styles.grid}`}>
        <div className={styles.visual} data-reveal>
          <VideoCard />
        </div>

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
