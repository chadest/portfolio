import { ExpertiseItem } from '../types';

export const expertisesData: ExpertiseItem[] = [
  {
    id: "systemes-embarques",
    title: "Systèmes Embarqués & IoT",
    categoryName: "Électronique & Firmware",
    color: "text-orange-500",
    desc: "Conception de circuits électroniques, programmation bas niveau et connectivité IoT.",
    fullDesc: "Expertise en développement hardware et micrologiciel pour objets connectés et systèmes temps réel. Maîtrise de l'ensemble de la chaîne : du schéma électronique sous Proteus, au choix des microcontrôleurs (Arduino, ESP32, AI-Pi) et afficheurs graphiques (LCD TFT 2.4\"), jusqu'à la programmation C/C++ optimisée et la communication réseau (Wi-Fi, I2C, SPI, UART).",
    tools: [
      { name: "Arduino IDE", iconUrl: "https://cdn.simpleicons.org/arduino/00979D" },
      { name: "PlatformIO", iconUrl: "https://cdn.simpleicons.org/platformio/F5822A" },
      { name: "C / C++", iconUrl: "https://cdn.simpleicons.org/cplusplus/00599C" },
      { name: "Simulation Proteus", badgeText: "Proteus" }
    ],
    hardwareOrDetails: [
      {
        title: "Arduino Uno",
        desc: "Carte de référence avec microcontrôleur ATmega328P. Gestion des entrées/sorties numériques, convertisseurs analogiques, signaux PWM et automatismes de précision.",
        tag: "Microcontrôleur AVR"
      },
      {
        title: "Arduino Nano",
        desc: "Version miniaturisée pour l'intégration compacte sur breadboard et cartes électroniques sur mesure, idéale pour les boîtiers à encombrement réduit.",
        tag: "Format Compact"
      },
      {
        title: "ESP32 (Wi-Fi & Bluetooth)",
        desc: "SoC 32 bits dual-core haute performance avec connectivité sans fil native. Utilisé pour les passerelles IoT, compteurs d'énergie connectés et serveurs web embarqués.",
        tag: "IoT & Connectivité"
      },
      {
        title: "AI-Pi Uno",
        desc: "Carte dédiée combinant interfaçage matériel et capacités de calcul intelligent pour l'IA embarquée (Edge Computing et vision périphérique).",
        tag: "Edge AI & Calcul"
      },
      {
        title: "Écran LCD TFT 2.4\"",
        desc: "Afficheur graphique couleur 2.4 pouces (240x320 px, bus SPI / 8-bit) pour la création d'interfaces homme-machine (IHM), tableaux de bord dynamiques et visualisation de mesures.",
        tag: "IHM & Affichage Graphique"
      },
      {
        title: "Capteurs & Instrumentation",
        desc: "Intégration de capteurs de puissance (PZEM-004T), température/humidité (DHT11/22), bus I2C/SPI et modules de coupure/relais de puissance.",
        tag: "Télémétrie & Capteurs"
      }
    ]
  },
  {
    id: "ia-vision",
    title: "Intelligence Artificielle & Computer Vision",
    categoryName: "Vision & Deep Learning",
    color: "text-pink-500",
    desc: "Traitement d'images temps réel, détection d'objets et intégration de modèles IA.",
    fullDesc: "Développement de solutions d'analyse visuelle et de détection d'objets pour l'automatisation industrielle et le monitoring intelligent. Utilisation de pipelines de vision par ordinateur pour extraire des métriques décisionnelles à partir de flux vidéo.",
    tools: [
      { name: "Python", iconUrl: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "OpenCV", iconUrl: "https://cdn.simpleicons.org/opencv/5C3EE8" },
      { name: "YOLOv8", badgeText: "YOLO" },
      { name: "NumPy / Pandas", iconUrl: "https://cdn.simpleicons.org/numpy/013243" }
    ],
    hardwareOrDetails: [
      {
        title: "OpenCV - Traitement d'Image",
        desc: "Filtrage spatial, détection de contours, segmentation de couleurs et suivi de flux en temps réel.",
        tag: "Computer Vision"
      },
      {
        title: "YOLOv8 - Détection & Classification",
        desc: "Inférence de modèles pour la reconnaissance multi-classes, comptage d'éléments et tri automatique.",
        tag: "Deep Learning"
      }
    ]
  },
  {
    id: "design-media",
    title: "Design Visuel & Média",
    categoryName: "Création & Graphisme",
    color: "text-purple-500",
    desc: "Identité graphique, supports visuels et production de contenu digital.",
    fullDesc: "Conception visuelle soignée pour applications, marques et présentations techniques. Capacité à allier rigueur d'ingénierie et sensibilité esthétique pour produire des interfaces claires et des supports de communication percutants.",
    tools: [
      { name: "Canva", iconUrl: "https://cdn.simpleicons.org/canva/00C4CC" },
      { name: "PixelLab Mobile", badgeText: "PixelLab" },
      { name: "Photoshop (Bases)", badgeText: "Ps" },
      { name: "CapCut & Montage", badgeText: "CapCut" }
    ],
    hardwareOrDetails: [
      {
        title: "Identité de marque & Affiches",
        desc: "Création d'univers graphiques épurés, chartes typographiques et visuels pour les réseaux sociaux.",
        tag: "Graphisme"
      },
      {
        title: "Montage vidéo & Post-production",
        desc: "Rythme, découpage, habillage sonore et animations légères pour la démonstration de prototypes et projets.",
        tag: "Production Vidéo"
      }
    ]
  }
];
