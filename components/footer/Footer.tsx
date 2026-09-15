import type { ReactNode } from "react";

import { Logo } from "@/components/ui/Logo";
import { BRAND, FOOTER_COLUMNS } from "@/lib/mocks";
import styles from "./Footer.module.css";

/**
 * Pied de page sombre : marque et baseline, trois colonnes de liens dont une
 * colonne de contact à icônes, barre de copyright séparée par un pointillé.
 * Filigrane botanique en trait doré très faible, comme dans la maquette.
 */
export function Footer(): ReactNode {
  return (
    <footer id="footer" className={styles.footer}>
      <svg className={styles.watermark} viewBox="0 0 260 420" aria-hidden="true" focusable="false">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        >
          <path d="M20 6c0 0 18 130 44 216s52 150 52 190" />
          <path d="M34 88c34-30 84-38 128-20-24 40-72 58-120 44" />
          <path d="M58 178c36-28 86-34 130-14-26 40-74 56-122 40" />
          <path d="M84 268c36-28 86-34 130-14-26 40-74 56-122 40" />
        </g>
      </svg>

      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Logo size="lg" onDark />
          <p className={styles.baseline}>{BRAND.baseline}</p>
          <p className={styles.credit}>
            {BRAND.addressLabel} <span className={styles.creditName}>{BRAND.address}</span>
          </p>
        </div>

        <div className={styles.columns}>
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.id} className={styles.column} aria-label={column.title}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
              <ul className={styles.list}>
                {column.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.id} className={styles.item}>
                      {Icon ? (
                        <Icon
                          className={styles.icon}
                          size={18}
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      ) : null}
                      <a className={`${styles.link} link-underline`} href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>{BRAND.copyright}</p>
      </div>
    </footer>
  );
}
