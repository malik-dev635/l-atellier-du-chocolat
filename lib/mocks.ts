import {
  Cookie,
  LayoutGrid,
  Leaf,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

import aboutStack from "@/assets/images/about-stack.jpg";
import avatar from "@/assets/images/avatar.jpg";
import blog1 from "@/assets/images/blog-1.jpg";
import blog2 from "@/assets/images/blog-2.jpg";
import blog3 from "@/assets/images/blog-3.jpg";
import catCoffrets from "@/assets/images/cat-coffrets.jpg";
import catLait from "@/assets/images/cat-truffles.jpg";
import catNoir from "@/assets/images/cat-noir.jpg";
import catPoudre from "@/assets/images/cat-poudre.jpg";
import catPralines from "@/assets/images/cat-pralines.jpg";
import heroBg1 from "@/assets/images/hero-bg-1.png";
import heroBg1Mobile from "@/assets/images/hero-bg-1-mobile.png";
import heroBg3 from "@/assets/images/hero-bg-variate-3.jpg";
import heroBg3Mobile from "@/assets/images/hero-bg-variante-3-mobile.jpg";
import heroBoite from "@/assets/images/boite-de-chocolat.jpg";
import product1 from "@/assets/images/product-1.jpg";
import product2 from "@/assets/images/product-2.jpg";
import product3 from "@/assets/images/product-3.jpg";
import product4 from "@/assets/images/product-4.jpg";
import product5 from "@/assets/images/product-5.jpg";
import product6 from "@/assets/images/product-6.jpg";
import product7 from "@/assets/images/product-7.jpg";
import product8 from "@/assets/images/product-8.jpg";
import product9 from "@/assets/images/product-9.jpg";
import product10 from "@/assets/images/product-10.jpg";
import product10a from "@/assets/images/product-10a.jpg";
import product10b from "@/assets/images/product-10b.jpg";
import product10c from "@/assets/images/product-10c.jpg";
import product11 from "@/assets/images/product-11.jpg";
import product11a from "@/assets/images/product-11a.jpg";
import product11b from "@/assets/images/product-11b.jpg";
import product11c from "@/assets/images/product-11c.jpg";
import product12 from "@/assets/images/product-12.jpg";
import product12a from "@/assets/images/product-12a.jpg";
import product12b from "@/assets/images/product-12b.jpg";
import product12c from "@/assets/images/product-12c.jpg";
import product13 from "@/assets/images/product-13.jpg";
import product13a from "@/assets/images/product-13a.jpg";
import product13b from "@/assets/images/product-13b.jpg";
import product13c from "@/assets/images/product-13c.jpg";
import product1a from "@/assets/images/product-1a.jpg";
import product1b from "@/assets/images/product-1b.jpg";
import product1c from "@/assets/images/product-1c.jpg";
import product2a from "@/assets/images/product-2a.jpg";
import product2b from "@/assets/images/product-2b.jpg";
import product2c from "@/assets/images/product-2c.jpg";
import product3a from "@/assets/images/product-3a.jpg";
import product3b from "@/assets/images/product-3b.jpg";
import product3c from "@/assets/images/product-3c.jpg";
import product4a from "@/assets/images/product-4a.jpg";
import product4b from "@/assets/images/product-4b.jpg";
import product4c from "@/assets/images/product-4c.jpg";
import product5a from "@/assets/images/product-5a.jpg";
import product5b from "@/assets/images/product-5b.jpg";
import product5c from "@/assets/images/product-5c.jpg";
import product6a from "@/assets/images/product-6a.jpg";
import product6b from "@/assets/images/product-6b.jpg";
import product6c from "@/assets/images/product-6c.jpg";
import product7a from "@/assets/images/product-7a.jpg";
import product7b from "@/assets/images/product-7b.jpg";
import product7c from "@/assets/images/product-7c.jpg";
import product8a from "@/assets/images/product-8a.jpg";
import product8b from "@/assets/images/product-8b.jpg";
import product8c from "@/assets/images/product-8c.jpg";
import product9a from "@/assets/images/product-9a.jpg";
import product9b from "@/assets/images/product-9b.jpg";
import product9c from "@/assets/images/product-9c.jpg";

import type {
  Category,
  Feature,
  FooterColumn,
  NavItem,
  OfferPoint,
  Post,
  Product,
  Testimonial,
} from "@/lib/types";

export const BRAND = {
  /** Le logo porte déjà le nom : `full` sert aux alt, aria-label et métadonnées. */
  full: "l'Atelier du Chocolat",
  tagline: "Artisan · Chocolatier",
  baseline:
    "Le chocolat artisanal 100 % ivoirien : cacao récolté en Côte d'Ivoire, transformé sur place. Tablettes, pâtes à tartiner, dragées, miels et conserves sortent toutes du même atelier.",
  addressLabel: "Atelier & boutique",
  address: "Ouvert du mardi au samedi",
  copyright: "© 2026 l'Atelier du Chocolat. Tous droits réservés.",
  promo: "Artisan chocolatier · cacao 100 % ivoirien, transformé sur place",
  promoCta: "Notre histoire",
} as const;

/** Section « Nous trouver » : carte Google, itinéraire, Yango. */
export const FIND_US = {
  eyebrow: "Nous trouver",
  title: ["L'atelier,", "à Vallon"],
  text: "Cocody, 2 Plateaux Vallon — Abidjan. Boutique et atelier au même endroit : on vous montre où ça se fait.",
  place: "L'Atelier du Chocolat — Vallon",
  hoursLabel: "Horaires",
  hours: "Du mardi au samedi",
  embed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.359117389472!2d-3.9897923000000004!3d5.3620613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb2a540488f3%3A0x9a3d6aa2b2bbd053!2sL'Atelier%20du%20Chocolat%20Vallon!5e0!3m2!1sfr!2sci!4v1789576604008!5m2!1sfr!2sci",
  directions:
    "https://www.google.com/maps/search/?api=1&query=L'Atelier%20du%20Chocolat%20Vallon",
  directionsCta: "Itinéraire",
  /* Lien profond Yango : ouvre l'app avec l'atelier en destination. */
  yango: "https://yango.go.link/route?end-lat=5.3620613&end-lon=-3.9897923",
  yangoCta: "Commander un Yango",
} as const;

/** Réseaux et messagerie : une seule source pour tout le site. */
export const SOCIAL = {
  instagram: "https://www.instagram.com/latelierduchocolatci/",
  facebook: "https://www.facebook.com/",
  whatsapp: "https://wa.me/2250714505502",
} as const;

/** Bouton WhatsApp flottant (coin bas droit). */
export const WHATSAPP_FAB = {
  label: "Écrivez-nous sur WhatsApp",
} as const;

/** Pied de page : réseaux, mention, nom géant. */
export const FOOTER = {
  whatsapp: SOCIAL.whatsapp,
  social: [
    { id: "so-1", label: "Instagram", href: SOCIAL.instagram },
    { id: "so-2", label: "Facebook", href: SOCIAL.facebook },
    { id: "so-3", label: "WhatsApp", href: SOCIAL.whatsapp },
  ],
  giant: ["L'Atelier", "du Chocolat"],
  top: "Haut de page",
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "home", label: "Accueil", href: "/#hero" },
  {
    id: "maison",
    label: "La maison",
    href: "/#about",
    children: [
      { id: "maison-histoire", label: "Notre histoire", href: "/#about" },
      { id: "maison-atelier", label: "L'atelier", href: "/#why" },
      { id: "maison-savoir", label: "Savoir-faire", href: "/#offer" },
    ],
  },
  {
    id: "chocolats",
    label: "Nos chocolats",
    href: "/#categories",
    children: [
      { id: "g-tablettes", label: "Tablettes", href: "/#chocolats" },
      { id: "g-tartiner", label: "Pâtes à tartiner", href: "/#gourmandises" },
      { id: "g-dragees", label: "Dragées", href: "/#gourmandises" },
      { id: "g-epicerie", label: "Épicerie fine", href: "/#gourmandises" },
    ],
  },
  {
    id: "blog",
    label: "Journal",
    href: "/#blog",
    children: [
      { id: "blog-all", label: "Tous les articles", href: "/#blog" },
      { id: "blog-recipes", label: "Recettes", href: "/#blog" },
    ],
  },
  { id: "gamme", label: "La gamme", href: "/gamme" },
  {
    id: "contact",
    label: "Contact",
    href: "/#contact",
    children: [
      { id: "contact-atelier", label: "Visiter l'atelier", href: "/#contact" },
      { id: "contact-pro", label: "Commandes pro", href: "/#contact" },
    ],
  },
];

