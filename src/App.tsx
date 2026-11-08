/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Mail, Linkedin, Github, Code, Cpu, Video, FileText, Download, ExternalLink, Send, ArrowRight, Facebook, MessageCircle, X, Moon, Sun, Brain, Youtube, GraduationCap } from 'lucide-react';
import profileImage from './assets/images/moi.png';
const compteurCircuit = "https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=800&q=80";
const compteurLcd = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80";
const compteurDashboard = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
const arrosageImg = "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80";
const stationMeteoImg = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80";
const adjagbeImg = "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80";
const arduinoImg = "https://images.unsplash.com/photo-1553406830-ef251367888c?auto=format&fit=crop&w=800&q=80";
const esp32Img = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
const opencvImg = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80";
const yoloImg = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80";

interface Project {
  title: string;
  tech: string;
  desc: string;
  link: string;
  fullDesc: string;
  image: string;
  gallery?: string[];
}

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
        {/* Animated Tap Circle / Ripple */}
        <span className="absolute -top-2 -left-2 flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 border-2 border-purple-400 opacity-50"></span>
        </span>
        
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
          {/* Elegant Pointer hand */}
          <path d="M14 11V5a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7" />
          <path d="M10 15H6a2 2 0 0 0-2 2v2a4 4 0 0 0 4 4h6a6 6 0 0 0 6-6V13a2 2 0 0 0-2-2 2 2 0 0 0-2 2v-1a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
        </svg>
      </motion.div>
    </div>
  );
};

/* =========================================================================
   COMPOSANT TYPEWRITER / EFFET D'ÉCRITURE (DÉSACTIVABLE)
   Ce composant simule la saisie progressive du texte caractère par caractère.
   Si vous souhaitez désactiver cet effet à l'avenir :
   1. Allez dans la section "À propos" (plus bas dans ce fichier).
   2. Commentez la ligne <TypewriterText ... />.
   3. Décommentez la balise <p>...</p> statique d'origine.
   ========================================================================= */
