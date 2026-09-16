import Image from "next/image";
import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Parallax } from "@/components/ui/Parallax";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PRODUCTS, PRODUCTS_SECTION } from "@/lib/mocks";
import shardsLeft from "@/assets/images/shards-left.jpg";
import shardsRight from "@/assets/images/shards-right.jpg";
import { ProductRow } from "./ProductRow";
import styles from "./Products.module.css";

/**
 * Page « la gamme » : en-tête centré puis une fiche éditoriale par référence.
 *
 * Ces huit blocs vivaient sur l'accueil et lui ajoutaient 5 000 px. Ils ont
 * leur propre route : l'accueil n'en montre plus qu'un aperçu de quatre
 * vignettes. Server Component ; seuls les boutons d'ajout sont client.
 */
export function Products(): ReactNode {
  return (
    <section id="products" className={`${styles.section} ${styles.shopSection}`} aria-labelledby="products-title">
      <Parallax className={`${styles.shards} ${styles.shardsLeft}`} from={-10} to={10} rotate={3} decorative>
        <Image src={shardsLeft} alt="" sizes="25vw" placeholder="blur" />
      </Parallax>

      <Parallax className={`${styles.shards} ${styles.shardsRight}`} from={-6} to={12} rotate={-4} decorative>
        <Image src={shardsRight} alt="" sizes="25vw" placeholder="blur" />
      </Parallax>

      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <Eyebrow align="center">{PRODUCTS_SECTION.eyebrow}</Eyebrow>
          <SectionTitle id="products-title" className={styles.title}>
            {PRODUCTS_SECTION.title}
          </SectionTitle>
        </header>
      </div>

      <div className={styles.rows}>
        {PRODUCTS.map((item, index) => (
          <ProductRow key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