/** Bande de texte fantôme défilant derrière le rail de catégories. */
export const CATEGORIES_WATERMARK = "Artisan chocolatier ivoirien";

/** Les familles de CHOCOLAT uniquement : c'est le métier, il passe en premier.
 *  Pâtes à tartiner, miel et conserves sont présentés plus bas. */
export const CATEGORIES: readonly Category[] = [
  {
    id: "lait",
    label: "Tablettes au lait 41 %",
    href: "/#chocolats",
    image: catLait,
    offset: "up",
    accent: "menthe",
  },
  {
    id: "noir",
    label: "Tablettes noires 70 %",
    href: "/#chocolats",
    image: catNoir,
    offset: "down",
    accent: "pistache",
  },
  {
    id: "poudre",
    label: "Poudre de cacao",
    href: "/#chocolats",
    image: catPoudre,
    offset: "up",
    accent: "terracotta",
  },
  {
    id: "dragees",
    label: "Dragées amande",
    href: "/#chocolats",
    image: catPralines,
    offset: "down",
    accent: "rose",
  },
  {
    id: "coffrets",
    label: "Coffrets",
    href: "/#offer",
    image: catCoffrets,
    offset: "up",
    accent: "orange",
  },
];

export const FEATURES: readonly Feature[] = [
  {
    id: "ingredients",
    title: "Cacao 100 % ivoirien",
    text: "Une seule origine, la nôtre. Les régions de récolte sont imprimées sur le coffret, pas cachées derrière une mention « origines multiples ».",
    icon: Leaf,
  },
  {
    id: "atelier",
    title: "Transformé sur place",
    text: "Torréfaction, conchage, tempérage, moulage, mise en pot et étiquetage : tout se fait à l'atelier, rien n'est sous-traité.",
    icon: Cookie,
  },
  {
    id: "gamme",
    title: "Des fruits secs, pas des arômes",
    text: "25 % de noisette dans la Choco-Noisette, 50 % de pistache dans la Pistaché. Les pourcentages sont sur les pots parce qu'ils sont tenus.",
    icon: LayoutGrid,
  },
];

