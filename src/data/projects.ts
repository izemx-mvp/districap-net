import imgMall from "@/assets/hero-mall.jpg";
import imgIncendie from "@/assets/cat-securite-incendie.jpg";
import imgSono from "@/assets/cat-sonorisation.jpg";
import imgVideo from "@/assets/cat-videosurveillance.jpg";
import imgConf from "@/assets/hero-conference.jpg";
import imgReseau from "@/assets/cat-precablage.jpg";

export const sectors = [
  "Centres commerciaux",
  "Hôtels",
  "Administrations",
  "Industrie",
  "Santé",
  "Éducation",
] as const;

export type Sector = (typeof sectors)[number];

export type Project = {
  slug: string;
  title: string;
  sector: Sector;
  city: string;
  year?: string;
  placeholder?: boolean;
  summary: string;
  description: string;
  installed: { label: string; brand: string; slug: string }[];
  image: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: "almazar-marrakech",
    title: "ALMAZAR Marrakech",
    sector: "Centres commerciaux",
    city: "Marrakech",
    summary: "Système de détection incendie FINSECUR pour un centre commercial majeur.",
    description:
      "Fourniture du système de détection incendie FINSECUR pour le centre commercial ALMAZAR à Marrakech. Le projet a couvert l'étude des zones de détection, la fourniture des équipements certifiés et l'accompagnement des équipes d'installation jusqu'à la mise en service.",
    installed: [
      {
        label: "Système de détection incendie",
        brand: "FINSECUR",
        slug: "securite-incendie",
      },
    ],
    image: imgIncendie,
    gallery: [imgIncendie, imgMall],
  },
  {
    slug: "marina-mall",
    title: "Marina Mall",
    sector: "Centres commerciaux",
    city: "Casablanca",
    summary:
      "Sonorisation de sécurité BOSCH, alarme intrusion SATEL et détection incendie FINSECUR.",
    description:
      "Projet multi-lots associant la sonorisation de sécurité BOSCH, l'alarme intrusion SATEL et la détection incendie FINSECUR. La coordination des trois lots a permis de tenir les délais de mise en œuvre sur un site recevant du public.",
    installed: [
      { label: "Sonorisation de sécurité", brand: "BOSCH", slug: "sonorisation" },
      {
        label: "Alarme intrusion",
        brand: "SATEL",
        slug: "intrusion-controle-acces",
      },
      { label: "Détection incendie", brand: "FINSECUR", slug: "securite-incendie" },
    ],
    image: imgMall,
    gallery: [imgMall, imgSono, imgIncendie],
  },
  {
    slug: "aeria-mall",
    title: "Aeria Mall",
    sector: "Centres commerciaux",
    city: "Casablanca",
    summary:
      "Sonorisation BOSCH, détection incendie FINSECUR, vidéosurveillance UNIVIEW et intrusion SATEL.",
    description:
      "Équipement global du centre commercial Aeria Mall : sonorisation de sécurité BOSCH, détection incendie FINSECUR, vidéosurveillance UNIVIEW et alarme intrusion SATEL. Districap a assuré l'approvisionnement coordonné des quatre lots et le support technique tout au long du chantier.",
    installed: [
      { label: "Sonorisation de sécurité", brand: "BOSCH", slug: "sonorisation" },
      { label: "Détection incendie", brand: "FINSECUR", slug: "securite-incendie" },
      { label: "Vidéosurveillance", brand: "UNIVIEW", slug: "videosurveillance" },
      {
        label: "Alarme intrusion",
        brand: "SATEL",
        slug: "intrusion-controle-acces",
      },
    ],
    image: imgVideo,
    gallery: [imgVideo, imgSono, imgMall],
  },
  {
    slug: "projet-hotelier-casablanca",
    title: "Projet hôtelier — Casablanca",
    sector: "Hôtels",
    city: "Casablanca",
    placeholder: true,
    summary: "Exemple de projet à remplacer par une référence hôtelière réelle.",
    description:
      "Contenu de démonstration à remplacer par une référence réelle : équipement d'un établissement hôtelier en sonorisation d'ambiance, vidéosurveillance et contrôle d'accès des zones techniques.",
    installed: [
      { label: "Sonorisation d'ambiance", brand: "BOSCH", slug: "sonorisation" },
      { label: "Vidéosurveillance", brand: "UNIVIEW", slug: "videosurveillance" },
    ],
    image: imgConf,
    gallery: [imgConf],
  },
  {
    slug: "administration-salle-de-conference",
    title: "Salle de conférence — Administration",
    sector: "Administrations",
    city: "Rabat",
    placeholder: true,
    summary: "Exemple de projet à remplacer par une référence administration réelle.",
    description:
      "Contenu de démonstration à remplacer par une référence réelle : équipement d'une salle de délibération en système de conférence DICENTIS, affichage et distribution audiovisuelle.",
    installed: [
      { label: "Système de conférence", brand: "BOSCH", slug: "audioconference" },
      { label: "Affichage & Pro AV", brand: "ATEN", slug: "affichage-pro-av" },
    ],
    image: imgConf,
    gallery: [imgConf],
  },
  {
    slug: "site-industriel-mohammedia",
    title: "Site industriel — Mohammedia",
    sector: "Industrie",
    city: "Mohammedia",
    placeholder: true,
    summary: "Exemple de projet à remplacer par une référence industrielle réelle.",
    description:
      "Contenu de démonstration à remplacer par une référence réelle : précâblage informatique cuivre et fibre, détection incendie et sonorisation d'évacuation sur un site de production.",
    installed: [
      {
        label: "Précâblage informatique",
        brand: "PREMIUM LINE",
        slug: "precablage-informatique",
      },
      { label: "Détection incendie", brand: "FINSECUR", slug: "securite-incendie" },
    ],
    image: imgReseau,
    gallery: [imgReseau],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
