"use client";

import { useEffect, useState, type ReactNode } from "react";

import { SOCIAL, WHATSAPP_FAB } from "@/lib/mocks";
import styles from "./WhatsAppFab.module.css";

/** Le glyphe WhatsApp (lucide n'a pas d'icônes de marques). */
function WhatsAppGlyph(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 1.67a8.24 8.24 0 0 1 8.24 8.24 8.24 8.24 0 0 1-8.24 8.24c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37 8.24 8.24 0 0 1 8.29-8.24m-3.4 4.42c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.74 2.77 4.3 3.78 2.13.84 2.56.67 3.02.63.46-.04 1.49-.61 1.7-1.2.21-.59.21-1.09.15-1.2-.06-.1-.23-.17-.48-.29-.25-.13-1.49-.74-1.72-.82-.23-.08-.4-.13-.57.12-.17.25-.65.82-.8.99-.15.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.57-1.37-.78-1.87-.2-.49-.41-.42-.57-.43z" />
    </svg>
  );
}

/**
 * Bouton WhatsApp flottant, coin bas droit. Il n'apparaît qu'une fois le
 * hero dépassé (ses flèches occupent le même coin) et s'efface sur le pied
 * de page, où la colonne « Nous joindre » prend le relais.
 */
export function WhatsAppFab(): ReactNode {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = (): void => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hero = document.getElementById("hero");
        const footer = document.getElementById("footer");
        const y = window.scrollY;
        const pastHero = hero ? y > hero.offsetTop + hero.offsetHeight * 0.6 : y > 400;
        const onFooter = footer
          ? footer.getBoundingClientRect().top < window.innerHeight - 120
          : false;
        setVisible(pastHero && !onFooter);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <a
      className={styles.fab}
      href={SOCIAL.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={WHATSAPP_FAB.label}
      data-visible={visible}
      tabIndex={visible ? 0 : -1}
    >
      <span className={styles.tip}>{WHATSAPP_FAB.label}</span>
      <span className={styles.disc}>
        <WhatsAppGlyph />
      </span>
    </a>
  );
}
