import { Star } from "lucide-react";
import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { RANGES } from "@/lib/mocks";
import type { Product } from "@/lib/types";
import { AddToCart } from "./AddToCart";
import { ProductGallery } from "./ProductGallery";
import styles from "./Products.module.css";

const PRICE_FORMAT = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

interface ProductRowProps {
  readonly item: Product;
  readonly index: number;
}

/**
 * Fiche produit éditoriale : galerie d'un côté, présentation de l'autre.
 *
 * Le visuel change de côté à chaque produit, et chaque fiche prend la teinte
 * pâle de son propre emballage — la couleur identifie le produit, ce n'est
 * pas une alternance mécanique.
 *
 * Server Component ; seul le bouton d'ajout est client.
 */
export function ProductRow({ item, index }: ProductRowProps): ReactNode {
  const flipped = index % 2 === 1;

  return (
    <article
      className={styles.row}
      data-flipped={flipped}
      data-accent={item.accent}
      data-surface={item.surface}
      data-product
    >
      <Reveal className={`container ${styles.rowInner}`}>
        <div className={styles.rowMedia} data-reveal>
          <ProductGallery views={item.views} name={item.name} priority={index === 0} />
        </div>

        <div className={styles.rowBody}>
          <p className={styles.range} data-reveal>
            {RANGES[item.range]}
          </p>

          <h3 className={styles.rowTitle} data-reveal>
            {item.name}
          </h3>

          <p className={styles.spec} data-reveal>
            {item.spec}
          </p>

          <p className={styles.rowText} data-reveal>
            {item.description}
          </p>

          <dl className={styles.composition} data-reveal>
            <dt>Composition</dt>
            <dd>{item.composition}</dd>
          </dl>

          <div className={styles.rowFooter} data-reveal>
            <p className={styles.rating} aria-label={`Note : ${item.rating} sur 5`}>
              {Array.from({ length: 5 }, (_, starIndex) => (
                <Star
                  key={starIndex}
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  fill={starIndex < item.rating ? "currentColor" : "none"}
                  className={starIndex < item.rating ? styles.starOn : styles.starOff}
                />
              ))}
            </p>

            <p className={styles.price}>{PRICE_FORMAT.format(item.price)}</p>

            <AddToCart productName={item.name} className={styles.add} />
          </div>
        </div>
      </Reveal>
    </article>
  );
}
