"use client";

import { Instagram, Play, X } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { getLenis } from "@/hooks/useLenis";
import { ABOUT } from "@/lib/mocks";
import styles from "./ReelCard.module.css";

interface InstagramWindow extends Window {
  instgrm?: { Embeds: { process: () => void } };
}

const EMBED_SRC = "https://www.instagram.com/embed.js";

/**
 * La vidéo de l'atelier : une vignette carrée (affiche + bouton lecture) qui
 * ouvre, au clic, le reel Instagram dans une lightbox — à ses vraies
 * dimensions, via le script officiel d'Instagram qui dimensionne l'iframe
 * lui-même. Le script n'est chargé qu'à la première ouverture.
 */
export function ReelCard(): ReactNode {
  const { reel } = ABOUT;
  const [open, setOpen] = useState(false);
  const [scriptWanted, setScriptWanted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const process = useCallback((): void => {
    (window as InstagramWindow).instgrm?.Embeds.process();
  }, []);

  // Ouverture : défilement gelé, focus sur la croix, Échap pour fermer.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    process();

    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [open, process]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.card}
        onClick={() => {
          setScriptWanted(true);
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-label={`${reel.label} — ${reel.title}`}
      >
        <Image
          src={reel.poster}
          alt=""
          fill
          sizes="(max-width: 900px) 92vw, 44vw"
          quality={80}
          placeholder="blur"
          style={{ objectFit: "cover" }}
        />
        <span className={styles.veil} aria-hidden="true" />

        <span className={styles.handle} aria-hidden="true">
          <Instagram size={16} strokeWidth={1.75} />
          {reel.handle}
        </span>

        <span className={styles.play} aria-hidden="true">
          <span className={styles.playDisc}>
            <Play size={26} strokeWidth={1.5} fill="currentColor" />
          </span>
          <span className={styles.playLabel}>{reel.label}</span>
        </span>
      </button>

      {scriptWanted ? <Script src={EMBED_SRC} strategy="lazyOnload" onLoad={process} /> : null}

      {/* Portail : un ancêtre transformé (révélation au scroll) casserait le
          `position: fixed` ; la lightbox vit directement dans <body>. */}
      {open ? createPortal(
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={reel.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <button ref={closeRef} type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Fermer la vidéo">
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>

          <div className={styles.frame}>
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={`${reel.permalink}?utm_source=ig_embed`}
              data-instgrm-version="14"
              style={{ margin: 0, width: "100%", minWidth: 0, maxWidth: "none", background: "transparent", border: 0 }}
            >
              <a href={reel.permalink} target="_blank" rel="noopener noreferrer" className={styles.fallback}>
                {reel.title} — {reel.handle}
              </a>
            </blockquote>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
