import Image from "next/image";
import type { ReactNode } from "react";

import { CurvedText } from "@/components/ui/CurvedText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FEATURES, WHY } from "@/lib/mocks";
import whyStack from "@/assets/images/why-stack.jpg";
import styles from "./WhyUs.module.css";

/**
 * Pourquoi nous : liste de features à icônes en trait à gauche, visuel dans un
 * disque plein entouré d'un texte curviligne à droite.
 */
export function WhyUs(): ReactNode {
  return (
    <section id="why" className={`section ${styles.section}`} aria-labelledby="why-title">
      <Reveal className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <div data-reveal>
            <Eyebrow align="start">{WHY.eyebrow}</Eyebrow>
          </div>

          <SectionTitle id="why-title" className={styles.title}>
            {WHY.title}
          </SectionTitle>

          <ul className={styles.features}>
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <li key={feature.id} className={styles.feature} data-reveal>
                  <span className={styles.featureIcon} aria-hidden="true">
                    <Icon size={44} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureText}>{feature.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <Parallax className={styles.visual} from={-5} to={5}>
          <div className={styles.disc}>
            <Image
              className={styles.discImage}
              src={whyStack}
              alt="Coffret de tablettes de l'atelier, présenté à la bougie"
              fill
              sizes="(max-width: 900px) 80vw, 40vw"
              placeholder="blur"
              style={{ objectFit: "cover" }}
            />
          </div>
          <CurvedText className={styles.curved} text={WHY.curved} size={420} repeat={3} />
        </Parallax>
      </Reveal>
    </section>
  );
}
