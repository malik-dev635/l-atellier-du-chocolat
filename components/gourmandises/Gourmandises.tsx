import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GOURMANDISES_SECTION, PRODUCTS } from "@/lib/mocks";
import styles from "./Gourmandises.module.css";

const PRICE_FORMAT = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

/**
 * Les autres produits — pâtes à tartiner, dragées, épicerie — en rangée
 * compacte, APRÈS le chocolat. Cinq vignettes, un lien vers la boutique.
 * Server Component.
 */
export function Gourmandises(): ReactNode {
  const items = PRODUCTS.filter((product) => product.family === "gourmandise");

  return (
    <section id="gourmandises" className="section section--white" aria-labelledby="gourmandises-title">
      <div className="container">
        <header className={styles.head}>
          <Eyebrow align="center">{GOURMANDISES_SECTION.eyebrow}</Eyebrow>
          <SectionTitle id="gourmandises-title" className={styles.title}>
            {GOURMANDISES_SECTION.title}
          </SectionTitle>
        </header>

        <Reveal stagger={0.1}>
          <ul className={styles.grid}>
            {items.map((product) => (
              <li key={product.id} className={styles.card} data-accent={product.accent} data-reveal>
                <Link className={styles.link} href="/boutique">
                  <span className={styles.tile}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 18vw"
                      placeholder="blur"
                      style={{ objectFit: "cover" }}
                    />
                  </span>
                  <span className={styles.name}>{product.name}</span>
                  <span className={styles.kind}>{product.kind}</span>
                  <span className={styles.price}>{PRICE_FORMAT.format(product.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className={styles.cta}>
          <Button href="/boutique">Voir toute la boutique</Button>
        </div>
      </div>
    </section>
  );
}
