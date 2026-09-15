import { CircleCheck } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { OFFER, OFFER_POINTS } from "@/lib/mocks";
import offerSpoon from "@/assets/images/offer-spoon.jpg";
import styles from "./OfferBand.module.css";

/**
 * Bandeau chocolat pleine largeur : le visuel se fond dans le brun par un
 * masque en dégradé (aucun bord dur), filigrane botanique en fond, checklist
 * à icônes et CTA fantôme clair.
 */
export function OfferBand(): ReactNode {
  return (
    <section id="offer" className={styles.band} aria-labelledby="offer-title">
      <svg className={styles.watermark} viewBox="0 0 300 400" aria-hidden="true" focusable="false">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        >
          <path d="M150 8C150 8 138 120 150 200s26 150 26 190" />
          <path d="M150 70c-38-22-84-18-118 8 28 34 76 46 118 26" />
          <path d="M152 130c40-24 88-20 124 8-30 36-80 48-124 26" />
          <path d="M156 200c-40-22-88-16-122 12 30 34 80 44 122 22" />
          <path d="M160 268c40-22 88-16 122 12-30 34-80 44-122 22" />
        </g>
      </svg>

      <Parallax className={styles.visual} from={-6} to={6} decorative>
        <Image
          src={offerSpoon}
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          placeholder="blur"
          style={{ objectFit: "cover", objectPosition: "center right" }}
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
            <Button href="/boutique" variant="outlineLight">
              {OFFER.cta}
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
