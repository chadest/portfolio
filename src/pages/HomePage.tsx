import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Mail, Linkedin, Github, Code, Cpu, Video, FileText, Download, 
  ExternalLink, Send, ArrowRight, Facebook, MessageCircle, Moon, Sun, 
  Brain, Youtube, GraduationCap, ChevronRight, Layers, Sparkles,
  Lock, Smartphone, Globe, Monitor, Wifi, CircuitBoard 
} from 'lucide-react';

import profileImage from '../assets/images/moi.png';
import { projectsData } from '../data/projects';
import { expertisesData } from '../data/expertises';
import { ImageWithFallback } from '../components/ImageWithFallback';

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
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
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

interface HomePageProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [selectedTech, setSelectedTech] = useState<number | null>(null);
  const [projectFilter, setProjectFilter] = useState<'all' | 'embed' | 'web-android'>('all');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const experiences = [
    { role: "Stagiaire", company: "Compagnie Béninoise des Textiles (CBT)", desc: "Stage d'immersion professionnelle." },
    { role: "Électricité Bâtiment", company: "Hévie", desc: "Installation et maintenance de circuits électriques." },
    { role: "Informatique de gestion", company: "CACOM", desc: "Assistance en informatique de gestion." },
  ];

  // Cartes de développement & Matériel embarqué
  const hardwareCards = [
    {
      name: "Arduino Uno",
      category: "Microcontrôleur AVR & Prototypage",
      specs: "ATmega328P • 16 MHz • 14 E/S numériques • 6 PWM • 6 entrées ADC",
      badge: "Arduino",
      colorTag: "text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/20",
      desc: "Idéale pour le maquettage rapide, le pilotage d'actionneurs, la régulation et l'apprentissage des microcontrôleurs.",
      icon: Cpu,
    },
    {
      name: "Arduino Nano",
      category: "Format Miniature & Breadboard",
      specs: "ATmega328P • Facteur compact 18x45 mm • Mini-USB • 8 entrées ADC",
      badge: "Compact",
      colorTag: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      desc: "Conçue pour les boîtiers à encombrement réduit, le montage direct sur platine et les circuits imprimés sur mesure.",
      icon: CircuitBoard,
    },
    {
      name: "ESP32",
      category: "SoC 32-bit Dual-Core IoT",
      specs: "Tensilica Xtensa 240 MHz • Wi-Fi 802.11 b/g/n • Bluetooth 4.2 BLE • FreeRTOS",
      badge: "Wi-Fi & BLE",
      colorTag: "text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20",
      desc: "Connectivité sans fil native, serveurs web embarqués, acquisition haute fréquence (PZEM-004T) et télémétrie cloud.",
      icon: Wifi,
    },
    {
      name: "AI-Pi Uno",
      category: "Edge AI & IA Embarquée",
      specs: "Architecture hybride • Accélération inférence • Logique périphérique Edge Computing",
      badge: "Edge AI",
      colorTag: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
      desc: "Calcul intelligent embarqué pour le traitement local de données sensorielles et la prise de décision autonome.",
      icon: Brain,
    },
    {
      name: "Écran LCD TFT 2.4\"",
      category: "Afficheur Graphique & IHM",
      specs: "Résolution 240x320 px • 65K couleurs RVB • Bus SPI / Parallèle • Contrôleur ILI9341",
      badge: "Affichage IHM",
      colorTag: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
      desc: "Conception d'interfaces graphiques interactives, graphiques de tendance, jauges d'énergie et tableaux de bord embarqués.",
      icon: Monitor,
    },
  ];

  const techStack = [
    { name: "Systèmes Embarqués (Arduino & ESP32)", level: 90 },
    { name: "C / C++ (Micrologiciel & Firmware)", level: 85 },
    { name: "IHM Graphique (Écran LCD TFT 2.4\")", level: 80 },
    { name: "Simulation de Circuits (Proteus)", level: 85 },
    { name: "Edge AI & IA Embarquée (AI-Pi Uno)", level: 80 },
    { name: "Python & Computer Vision (OpenCV)", level: 75 },
    { name: "React, TypeScript & Tailwind CSS", level: 80 },
    { name: "Instrumentation Électrique & Capteurs (PZEM)", level: 80 },
    { name: "Réseaux & Protocoles (UART, I2C, SPI, Wi-Fi)", level: 85 },
  ];

  const formations = [
    {
      title: "Licence en Électronique et Informatique Industrielle",
      desc: "Formation approfondie en systèmes embarqués, programmation bas niveau, électronique analogique et numérique, et télécommunications.",
      period: "En cours"
    },
    {
      title: "Baccalauréat Scientifique (Série D)",
      desc: "Bases solides en mathématiques, sciences physiques et démarche scientifique.",
      period: "Obtenu"
    }
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (projectFilter === 'embed') return p.platform === 'Système Embarqué';
    if (projectFilter === 'web-android') return p.platform === 'Web' || p.platform === 'Android' || p.platform === 'Logiciel';
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 font-sans selection:bg-purple-500 selection:text-white">
      {/* Scroll indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
        style={{ scaleX }} 
      />

      {/* Floating Theme Switcher */}
      <div className="fixed top-6 right-6 z-40">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full shadow-lg hover:border-purple-500/50 transition-all cursor-pointer"
          aria-label="Basculer le thème"
        >
          {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-neutral-700" />}
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-24">
        {/* Hero Section */}
        <header className="flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left pt-6">
          <div className="relative group shrink-0">
            <img 
              src={profileImage} 
              alt="Espérance Chadrac TCHIDI" 
              className="w-44 h-44 sm:w-52 sm:h-52 rounded-full object-cover border-4 border-purple-500/80 shadow-2xl" 
            />
          </div>

          <div className="flex-grow">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3">
              Chades't Creative
            </h1>
            <p className="text-xl sm:text-2xl text-purple-600 dark:text-purple-400 font-medium mb-1">
              Espérance Chadrac TCHIDI
            </p>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light mb-6">
              Architecte de solutions numériques & Ingénieur systèmes embarqués
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a 
                href="mailto:chadractchidi58@gmail.com"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-purple-500/25 flex items-center gap-2"
              >
                <Mail size={18} /> Me contacter
              </a>
              <a 
                href="#projets"
                className="px-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/50 rounded-xl font-medium transition-all flex items-center gap-2"
              >
                <Layers size={18} /> Voir mes projets ({projectsData.length})
              </a>
            </div>
          </div>
        </header>

        {/* À propos */}
        <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-4 mb-6">À propos</h2>
          <TypewriterText 
            text="Passionné par l'innovation technologique, je conçois des systèmes embarqués connectés, des applications mobiles Android et des plateformes web avancées. Mon approche allie rigueur matérielle et ingénierie logicielle pour donner vie à des solutions performantes." 
            speed={15} 
          />
        </section>

        {/* Section Projets - Full Page Routing */}
        <section id="projets" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-l-4 border-purple-500 pl-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Projets & Réalisations</h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                Cliquez sur un projet pour accéder à sa page complète (descriptions, captures et photos réelles)
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs">
              <button
                onClick={() => setProjectFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                  projectFilter === 'all'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Tout ({projectsData.length})
              </button>
              <button
                onClick={() => setProjectFilter('web-android')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                  projectFilter === 'web-android'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Web & Android
              </button>
              <button
                onClick={() => setProjectFilter('embed')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                  projectFilter === 'embed'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Systèmes Embarqués
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projets/${project.id}`}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 hover:border-purple-500/60 hover:shadow-xl transition-all flex flex-col group relative cursor-pointer"
              >
                <div className="aspect-video w-full mb-6 overflow-hidden rounded-2xl bg-neutral-950 relative">
                  <ImageWithFallback
                    src={project.image}
                    fallbackSrc={project.gallery?.[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.galleryItems && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-black/75 backdrop-blur-md text-white border border-white/10 flex items-center gap-1.5">
                      <Layers size={13} />
                      {project.galleryItems.length} photos & captures
                    </span>
                  )}
                  {project.isPrivate && (
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-medium bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Lock size={12} /> Code Privé
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  {project.platform && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-semibold">
                      {project.platform === 'Android' ? <Smartphone size={11} /> : <Globe size={11} />}
                      {project.platform}
                    </span>
                  )}
                  {project.status && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-medium">
                      {project.status}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 ml-auto">
                    {project.tech}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-500 transition-colors">
                  {project.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.desc}
                </p>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-purple-500 transition-colors">
                  <span>Accéder à la page complète</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Domaines d'Expertise - Pages complètes dédiées */}
        <section>
          <div className="mb-8 border-l-4 border-purple-500 pl-4">
            <h2 className="text-3xl font-bold tracking-tight">Domaines d'Expertise</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
              Explorez mes spécialités techniques détaillées (pages complètes dédiées)
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertisesData.map((exp) => (
              <Link
                key={exp.id}
                to={`/expertise/${exp.id}`}
                className="p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/50 hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {exp.id === 'systemes-embarques' && <Cpu size={24} className="text-orange-500" />}
                    {exp.id === 'ia-vision' && <Brain size={24} className="text-pink-500" />}
                    {exp.id === 'design-media' && <Video size={24} className="text-purple-500" />}
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {exp.categoryName}
                  </span>

                  <h3 className="text-xl font-bold mt-1 mb-3 group-hover:text-purple-500 transition-colors">
                    {exp.title}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    {exp.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  <span>En savoir plus</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Cartes de Développement & Matériel Embarqué */}
        <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Cartes de Développement & Matériel</h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                Microcontrôleurs, cartes spécialisées et afficheurs graphiques au cœur de mes réalisations embarquées.
              </p>
            </div>
            <Link
              to="/expertise/systemes-embarques"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 hover:underline shrink-0"
            >
              <span>Voir l'expertise embarquée</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hardwareCards.map((hw, idx) => {
              const IconComp = hw.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                        <IconComp size={20} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${hw.colorTag}`}>
                        {hw.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                      {hw.name}
                    </h3>
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-3">
                      {hw.category}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                      {hw.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-200/70 dark:border-neutral-800/80">
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block leading-tight">
                      {hw.specs}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Compétences Techniques */}
        <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-4 mb-8">Compétences Techniques</h2>
          <div className="space-y-6">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                onClick={() => setSelectedTech(selectedTech === index ? null : index)}
                className="cursor-pointer group"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-purple-500 transition-colors">
                    {tech.name}
                  </span>
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{tech.level}%</span>
                </div>
                <div className="w-full h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className="h-full bg-purple-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expériences & Formations */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* Expériences */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-4 mb-6">Expériences</h2>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="border-b border-neutral-100 dark:border-neutral-800 pb-5 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{exp.role}</h3>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">{exp.company}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Formations */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-4 mb-6">Formations & Diplômes</h2>
            <div className="space-y-6">
              {formations.map((f, i) => (
                <div key={i} className="border-b border-neutral-100 dark:border-neutral-800 pb-5 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{f.title}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold shrink-0">
                      {f.period}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact direct */}
        <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Un projet en tête ?</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-8 text-base">
            Je suis disponible pour des missions d'ingénierie en systèmes embarqués, IoT, vision artificielle et développement d'applications.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="mailto:chadractchidi58@gmail.com"
              className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all shadow-md flex items-center gap-2"
            >
              <Mail size={18} /> chadractchidi58@gmail.com
            </a>
            <a 
              href="https://www.linkedin.com/in/chadractchidi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Espérance Chadrac TCHIDI. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:chadractchidi58@gmail.com" className="hover:text-purple-500 transition-colors">Email</a>
            <a href="https://www.linkedin.com/in/chadractchidi" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transition-colors">LinkedIn</a>
          </div>
        </footer>
      </div>
    </div>
  );
};
