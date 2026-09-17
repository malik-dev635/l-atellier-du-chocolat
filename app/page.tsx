import type { ReactNode } from "react";

import { About } from "@/components/about/About";
import { Blog } from "@/components/blog/Blog";
import { Categories } from "@/components/categories/Categories";
import { ChocolateSlider } from "@/components/chocolats/ChocolateSlider";
import { CtaFooter } from "@/components/cta/CtaFooter";
import { Gourmandises } from "@/components/gourmandises/Gourmandises";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { OfferBand } from "@/components/offer/OfferBand";
import { PralineStrip } from "@/components/praline/PralineStrip";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { WhyUs } from "@/components/whyus/WhyUs";
import { PRODUCTS } from "@/lib/mocks";

/**
 * Page d'accueil — Server Component. Site vitrine, pas e-commerce.
 *
 * Ordre : le hero, puis la maison (qui nous sommes), puis les familles de
 * chocolat dans la rangée de catégories, le savoir-faire, le slider des
 * tablettes en couleur, les coffrets, et seulement ensuite les autres
 * gourmandises. Bandeau, en-tête et pied vivent dans le layout.
 */
export default function HomePage(): ReactNode {
  // Le slider ne montre que les tablettes : la poudre de cacao reste dans la
  // gamme (page /gamme) mais pas dans ce défilé.
  const chocolats = PRODUCTS.filter(
    (product) => product.family === "chocolat" && product.kind.startsWith("Tablette"),
  );

  return (
    <main>
      <HeroSlider />
      <About />
      <Categories />
      <WhyUs />
      <ChocolateSlider items={chocolats} />
      <OfferBand />
      <Gourmandises />
      <Testimonials />
      <Blog />
      <PralineStrip />
      <CtaFooter />
    </main>
  );
}
