import { Project } from '../types';

const arrosageImg = "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80";
const stationMeteoImg = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80";
const adjagbeImg = "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80";

const architopoCover = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
const architopoPlan = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80";

const morsignCover = "https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=1200&q=80";
const morsignSignal = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80";

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
    fullDesc: "Conception et réalisation intégrale d'un compteur d'énergie électrique connecté. Le système embarqué utilise un microcontrôleur ESP32 et un module de mesure PZEM-004T pour échantillonner en temps réel la tension (227.9V), le courant (0.02A), la puissance active (W), la fréquence réseau (49.37 Hz) et le facteur de puissance (cos φ 0.740). L'ensemble est intégré dans un coffret étanche IP64 avec afficheur LCD local et transmission Wi-Fi vers une interface web dynamique permettant le suivi énergétique en direct, le calcul instantané du coût en FCFA (tarif 200 FCFA/kWh) et la notification d'alertes.",
    image: "./compteur/IMG_20260507_183822_477.jpg",
    gallery: [
      "./compteur/IMG_20260507_183822_477.jpg",
      "./compteur/IMG_20260514_162717_773.jpg",
      "./compteur/IMG_20260514_154547_392 (1).jpg",
      "./compteur/Screenshot_20260509-141342 (2).jpg",
      "./compteur/Screenshot_20260509-070522 (1).jpg",
      "./compteur/Screenshot_20260509-170842 (1).jpg"
    ],
    galleryItems: [
      {
        url: "./compteur/Screenshot_20260509-141342 (2).jpg",
        title: "Interface Web : Tableau de bord principal (Tension 227.9V, Courant 0.02A)",
        category: "web"
      },
      {
        url: "./compteur/Screenshot_20260509-070522 (1).jpg",
        title: "Interface Web : Fréquence (49.37 Hz), courbe sinusoïdale & alerte facteur de puissance",
        category: "web"
      },
      {
        url: "./compteur/Screenshot_20260509-170842 (1).jpg",
        title: "Interface Web : Suivi tarifaire (200 FCFA/kWh), coût d'énergie & alertes",
        category: "web"
      },
      {
        url: "./compteur/IMG_20260514_162717_773.jpg",
        title: "Boîtier IP64 finalisé avec afficheur LCD en fonctionnement (227.9V / 0.02A / 1.0W)",
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
    id: "architopo",
    title: "Architopo — Logiciel d'Architecture & Plans",
    tech: "Logiciel Web & Desktop, CAO 2D/3D, Topographie",
    platform: "Logiciel",
    status: "Prototype partiel (Privé)",
    isPrivate: true,
    link: "https://github.com/chadest/architopo",
    desc: "Logiciel professionnel de création de plans de maison, d'architecture et de projets de rénovation.",
    fullDesc: "Architopo est une solution logicielle dédiée à la conception architecturale, la génération de plans de maison et l'aménagement de projets de rénovation. Le logiciel intègre des outils de dessin technique assisté par ordinateur (CAO 2D/3D), le partitionnement intelligent des pièces, le calcul automatique des métrés et des surfaces habitables, ainsi que la prise en compte des contraintes topographiques de terrain. (Projet sous code source propriétaire / Dépôt GitHub privé).",
    image: architopoCover,
    gallery: [architopoCover, architopoPlan],
    galleryItems: [
      {
        url: architopoCover,
        title: "Modélisation architecturale 3D & rendu d'habitat",
        category: "web"
      },
      {
        url: architopoPlan,
        title: "Élaboration de plans de masse et coupes techniques",
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
    status: "Prototype partiel (Android)",
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
        title: "Supervision des signaux audio et trains d'impulsions Morse",
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
    gallery: [stationMeteoImg]
  },
  {
    id: "culture-adjagbe",
    title: "Culture Adjagbe App",
    tech: "React, Mobile, Sauvegarde du Patrimoine",
    platform: "Android",
    status: "En développement",
    desc: "Application interactive dédiée à la valorisation de la culture Adjagbe.",
    fullDesc: "Application mobile et web conçue pour préserver et valoriser le patrimoine culturel et linguistique Adjagbe. Elle intègre un lexique interactif, des récits audio-guidés et des modules d'apprentissage linguistique avec une interface utilisateur fluide et accessible.",
    image: adjagbeImg,
    gallery: [adjagbeImg]
  }
];
