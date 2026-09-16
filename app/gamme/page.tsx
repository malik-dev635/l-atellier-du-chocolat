import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CtaFooter } from "@/components/cta/CtaFooter";
import { PralineStrip } from "@/components/praline/PralineStrip";
import { Products } from "@/components/products/Products";
import { BRAND } from "@/lib/mocks";

export const metadata: Metadata = {
  title: `La gamme — ${BRAND.full}`,
  description:
    "Toute la gamme en détail : tablettes 41 % et 70 % cacao, pâtes à tartiner noisette et pistache, dragées, miel de chêne et tomates séchées.",
};

/** La gamme : la fiche complète de chaque référence, sur sa propre route. */
export default function GammePage(): ReactNode {
  return (
    <main>
      <Products />
      <PralineStrip />
      <CtaFooter />
    </main>
  );
}
