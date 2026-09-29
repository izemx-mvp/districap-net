import catIncendie from "@/assets/cat-securite-incendie.jpg";
import catVideo from "@/assets/cat-videosurveillance.jpg";
import catIntrusion from "@/assets/cat-intrusion.jpg";
import catSono from "@/assets/cat-sonorisation.jpg";
import catAudio from "@/assets/cat-audioconference.jpg";
import catVisio from "@/assets/cat-visioconference.jpg";
import catAffichage from "@/assets/cat-affichage.jpg";
import catPrecablage from "@/assets/cat-precablage.jpg";

export type SubSolution = {
  slug: string;
  title: string;
  description: string;
  benefits: string[];
  brand?: string;
  hasDoc?: boolean;
};

export type Solution = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  icon: string;
  image: string;
  brands: string[];
  subs: SubSolution[];
};

export const solutions: Solution[] = [
  {
    slug: "securite-incendie",
    title: "Sécurité incendie",
    short: "Détection, mise en sécurité et supervision incendie certifiées.",
    intro:
      "Districap distribue les systèmes de détection et de mise en sécurité incendie FINSECUR, certifiés NF et NE, pour les bâtiments tertiaires, industriels et recevant du public. De l'étude des zones de détection à la supervision centralisée, nous accompagnons vos équipes sur l'ensemble de la chaîne.",
    icon: "Flame",
    image: catIncendie,
    brands: ["FINSECUR"],
    subs: [
      {
        slug: "cmsi",
        title: "Centralisateurs de Mise en Sécurité Incendie (CMSI)",
        description:
          "Les CMSI assurent la commande et le contrôle des dispositifs actionnés de sécurité : désenfumage, compartimentage, arrêts techniques et diffusion de l'alarme générale. Les gammes distribuées couvrent les configurations des établissements recevant du public comme des sites industriels.",
        benefits: [
          "Commande centralisée des dispositifs de mise en sécurité",
          "Configurations modulaires selon le nombre de zones",
          "Conformité aux exigences des ERP et sites industriels",
        ],
        brand: "FINSECUR",
        hasDoc: true,
      },
      {
        slug: "gamme-habitation",
        title: "Gamme Habitation",
        description:
          "Une gamme dédiée aux immeubles d'habitation et aux petites configurations résidentielles : équipements d'alarme, détecteurs et organes de diffusion adaptés aux contraintes de ces bâtiments.",
        benefits: [
          "Équipements adaptés aux immeubles d'habitation",
          "Installation et maintenance simplifiées",
          "Solutions économiques pour petites configurations",
        ],
        brand: "FINSECUR",
      },
      {
        slug: "systeme-de-supervision",
        title: "Système de supervision",
        description:
          "La supervision centralise l'état des systèmes de détection sur une interface unique : visualisation des zones, historique des événements et exploitation facilitée pour les équipes de sécurité sur les sites multi-bâtiments.",
        benefits: [
          "Vue d'ensemble des zones et des équipements",
          "Historique et traçabilité des événements",
          "Exploitation adaptée aux sites multi-bâtiments",
        ],
        brand: "FINSECUR",
      },
      {
        slug: "systeme-adressable",
        title: "Système adressable",
        description:
          "Les systèmes adressables identifient précisément chaque point de détection sur la boucle, ce qui réduit le temps de localisation d'un événement et simplifie l'extension de l'installation.",
        benefits: [
          "Localisation précise de chaque point de détection",
          "Câblage en boucle optimisé",
          "Évolutivité des installations existantes",
        ],
        brand: "FINSECUR",
        hasDoc: true,
      },
      {
        slug: "systeme-conventionnel",
        title: "Système conventionnel",
        description:
          "Les centrales conventionnelles répondent aux besoins des bâtiments de taille moyenne avec une organisation par zones de détection, pour un investissement maîtrisé.",
        benefits: [
          "Architecture par zones simple à exploiter",
          "Budget maîtrisé pour les bâtiments de taille moyenne",
          "Large choix de détecteurs et déclencheurs manuels",
        ],
        brand: "FINSECUR",
      },
      {
        slug: "cables-de-detection-incendie",
        title: "Câbles de détection incendie",
        description:
          "Câbles et accessoires dédiés aux installations de détection incendie, sélectionnés pour la tenue au feu et la fiabilité des liaisons entre centrale, détecteurs et organes de diffusion.",
        benefits: [
          "Références dédiées aux installations de sécurité",
          "Disponibilité en stock à Casablanca",
          "Conseil sur le choix des sections et des types",
        ],
      },
    ],
  },
  {
    slug: "videosurveillance",
    title: "Vidéosurveillance",
    short: "Caméras, enregistreurs et logiciels de supervision vidéo.",
    intro:
      "Nous distribuons les gammes de vidéosurveillance BOSCH et UNIVIEW : caméras IP, enregistreurs, stockage et logiciels de gestion vidéo. Nos équipes vous aident à dimensionner les débits, le stockage et les zones de couverture en fonction de votre site.",
    icon: "Video",
    image: catVideo,
    brands: ["BOSCH", "UNIVIEW", "HIKVISION"],
    subs: [
      {
        slug: "videosurveillance-bosch",
        title: "Vidéosurveillance BOSCH",
        description:
          "Les gammes BOSCH couvrent les besoins des sites exigeants : caméras fixes et dômes motorisés, analyse vidéo embarquée, enregistreurs et logiciels de gestion pour les infrastructures critiques.",
        benefits: [
          "Caméras fixes, dômes et motorisées",
          "Analyse vidéo embarquée",
          "Logiciels de gestion pour sites multi-caméras",
        ],
        brand: "BOSCH",
        hasDoc: true,
      },
      {
        slug: "videosurveillance-uniview",
        title: "Vidéosurveillance UNIVIEW",
        description:
          "UNIVIEW propose un excellent rapport performance/prix pour les commerces, immeubles de bureaux et sites industriels : caméras IP, NVR, switchs PoE et applications de supervision.",
        benefits: [
          "Gamme complète caméras IP et NVR",
          "Bon rapport performance/prix",
          "Applications mobiles de supervision",
        ],
        brand: "UNIVIEW",
        hasDoc: true,
      },
    ],
  },
  {
    slug: "intrusion-controle-acces",
    title: "Intrusion & contrôle d'accès",
    short: "Centrales d'alarme SATEL et contrôle d'accès ACCONET.",
    intro:
      "Districap est distributeur exclusif SATEL au Maroc. Les centrales INTEGRA, Perfecta et MICRA couvrent l'ensemble des configurations, du local commercial au site industriel, complétées par le contrôle d'accès ACCONET.",
    icon: "ShieldCheck",
    image: catIntrusion,
    brands: ["SATEL", "ACCONET"],
    subs: [
      {
        slug: "integra",
        title: "INTEGRA & INTEGRA Plus",
        description:
          "Les centrales INTEGRA et INTEGRA Plus de SATEL répondent aux exigences élevées du domaine : grand nombre de zones, partitions multiples, gestion des utilisateurs et interfaces d'exploitation complètes.",
        benefits: [
          "Nombre de zones et de partitions élevé",
          "Gestion fine des utilisateurs et des droits",
          "Claviers et interfaces d'exploitation variés",
        ],
        brand: "SATEL",
        hasDoc: true,
      },
      {
        slug: "perfecta",
        title: "Perfecta",
        description:
          "La gamme Perfecta cible les installations résidentielles et les petits sites professionnels, avec une mise en service rapide et des options de communication intégrées.",
        benefits: [
          "Mise en service rapide",
          "Communication intégrée et notifications",
          "Adaptée au résidentiel et aux petits sites",
        ],
        brand: "SATEL",
      },
      {
        slug: "micra",
        title: "MICRA",
        description:
          "MICRA est une solution d'alarme sans fil compacte, idéale lorsque le câblage est impossible ou lorsqu'il faut protéger rapidement un local isolé.",
        benefits: [
          "Installation sans fil, sans travaux",
          "Format compact",
          "Idéale pour les locaux isolés",
        ],
        brand: "SATEL",
      },
      {
        slug: "controle-acces-acconet",
        title: "Contrôle d'accès ACCONET",
        description:
          "ACCONET permet de gérer les accès par badge et code : lecteurs, contrôleurs et logiciel de gestion des droits, des plages horaires et de la traçabilité des passages.",
        benefits: [
          "Gestion des badges, codes et plages horaires",
          "Traçabilité des passages",
          "Architecture évolutive porte par porte",
        ],
        brand: "ACCONET",
        hasDoc: true,
      },
    ],
  },
  {
    slug: "sonorisation",
    title: "Sonorisation",
    short: "Sonorisation d'ambiance et de sécurité pour grands sites.",
    intro:
      "Les systèmes de sonorisation BOSCH couvrent la diffusion d'ambiance et l'évacuation par message parlé, pour les centres commerciaux, les usines et les enceintes sportives. Nous fournissons l'ensemble de la chaîne : sources, amplification, haut-parleurs et accessoires.",
    icon: "Speaker",
    image: catSono,
    brands: ["BOSCH"],
    subs: [
      {
        slug: "sonorisation-ambiance-securite",
        title: "Sonorisation d'ambiance et de sécurité",
        description:
          "Systèmes de diffusion sonore permettant à la fois l'ambiance musicale, les annonces et la diffusion de messages d'évacuation, avec une supervision des lignes de haut-parleurs.",
        benefits: [
          "Diffusion d'ambiance, annonces et messages d'évacuation",
          "Supervision des lignes de haut-parleurs",
          "Architecture par zones pour les grands sites",
        ],
        brand: "BOSCH",
        hasDoc: true,
      },
      {
        slug: "haut-parleurs",
        title: "Haut-parleurs",
        description:
          "Haut-parleurs plafonniers, muraux, projecteurs de son et enceintes pour environnements intérieurs et extérieurs, avec les indices de protection adaptés à chaque usage.",
        benefits: [
          "Modèles plafonniers, muraux et projecteurs de son",
          "Versions intérieures et extérieures",
          "Choix des puissances par zone",
        ],
        brand: "BOSCH",
      },
      {
        slug: "amplificateurs",
        title: "Amplificateurs",
        description:
          "Amplificateurs de puissance et amplificateurs mélangeurs dimensionnés selon le nombre de zones et la longueur des lignes, avec les protections nécessaires aux installations de sécurité.",
        benefits: [
          "Puissances adaptées au nombre de zones",
          "Amplificateurs mélangeurs pour annonces",
          "Protections adaptées aux installations de sécurité",
        ],
        brand: "BOSCH",
      },
      {
        slug: "tables-de-mixage",
        title: "Tables de mixage",
        description:
          "Tables de mixage analogiques et numériques pour les salles polyvalentes, auditoriums et espaces de conférence, avec les entrées micro et ligne nécessaires.",
        benefits: [
          "Entrées micro et ligne multiples",
          "Modèles analogiques et numériques",
          "Adaptées aux salles polyvalentes",
        ],
      },
      {
        slug: "racks-accessoires",
        title: "Racks et accessoires",
        description:
          "Baies, tiroirs, panneaux de brassage audio, sélecteurs de zones et accessoires de câblage pour une intégration propre et maintenable des équipements.",
        benefits: [
          "Intégration propre en baie",
          "Sélecteurs et panneaux de zones",
          "Accessoires de câblage disponibles",
        ],
      },
      {
        slug: "diffuseurs-sonores",
        title: "Diffuseurs sonores",
        description:
          "Diffuseurs sonores et lumineux destinés à l'alarme et à l'évacuation, dimensionnés en fonction des niveaux sonores à atteindre dans chaque zone.",
        benefits: [
          "Diffuseurs sonores et lumineux",
          "Niveaux sonores adaptés par zone",
          "Compatibles avec les systèmes de sécurité incendie",
        ],
      },
    ],
  },
  {
    slug: "audioconference",
    title: "Audioconférence",
    short: "Systèmes de conférence filaires, sans fil et interprétation.",
    intro:
      "Des salles de réunion aux hémicycles, les systèmes de conférence BOSCH gèrent la prise de parole, l'enregistrement des débats et l'interprétation simultanée, avec une qualité audio maîtrisée.",
    icon: "Mic",
    image: catAudio,
    brands: ["BOSCH"],
    subs: [
      {
        slug: "ccs1000d",
        title: "CCS 1000 D",
        description:
          "Système de discussion numérique pour salles de réunion : installation rapide, enregistrement intégré et gestion simple de la prise de parole.",
        benefits: [
          "Installation et configuration rapides",
          "Enregistrement des débats intégré",
          "Idéal pour les salles de réunion",
        ],
        brand: "BOSCH",
        hasDoc: true,
      },
      {
        slug: "dicentis-sans-fil",
        title: "DICENTIS sans fil",
        description:
          "Postes de conférence sans fil pour les salles où le câblage n'est pas souhaitable : déploiement flexible et reconfiguration facile des salles modulables.",
        benefits: [
          "Aucun câblage de table",
          "Reconfiguration facile des salles",
          "Autonomie adaptée aux longues séances",
        ],
        brand: "BOSCH",
      },
      {
        slug: "dicentis-filaire",
        title: "DICENTIS filaire",
        description:
          "Plateforme de conférence filaire évolutive pour les grandes assemblées : identification des participants, vote et intégration avec la vidéo et l'interprétation.",
        benefits: [
          "Évolutif pour les grandes assemblées",
          "Fonctions d'identification et de vote",
          "Intégration vidéo et interprétation",
        ],
        brand: "BOSCH",
        hasDoc: true,
      },
      {
        slug: "integrus",
        title: "INTEGRUS",
        description:
          "Système de distribution de langues par infrarouge pour l'interprétation simultanée, avec émetteurs, radiateurs et récepteurs individuels.",
        benefits: [
          "Interprétation simultanée multilingue",
          "Diffusion infrarouge confinée à la salle",
          "Récepteurs individuels faciles à gérer",
        ],
        brand: "BOSCH",
      },
    ],
  },
  {
    slug: "visioconference",
    title: "Visioconférence",
    short: "Caméras, barres de conférence et visualiseurs LUMENS.",
    intro:
      "Districap est distributeur exclusif LUMENS au Maroc : visualiseurs, caméras PTZ et barres de conférence pour équiper les salles de réunion, les salles de cours et les espaces de formation.",
    icon: "Webcam",
    image: catVisio,
    brands: ["LUMENS", "ATEN"],
    subs: [
      {
        slug: "visualiseurs",
        title: "Visualiseurs",
        description:
          "Les visualiseurs LUMENS projettent documents et objets en haute définition : un outil simple pour les salles de formation, les laboratoires et les salles de cours.",
        benefits: [
          "Restitution haute définition des documents",
          "Prise en main immédiate",
          "Usage formation, enseignement et laboratoire",
        ],
        brand: "LUMENS",
        hasDoc: true,
      },
      {
        slug: "cameras-de-visioconference",
        title: "Caméras de visioconférence",
        description:
          "Caméras PTZ et caméras de suivi automatique pour les salles de réunion et les auditoriums, compatibles avec les principales plateformes de visioconférence.",
        benefits: [
          "Caméras PTZ et suivi automatique",
          "Compatibles avec les plateformes courantes",
          "Cadrages adaptés aux petites et grandes salles",
        ],
        brand: "LUMENS",
      },
      {
        slug: "barres-de-conference",
        title: "Barres de conférence",
        description:
          "Barres tout-en-un intégrant caméra, microphones et haut-parleurs : la solution la plus directe pour équiper rapidement une salle de réunion.",
        benefits: [
          "Caméra, micros et audio intégrés",
          "Installation rapide, un seul câble",
          "Idéale pour les salles de réunion standard",
        ],
        brand: "LUMENS",
      },
    ],
  },
  {
    slug: "affichage-pro-av",
    title: "Affichage & Pro AV",
    short: "Écrans, LED, projection, KVM et distribution audiovisuelle.",
    intro:
      "Écrans interactifs, murs LED ABSEN, vidéoprojecteurs, présentation sans fil, distribution A/V, KVM ATEN et systèmes de contrôle : Districap fournit la chaîne audiovisuelle professionnelle complète, avec les exclusivités ATEN et LUMENS.",
    icon: "MonitorPlay",
    image: catAffichage,
    brands: ["ABSEN", "ATEN", "LUMENS", "Optoma"],
    subs: [
      {
        slug: "ecrans-interactifs",
        title: "Écrans interactifs",
        description:
          "Écrans interactifs pour salles de réunion et salles de classe : annotation, partage de contenus et travail collaboratif sans matériel supplémentaire.",
        benefits: [
          "Annotation et collaboration tactile",
          "Partage de contenus simplifié",
          "Usage réunion et enseignement",
        ],
        hasDoc: true,
      },
      {
        slug: "ecrans-absen",
        title: "Écrans ABSEN",
        description:
          "Murs LED ABSEN pour halls, salles de contrôle, retail et événementiel, avec les pas de pixel adaptés aux distances de vision de votre espace.",
        benefits: [
          "Pas de pixel adapté à la distance de vision",
          "Formats sur mesure pour halls et retail",
          "Luminosité élevée et uniformité",
        ],
        brand: "ABSEN",
      },
      {
        slug: "videoprojecteurs",
        title: "Vidéoprojecteurs",
        description:
          "Vidéoprojecteurs pour salles de réunion, amphithéâtres et salles de formation, sélectionnés selon la luminosité de la salle et la taille d'image souhaitée.",
        benefits: [
          "Sélection selon luminosité et taille d'image",
          "Modèles courte et ultra-courte focale",
          "Solutions de fixation adaptées",
        ],
        brand: "Optoma",
      },
      {
        slug: "presentation-sans-fil",
        title: "Présentation sans fil",
        description:
          "Systèmes de partage d'écran sans fil : chaque participant présente depuis son ordinateur ou son mobile sans câble ni installation logicielle lourde.",
        benefits: [
          "Partage d'écran sans câble",
          "Compatible ordinateurs et mobiles",
          "Réunions plus fluides",
        ],
        brand: "ATEN",
      },
      {
        slug: "distribution-av",
        title: "Distribution A/V",
        description:
          "Matrices, splitters, extendeurs HDBaseT et solutions AV sur IP pour acheminer les signaux audio et vidéo entre les sources et les afficheurs.",
        benefits: [
          "Matrices, splitters et extendeurs",
          "Transport longue distance HDBaseT",
          "Solutions AV sur IP",
        ],
        brand: "ATEN",
        hasDoc: true,
      },
      {
        slug: "pro-av",
        title: "Pro AV",
        description:
          "Équipements professionnels pour les salles techniques et les studios : scalers, convertisseurs, mélangeurs et accessoires d'intégration.",
        benefits: [
          "Scalers et convertisseurs de formats",
          "Mélangeurs et régies compactes",
          "Accessoires d'intégration",
        ],
        brand: "ATEN",
      },
      {
        slug: "kvm",
        title: "KVM",
        description:
          "Commutateurs et extendeurs KVM ATEN pour les salles de contrôle et les salles serveurs : accès à plusieurs machines depuis un poste opérateur unique.",
        benefits: [
          "Accès multi-machines depuis un poste",
          "Extension déportée des postes opérateurs",
          "Gammes pour salles de contrôle critiques",
        ],
        brand: "ATEN",
        hasDoc: true,
      },
      {
        slug: "systemes-de-controle",
        title: "Systèmes de contrôle",
        description:
          "Pupitres et automates de contrôle pour piloter écrans, sources, éclairage et occultation depuis une interface unique et simple d'usage.",
        benefits: [
          "Pilotage centralisé de la salle",
          "Interfaces tactiles personnalisables",
          "Scénarios prédéfinis",
        ],
        brand: "ATEN",
      },
      {
        slug: "capture-streaming",
        title: "Capture & streaming",
        description:
          "Solutions d'enregistrement et de diffusion en direct pour la formation, les conférences et la communication interne.",
        benefits: [
          "Enregistrement des sessions",
          "Diffusion en direct multi-plateformes",
          "Usage formation et communication",
        ],
        brand: "LUMENS",
      },
    ],
  },
  {
    slug: "precablage-informatique",
    title: "Précâblage informatique",
    short: "Solutions cuivre, fibre optique, coffrets et armoires.",
    intro:
      "Distributeur exclusif PREMIUM LINE au Maroc, Districap fournit les composants de précâblage structuré : cuivre, fibre optique, coffrets et armoires, pour des infrastructures réseau durables et documentées.",
    icon: "Network",
    image: catPrecablage,
    brands: ["PREMIUM LINE"],
    subs: [
      {
        slug: "solutions-cuivre",
        title: "Solutions cuivre",
        description:
          "Câbles, panneaux de brassage, prises et cordons cuivre pour les réseaux de bâtiment, avec les catégories adaptées aux débits visés.",
        benefits: [
          "Catégories adaptées aux débits visés",
          "Gamme complète panneaux, prises et cordons",
          "Disponibilité en stock",
        ],
        brand: "PREMIUM LINE",
        hasDoc: true,
      },
      {
        slug: "solutions-fibre",
        title: "Solutions fibre",
        description:
          "Câbles, tiroirs optiques, jarretières et pigtails pour les liaisons inter-bâtiments et les dorsales à haut débit.",
        benefits: [
          "Liaisons inter-bâtiments haut débit",
          "Tiroirs optiques et accessoires",
          "Monomode et multimode",
        ],
        brand: "PREMIUM LINE",
      },
      {
        slug: "coffrets-armoires",
        title: "Coffrets et armoires informatique",
        description:
          "Coffrets muraux et armoires de brassage, avec accessoires de ventilation, gestion de câbles et distribution électrique.",
        benefits: [
          "Coffrets muraux et armoires de brassage",
          "Accessoires ventilation et gestion de câbles",
          "Dimensions variées selon les locaux",
        ],
        brand: "PREMIUM LINE",
      },
    ],
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
