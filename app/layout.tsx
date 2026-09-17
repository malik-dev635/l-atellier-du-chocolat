import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Parisienne, Poppins } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/footer/Footer";
import { WhatsAppFab } from "@/components/whatsapp/WhatsAppFab";
import { Header } from "@/components/header/Header";
import { LogoDefs } from "@/components/ui/LogoDefs";
import { Preloader } from "@/components/preloader/Preloader";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { TopBar } from "@/components/topbar/TopBar";
import "./globals.css";

/* Serif display à fort contraste — titres, prix, libellés de catégorie. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

/* Sans géométrique — corps de texte, navigation, interface. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

/* Anglaise — signature du fondateur et suffixe du logo. */
const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "L'Atelier du Chocolat — Chocolats d'exception & gourmandises",
  description:
    "Chocolatier à Paris depuis 1934. Pralinés façonnés à la main, tablettes de cacao d'origine et coffrets composés à l'unité, livrés en 24 heures.",
  applicationName: "L'Atelier du Chocolat",
  authors: [{ name: "L'Atelier du Chocolat" }],
  keywords: ["chocolat", "chocolatier", "praliné", "truffe", "coffret", "artisanal"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "L'Atelier du Chocolat",
    title: "L'Atelier du Chocolat — Chocolats d'exception & gourmandises",
    description:
      "Pralinés façonnés à la main, tablettes de cacao d'origine et coffrets composés à l'unité.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf6ee",
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): ReactNode {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${poppins.variable} ${parisienne.variable} no-js`}
    >
      <body>
        <LogoDefs />
        <SmoothScrollProvider>
          <Preloader />
          <div id="page-shell" className="page-shell">
            <TopBar />
            <Header />
            {children}
            <Footer />
          </div>
          <WhatsAppFab />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
