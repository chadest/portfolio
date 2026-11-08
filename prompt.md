# 📝 Guide de Reproduction Exhaustif & Spécifications de Développement (Vibe Coding)

Ce document compile l'intégralité de l'historique des échanges, des choix techniques, de la structure de l'application, du contenu statique et des composants interactifs de notre projet de Portfolio Professionnel. Il a été conçu pour qu'un agent d'intelligence artificielle ou un développeur web puisse **reproduire à l'identique** le design, l'esthétique, les fonctionnalités dynamiques et le code source exact de l'application.

---

## 🎯 1. Identité & Ligne Artistique

L'application est un **Portfolio de Développeur Full-Stack, Expert IoT & Électrotechnique**, doté d'une double compétence rare alliant le code virtuel de pointe et l'électronique physique réelle.

### 🎨 Thème Visuel ("Slate Ambient Duo")
*   **Mode Sombre (Par défaut) :** Arrière-plan anthracite profond (`bg-neutral-950`), cartes de contenu texturées (`bg-neutral-900` / bordures de démarcation `border-neutral-800`), accents de couleur pastel lumineux (orange, violet, rose, bleu, vert).
*   **Mode Clair :** Arrière-plan doux cassé d'off-white (`bg-neutral-50`), cartes immaculées (`bg-white` / bordures grises subtiles `border-neutral-200`), textes à haut contraste (`text-neutral-900`).
*   **Transitions :** Animation globale de couleur fluide (`transition-colors duration-300`) déclenchée par un commutateur de mode (icône Soleil/Lune) placé de façon fixe dans le coin supérieur de l'écran.

---

## 🚀 2. Cinématique de Chargement (Loader Progressif)

Dès l'ouverture, l'application présente un écran de chargement immersif d'une durée de 2,5 secondes simulant l'initialisation des modules systèmes :
1.  **Barre de Progression :** Une barre horizontale fine au centre de l'écran s'incrémente de `0%` à `100%` en se synchronisant sur une variable d'état React (`loadingProgress`).
2.  **Terminal de Logs :** En dessous de la barre, de courtes lignes de log défilent de manière asynchrone pour simuler un démarrage de noyau Unix (ex: `Initializing kernel...`, `Binding ports...`, `Mounting visual pipelines...`).
3.  **Fondu de Sortie :** Un conteneur d'animation `AnimatePresence` de Framer Motion gère un fondu de sortie très propre (`exit={{ opacity: 0 }}`) pour dévoiler délicatement le portfolio principal.

---

## 💾 3. Contenu Statique & Structuration des Données

Pour reproduire fidèlement l'application, voici les jeux de données JSON exacts définis dans l'état ou les constantes globales :

### A. Les Projets (`projects`)
```typescript
interface Project {
  title: string;
  tech: string;
  desc: string;
  link: string;
  fullDesc: string;
  image: string;
  gallery?: string[];
}
```
1.  **Compteur d'énergie intelligent**
    *   **Tech :** `C++, Électronique`
    *   **Description Courte :** `Système de mesure intelligent.`
    *   **Description Complète :** `Ce projet consiste en la conception et la réalisation d'un compteur d'énergie électrique intelligent. Il permet la mesure en temps réel de la consommation électrique et la transmission des données vers une interface de suivi. J'ai conçu le circuit électronique et programmé le microcontrôleur en C++.`
    *   **Images :** Galerie contenant des visuels du circuit imprimé, du tableau LCD de contrôle et de la plateforme de monitoring.
2.  **Système de tri industriel**
    *   **Tech :** `IA, C++`
    *   **Description Courte :** `Prototype de tri assisté par IA.`
    *   **Description Complète :** `Développement d'un prototype de tri automatisé pour les chaînes de production industrielles. Le système utilise des caméras et un modèle d'intelligence artificielle pour identifier et trier les objets en temps réel, avec un contrôle des actionneurs développé en C++.`