export const OFFER_POINTS: readonly OfferPoint[] = [
  { id: "op-1", text: "Coffrets composés à la main, à l'unité près" },
  { id: "op-2", text: "Message personnalisé glissé dans la boîte" },
  { id: "op-3", text: "Mariages, cérémonies, cadeaux d'entreprise" },
  { id: "op-4", text: "Sur rendez-vous à l'atelier, ou par téléphone" },
];

/** Marques portées par les étiquettes. L'épicerie n'est pas signée comme le
 *  chocolat : deux labels, une seule maison. */
export const RANGES = {
  atelier: "l'Atelier du Chocolat",
  fabrique: "La Fabrique Gourmande",
} as const;

/**
 * Les `spec` ne contiennent que des mentions réellement lues sur les
 * emballages (pourcentages, grammages). Aucun poids n'est inventé : quand il
 * n'est pas imprimé, il n'apparaît pas.
 */
export const PRODUCTS: readonly Product[] = [
  {
    id: "p-lait-noisette",
    family: "chocolat",
    kind: "Tablette · lait 41 %",
    name: "Chocolat au lait noisette",
    range: "atelier",
    spec: "41 % cacao",
    description:
      "Des éclats de noisette entiers pris dans la masse, pas une poudre mélangée au conchage. On les sent sous la dent, tablette après tablette.",
    composition:
      "Cacao de Côte d'Ivoire 41 %, sucre, lait en poudre, noisettes.",
    accent: "menthe",
    surface: "menthe",
    image: product6,
    views: [product6a, product6b, product6c],
  },
  {
    id: "p-lait-amande",
    family: "chocolat",
    kind: "Tablette · lait 41 %",
    name: "Chocolat au lait amande",
    range: "atelier",
    spec: "41 % cacao",
    description:
      "La même base de lait à 41 %, avec des amandes concassées plus fines que la noisette. C'est la tablette que l'on conseille pour commencer, elle ne heurte personne.",
    composition: "Cacao de Côte d'Ivoire 41 %, sucre, lait en poudre, amandes.",
    accent: "ciel",
    surface: "ciel",
    image: product7,
    views: [product7a, product7b, product7c],
  },
  {
    id: "p-noir-pistache",
    family: "chocolat",
    kind: "Tablette · noir 70 %",
    name: "Chocolat noir pistache",
    range: "atelier",
    spec: "70 % cacao",
    description:
      "Sept parts de cacao sur dix, et la pistache pour casser l'amertume sans la masquer. C'est la tablette de la maison : celle qui dit ce que donne le cacao ivoirien quand on ne le noie pas dans le sucre.",
    composition:
      "Cacao de Côte d'Ivoire 70 %, sucre, pistaches, beurre de cacao.",
    accent: "pistache",
    surface: "pierre",
    image: product8,
    views: [product8a, product8b, product8c],
  },
  {
    id: "p-lait-pistache",
    name: "Chocolat au lait pistache",
    family: "chocolat",
    kind: "Tablette · lait 41 %",
    range: "atelier",
    spec: "41 % cacao",
    description:
      "La pistache entière prise dans le lait à 41 %. C'est la tablette la plus demandée de la gamme lait, et la seule qu'on limite à deux par personne quand le stock baisse.",
    composition:
      "Cacao de Côte d'Ivoire 41 %, sucre, lait en poudre, pistaches.",
    accent: "pistache",
    surface: "pistache",
    image: product10,
    views: [product10a, product10b, product10c],
  },
  {
    id: "p-lait-nature",
    name: "Chocolat au lait",
    family: "chocolat",
    kind: "Tablette · lait 41 %",
    range: "atelier",
    spec: "41 % cacao",
    description:
      "Rien d'ajouté : la tablette de lait telle qu'elle sort du conchage. C'est celle qui dit ce que vaut la fève avant tout ce qu'on peut mettre dedans.",
    composition:
      "Cacao de Côte d'Ivoire 41 %, sucre, lait en poudre, beurre de cacao.",
    accent: "orange",
    surface: "terre",
    image: product11,
    views: [product11a, product11b, product11c],
  },
  {
    id: "p-noir-amande",
    name: "Chocolat noir amande",
    family: "chocolat",
    kind: "Tablette · noir 70 %",
    range: "atelier",
    spec: "70 % cacao",
    description:
      "Le noir à 70 % avec des amandes concassées. L'amande adoucit l'amertume sans sucre supplémentaire — c'est la porte d'entrée vers la gamme noire.",
    composition:
      "Cacao de Côte d'Ivoire 70 %, sucre, amandes, beurre de cacao.",
    accent: "ciel",
    surface: "ciel",
    image: product12,
    views: [product12a, product12b, product12c],
  },
  {
    id: "p-noir-nature",
    name: "Chocolat noir",
    family: "chocolat",
    kind: "Tablette · noir 70 %",
    range: "atelier",
    spec: "70 % cacao",
    description:
      "Sept parts de cacao sur dix et rien pour se cacher derrière. Si une seule tablette devait représenter l'atelier, ce serait celle-là.",
    composition: "Cacao de Côte d'Ivoire 70 %, sucre, beurre de cacao.",
    accent: "orange",
    surface: "pierre",
    image: product13,
    views: [product13a, product13b, product13c],
  },
  {
    id: "p-poudre",
    family: "chocolat",
    kind: "Cacao · poudre",
    name: "Poudre de cacao",
    range: "atelier",
    spec: "Cacao pur · étui carton",
    description:
      "La même fève que dans nos tablettes, torréfiée puis moulue sans sucre ni lait. Pour un chocolat chaud qui a le goût du cacao, une pâtisserie plus sombre, ou saupoudrée telle quelle.",
    composition: "Cacao de Côte d'Ivoire 100 %.",
    accent: "terracotta",
    surface: "cacao",
    image: product9,
    views: [product9a, product9b, product9c],
  },
  {
    id: "p-dragees",
    family: "gourmandise",
    kind: "Dragées · chocolat au lait",
    name: "Dragées amande",
    range: "atelier",
    spec: "42 % au lait · 200 g",
    description:
      "Des amandes entières enrobées de chocolat au lait, tournées jusqu'à ce que la coque soit lisse. On les vend en pot transparent parce qu'il n'y a rien à cacher : on voit la taille des amandes.",
    composition: "Amandes, chocolat au lait 42 %, sucre, beurre de cacao.",
    accent: "rose",
    surface: "corail",
    image: product1,
    views: [product1a, product1b, product1c],
  },
  {
    id: "p-tomates",
    family: "gourmandise",
    kind: "Épicerie · conserve",
    name: "Tomates séchées",
    range: "fabrique",
    spec: "Conserve · huile et herbes",
    description:
      "Des tomates séchées puis remises en pot dans l'huile, avec le thym et le romarin. C'est la seule référence salée de la maison, et celle que les restaurateurs commandent par six.",
    composition: "Tomates séchées, huile végétale, thym, romarin, ail, sel.",
    accent: "orange",
    surface: "ochre",
    image: product2,
    views: [product2a, product2b, product2c],
  },
  {
    id: "p-miel",
    family: "gourmandise",
    kind: "Épicerie · miel",
    name: "Miel de chêne",
    range: "fabrique",
    spec: "100 % miel · pot verre",
    description:
      "Un miel de miellat sombre, franc, beaucoup moins sucré en bouche qu'un miel de fleurs. La cuillère en bois est fournie avec le pot, parce qu'il est trop épais pour un couteau.",
    composition: "Miel de chêne 100 %. Aucun ajout, aucune pasteurisation.",
    accent: "terracotta",
    surface: "ambre",
    image: product3,
    views: [product3a, product3b, product3c],
  },
  {
    id: "p-noisette",
    family: "gourmandise",
    kind: "Pâte à tartiner",
    name: "Choco-Noisette crème",
    range: "atelier",
    spec: "25 % noisette",
    description:
      "Un quart du pot, c'est de la noisette. Le reste, c'est notre chocolat et rien d'autre : pas d'huile de palme, pas d'arôme ajouté. La pâte est volontairement épaisse, elle ne coule pas de la tartine.",
    composition:
      "Noisettes 25 %, sucre, cacao, lait en poudre, beurre de cacao.",
    accent: "terracotta",
    surface: "terre",
    image: product4,
    views: [product4a, product4b, product4c],
  },
  {
    id: "p-pistache",
    family: "gourmandise",
    kind: "Pâte à tartiner",
    name: "Pistaché crème",
    range: "atelier",
    spec: "50 % pistache",
    description:
      "La moitié du pot en pistache : c'est ce qui explique le prix et la couleur, qui est celle du fruit et non d'un colorant. La référence la plus difficile à produire, et celle qui part le plus vite.",
    composition: "Pistaches 50 %, sucre, beurre de cacao, lait en poudre.",
    accent: "pistache",
    surface: "pistache",
    image: product5,
    views: [product5a, product5b, product5c],
  },
];

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "t-1",
    quote:
      "J'ai offert le coffret de tablettes pour l'anniversaire de ma mère. Elle a goûté la noisette en premier, s'est arrêtée net, et m'a demandé où j'avais trouvé ça.",
    name: "Dana Eston",
    location: "Pâtisserie Belleville — Paris",
    product: "Coffret de tablettes",
    rating: 5,
    avatar,
  },
  {
    id: "t-2",
    quote:
      "Nous servons leur Pistaché en dessert depuis deux ans. Pas une seule livraison en retard, pas un seul pot cassé. Et les clients redemandent la marque par son nom.",
    name: "Marc Villeneuve",
    location: "Table du Marché — Lyon",
    product: "Pistaché crème",
    rating: 5,
    avatar,
  },
  {
    id: "t-3",
    quote:
      "Le noir pistache 70 % est la seule chose que je rapporte à chaque passage. Ma valise sent le cacao pendant trois jours, et personne ne s'en plaint.",
    name: "Inès Ferrand",
    location: "Atelier Céramique — Bordeaux",
    product: "Chocolat noir pistache 70 %",
    rating: 5,
    avatar,
  },
];

