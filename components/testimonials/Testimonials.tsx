import { Star } from "lucide-react";
import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { QuoteMark } from "@/components/ui/QuoteMark";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TESTIMONIALS, TESTIMONIALS_SECTION } from "@/lib/mocks";
import type { Testimonial } from "@/lib/types";
import styles from "./Testimonials.module.css";

interface EntryProps {
  readonly item: Testimonial;
}

/** Initiales : « Dana Eston » → « DE ». */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function Entry({ item }: EntryProps): ReactNode {
  return (
    <li className={styles.entry} data-reveal>
      <span className={styles.mark} aria-hidden="true">
        <QuoteMark size={30} />
      </span>

      <blockquote className={styles.quote}>
        <p>{item.quote}</p>
      </blockquote>

      <p className={styles.rating} aria-label={`Note : ${item.rating} sur 5`}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={12}
            strokeWidth={1.25}
            aria-hidden="true"
            fill={index < item.rating ? "currentColor" : "none"}
          />
        ))}
        <span className={styles.product}>{item.product}</span>
      </p>

      <div className={styles.author}>
        <span className={styles.monogram} aria-hidden="true">
          {initials(item.name)}
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
 * Témoignages : un bloc cacao — le brun du hero — et trois citations posées
 * côte à côte, séparées par des filets dorés. Pas de cartes blanches, pas de
 * portraits de banque d'images : la citation en Cormorant, les étoiles et la
 * référence en doré, un monogramme pour signer. Même surface, même encre que
 * le reste de la maison.
 *
 * Server Component ; seule la révélation au scroll est client.
 */
export function Testimonials(): ReactNode {
  return (
    <section id="testimonials" className={`section ${styles.section}`} aria-labelledby="testimonials-title">
      <div className="container">
        <header className={styles.head}>
          <Eyebrow align="center" onDark>
            {TESTIMONIALS_SECTION.eyebrow}
          </Eyebrow>
          <SectionTitle id="testimonials-title" onDark>
            {TESTIMONIALS_SECTION.title}
          </SectionTitle>
        </header>

        <Reveal stagger={0.12}>
          <ul className={styles.grid}>
            {TESTIMONIALS.map((item) => (
              <Entry key={item.id} item={item} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
