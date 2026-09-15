"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type ReactNode } from "react";

import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  readonly views: readonly StaticImageData[];
  readonly name: string;
  readonly priority?: boolean;
}

const VIEW_LABELS = ["Vue d'ensemble", "Le produit", "Le détail"] as const;

/**
 * Galerie de fiche produit : une grande vue, trois vignettes qui la
 * remplacent. Les vues sont empilées et le passage de l'une à l'autre est
 * un fondu CSS : aucune timeline, pas de plugin, pas de pagination — trois
 * images, trois boutons.
 */
export function ProductGallery({ views, name, priority = false }: ProductGalleryProps): ReactNode {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.stage}>
        {views.map((view, index) => (
          <Image
            key={view.src}
            src={view}
            alt={index === active ? name : ""}
            fill
            sizes="(max-width: 900px) 92vw, 52vw"
            quality={84}
            priority={priority && index === 0}
            placeholder="blur"
            className={styles.view}
            data-active={index === active}
            style={{ objectFit: "cover" }}
            aria-hidden={index !== active}
          />
        ))}
      </div>

      <div className={styles.thumbs} role="tablist" aria-label={`Vues de ${name}`}>
        {views.map((view, index) => (
          <button
            key={view.src}
            type="button"
            role="tab"
            className={styles.thumb}
            aria-selected={index === active}
            aria-label={VIEW_LABELS[index] ?? `Vue ${index + 1}`}
            onClick={() => setActive(index)}
          >
            <Image
              src={view}
              alt=""
              fill
              sizes="120px"
              quality={70}
              placeholder="blur"
              style={{ objectFit: "cover" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