export const POSTS: readonly Post[] = [
  {
    id: "post-1",
    title: "Pourquoi nos pots sont si petits",
    category: "L'atelier",
    date: "12 février 2026",
    author: "L'équipe",
    href: "/#blog",
    image: blog1,
  },
  {
    id: "post-2",
    title: "Composer un coffret qui tient la route",
    category: "Conseils",
    date: "18 février 2026",
    author: "L'équipe",
    href: "/#blog",
    image: blog2,
  },
  {
    id: "post-3",
    title: "Lire une étiquette de chocolat",
    category: "Dégustation",
    date: "3 mars 2026",
    author: "L'équipe",
    href: "/#blog",
    image: blog3,
  },
];

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    id: "gamme",
    title: "La gamme",
    links: [
      { id: "s-1", label: "Nos chocolats", href: "/#categories" },
      {
        id: "s-2",
        label: "Pâtes à tartiner & épicerie",
        href: "/#gourmandises",
      },
      { id: "s-3", label: "Coffrets & cadeaux", href: "/#offer" },
      { id: "s-4", label: "Toute la gamme", href: "/gamme" },
    ],
  },
  {
    id: "maison",
    title: "La maison",
    links: [
      { id: "i-1", label: "Notre histoire", href: "/#about" },
      { id: "i-2", label: "Visiter l'atelier", href: "/#why" },
      { id: "i-3", label: "Revendeurs & restaurateurs", href: "/#contact" },
      { id: "i-4", label: "Confidentialité", href: "/#footer" },
    ],
  },
  {
    id: "contact",
    title: "Nous joindre",
    links: [
      {
        id: "c-1",
        label: "07 14 50 55 02",
        href: "tel:+2250714505502",
        icon: Phone,
      },
      {
        id: "c-2",
        label: "bonjour@atelierduchocolat.fr",
        href: "mailto:bonjour@atelierduchocolat.fr",
        icon: Mail,
      },
      {
        id: "c-3",
        label: "WhatsApp",
        href: "https://wa.me/2250714505502",
        icon: MessageCircle,
      },
    ],
  },
];