3.  **Système météorologique**
    *   **Tech :** `DHT11, Mobile`
    *   **Description Courte :** `Monitoring météo via smartphone.`
    *   **Description Complète :** `Une station météorologique connectée utilisant des capteurs DHT11 pour mesurer la température et l'humidité. Les données sont envoyées à un serveur et visualisables sur une application mobile dédiée, permettant un monitoring précis et à distance.`
4.  **Culture Adjagbe App**
    *   **Tech :** `React, Mobile`
    *   **Description Courte :** `Valorisation de la culture Adjagbe.`
    *   **Description Complète :** `Application mobile développée avec React (React Native/Web) ayant pour but de valoriser et préserver la culture Adjagbe. Elle inclut des dictionnaires, des contes interactifs, et des leçons de langue, offrant une expérience utilisateur fluide et moderne.`

### B. Le Parcours Professionnel (`experiences`)
*   **Poste 1 :** `Stagiaire` | Entreprise : `Compagnie Béninoise des Textiles (CBT)` | Description : `Stage d'immersion professionnelle.`
*   **Poste 2 :** `Électricité Bâtiment` | Entreprise : `Hévie` | Description : `Installation et maintenance de circuits électriques.`
*   **Poste 3 :** `Informatique de gestion` | Entreprise : `CACOM` | Description : `Assistance en informatique de gestion.`

### C. Le Set de Compétences (`techStack`)
*   Systèmes Embarqués (85%), C/C++ (85%), Python (70%), React (75%), HTML/CSS (90%), JavaScript (80%), SQL (75%), Utilisation de l'IA (85%), Électricité Bâtiment (75%), Proteus (85%), Cisco Packet Tracer (60%), Photoshop (80%), After Effects (70%), Visual Studio (90%), Arduino IDE (90%), PlatformIO (85%), Sketchware (80%).

---

## 🛠️ 4. Composants Interactifs Clés (Code Prêt à l'Emploi)

Les trois fonctionnalités signatures développées lors des itérations successives sont détaillées ci-après avec leurs codes sources originaux et commentés :

### 1️⃣ L'Effet de Survol Tactile Aérien (`TouchMeOverlay`)
Ce composant s'injecte de façon absolue dans toute carte parent disposant de la classe relative et du tag `group` de Tailwind. Il permet d'afficher une main animée stylisée dotée d'un effet de tapotement à ondes concentriques en floutant doucement l'arrière-plan de la carte.

```tsx
import { motion } from 'motion/react';

const TouchMeOverlay = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30 dark:bg-black/50 backdrop-blur-[1.5px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
      <motion.div
        animate={{
          scale: [1, 0.85, 1.1, 1],
          y: [0, -4, 2, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Effet d'onde concentrique (Ripple Effect) */}
        <span className="absolute -top-2 -left-2 flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 border-2 border-purple-400 opacity-50"></span>
        </span>
        
        {/* SVG de main pointeuse stylisé */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-400 transform -rotate-12 filter drop-shadow-[0_2px_8px_rgba(168,85,247,0.6)]"
        >
          <path d="M14 11V5a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7" />
          <path d="M10 15H6a2 2 0 0 0-2 2v2a4 4 0 0 0 4 4h6a6 6 0 0 0 6-6V13a2 2 0 0 0-2-2 2 2 0 0 0-2 2v-1a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
        </svg>
      </motion.div>
    </div>
  );
};
```

### 2️⃣ Le Texte Typewriter Déclenché au Défilement (`TypewriterText`)
Ce composant retarde l'effet de saisie progressive jusqu'à ce que la section soit entrée dans le champ de vision de l'utilisateur (Viewport), préservant ainsi l'effet de découverte sans consommer de cycles CPU inutiles. Il est facilement désactivable via un bloc de commentaires alternatifs dans le code d'intégration.

