import type { ReactNode } from "react";

import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND, FOOTER, FOOTER_COLUMNS } from "@/lib/mocks";
import styles from "./Footer.module.css";

/**
 * Pied de page nuit, en deux temps : la marque et ses colonnes de liens,
 * puis la barre de mention et le nom de la maison en géant, sur deux
 * lignes, rogné par le bas de la page.
 *
 * Server Component ; seule la révélation du nom géant est client.
 */
export function Footer(): ReactNode {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo size="lg" onDark />
          <p className={styles.baseline}>{BRAND.baseline}</p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.id} className={styles.column} aria-label={column.title}>
            <h2 className={styles.columnTitle}>{column.title}</h2>
            <ul className={styles.list}>
              {column.links.map((link) => {
                const Icon = link.icon;
                const external = link.href.startsWith("http");
                return (
                  <li key={link.id} className={styles.item}>
                    {Icon ? <Icon className={styles.icon} size={16} strokeWidth={1.5} aria-hidden="true" /> : null}
                    <a
                      className={`${styles.link} link-underline`}
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>

      <div className={`container ${styles.bar}`}>
        <p className={styles.copyright}>{BRAND.copyright}</p>
        <ul className={styles.social}>
          {FOOTER.social.map((item) => (
            <li key={item.id}>
              <a className={`${styles.link} link-underline`} href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a className={`${styles.link} link-underline`} href="/#hero">
          {FOOTER.top}
        </a>
      </div>

      <Reveal>
        <p className={styles.giant} aria-hidden="true" data-reveal>
          {FOOTER.giant.map((line) => (
            <span key={line} className={styles.giantLine}>
              {line}
            </span>
          ))}
        </p>
      </Reveal>
    </footer>
  );
}
