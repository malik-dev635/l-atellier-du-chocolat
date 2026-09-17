import { CircleCheck } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { OFFER, OFFER_POINTS } from "@/lib/mocks";
import boiteCadeau from "@/assets/images/boite-cadeau.jpg";
import styles from "./OfferBand.module.css";

/**
 * Bandeau coffrets pleine largeur : la photo de la boîte cadeau (composée
 * avec le sujet à gauche et le vide à droite) occupe tout le fond, la bande
 * est peinte de la couleur de son fond pour qu'elle se prolonge sans
 * couture ; checklist à icônes et CTA fantôme clair à droite.
 */
export function OfferBand(): ReactNode {
  return (
    <section id="offer" className={styles.band} aria-labelledby="offer-title">
      <Parallax className={styles.visual} from={-4} to={4} decorative>
        <Image
          src={boiteCadeau}
          alt=""
          fill
          sizes="100vw"
          quality={84}
          placeholder="blur"
          style={{ objectFit: "contain", objectPosition: "left center" }}
        />
      </Parallax>

      <Reveal className={`container ${styles.grid}`}>
        <div className={styles.spacer} aria-hidden="true" />

        <div className={styles.content}>
          <div data-reveal>
            <Eyebrow align="start" onDark>
              {OFFER.eyebrow}
            </Eyebrow>
          </div>

          <SectionTitle id="offer-title" className={styles.title} onDark>
            {OFFER.title}
          </SectionTitle>

          <p className={`lead lead--on-brand ${styles.text}`} data-reveal>
            {OFFER.text}
          </p>

          <ul className={styles.points}>
            {OFFER_POINTS.map((point) => (
              <li key={point.id} className={styles.point} data-reveal>
                <CircleCheck size={22} strokeWidth={1.5} aria-hidden="true" />
                <span>{point.text}</span>
              </li>
            ))}
          </ul>

          <div className={styles.cta} data-reveal>
            <Button href="/#contact" variant="outlineLight">
              {OFFER.cta}
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
