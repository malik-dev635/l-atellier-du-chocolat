import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND, FOOTER, FOOTER_COLUMNS, MAP } from "@/lib/mocks";
import styles from "./Footer.module.css";

const NAV_COLUMNS = FOOTER_COLUMNS.filter((column) => column.id !== "contact");
const CONTACT = FOOTER_COLUMNS.find((column) => column.id === "contact");

/**
 * Pied de page nuit, en quatre temps séparés par des filets :
 *
 * 1. l'accroche — une question, une commande — avec le bouton d'écriture ;
 * 2. la grille : marque et baseline, puis les colonnes de liens ;
 * 3. nous trouver : carte de l'atelier et bloc contact côte à côte ;
 * 4. le nom de la maison en géant, rogné par le bas de la page, sous la
 *    barre de mention.
 *
 * Server Component ; seule la révélation au scroll est client.
 */
export function Footer(): ReactNode {
  return (
    <footer id="footer" className={styles.footer}>
      {/* 1. Accroche */}
      <div className={`container ${styles.hook}`}>
        <div className={styles.hookText}>
          <p className={styles.hookTitle}>
            {FOOTER.hookLines.map((line) => (
              <span key={line} className={styles.hookLine}>
                {line}
              </span>
            ))}
          </p>
          <p className={styles.hookSub}>{FOOTER.hookText}</p>
        </div>
        <div className={styles.hookActions}>
          <Button href={CONTACT?.links[1]?.href ?? "#"} variant="outlineLight">
            {FOOTER.hookCta}
          </Button>
          <a className={styles.whatsapp} href={FOOTER.whatsapp} target="_blank" rel="noopener noreferrer">
            {FOOTER.whatsappLabel}
            <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* 2. Marque + colonnes */}
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo size="lg" onDark />
          <p className={styles.baseline}>{BRAND.baseline}</p>
        </div>

        {NAV_COLUMNS.map((column) => (
          <nav key={column.id} className={styles.column} aria-label={column.title}>
            <h2 className={styles.columnTitle}>{column.title}</h2>
            <ul className={styles.list}>
              {column.links.map((link) => (
                <li key={link.id}>
                  <a className={`${styles.link} link-underline`} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* 3. Nous trouver */}
      <div className={`container ${styles.find}`}>
        <iframe
          className={styles.map}
          src={MAP.embed}
          title={`Carte : ${MAP.place}`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />

        <div className={styles.contact}>
          <p className={styles.contactLabel}>{MAP.label}</p>
          <p className={styles.contactPlace}>{MAP.place}</p>

          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <MapPin className={styles.contactIcon} size={18} strokeWidth={1.5} aria-hidden="true" />
              <span>
                {BRAND.addressLabel}
                <span className={styles.contactMuted}>{FOOTER.hours}</span>
              </span>
            </li>
            {CONTACT?.links.map((link) => {
              const Icon = link.icon ?? (link.href.startsWith("mailto:") ? Mail : Phone);
              return (
                <li key={link.id} className={styles.contactItem}>
                  <Icon className={styles.contactIcon} size={18} strokeWidth={1.5} aria-hidden="true" />
                  <a className={`${styles.contactLink} link-underline`} href={link.href}>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a className={styles.directions} href={MAP.directions} target="_blank" rel="noopener noreferrer">
            {MAP.cta}
            <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* 4. Mention + nom géant */}
      <div className={`container ${styles.bar}`}>
        <p className={styles.copyright}>{BRAND.copyright}</p>
        <ul className={styles.social}>
          {FOOTER.social.map((item) => (
            <li key={item.id}>
              <a className={`${styles.socialLink} link-underline`} href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a className={`${styles.top} link-underline`} href="/#hero">
          {FOOTER.top}
        </a>
      </div>

      <Reveal>
        <p className={styles.giant} aria-hidden="true" data-reveal>
          {FOOTER.giant}
        </p>
      </Reveal>
    </footer>
  );
}
