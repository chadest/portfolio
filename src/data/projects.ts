import { Project } from '../types';
import stationMeteoHardware from '../assets/images/station_meteo_clean_1794587052652.jpg';
import stationMeteoUI from '../assets/images/meteo_monitoring_dashboard_1794587292361.jpg';

const arrosageImg = "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80";
const stationMeteoImg = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80";

const morsignCover = "/assets/aistudio/image_15f282f2.png";
const morsignSignal = "/assets/aistudio/image_b1c3180b.png";

const eya3dCover = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";
const eya3dMesh = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80";

export const projectsData: Project[] = [
  {
    id: "compteur-energie",
    title: "Compteur d'énergie intelligent",
    tech: "ESP32, C++, IoT, PZEM-004T, Supervision Web",
    platform: "Système Embarqué",
    status: "Projet finalisé",
    desc: "Système complet de mesure électrique et télémétrie web en temps réel avec boîtier IP64 et afficheur LCD.",
    fullDesc: "Projet de soutenance portant sur la conception et la réalisation intégrale d'un compteur d'énergie électrique intelligent et connecté. Basé sur un microcontrôleur ESP32 couplé à un module de mesure PZEM-004T et à un relais de pilotage, le système est intégré dans un coffret étanche IP64 muni d'un afficheur LCD local. Il assure l'acquisition continue des données de consommation et leur transmission en Wi-Fi vers une interface web dynamique dédiée au suivi énergétique, à l'estimation des coûts en FCFA et à la gestion des alertes.",
    advantages: [
      "Suivi en temps réel de la consommation énergétique et estimation instantanée du coût en FCFA",
      "Détection précoce des anomalies électriques (sous-tension, surintensité et faible facteur de puissance cos φ)",
      "Supervision à distance via Wi-Fi depuis une interface web dédiée et lecture locale sur écran LCD",
      "Sécurisation matérielle avec boîtier étanche IP64 et coupure de charge pilotée par relais"
    ],
    image: "./compteur/IMG_20260514_162717_773.jpg",
    gallery: [
      "./compteur/IMG_20260514_162717_773.jpg",
      "./compteur/IMG_20260507_183822_477.jpg",
      "./compteur/IMG_20260514_154547_392 (1).jpg",
      "./compteur/Screenshot_20260509-141342 (2).jpg",
      "./compteur/Screenshot_20260509-070522 (1).jpg",
      "./compteur/Screenshot_20260509-170842 (1).jpg"
    ],
    galleryItems: [
      {
        url: "./compteur/Screenshot_20260509-141342 (2).jpg",
        title: "Interface Web : Tableau de bord principal de suivi",
        category: "web"
      },
      {
        url: "./compteur/Screenshot_20260509-070522 (1).jpg",
        title: "Interface Web : Courbe sinusoïdale & alerte facteur de puissance",
        category: "web"
      },
      {
        url: "./compteur/Screenshot_20260509-170842 (1).jpg",
        title: "Interface Web : Suivi tarifaire, estimation du coût & alertes",
        category: "web"
      },
      {
        url: "./compteur/IMG_20260514_162717_773.jpg",
        title: "Boîtier IP64 finalisé avec afficheur LCD en fonctionnement",
        category: "hardware"
      },
      {
        url: "./compteur/IMG_20260514_154547_392 (1).jpg",
        title: "Câblage interne du coffret : ESP32, module PZEM-004T et relais de coupure",
        category: "hardware"
      },
      {
        url: "./compteur/IMG_20260507_183822_477.jpg",
        title: "Banc de test électronique : microcontrôleur, capteurs et feux de signalisation LED",
        category: "hardware"
      }
    ]
  },
  {
    id: "correction-facteur-puissance",
    title: "Système de correction du facteur de puissance",
    tech: "Arduino / ESP32, PZEM-004T, Contacteurs, Batteries de condensateurs",
    platform: "Système Embarqué",
    status: "Projet finalisé",
    desc: "Compensateur automatique à gradins détectant l'énergie réactive via PZEM-004T pour enclencher les batteries de condensateurs.",
    fullDesc: "Système embarqué de régulation automatique du facteur de puissance (cos φ) fonctionnant par gradins. Le module de mesure PZEM-004T analyse en continu la puissance active, la puissance réactive et le déphasage sur l'installation. Dès qu'une forte consommation d'énergie réactive est détectée (charges inductives telles que des moteurs), le microcontrôleur commande les relais et contacteurs de puissance pour enclencher progressivement les batteries de condensateurs nécessaires à la compensation.",
    advantages: [
      "Suppression des pénalités liées à la surconsommation d'énergie réactive sur la facture électrique",
      "Réduction des chutes de tension et des pertes par effet Joule dans les câbles et équipements",
      "Amélioration du rendement énergétique global et libération de puissance utile sur l'installation",
      "Compensation dynamique et autonome par gradins de condensateurs sans intervention manuelle"
    ],
    image: "/assets/aistudio/hkjkjj_02854382.jpg",
    gallery: [
      "/assets/aistudio/hkjkjj_02854382.jpg",
      "/assets/aistudio/ff_1bc4c530.jpg"
    ],
    galleryItems: [
      {
        url: "/assets/aistudio/hkjkjj_02854382.jpg",
        title: "Test en charge (moteur & lampe) : coffret à 3 gradins, contacteurs, relais, PZEM-004T et condensateurs",
        category: "hardware"
      },
      {
        url: "/assets/aistudio/ff_1bc4c530.jpg",
        title: "Vue d'ensemble du banc d'essai : régulateur automatique et batteries de condensateurs",
        category: "hardware"
      }
    ]
  },
  {
    id: "architopo",
    title: "Architopo — Logiciel d'Architecture & Plans",
    tech: "Logiciel Web & Desktop, CAO 2D/3D, Topographie",
    platform: "Logiciel",
    status: "Prototype partiel",
    isPrivate: true,
    link: "https://github.com/chadest/architopo",
    desc: "Logiciel professionnel de création de plans de maison, d'architecture et de projets de rénovation.",
    fullDesc: "Architopo est une solution logicielle dédiée à la conception architecturale, la génération de plans de maison et l'aménagement de projets de rénovation. Le logiciel intègre des outils de dessin technique assisté par ordinateur (CAO 2D/3D), le partitionnement intelligent des pièces, le calcul automatique des métrés et des surfaces habitables, ainsi que la prise en compte des contraintes topographiques de terrain. (Projet sous code source propriétaire / Dépôt GitHub privé).",
    image: "/assets/aistudio/Capture_d__cran_2026-11-13_174750_5258454a.png",
    gallery: [
      "/assets/aistudio/Capture_d__cran_2026-11-13_174750_5258454a.png",
      "/assets/aistudio/Capture_d__cran_2026-11-13_174706_d0a1a823.png",
      "/assets/aistudio/Capture_d__cran_2026-11-13_174906_f38ee0cc.png",
      "/assets/aistudio/Capture_d__cran_2026-11-13_174838_cf2a3cb5.png"
    ],
    galleryItems: [
      {
        url: "/assets/aistudio/Capture_d__cran_2026-11-13_174750_5258454a.png",
        title: "Vue 3D : Modélisation de charpente, toiture à 2 versants & calcul de surface",
        category: "web"
      },
      {
        url: "/assets/aistudio/Capture_d__cran_2026-11-13_174706_d0a1a823.png",
        title: "Éditeur CAO 2D : Plan coté des pièces, bibliothèque mobilier & inspecteur de propriétés",
        category: "web"
      },
      {
        url: "/assets/aistudio/Capture_d__cran_2026-11-13_174906_f38ee0cc.png",
        title: "Tableau de bord ArchiTopo : Gestion des plans résidentiels et plans de masse",
        category: "web"
      },
      {
        url: "/assets/aistudio/Capture_d__cran_2026-11-13_174838_cf2a3cb5.png",
        title: "Interface mobile : Consultation et édition de plan 2D coté sur smartphone",
        category: "web"
      }
    ]
  },
  {
    id: "silatran",
    title: "Silatran — Traducteur Langue des Signes",
    tech: "TypeScript, React, Three.js, MediaPipe, OpenCV",
    platform: "Web",
    status: "Prototype partiel",
    link: "https://github.com/chadest/Silatran",
    desc: "Traducteur interactif de texte en Langue des Signes Française avec présentateur 3D et capture par caméra.",
    fullDesc: "Silatran (Sign Language Translator) est une application moderne et inclusive conçue pour convertir instantanément du texte en Langue des Signes Française (LSF). Elle offre une double expérience de visualisation : un présentateur 3D réaliste en studio PBR et un mode 2D vectoriel épuré. Le projet intègre la capture de mouvements en direct par caméra (Google MediaPipe & OpenCV), un dictionnaire gestuel interactif et la synthèse vocale avec synchronisation labiale (Lip-Sync).",
    image: "./projects/silatran/screen1.jpeg",
    gallery: [
      "./projects/silatran/screen1.jpeg",
      "./projects/silatran/Silatran-logo.png"
    ],
    galleryItems: [
      {
        url: "./projects/silatran/screen1.jpeg",
        title: "Interface de traduction LSF : Avatar 3D en studio avec contrôle de vitesse",
        category: "web"
      },
      {
        url: "./projects/silatran/Silatran-logo.png",
        title: "Identité visuelle et logo officiel Silatran",
        category: "web"
      }
    ]
  },
  {
    id: "facialemotion",
    title: "FacialEmotion — Détection d'Émotions & AR Facial",
    tech: "Kotlin, Android, Jetpack Compose, CameraX, MediaPipe",
    platform: "Android",
    status: "Prototype partiel",
    link: "https://github.com/chadest/FacialEmotion",
    desc: "Application Android d'analyse faciale 3D temps réel à 60 FPS avec 52 blendshapes et réalité augmentée.",
    fullDesc: "Application mobile Android moderne construite avec Jetpack Compose, CameraX et Google MediaPipe Face Landmarker. Elle applique un maillage facial géométrique 3D en réalité augmentée (478 repères) à 60 FPS sur l'appareil. Le système classifie les expressions et émotions faciales en temps réel via 52 blendshapes et diffuse des réactions interactives flottantes à l'écran.",
    image: "./projects/facialemotion/ic_facepulse.jpg",
    gallery: ["./projects/facialemotion/ic_facepulse.jpg"],
    galleryItems: [
      {
        url: "./projects/facialemotion/ic_facepulse.jpg",
        title: "Maillage géométrique 3D haute densité (478 repères faciaux MediaPipe)",
        category: "web"
      }
    ]
  },
  {
    id: "morsign",
    title: "Morsign — Studio Morse & Transmission Optique",
    tech: "TypeScript, Web Audio API, CameraX, Flash, AES-256",
    platform: "Web",
    status: "Prototype partiel",
    link: "https://github.com/chadest/Morsign-",
    desc: "Système de transmission et réception en Code Morse International par signaux acoustiques et optiques.",
    fullDesc: "Morsign est une application complète de transmission et de réception en Code Morse International (conforme à la norme ITU-R M.1677-1). Elle convertit du texte en Morse et inversement, émet des signaux sonores et lumineux (via l'écran et la torche flash de l'appareil), et décode en temps réel les signaux acoustiques captés par le microphone ainsi que les signaux optiques via la caméra, avec prise en charge du chiffrement radio AES-256.",
    image: morsignCover,
    gallery: [morsignCover, morsignSignal],
    galleryItems: [
      {
        url: morsignCover,
        title: "Table de correspondance du Code Morse International",
        category: "web"
      },
      {
        url: morsignSignal,
        title: "Décodage en temps réel par analyse fréquentielle et optique",
        category: "web"
      }
    ]
  },
  {
    id: "eya3d-builder",
    title: "Eya3D — Studio de Modélisation 3D Web & CAO",
    tech: "TypeScript, Three.js, WebGL, CSG Booleans, SubD",
    platform: "Web",
    status: "Prototype partiel",
    link: "https://github.com/chadest/EYA3D-BUILDER",
    desc: "Studio de création 3D et CAO professionnel s'exécutant directement dans le navigateur sans installation.",
    fullDesc: "Eya3D est une plateforme web de création et de modélisation 3D professionnelle conçue comme une alternative web légère à Blender3D. Alliant la rigueur d'un outil de CAO (DAO 2D/3D), un modeleur polygonal avancé, des opérations booléennes CSG et un moteur de rendu temps réel PBR, Eya3D permet de sculpter et concevoir des modèles tridimensionnels directement dans le navigateur.",
    image: eya3dCover,
    gallery: [eya3dCover, eya3dMesh],
    galleryItems: [
      {
        url: eya3dCover,
        title: "Environnement de modélisation 3D temps réel dans le navigateur",
        category: "web"
      },
      {
        url: eya3dMesh,
        title: "Édition de maillages polygonaux et opérations géométriques CSG",
        category: "web"
      }
    ]
  },
  {
    id: "tri-industriel",
    title: "Système de tri industriel",
    tech: "IA, C++, Vision par Ordinateur",
    platform: "Système Embarqué",
    status: "Prototype",
    desc: "Prototype de tri automatisé assisté par vision artificielle.",
    fullDesc: "Développement d'un prototype de tri automatisé pour les chaînes de production industrielles. Le système utilise des caméras et un modèle d'intelligence artificielle pour identifier et classifier les objets en temps réel, avec un contrôle précis des actionneurs et convoyeurs programmé en C++.",
    image: arrosageImg,
    gallery: [arrosageImg]
  },
  {
    id: "station-meteo",
    title: "Système météorologique",
    tech: "ESP32 / Arduino, DHT11, Mobile",
    platform: "Système Embarqué",
    status: "Prototype",
    desc: "Monitoring climatique et suivi météo connecté en temps réel.",
    fullDesc: "Station météorologique connectée utilisant des capteurs d'ambiance (DHT11 / DHT22) pour mesurer température, humidité et point de rosée. Les données sont télétransmises vers une interface mobile permettant un suivi précis et l'historisation des relevés climatiques.",
    image: stationMeteoImg,
    gallery: [stationMeteoImg, stationMeteoUI, stationMeteoHardware],
    galleryItems: [
      {
        url: stationMeteoUI,
        title: "Interface de monitoring : Température (33.7 °C), Humidité (57 %) & Télémétrie 24h",
        category: "web"
      },
      {
        url: stationMeteoHardware,
        title: "Montage prototype : ESP32, capteur DHT11 et afficheur LCD (Température & Humidité)",
        category: "hardware"
      },
      {
        url: stationMeteoImg,
        title: "Suivi météorologique et relevés climatiques connectés",
        category: "all"
      }
    ]
  }
];
