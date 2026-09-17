"use client";

import { Instagram, Play, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { getLenis } from "@/hooks/useLenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ABOUT } from "@/lib/mocks";
import styles from "./VideoCard.module.css";

/**
 * La vidéo de l'atelier. La vignette carrée la joue en boucle, muette,
 * recadrée au centre — un aperçu vivant. Au clic, la lightbox l'ouvre en
 * entier, à son format portrait, avec le son et les contrôles.
 *
 * L'aperçu ne tourne que lorsqu'il est à l'écran (IntersectionObserver) et
 * reste sur l'affiche si l'utilisateur préfère moins de mouvement.
 */
export function VideoCard(): ReactNode {
  const { video } = ABOUT;
  const [open, setOpen] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);
  const fullRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduced = usePrefersReducedMotion();

  // Aperçu : lecture seulement à l'écran, et jamais sous reduced-motion.
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    if (reduced) {
      el.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !open) void el.play().catch(() => undefined);
        else el.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, open]);

  // Lightbox : défilement gelé, focus sur la croix, Échap pour fermer.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    previewRef.current?.pause();
    closeRef.current?.focus({ preventScroll: true });
    void fullRef.current?.play().catch(() => undefined);

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
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.card}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${video.label} — ${video.title}`}
      >
        <video
          ref={previewRef}
          className={styles.preview}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
        <span className={styles.veil} aria-hidden="true" />

        <span className={styles.handle} aria-hidden="true">
          <Instagram size={16} strokeWidth={1.75} />
          {video.handle}
        </span>

        <span className={styles.play} aria-hidden="true">
          <span className={styles.playDisc}>
            <Play size={26} strokeWidth={1.5} fill="currentColor" />
          </span>
          <span className={styles.playLabel}>{video.label}</span>
        </span>
      </button>

      {/* Portail : un ancêtre transformé (révélation au scroll) casserait le
          `position: fixed` ; la lightbox vit directement dans <body>. */}
      {open
        ? createPortal(
            <div
              className={styles.lightbox}
              role="dialog"
              aria-modal="true"
              aria-label={video.title}
              onClick={(event) => {
                if (event.target === event.currentTarget) setOpen(false);
              }}
            >
              <button
                ref={closeRef}
                type="button"
                className={styles.close}
                onClick={() => setOpen(false)}
                aria-label="Fermer la vidéo"
              >
                <X size={22} strokeWidth={1.5} aria-hidden="true" />
              </button>

              <div className={styles.frame} style={{ aspectRatio: `${video.width} / ${video.height}` }}>
                <video
                  ref={fullRef}
                  className={styles.full}
                  src={video.src}
                  poster={video.poster}
                  controls
                  playsInline
                  autoPlay
                  preload="auto"
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
