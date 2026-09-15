"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Enregistrement unique des plugins. Le module n'est importé que par des
 * composants client, mais on garde le garde-fou `window` pour qu'un import
 * accidentel côté serveur ne casse jamais le rendu.
 */
let registered = false;

if (typeof window !== "undefined" && !registered) {
  registered = true;
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

  // Courbes maison du DNA. CustomEase est libre depuis GSAP 3.13 ; si le build
  // installé ne l'expose pas, EASE retombe sur les équivalents natifs.
  try {
    CustomEase.create("adcOut", "M0,0 C0.16,1 0.3,1 1,1"); // ease-out expo
    CustomEase.create("adcInOut", "M0,0 C0.65,0 0.35,1 1,1"); // ease-in-out
    CustomEase.create("adcMicro", "M0,0 C0.25,1 0.5,1 1,1"); // ease-out quart
  } catch {
    /* CustomEase indisponible : voir lib/motion.ts pour le repli. */
  }
}

export function hasCustomEase(): boolean {
  return typeof window !== "undefined" && Boolean(gsap.parseEase("adcOut"));
}

export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP };
