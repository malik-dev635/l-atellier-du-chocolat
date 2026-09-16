"use client";

import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useCallback, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion";
import { BRAND, NAV_ITEMS } from "@/lib/mocks";
import { SearchOverlay } from "./SearchOverlay";
import styles from "./Header.module.css";

const HIDE_AFTER = 160;

/**
 * En-tête collant : se rétracte au scroll descendant, réapparaît au scroll
 * montant, gagne un fond flouté une fois la page défilée.
 */
export function Header(): ReactNode {
  const headerRef = useRef<HTMLElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = usePrefersReducedMotion();

  // Rétraction / réapparition + fond flouté.
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      if (reduced) {
        gsap.set(header, { yPercent: 0 });
        return;
      }

      const moveTo = gsap.quickTo(header, "yPercent", {
        duration: DUR.state,
        ease: EASE.inOut,
      });

      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const scrolled = self.scroll();
          header.dataset.scrolled = scrolled > 24 ? "true" : "false";
          if (scrolled < HIDE_AFTER) {
            moveTo(0);
            return;
          }
          moveTo(self.direction === 1 ? -100 : 0);
        },
      });

      return () => trigger.kill();
    },
    { dependencies: [reduced], revertOnUpdate: true },
  );

  const closeSearch = useCallback((): void => {
    setSearchOpen(false);
    searchButtonRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <header ref={headerRef} className={styles.header} data-scrolled="false">
        <div className={`container ${styles.inner}`}>
          <a className={styles.brand} href="/#hero" aria-label={`${BRAND.full} — accueil`}>
            <Logo />
          </a>

          <nav className={styles.nav} aria-label="Navigation principale">
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className={styles.navItem}>
                  <a className={styles.navLink} href={item.href}>
                    <span className="link-underline">{item.label}</span>
                    {item.children ? (
                      <ChevronDown
                        className={styles.chevron}
                        size={14}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    ) : null}
                  </a>

                  {item.children ? (
                    <ul className={styles.submenu}>
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <a className={styles.submenuLink} href={child.href}>
                            <span className="link-underline">{child.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Button href="/#footer" className={styles.contact}>
              Nous écrire
            </Button>

            <button
              ref={searchButtonRef}
              type="button"
              className={styles.iconButton}
              onClick={() => setSearchOpen(true)}
              aria-label="Ouvrir la recherche"
              aria-expanded={searchOpen}
            >
              <Search size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>

            <button
              type="button"
              className={`${styles.iconButton} ${styles.burger}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={22} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <nav
          className={styles.mobileNav}
          data-open={menuOpen}
          aria-label="Navigation mobile"
          inert={!menuOpen}
        >
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  );
}
