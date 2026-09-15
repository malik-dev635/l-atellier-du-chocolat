import type { ReactNode } from "react";

import { About } from "@/components/about/About";
import { Blog } from "@/components/blog/Blog";
import { ChocolateSlider } from "@/components/chocolats/ChocolateSlider";
import { CtaFooter } from "@/components/cta/CtaFooter";
import { Gourmandises } from "@/components/gourmandises/Gourmandises";
import { Hero } from "@/components/hero/Hero";
import { OfferBand } from "@/components/offer/OfferBand";
import { PralineStrip } from "@/components/praline/PralineStrip";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { WhyUs } from "@/components/whyus/WhyUs";
import { PRODUCTS } from "@/lib/mocks";

/**
 * Page d'accueil — Server Component.
 *
 * Ordre pensé autour du métier : le chocolat tout de suite après le hero
 * (slider), puis la maison et le savoir-faire, les coffrets, et seulement
 * ensuite les autres gourmandises. Bandeau, en-tête et pied vivent dans le
 * layout, partagés avec la boutique.
 */
export default function HomePage(): ReactNode {
  const chocolats = PRODUCTS.filter((product) => product.family === "chocolat");

  return (
    <main>
      <Hero />
      <ChocolateSlider items={chocolats} />
      <About />
      <WhyUs />
      <OfferBand />
      <Gourmandises />
      <Testimonials />
      <Blog />
      <PralineStrip />
      <CtaFooter />
    </main>
  );
}
