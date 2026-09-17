import { ArrowUpRight, Car, Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FIND_US, FOOTER_COLUMNS } from "@/lib/mocks";
import styles from "./FindUs.module.css";

const CONTACT = FOOTER_COLUMNS.find((column) => column.id === "contact");
const PHONE = CONTACT?.links.find((link) => link.href.startsWith("tel:"));
const EMAIL = CONTACT?.links.find((link) => link.href.startsWith("mailto:"));

/**
 * Nous trouver : la carte de l'atelier et, en regard, l'adresse, les horaires,
 * le contact et deux façons d'y aller — l'itinéraire Google Maps et une
 * course Yango avec l'atelier en destination.
 *
 * Server Component ; seule la révélation au scroll est client.
 */
export function FindUs(): ReactNode {
  return (
    <section id="contact" className={`section section--cream ${styles.section}`} aria-labelledby="findus-title">
      <Reveal className={`container ${styles.grid}`}>
        <div className={styles.info} data-reveal>
          <Eyebrow align="start">{FIND_US.eyebrow}</Eyebrow>
          <h2 id="findus-title" className={`title ${styles.title}`}>
            {FIND_US.title.map((line) => (
              <span key={line} className={styles.titleLine}>
                {line}
              </span>
            ))}
          </h2>
          <p className={styles.text}>{FIND_US.text}</p>

          <ul className={styles.list}>
            <li className={styles.item}>
              <MapPin className={styles.icon} size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>{FIND_US.place}</span>
            </li>
            <li className={styles.item}>
              <Clock className={styles.icon} size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>{FIND_US.hours}</span>
            </li>
            {PHONE ? (
              <li className={styles.item}>
                <Phone className={styles.icon} size={20} strokeWidth={1.5} aria-hidden="true" />
                <a className={`${styles.link} link-underline`} href={PHONE.href}>
                  {PHONE.label}
                </a>
              </li>
            ) : null}
            {EMAIL ? (
              <li className={styles.item}>
                <Mail className={styles.icon} size={20} strokeWidth={1.5} aria-hidden="true" />
                <a className={`${styles.link} link-underline`} href={EMAIL.href}>
                  {EMAIL.label}
                </a>
              </li>
            ) : null}
          </ul>

          <div className={styles.actions}>
            <a className="btn" href={FIND_US.directions} target="_blank" rel="noopener noreferrer">
              {FIND_US.directionsCta}
              <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </a>
            <a className={`btn ${styles.yango}`} href={FIND_US.yango} target="_blank" rel="noopener noreferrer">
              <Car size={16} strokeWidth={1.75} aria-hidden="true" />
              {FIND_US.yangoCta}
            </a>
          </div>
        </div>

        <div className={styles.mapWrap} data-reveal>
          <iframe
            className={styles.map}
            src={FIND_US.embed}
            title={`Carte : ${FIND_US.place}`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </Reveal>
    </section>
  );
}
