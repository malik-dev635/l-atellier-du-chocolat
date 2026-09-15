"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { AddToCart } from "@/components/products/AddToCart";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReadReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CHOCOLATS_SECTION, RANGES } from "@/lib/mocks";
import type { Product } from "@/lib/types";
import styles from "./ChocolateSlider.module.css";

interface ChocolateSliderProps {
  readonly items: readonly Product[];
}

const PRICE_FORMAT = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

/**
 * Slider des chocolats — la deuxième section de l'accueil, juste sous le
 * hero, parce que c'est le métier de la maison.
 *
 * Une diapositive par référence : grande photo, nom, mentions, description,
 * prix. Le FOND DE TOUTE LA SECTION prend la couleur de la photo active et
 * glisse vers la suivante — la couleur suit le produit.
 *
 * Mécanique volontairement simple : une piste en défilement natif avec
 * accroche (le doigt et la molette fonctionnent sans script), deux flèches et
 * des points qui pilotent `scrollTo`. Aucun plugin.
 */
export function ChocolateSlider({ items }: ChocolateSliderProps): ReactNode {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const readReduced = useReadReducedMotion();

  // L'index actif suit la position réelle de la piste (défilement natif inclus).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = (): void => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = track.clientWidth || 1;
        const index = Math.round(track.scrollLeft / width);
        setActive(Math.max(0, Math.min(items.length - 1, index)));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [items.length]);

  const goTo = useCallback(
    (index: number): void => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = ((index % items.length) + items.length) % items.length;
      track.scrollTo({
        left: clamped * track.clientWidth,
        behavior: readReduced() ? "auto" : "smooth",
      });
    },
    [items.length, readReduced],
  );

  const current = items[active] ?? items[0];
  if (!current) return null;

  return (
    <section
      id="chocolats"
      className={styles.section}
      data-surface={current.surface}
      aria-labelledby="chocolats-title"
    >
      <div className={`container ${styles.head}`}>
        <Eyebrow align="start" className={styles.eyebrow}>
          {CHOCOLATS_SECTION.eyebrow}
        </Eyebrow>
        <h2 id="chocolats-title" className={`title ${styles.title}`}>
          {CHOCOLATS_SECTION.title}
        </h2>
      </div>

      <div className={styles.slider}>
        <ul
          ref={trackRef}
          className={styles.track}
          role="region"
          aria-roledescription="carrousel"
          aria-label="Nos chocolats"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") goTo(active + 1);
            if (event.key === "ArrowLeft") goTo(active - 1);
          }}
        >
          {items.map((item, index) => (
            <li
              key={item.id}
              className={styles.slide}
              aria-roledescription="diapositive"
              aria-label={`${index + 1} sur ${items.length} — ${item.name}`}
              aria-hidden={index !== active}
            >
              <div className={`container ${styles.slideInner}`}>
                <div className={styles.media}>
                  <Image
                    src={item.views[1] ?? item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 900px) 92vw, 48vw"
                    quality={84}
                    priority={index === 0}
                    placeholder="blur"
                    style={{ objectFit: "cover" }}
                    draggable={false}
                  />
                </div>

                <div className={styles.body}>
                  <p className={styles.kind}>{item.kind}</p>
                  <h3 className={styles.name}>{item.name}</h3>
                  <p className={styles.spec}>
                    {item.spec} · {RANGES[item.range]}
                  </p>
                  <p className={styles.text}>{item.description}</p>

                  <div className={styles.actions}>
                    <span className={styles.price}>{PRICE_FORMAT.format(item.price)}</span>
                    <AddToCart productName={item.name} className={styles.add} />
                    <Link className={`link-more ${styles.more}`} href="/boutique">
                      Voir la fiche
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className={`container ${styles.controls}`}>
          <div className={styles.dots} role="tablist" aria-label="Choisir un chocolat">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                className={styles.dot}
                aria-selected={index === active}
                aria-label={item.name}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} onClick={() => goTo(active - 1)} aria-label="Chocolat précédent">
              <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <span className={styles.counter} aria-hidden="true">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button type="button" className={styles.arrow} onClick={() => goTo(active + 1)} aria-label="Chocolat suivant">
              <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