```tsx
import { useState, useEffect, useRef } from 'react';

const TypewriterText = ({ text, speed = 12 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLParagraphElement>(null);

  // Initialisation de l'Intersection Observer pour le déclenchement au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect(); // Déconnexion pour éviter des recalculs
        }
      },
      { threshold: 0.1 } // Se déclenche dès que 10% de l'élément est visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Logique récursive de saisie progressive du texte
  useEffect(() => {
    if (!hasStarted) return;

    let isMounted = true;
    if (index < text.length) {
      const timeout = setTimeout(() => {
        if (isMounted) {
          setDisplayedText((prev) => prev + text[index]);
          setIndex((prev) => prev + 1);
        }
      }, speed);
      return () => {
        isMounted = false;
        clearTimeout(timeout);
      };
    }
  }, [index, text, speed, hasStarted]);

  return (
    <p ref={elementRef} className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed min-h-[120px] md:min-h-[80px]">
      {displayedText}
      {hasStarted && index < text.length && (
        <span className="inline-block w-1.5 h-5 ml-1 bg-blue-500 animate-pulse align-middle" />
      )}
    </p>
  );
};
```

---

## 🔭 5. Structure & Modals d'Expertises Avancées

Le portfolio se découpe en trois blocs cliquables dans la section "Expertises", chacun ouvrant un modal dédié enrichi d'illustrations et d'animations d'immersion :

### A. Systèmes Embarqués (Modal Déclenché par `showEmbeddedModal`)
*   **Identité Graphique :** Couleur d'accent orange (`text-orange-500`).
*   **Contenu :** Présentation des compétences en Microcontrôleurs (Arduino, ESP32, STM32) et Conception CAO (Proteus, KiCAD).
*   **Illustration Spécifique :** Visualiseur d'arrosage automatique intelligent et schémas d'architectures IoT.

### B. Intelligence Artificielle (Modal Déclenché par `showAIModal`)
*   **Identité Graphique :** Couleur d'accent rose (`text-pink-500`).
*   **Contenu :** Frameworks d'apprentissage (PyTorch, TensorFlow) et modèles de reconnaissance par ordinateur (YOLO, OpenCV, détection d'objets en temps réel).

### C. Design & Média (Modal Déclenché par `showDesignModal`)
*   **Identité Graphique :** Couleur d'accent violet (`text-purple-500`).
*   **Contenu :** Canva, PixelLab, Photoshop, CapCut, After Effects, Cadrage.
*   **Effet Caméra Cadrage (CSS/SVG) :**
    *   Un bloc visualisant des lignes pointillées, un cadre simulé avec des coins croisés violets animés par Framer Motion imitant l'optique d'un objectif de caméra professionnelle.

---

## 🌍 6. Intégration dans un Projet de Production (Vite + Tailwind CSS v4)

Pour monter ce projet à partir de zéro, vous devez posséder les dépendances suivantes dans votre `package.json` :

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "motion": "^11.11.11",
    "lucide-react": "^0.454.0"
  },
  "devDependencies": {
    "vite": "^6.4.3",
    "tailwindcss": "^4.0.0"
  }
}
```

### Configuration du Fichier CSS Global (`src/index.css`)
Tailwind v4 est configuré nativement par simple importation directe à la racine :

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}
```

---

## 📌 7. Mémo pour une Désactivation Rapide (Pour le Développeur)

Si vous préférez un affichage **statique immédiat** de la description au lieu de l'effet d'écriture automatique :
1.  Ouvrez le fichier `src/App.tsx`.
2.  Repérez la section **À propos** (vers la ligne 320).
3.  Commentez la balise `<TypewriterText />` :
    ```tsx
    {/*
    <TypewriterText 
      text="Passionné par l'innovation, j'évolue entre le monde physique..."
      speed={12}
    />
    */}
    ```
4.  Décommentez la balise `<p>` standard d'origine juste en dessous :
    ```tsx
    <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
      Passionné par l'innovation, j'évolue entre le monde physique de l'électronique et la puissance du code. Étant pour la plupart un autodidacte formé via <strong>YouTube</strong>, j'ai développé une grande capacité d'adaptation et une soif constante d'apprentissage. Développeur web et mobile, électrotechnicien et expert en IA, je crée des solutions qui connectent le matériel au numérique. Actuellement adepte du "vibe coding", je transforme des idées complexes en expériences fluides.
    </p>
    ```
5.  Enregistrez le fichier. L'effet de frappe disparaîtra instantanément au profit d'un chargement direct de l'ensemble de la biographie.