export const ABOUT = {
  eyebrow: "La maison",
  title: "Le cacao reste chez lui",
  text: "La Côte d'Ivoire produit le premier cacao du monde et en transforme une fraction. Nous récoltons, torréfions, conchons et conditionnons sur place : la fève ne quitte pas le pays avant d'être devenue chocolat. C'est écrit sur nos coffrets parce que c'est le cœur du métier.",
  signature: "l'Atelier du Chocolat",
  role: "Fabriqué et conditionné par nos soins",
  image: aboutStack,
  /** La vidéo de présentation : aperçu carré muet, lecture entière en lightbox. */
  video: {
    src: "/video-presentation.mp4",
    poster: "/video-poster.jpg",
    width: 720,
    height: 1280,
    handle: "@latelierduchocolatci",
    label: "Voir la vidéo",
    title: "L'atelier en vidéo",
  },
} as const;

/** Diapositives du hero : un visuel desktop, sa version mobile (avec la
    couleur de son fond, pour l'afficher entier sans couture), un titre. */
export const HERO_SLIDES = [
  {
    id: "h-1",
    image: heroBg1,
    imageMobile: heroBg1Mobile,
    bgMobile: "#38211c",
    alt: "Pralinés au chocolat noir et blanc, feuilles de menthe, sur fond chocolat",
    title: ["Le chocolat", "artisanal", "100% ivoirien"],
    lead: "Du cacao de Côte d'Ivoire, transformé ici, à Abidjan.",
    cta: "Découvrir nos chocolats",
    href: "/#categories",
  },
  {
    id: "h-2",
    image: heroBg3,
    imageMobile: heroBg3Mobile,
    bgMobile: "#3b2a20",
    /* La plaque de pierre touche le bord droit du visuel : on le colle à
       droite pour que ce bord coïncide avec celui de l'écran. */
    mobilePosition: "100% 100%",
    alt: "Six pralinés de l'atelier posés sur deux plaques de pierre",
    title: ["Des pralinés", "faits main", "à l'atelier"],
    lead: "Préparés chaque semaine, en petites quantités.",
    cta: "Voir la gamme",
    href: "/gamme",
  },
  {
    id: "h-3",
    image: heroBoite,
    /* Pas de version portrait : cadrage `cover` centré sur mobile. */
    imageMobile: null,
    bgMobile: "#705a43",
    /* Scène claire (bois, tissu) : un voile sombre à gauche porte le texte. */
    scrim: true,
    alt: "Coffrets de l'Atelier du Chocolat empilés, fèves de cacao et cabosses sur une table en bois",
    title: ["Nos coffrets", "à offrir", "ou à garder"],
    lead: "Tablettes, pralinés, cacao : composés à la main, sur commande.",
    cta: "Voir les coffrets",
    href: "/#offer",
  },
] as const;

