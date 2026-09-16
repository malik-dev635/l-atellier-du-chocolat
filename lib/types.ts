import type { StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";

/**
 * Accent de couleur d'un produit ou d'une catégorie. Chaque valeur est celle
 * d'un emballage réel : la couleur suit le produit, jamais l'inverse.
 */
export type Accent = "pistache" | "menthe" | "ciel" | "orange" | "rose" | "terracotta";

/** Fond de la fiche produit : le décor de sa propre photo, prolongé dans la page. */
export type Surface =
  | "corail" | "ochre" | "ambre" | "terre" | "pistache" | "menthe" | "ciel" | "pierre" | "cacao";

/** Entrée de navigation principale, avec sous-menu optionnel. */
export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavChild[];
}

export interface NavChild {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

/** Carte du carrousel de catégories. `offset` pilote le zig-zag vertical. */
export interface Category {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly image: StaticImageData;
  readonly offset: "up" | "down";
  readonly accent: Accent;
}

/** Bloc « pourquoi nous » : icône en trait, titre, texte. */
export interface Feature {
  readonly id: string;
  readonly title: string;
  readonly text: string;
  readonly icon: LucideIcon;
}

/** Point de la checklist du bandeau chocolat. */
export interface OfferPoint {
  readonly id: string;
  readonly text: string;
}

/** Produit présenté dans la gamme. */
export interface Product {
  readonly id: string;
  readonly name: string;
  /** Le chocolat d'abord : c'est le métier. Le reste vient après. */
  readonly family: "chocolat" | "gourmandise";
  /** Sous-famille affichée en suréclairage (« Tablette · lait 41 % »). */
  readonly kind: string;
  /** Marque portée par l'étiquette : la maison en a deux. */
  readonly range: "atelier" | "fabrique";
  /** Mentions relevées sur l'emballage, rien d'inventé (« 41 % cacao · 200 g »). */
  readonly spec: string;
  readonly description: string;
  readonly composition: string;
  readonly accent: Accent;
  readonly surface: Surface;
  /** Vignette carrée de l'aperçu (accueil). */
  readonly image: StaticImageData;
  /** Vues 5:4 de la fiche : scène, produit, détail. */
  readonly views: readonly StaticImageData[];
}

/** Témoignage client. */
export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly name: string;
  readonly location: string;
  /** Référence achetée, affichée en étiquette. */
  readonly product: string;
  readonly rating: number;
  readonly avatar: StaticImageData;
}

/** Article du blog. */
export interface Post {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly date: string;
  readonly author: string;
  readonly href: string;
  readonly image: StaticImageData;
}

/** Lien de colonne de pied de page, avec icône optionnelle. */
export interface FooterLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly icon?: LucideIcon;
}

/** Colonne de pied de page. */
export interface FooterColumn {
  readonly id: string;
  readonly title: string;
  readonly links: readonly FooterLink[];
}
