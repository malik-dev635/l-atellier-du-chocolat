import { Star } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { QuoteMark } from "@/components/ui/QuoteMark";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TESTIMONIALS, TESTIMONIALS_SECTION } from "@/lib/mocks";
import type { Testimonial } from "@/lib/types";
import styles from "./Testimonials.module.css";

interface CardProps {
  readonly item: Testimonial;
}

function Card({ item }: CardProps): ReactNode {
  return (
    <li className={styles.card} data-reveal>
      <span className={styles.mark} aria-hidden="true">
        <QuoteMark size={34} />
      </span>

      <p className={styles.rating} aria-label={`Note : ${item.rating} sur 5`}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={14}
            strokeWidth={1.5}
            aria-hidden="true"
            fill={index < item.rating ? "currentColor" : "none"}
          />
        ))}
      </p>

      <p className={styles.quote}>{item.quote}</p>

      <span className={styles.tag}>{item.product}</span>

      <div className={styles.author}>
        <span className={styles.avatar}>
          <Image
            src={item.avatar}
            alt={`Portrait de ${item.name}`}
            fill
            sizes="48px"
            placeholder="blur"
            style={{ objectFit: "cover" }}
          />
        </span>
        <span className={styles.authorText}>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.location}>{item.location}</span>
        </span>
      </div>
    </li>
  );
}

/**
 * Témoignages : un bloc corail — le fond des photos de dragées — et trois
 * cartes blanches aux coins doux. Texte en sans, étoiles, étiquette du
 * produit acheté : c'est un avis client de boutique gourmande, pas une
 * citation de maison de couture.
 *
 * Server Component ; seule la révélation au scroll est client.
 */
export function Testimonials(): ReactNode {
  return (
    <section id="testimonials" className={`section ${styles.section}`} aria-labelledby="testimonials-title">
      <div className="container">
        <header className={styles.head}>
          <Eyebrow align="center" className={styles.eyebrow}>
            {TESTIMONIALS_SECTION.eyebrow}
          </Eyebrow>
          <SectionTitle id="testimonials-title" className={styles.title}>
            {TESTIMONIALS_SECTION.title}
          </SectionTitle>
        </header>

        <Reveal stagger={0.12}>
          <ul className={styles.grid}>
            {TESTIMONIALS.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
