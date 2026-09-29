export type Brand = {
  name: string;
  exclusive: boolean;
  description: string;
  solutions: { label: string; slug: string }[];
  note?: string;
};

export const brands: Brand[] = [
  {
    name: "FINSECUR",
    exclusive: true,
    description:
      "Détection et mise en sécurité incendie certifiées NF et NE : centrales conventionnelles et adressables, CMSI, supervision et câbles de détection.",
    note: "Certifié NF et NE",
    solutions: [{ label: "Sécurité incendie", slug: "securite-incendie" }],
  },
  {
    name: "SATEL",
    exclusive: true,
    description:
      "Centrales d'alarme intrusion INTEGRA, INTEGRA Plus, Perfecta et MICRA, reconnues pour leur niveau d'exigence et leur richesse fonctionnelle.",
    solutions: [
      { label: "Intrusion & contrôle d'accès", slug: "intrusion-controle-acces" },
    ],
  },
  {
    name: "LUMENS",
    exclusive: true,
    description:
      "Visualiseurs, caméras de visioconférence, barres de conférence et solutions de capture pour les salles de réunion et d'enseignement.",
    solutions: [
      { label: "Visioconférence", slug: "visioconference" },
      { label: "Affichage & Pro AV", slug: "affichage-pro-av" },
    ],
  },
  {
    name: "ATEN",
    exclusive: true,
    description:
      "KVM, distribution audiovisuelle, présentation sans fil et systèmes de contrôle pour les salles de contrôle et les espaces professionnels.",
    solutions: [{ label: "Affichage & Pro AV", slug: "affichage-pro-av" }],
  },
  {
    name: "PREMIUM LINE",
    exclusive: true,
    description:
      "Précâblage structuré cuivre et fibre optique, coffrets et armoires informatique pour les infrastructures réseau de bâtiment.",
    solutions: [{ label: "Précâblage informatique", slug: "precablage-informatique" }],
  },
  {
    name: "BOSCH",
    exclusive: false,
    description:
      "Vidéosurveillance, sonorisation d'ambiance et de sécurité, systèmes de conférence CCS et DICENTIS, interprétation INTEGRUS.",
    solutions: [
      { label: "Vidéosurveillance", slug: "videosurveillance" },
      { label: "Sonorisation", slug: "sonorisation" },
      { label: "Audioconférence", slug: "audioconference" },
    ],
  },
  {
    name: "UNIVIEW",
    exclusive: false,
    description:
      "Caméras IP, enregistreurs NVR et logiciels de supervision au très bon rapport performance/prix.",
    solutions: [{ label: "Vidéosurveillance", slug: "videosurveillance" }],
  },
  {
    name: "ACCONET",
    exclusive: false,
    description:
      "Contrôle d'accès par badge et code : lecteurs, contrôleurs et logiciel de gestion des droits et des plages horaires.",
    solutions: [
      { label: "Intrusion & contrôle d'accès", slug: "intrusion-controle-acces" },
    ],
  },
  {
    name: "ABSEN",
    exclusive: false,
    description:
      "Murs LED professionnels pour halls d'accueil, retail, salles de contrôle et événementiel.",
    solutions: [{ label: "Affichage & Pro AV", slug: "affichage-pro-av" }],
  },
  {
    name: "Optoma",
    exclusive: false,
    description:
      "Vidéoprojecteurs pour salles de réunion, salles de formation et amphithéâtres.",
    solutions: [{ label: "Affichage & Pro AV", slug: "affichage-pro-av" }],
  },
  {
    name: "HIKVISION",
    exclusive: false,
    description:
      "Caméras et enregistreurs de vidéosurveillance pour les projets tertiaires et commerciaux.",
    solutions: [{ label: "Vidéosurveillance", slug: "videosurveillance" }],
  },
];

export const exclusiveBrands = brands.filter((b) => b.exclusive);
