import { MoveRight, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { CATEGORIES, CATEGORIES_WATERMARK } from "@/lib/mocks";
import styles from "./Categories.module.css";

/**
 * Catégories : typographie fantôme en fond (traversée horizontale liée au
 * scroll) et rangée de cinq cartes décalées en zig-zag.
 *
 * Cinq références sur une ligne ; en dessous de 1024 px la rangée défile
 * nativement, avec accroche, sans JavaScript. Server Component ; seuls le
 * filigrane et la révélation sont client.
 */
export function Categories(): ReactNode {
  return (
    <section id="categories" className={styles.section} aria-label="Nos catégories">
      <Parallax className={styles.watermark} xFrom={8} xTo={-8} scrub={1} decorative>
        <span className={styles.watermarkText}>{CATEGORIES_WATERMARK}</span>
      </Parallax>

      <Reveal className={`container ${styles.grid}`} stagger={0.1}>
        {CATEGORIES.map((item) => (
          <article
            key={item.id}
            className={styles.card}
            data-offset={item.offset}
            data-accent={item.accent}
            data-reveal
          >
            <Link className={styles.cardLink} href={item.href}>
              <span className={styles.cardMedia}>
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 18vw"
                  placeholder="blur"
                  style={{ objectFit: "cover" }}
                />
              </span>
              <span className={styles.cardFooter}>
                <span className={styles.cardLabel}>{item.label}</span>
                <span className={styles.cardArrow} aria-hidden="true">
                  <MoveRight className={styles.arrowIdle} size={38} strokeWidth={0.9} />
                  <MoveUpRight className={styles.arrowHover} size={38} strokeWidth={0.9} />
                </span>
              </span>
            </Link>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
