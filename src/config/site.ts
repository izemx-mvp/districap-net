/**
 * Constantes éditables du site DISTRICAP.
 * Modifiez ce fichier pour mettre à jour les coordonnées, les horaires,
 * les chiffres clés, les réseaux sociaux et les identifiants analytics.
 */

export const site = {
  name: "Districap",
  legalName: "DISTRICAP",
  tagline: "Communication & Sécurité",
  baseline:
    "Distributeur de référence de la sécurité électronique et du courant faible au Maroc.",
  foundedYear: 2009,
  storeUrl: "https://districap-ma.izemxlab.com/",
  phones: ["05 22 34 36 30", "06 68 49 93 59"],
  whatsapp: {
    number: "212668499359",
    message: "Bonjour, je souhaite des informations sur vos solutions.",
  },
  email: "contact@districap.ma",
  address: {
    street: "Quartier industriel Polygone Est, lot 114, Route côtière",
    city: "Ain Harrouda, Casablanca",
    country: "Maroc",
  },
  hours: [
    { days: "Lundi – Vendredi", time: "08h30 – 12h30 / 14h30 – 18h30" },
    { days: "Samedi", time: "08h30 – 12h30" },
  ],
  social: {
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
  },
  /** Chiffres clés — à confirmer par le client. */
  figures: [
    { value: 2009, suffix: "", label: "Création de Districap", prefix: "" },
    { value: 16, suffix: "", prefix: "+", label: "Ans d'expertise" },
    { value: 10, suffix: "", prefix: "+", label: "Marques partenaires" },
    { value: 100, suffix: "", prefix: "+", label: "Projets réalisés" },
  ],
  /** Emplacements analytics : renseignez les identifiants puis déployez. */
  analytics: {
    gtmId: "" as string,
    ga4Id: "" as string,
  },
} as const;

export const whatsappHref = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
  site.whatsapp.message,
)}`;

export const telHref = (phone: string) => `tel:+212${phone.replace(/\s/g, "").slice(1)}`;