export const HERO = {
  /** Trois lignes courtes : au-delà de ~13 signes, la ligne déborde de sa
      colonne et passe sous le visuel de droite. */
  title: ["Le chocolat", "artisanal", "100% ivoirien"],
  lead: "Cacao récolté en Côte d'Ivoire, torréfié, conché et moulé dans notre atelier. Tablettes, pralinés, poudre de cacao.",
  curved: "Tablettes · pâtes à tartiner · dragées · miels · ",
  cta: "Découvrir nos chocolats",
} as const;

export const WHY = {
  eyebrow: "Pourquoi la maison",
  title: "Ce qui change quand tout est fait sur place",
  curved: "Tablettes · pâtes à tartiner · dragées · miels · ",
} as const;

export const OFFER = {
  eyebrow: "Coffrets & cadeaux",
  title: "Des coffrets composés pour l'occasion",
  text: "Un mariage, un remerciement, un dimanche sans raison particulière. Vous choisissez les références, nous montons le coffret à la main.",
  cta: "Nous en parler",
} as const;

export const PRODUCTS_SECTION = {
  eyebrow: "La gamme",
  title: "Chaque référence, en détail",
} as const;

export const CHOCOLATS_SECTION = {
  eyebrow: "Nos chocolats",
  title: "Le cacao ivoirien, tablette par tablette",
  cta: "Voir la gamme en détail",
} as const;

export const GOURMANDISES_SECTION = {
  eyebrow: "Et pour la table du goûter",
  title: "Pâtes à tartiner, dragées, épicerie",
} as const;

export const TESTIMONIALS_SECTION = {
  eyebrow: "Ce que disent nos clients",
  title: "Ils en reprennent",
} as const;

export const BLOG_SECTION = {
  eyebrow: "Le journal",
  title: "Nos dernières nouvelles",
  cta: "Tous les articles",
} as const;

export const CTA_SECTION = {
  titleBefore: "Venez goûter le chocolat",
  titleAccent: "à l'atelier",
  subtitle:
    "Visites, dégustations et coffrets sur rendez-vous. Écrivez-nous ou appelez-nous, on vous répond dans la journée.",
  cta: "Nous contacter",
  socialLabel: "Suivez l'atelier",
  socialText: "Nouveautés, coulisses et coffrets du moment : d'abord sur Instagram et Facebook.",
} as const;