const TypewriterText = ({ text, speed = 15 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

export default function App() {
  const [selectedTech, setSelectedTech] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showEmbeddedModal, setShowEmbeddedModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showDesignModal, setShowDesignModal] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500; // 2.5 seconds total loading time
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 100, 100);
      setLoadingProgress(progress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 300); // Short delay before fading out
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const projects: Project[] = [
    { 
      title: "Compteur d'énergie intelligent", 
      tech: "C++, Électronique", 
      desc: "Système de mesure intelligent.", 
      link: "#",
      fullDesc: "Ce projet consiste en la conception et la réalisation d'un compteur d'énergie électrique intelligent. Il permet la mesure en temps réel de la consommation électrique et la transmission des données vers une interface de suivi. J'ai conçu le circuit électronique et programmé le microcontrôleur en C++.",
      image: compteurLcd,
      gallery: [compteurLcd, compteurCircuit, compteurDashboard]
    },
    { 
      title: "Système de tri industriel", 
      tech: "IA, C++", 
      desc: "Prototype de tri assisté par IA.", 
      link: "#",
      fullDesc: "Développement d'un prototype de tri automatisé pour les chaînes de production industrielles. Le système utilise des caméras et un modèle d'intelligence artificielle pour identifier et trier les objets en temps réel, avec un contrôle des actionneurs développé en C++.",
      image: arrosageImg
    },
    { 
      title: "Système météorologique", 
      tech: "DHT11, Mobile", 
      desc: "Monitoring météo via smartphone.", 
      link: "#",
      fullDesc: "Une station météorologique connectée utilisant des capteurs DHT11 pour mesurer la température et l'humidité. Les données sont envoyées à un serveur et visualisables sur une application mobile dédiée, permettant un monitoring précis et à distance.",
      image: stationMeteoImg
    },
    { 
      title: "Culture Adjagbe App", 
      tech: "React, Mobile", 
      desc: "Valorisation de la culture Adjagbe.", 
      link: "#",
      fullDesc: "Application mobile développée avec React (React Native/Web) ayant pour but de valoriser et préserver la culture Adjagbe. Elle inclut des dictionnaires, des contes interactifs, et des leçons de langue, offrant une expérience utilisateur fluide et moderne.",
      image: adjagbeImg
    },
  ];

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject || showEmbeddedModal || showAIModal || showDesignModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, showEmbeddedModal, showAIModal, showDesignModal]);


  const experiences = [
    { role: "Stagiaire", company: "Compagnie Béninoise des Textiles (CBT)", desc: "Stage d'immersion professionnelle." },
    { role: "Électricité Bâtiment", company: "Hévie", desc: "Installation et maintenance de circuits électriques." },
    { role: "Informatique de gestion", company: "CACOM", desc: "Assistance en informatique de gestion." },
  ];

  const techStack = [
    { name: "Systèmes Embarqués", level: 85 },
    { name: "C/C++", level: 85 },
    { name: "Python", level: 70 },
    { name: "React", level: 75 },
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 80 },
    { name: "SQL", level: 75 },
    { name: "Utilisation de l'IA", level: 85 },
    { name: "Électricité Bâtiment", level: 75 },
    { name: "Proteus", level: 85 },
    { name: "Cisco Packet Tracer", level: 60 },
    { name: "Photoshop", level: 80 },
    { name: "After Effects", level: 70 },
    { name: "Visual Studio", level: 90 },
    { name: "Arduino IDE", level: 90 },
    { name: "PlatformIO", level: 85 },
    { name: "Sketchware", level: 80 }
  ];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans p-6 md:p-12 relative transition-colors duration-300">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Logo Placeholder */}
              <div className="w-24 h-24 mb-8 bg-gradient-to-tr from-blue-500 via-purple-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/20">
                <span className="text-4xl font-bold text-white">CT</span>
              </div>
              
              <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                Chades't Creative
              </h2>

              <div className="w-64 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div className="mt-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {Math.round(loadingProgress)}%
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-blue-500 hover:border-blue-500 shadow-lg transition-all"
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 origin-left z-50 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" 
        style={{ scaleX }} 
      />
      
      {/* Hero */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto py-20 flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
      >
        <img src={profileImage} alt="Espérance Chadrac TCHIDI" className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-xl" />
        <div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            Chades't Creative
          </h1>
          <p className="text-2xl md:text-3xl text-neutral-600 dark:text-neutral-400 font-light mb-2">Architecte de solutions numériques</p>
          <a href="mailto:chadractchidi58@gmail.com" className="text-lg md:text-xl text-blue-400 font-medium hover:text-blue-300 transition-colors inline-block mb-8">chadractchidi58@gmail.com</a>
          <div className="flex gap-6 mb-8 justify-center md:justify-start">
            <a href="mailto:chadractchidi58@gmail.com" className="hover:text-blue-400 transition-colors"><Mail /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><Github /></a>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors"><FileText /></a>
          </div>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="#contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-colors flex items-center gap-2">
              Travaillons ensemble <ArrowRight size={20} />
            </a>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 rounded-full font-medium transition-colors flex items-center gap-2">
              Télécharger CV <Download size={20} />
            </a>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto space-y-16">
        {/* Bio */}
        <section>
          <h2 className="text-3xl font-semibold border-l-4 border-blue-500 pl-4 mb-6">À propos</h2>
          
          {/* =========================================================================
             EFFET D'ÉCRITURE AUTOMATIQUE (TYPEWRITER) SUR LA BIO
             Pour le désactiver, commentez le bloc <TypewriterText ... /> ci-dessous
             et décommentez le bloc <p>...</p> statique d'origine juste après.
             ========================================================================= */}
          <TypewriterText 
            text="Passionné par l'innovation, j'évolue entre le monde physique de l'électronique et la puissance du code. Étant pour la plupart un autodidacte formé via YouTube, j'ai développé une grande capacité d'adaptation et une soif constante d'apprentissage. Développeur web et mobile, électrotechnicien et expert en IA, je crée des solutions qui connectent le matériel au numérique. Actuellement adepte du 'vibe coding', je transforme des idées complexes en expériences fluides."
            speed={12}
          />

          {/* SÉLECTIONNEZ ET DÉCOMMENTEZ LE BLOC CI-DESSOUS SI VOUS SOUHAITEZ DÉSACTIVER LE TYPING :
          <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
            Passionné par l'innovation, j'évolue entre le monde physique de l'électronique et la puissance du code. Étant pour la plupart un autodidacte formé via <strong>YouTube</strong>, j'ai développé une grande capacité d'adaptation et une soif constante d'apprentissage. Développeur web et mobile, électrotechnicien et expert en IA, je crée des solutions qui connectent le matériel au numérique. Actuellement adepte du "vibe coding", je transforme des idées complexes en expériences fluides.
          </p>
          */}
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-3xl font-semibold border-l-4 border-orange-500 pl-4 mb-8">Parcours Professionnel</h2>
          <div className="space-y-8 pl-4 border-l border-neutral-200 dark:border-neutral-800 ml-2 mb-12">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)] border-2 border-white dark:border-neutral-950"></div>
                <h3 className="text-xl font-bold mb-1">{exp.role} <span className="block md:inline text-orange-400 font-medium">@ {exp.company}</span></h3>
                <p className="text-neutral-600 dark:text-neutral-400">{exp.desc}</p>
              </div>
            ))}
          </div>
          
          <h2 className="text-3xl font-semibold border-l-4 border-red-500 pl-4 mb-8">Formation & Apprentissage</h2>
          <div className="space-y-8 pl-4 border-l border-neutral-200 dark:border-neutral-800 ml-2">
             <div className="relative pl-8">
                <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] border-2 border-white dark:border-neutral-950 flex items-center justify-center">
                </div>
                <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                   Autodidacte <Youtube className="text-red-500" size={24}/>
                </h3>
                <p className="text-sm text-neutral-500 mb-2">YouTube & Ressources en ligne</p>
                <p className="text-neutral-600 dark:text-neutral-400">J'ai acquis la grande majorité de mes compétences techniques en électronique, programmation et intelligence artificielle en suivant des tutoriels, des cours et des projets pratiques sur YouTube. Cette approche m'a permis de développer une forte capacité de résolution de problèmes et d'apprentissage autonome.</p>
             </div>
             <div className="relative pl-8">
                <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] border-2 border-white dark:border-neutral-950 flex items-center justify-center">
                </div>
                <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                   Formation Académique <GraduationCap className="text-red-500" size={24}/>
                </h3>
                <p className="text-sm text-neutral-500 mb-2">Université & Travaux Pratiques</p>
                <p className="text-neutral-600 dark:text-neutral-400">Mes études universitaires ont forgé mes bases théoriques. J'ai particulièrement enrichi mon savoir-faire grâce à de nombreux travaux pratiques (TP) menés à l'université, appliquant rigoureusement les concepts à des systèmes concrets et consolidant ma méthodologie scientifique.</p>
             </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-3xl font-semibold border-l-4 border-blue-500 pl-4 mb-8">Stack Technique</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <motion.button
                key={i}
                initial={{ scale: 1.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                onClick={() => setSelectedTech(selectedTech === i ? null : i)}
                className={`px-4 py-2 border rounded-full text-sm font-medium transition-colors cursor-pointer relative overflow-hidden ${selectedTech === i ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-400'}`}
              >
                <span className={`relative z-10 flex items-center gap-2`}>
                  {tech.name}
                  {selectedTech === i && (
                    <motion.span 
                      initial={{ opacity: 0, width: 0 }} 
                      animate={{ opacity: 1, width: 'auto' }} 
                      className="text-xs font-bold text-white bg-blue-500 px-2 py-0.5 rounded-full"
                    >
                      {tech.level}%
                    </motion.span>
                  )}
                </span>
                {selectedTech === i && (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.level}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute left-0 top-0 bottom-0 bg-blue-500/10"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-3xl font-semibold border-l-4 border-purple-500 pl-4 mb-8">Projets</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((proj, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedProject(proj)}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-3xl hover:border-purple-500/50 transition-all flex flex-col cursor-pointer group relative"
              >
                <TouchMeOverlay />
                <div className="aspect-video w-full mb-6 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{proj.title}</h3>
                <p className="text-purple-400/80 text-sm mb-4">{proj.tech}</p>
                <p className="text-neutral-600 dark:text-neutral-400 flex-grow mb-6">{proj.desc}</p>
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-purple-400 transition-colors">
                    Démonstration <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Expertise */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => setShowEmbeddedModal(true)}
            className="p-8 bg-white dark:bg-neutral-900 rounded-3xl cursor-pointer hover:shadow-xl hover:shadow-orange-500/10 transition-all border border-transparent hover:border-orange-500/30 relative group"
          >
            <TouchMeOverlay />
            <Cpu className="text-orange-500 mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2 group-hover:text-orange-500 transition-colors">Systèmes Embarqués</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">Électronique, IoT, C++</p>
          </motion.div>
          <div className="p-8 bg-white dark:bg-neutral-900 rounded-3xl">
            <Code className="text-blue-500 mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">Développement</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">Web, Mobile, SQL</p>
          </div>
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => setShowAIModal(true)}
            className="p-8 bg-white dark:bg-neutral-900 rounded-3xl cursor-pointer hover:shadow-xl hover:shadow-pink-500/10 transition-all border border-transparent hover:border-pink-500/30 relative group"
          >
            <TouchMeOverlay />
            <Brain className="text-pink-500 mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2 group-hover:text-pink-500 transition-colors">Intelligence Artificielle</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">Python, Machine Learning, IA</p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => setShowDesignModal(true)}
            className="p-8 bg-white dark:bg-neutral-900 rounded-3xl cursor-pointer hover:shadow-xl hover:shadow-purple-500/10 transition-all border border-transparent hover:border-purple-500/30 relative group"
          >
            <TouchMeOverlay />
            <Video className="text-purple-500 mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2 group-hover:text-purple-500 transition-colors">Design & Média</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">Graphisme, Montage</p>
          </motion.div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="pb-12">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 md:p-12 rounded-3xl max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">Prêt à collaborer ?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-center mb-8">Envoyez-moi un message pour discuter de votre prochain projet.</p>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Nom complet</label>
                  <input type="text" className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Email</label>
                  <input type="email" className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Message</label>
                <textarea rows={4} className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Parlez-moi de votre projet..."></textarea>
              </div>
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                Envoyer le message <Send size={20} />
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto py-12 mt-12 border-t border-neutral-200 dark:border-neutral-800 flex flex-col items-center gap-8 text-center">
        <div className="flex flex-wrap justify-center gap-6">
          <a href="mailto:chadractchidi58@gmail.com" className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full hover:border-blue-500 hover:text-blue-400 transition-all transform hover:scale-110 text-neutral-700 dark:text-neutral-300">
            <Mail size={32} />
          </a>
          <a href="#" className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full hover:border-blue-500 hover:text-blue-400 transition-all transform hover:scale-110 text-neutral-700 dark:text-neutral-300">
            <Linkedin size={32} />
          </a>
          <a href="#" className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full hover:border-blue-500 hover:text-blue-400 transition-all transform hover:scale-110 text-neutral-700 dark:text-neutral-300">
            <Github size={32} />
          </a>
          <a href="#" className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full hover:border-blue-500 hover:text-blue-400 transition-all transform hover:scale-110 text-neutral-700 dark:text-neutral-300">
            <Facebook size={32} />
          </a>
          <a href="#" className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full hover:border-blue-500 hover:text-blue-400 transition-all transform hover:scale-110 text-neutral-700 dark:text-neutral-300">
            <MessageCircle size={32} />
          </a>
        </div>
        <p className="text-neutral-500 text-sm">
          &copy; {new Date().getFullYear()} Espérance Chadrac TCHIDI. Tous droits réservés.
        </p>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative">
                <div className="aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-t-3xl">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-neutral-200/50 dark:bg-black/50 hover:bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full text-neutral-900 dark:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedProject.title}</h2>
                    <p className="text-purple-400 text-lg font-medium">{selectedProject.tech}</p>
                  </div>
                  <a 
                    href={selectedProject.link}
                    className="shrink-0 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    Voir le code <ExternalLink size={20} />
                  </a>
                </div>
                
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
                    {selectedProject.fullDesc}
                  </p>
                </div>

                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 border-l-4 border-purple-500 pl-3">Images du Projet</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedProject.gallery.map((imgSrc, idx) => (
                        <div key={idx} className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700">
                           <img src={imgSrc} alt={`${selectedProject.title} ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Systems Expertise Modal */}
      <AnimatePresence>
        {showEmbeddedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEmbeddedModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 rounded-t-3xl">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Cpu className="text-orange-500" />
                  Expertise: Systèmes Embarqués
                </h2>
                <button 
                  onClick={() => setShowEmbeddedModal(false)}
                  className="p-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full text-neutral-900 dark:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 md:p-8 space-y-12">
                {/* Logiciels & Langages */}
                <section>
                  <h3 className="text-xl font-bold mb-6 border-l-4 border-orange-500 pl-3">Outils & Langages</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <img src="https://cdn.simpleicons.org/arduino/00979D" alt="Arduino IDE" className="w-16 h-16 mb-4" referrerPolicy="no-referrer" />
                      <span className="font-semibold text-center">Arduino IDE</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <img src="https://cdn.simpleicons.org/platformio/F5822A" alt="PlatformIO" className="w-16 h-16 mb-4" referrerPolicy="no-referrer" />
                      <span className="font-semibold text-center">PlatformIO</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <img src="https://cdn.simpleicons.org/cplusplus/00599C" alt="C++" className="w-16 h-16 mb-4" referrerPolicy="no-referrer" />
                      <span className="font-semibold text-center">C++</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <div className="w-16 h-16 mb-4 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm p-2 text-center leading-tight shadow-md">
                        Proteus
                      </div>
                      <span className="font-semibold text-center">Simulation (Proteus)</span>
                    </div>
                  </div>
                </section>

                {/* Cartes de Développement */}
                <section>
                  <h3 className="text-xl font-bold mb-6 border-l-4 border-orange-500 pl-3">Cartes de Développement</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
                      <div className="aspect-video w-full overflow-hidden bg-white">
                        <img src={arduinoImg} alt="Arduino Uno" className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                        <h4 className="font-bold text-lg mb-1">Arduino Uno / Nano / Mega</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Microcontrôleurs AVR classiques, idéals pour le prototypage rapide, la robotique et les projets éducatifs.</p>
                      </div>
                    </div>
                    
                    <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
                      <div className="aspect-video w-full overflow-hidden bg-neutral-900 flex items-center justify-center">
                        <img src={esp32Img} alt="ESP32" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                        <h4 className="font-bold text-lg mb-1">ESP32 & ESP8266</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Puces puissantes avec Wi-Fi et Bluetooth intégrés, parfaites pour les applications IoT et domotiques.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Expertise Modal */}
      <AnimatePresence>
        {showAIModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAIModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 rounded-t-3xl">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Brain className="text-pink-500" />
                  Expertise: Intelligence Artificielle
                </h2>
                <button 
                  onClick={() => setShowAIModal(false)}
                  className="p-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full text-neutral-900 dark:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 md:p-8 space-y-12">
                {/* Outils & Bibliothèques */}
                <section>
                  <h3 className="text-xl font-bold mb-6 border-l-4 border-pink-500 pl-3">Outils & Bibliothèques</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <img src="https://cdn.simpleicons.org/python/3776AB" alt="Python" className="w-16 h-16 mb-4" referrerPolicy="no-referrer" />
                      <span className="font-semibold text-center">Python</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <img src="https://cdn.simpleicons.org/opencv/5C3EE8" alt="OpenCV" className="w-16 h-16 mb-4" referrerPolicy="no-referrer" />
                      <span className="font-semibold text-center">OpenCV</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <div className="w-16 h-16 mb-4 bg-black rounded-xl flex items-center justify-center text-white font-bold text-sm p-2 text-center shadow-md border border-neutral-700">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                        </svg>
                      </div>
                      <span className="font-semibold text-center">YOLOv8</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <img src="https://cdn.simpleicons.org/numpy/013243" alt="NumPy" className="w-16 h-16 mb-4" referrerPolicy="no-referrer" />
                      <span className="font-semibold text-center">NumPy / Pandas</span>
                    </div>
                  </div>
                </section>

                {/* Domaines d'Application */}
                <section>
                  <h3 className="text-xl font-bold mb-6 border-l-4 border-pink-500 pl-3">Vision par Ordinateur & Applications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
                      <div className="aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                        <img src={opencvImg} alt="Computer Vision" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-70" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                        <h4 className="font-bold text-lg mb-1">OpenCV - Traitement d'Image</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Analyse, filtrage, détection de contours et transformation d'images en temps réel. Idéal pour la robotique et les systèmes embarqués.</p>
                      </div>
                    </div>
                    
                    <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
                      <div className="aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                        <img src={yoloImg} alt="YOLO Object Detection" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-70" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                        <h4 className="font-bold text-lg mb-1">YOLOv8 - Détection d'Objets</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Modèles d'apprentissage profond de pointe pour la détection, la segmentation et le suivi d'objets avec une grande précision.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Design & Media Expertise Modal */}
      <AnimatePresence>
        {showDesignModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDesignModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 rounded-t-3xl">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Video className="text-purple-500" />
                  Expertise: Design & Média
                </h2>
                <button 
                  onClick={() => setShowDesignModal(false)}
                  className="p-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full text-neutral-900 dark:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 md:p-8 space-y-12">
                {/* Outils */}
                <section>
                  <h3 className="text-xl font-bold mb-6 border-l-4 border-purple-500 pl-3">Outils de Création</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <img src="https://cdn.simpleicons.org/canva/00C4CC" alt="Canva" className="w-16 h-16 mb-4" referrerPolicy="no-referrer" />
                      <span className="font-semibold text-center">Canva</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <div className="w-16 h-16 mb-4 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-md">P</div>
                      <span className="font-semibold text-center">PixelLab Mobile</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <div className="w-16 h-16 mb-4 bg-[#001D26] rounded-xl flex items-center justify-center border-2 border-[#31A8FF] shadow-md relative overflow-hidden">
                        <span className="text-[#31A8FF] font-bold text-2xl">Ps</span>
                      </div>
                      <span className="font-semibold text-center">Photoshop (Bases)</span>
                    </div>
                  </div>
                </section>

                {/* Video & Motion */}
                <section>
                  <h3 className="text-xl font-bold mb-6 border-l-4 border-purple-500 pl-3">Montage & Vidéo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <div className="w-16 h-16 mb-4 bg-black rounded-2xl flex items-center justify-center border border-neutral-700">
                        <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor"><path d="M16.5 12c0-2.48-2.02-4.5-4.5-4.5s-4.5 2.02-4.5 4.5 2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5zm-4.5 2.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><path d="M21.5 5.5H2.5v13h19v-13zM20 17H4V7h16v10z"/></svg>
                      </div>
                      <span className="font-semibold text-center">CapCut</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <div className="w-16 h-16 mb-4 bg-[#000F2E] rounded-xl flex items-center justify-center border-2 border-[#9999FF] shadow-md relative overflow-hidden">
                        <span className="text-[#9999FF] font-bold text-2xl">Ae</span>
                      </div>
                      <span className="font-semibold text-center">After Effects</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <div className="w-16 h-16 mb-4 border-2 border-neutral-800 dark:border-neutral-200 rounded-lg relative">
                        <div className="absolute top-2 left-2 right-2 bottom-2 border border-dashed border-neutral-400"></div>
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-purple-500"></div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-purple-500"></div>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-purple-500"></div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-500"></div>
                      </div>
                      <span className="font-semibold text-center">Cadrage & Composition</span>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
